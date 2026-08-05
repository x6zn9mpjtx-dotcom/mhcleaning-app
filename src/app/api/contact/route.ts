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

// Vercel weigert bodies boven ~4,5 MB, dus houden we ruim marge
const MAX_IMAGES = 10;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

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
      to: 'm.h.windowcleaning@outlook.com',
      replyTo: email,
      subject: `Nieuwe offerteverzoek van ${name}`,
      html: htmlContent,
      attachments,
    });

    // Stuur bevestigingsemail naar de klant. Mislukt dit, dan is de aanvraag
    // nog steeds bij ons binnen, dus laten we de hele request niet falen.
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Je offerteverzoek is ontvangen - MH Cleaning',
        html: `
        <h2>Bedankt voor je aanvraag!</h2>
        <p>Hallo ${escapeHtml(name)},</p>
        <p>We hebben je offerteverzoek ontvangen. We nemen zo snel mogelijk contact met je op.</p>
        <p>In de tussentijd kun je ons bereiken via:</p>
        <ul>
          <li>Telefoon: +32(0)495 78 31 10</li>
          <li>WhatsApp: +32(0)495 78 31 10</li>
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
