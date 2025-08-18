'use server';

import nodemailer from 'nodemailer';

interface WelcomeEmailProps {
  to: string;
  name: string;
}

const smtpConfig = {
  host: 'mail.privateemail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export async function sendWelcomeEmail({ to, name }: WelcomeEmailProps) {
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.warn(
      'EMAIL_USER or EMAIL_PASS environment variables not set. Skipping sending welcome email.'
    );
    return;
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  const emailHtml = `
  <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
    <h1 style="color: #2962FF;">Welcome to ElonTradeX, ${name}!</h1>
    <p>We're thrilled to have you join the future of finance.</p>
    <p>Your account is now active, and a <strong>$200.00 USDT bonus</strong> has been credited to your portfolio to get you started.</p>
    <p>You can now log in to your dashboard to explore the platform, view live market data, and start trading.</p>
    <a href="https://elontradex.live/login" style="background-color: #2962FF; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-weight: bold;">
      Go to Your Dashboard
    </a>
    <p style="margin-top: 24px;">If you have any questions, feel free to contact our support team at any time.</p>
    <p>Happy trading!</p>
    <p><strong>The ElonTradeX Team</strong></p>
  </div>`;

  const mailOptions = {
    from: `"ElonTradeX" <${smtpConfig.auth.user}>`,
    to: to,
    subject: 'Welcome to ElonTradeX - Your Trading Journey Begins!',
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${to}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // In a real app, you might want to add more robust error handling or a retry mechanism.
  }
}
