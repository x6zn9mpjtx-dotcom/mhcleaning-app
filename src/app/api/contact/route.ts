import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return (value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Adres waar aanvragen binnenkomen. Hetzelfde adres staat op de contactpagina.
const CONTACT_EMAIL = 'info@mhcleaning.be';

// Vercel weigert bodies boven ~4,5 MB, dus houden we ruim marge
const MAX_IMAGES = 10;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

// Spambeveiliging: hoeveel aanvragen mag één bezoeker per kwartier sturen
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  recentRequests.set(ip, timestamps);

  // Oude bezoekers opruimen zodat de map niet blijft groeien
  if (recentRequests.size > 500) {
    for (const [key, times] of recentRequests) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        recentRequests.delete(key);
      }
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Honeypot: dit veld is onzichtbaar voor mensen. Is het ingevuld, dan is het
    // een bot. We doen alsof het gelukt is, zodat die niet gaat variëren.
    if ((formData.get('website') as string)?.trim()) {
      return NextResponse.json({ success: true, message: 'Email verzonden' }, { status: 200 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'onbekend';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Je hebt net al een aanvraag verstuurd. Probeer het later opnieuw of bel ons.' },
        { status: 429 }
      );
    }

    const name = (formData.get('name') as string ?? '').trim();
    const email = (formData.get('email') as string ?? '').trim();
    const phone = (formData.get('phone') as string ?? '').trim();
    const message = (formData.get('message') as string ?? '').trim();

    if (!name || !phone || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Vul alsjeblieft alle velden correct in.' },
        { status: 400 }
      );
    }

    // Haal de geüploade foto's uit het formulier en maak er bijlagen van
    const files = Array.from(formData.entries())
      .filter(([key, value]) => key.startsWith('image_') && value instanceof File)
      .map(([, value]) => value as File)
      .filter((file) => file.size > 0 && file.type.startsWith('image/'))
      .slice(0, MAX_IMAGES);

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { success: false, error: "De foto's zijn samen te groot. Probeer het met minder foto's." },
        { status: 413 }
      );
    }

    const attachments = await Promise.all(
      files.map(async (file, index) => ({
        filename: file.name || `foto_${index + 1}.jpg`,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      }))
    );

    // Maak een HTML email template
    const htmlContent = `
      <h2>Nieuwe contactaanvraag van MH Cleaning website</h2>
      <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefoon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Bericht:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <p><em>Aantal foto's in bijlage: ${attachments.length}</em></p>
    `;

    // Stuur email naar jou, met de foto's als bijlage
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Nieuwe offerteverzoek van ${name}`,
      html: htmlContent,
      attachments,
    });

    // Stuur bevestigingsemail naar de klant. Mislukt dit, dan is de aanvraag
    // nog steeds bij ons binnen, dus laten we de hele request niet falen.
    try {
      await transporter.sendMail({
        from: `"MH Cleaning" <${process.env.EMAIL_USER}>`,
        to: email,
        replyTo: CONTACT_EMAIL,
        subject: 'Je offerteverzoek is ontvangen - MH Cleaning',
        html: `
        <h2>Bedankt voor je aanvraag!</h2>
        <p>Hallo ${escapeHtml(name)},</p>
        <p>We hebben je offerteverzoek ontvangen. We nemen zo snel mogelijk contact met je op.</p>
        <p>In de tussentijd kun je ons bereiken via:</p>
        <ul>
          <li>Telefoon: +32(0)495 78 31 10</li>
          <li>WhatsApp: +32(0)495 78 31 10</li>
          <li>E-mail: ${CONTACT_EMAIL}</li>
        </ul>
        <p>Met vriendelijke groet,<br>MH Cleaning</p>
      `,
      });
    } catch (error) {
      console.error('Bevestigingsmail naar klant mislukt:', error);
    }

    return NextResponse.json({ success: true, message: 'Email verzonden' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}
