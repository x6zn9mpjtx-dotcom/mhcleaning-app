import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Maak een HTML email template
    const htmlContent = `
      <h2>Nieuwe contactaanvraag van MH Cleaning website</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefoon:</strong> ${phone}</p>
      <p><strong>Bericht:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <p><em>Aantal foto's geüpload: ${Array.from(formData.entries()).filter(([key]) => key.startsWith('image_')).length}</em></p>
    `;

    // Stuur email naar jou
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'm.h.windowcleaning@outlook.com',
      subject: `Nieuwe offerteverzoek van ${name}`,
      html: htmlContent,
    });

    // Stuur bevestigingsemail naar de klant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Je offerteverzoek is ontvangen - MH Cleaning',
      html: `
        <h2>Bedankt voor je aanvraag!</h2>
        <p>Hallo ${name},</p>
        <p>We hebben je offerteverzoek ontvangen. We nemen zo snel mogelijk contact met je op.</p>
        <p>In de tussentijd kun je ons bereiken via:</p>
        <ul>
          <li>Telefoon: +32(0)495 78 31 10</li>
          <li>WhatsApp: +32(0)495 78 31 10</li>
        </ul>
        <p>Met vriendelijke groet,<br>MH Cleaning</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email verzonden' }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, error: 'Er is een fout opgetreden' },
      { status: 500 }
    );
  }
}
