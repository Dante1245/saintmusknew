
"use server";

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const WelcomeEmailSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

type WelcomeEmailInput = z.infer<typeof WelcomeEmailSchema>;

export async function sendWelcomeEmail(input: WelcomeEmailInput) {
  const validation = WelcomeEmailSchema.safeParse(input);

  if (!validation.success) {
    throw new Error('Invalid input for sending welcome email.');
  }

  const { name, email } = validation.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'ElonTradeX <noreply@elontradex.live>',
      to: [email],
      subject: 'Welcome to ElonTradeX!',
      html: `
        <div>
          <h1>Welcome, ${name}!</h1>
          <p>Thank you for signing up for ElonTradeX, the future of crypto trading.</p>
          <p>We're excited to have you on board. You've been credited with a $200 USDT bonus to get you started.</p>
          <p>Log in to your dashboard now to start trading!</p>
          <a href="https://elontradex.live/login">Go to Dashboard</a>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error('Failed to send email.');
    }

    console.log("Welcome email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error('An unexpected error occurred while sending the email.');
  }
}
