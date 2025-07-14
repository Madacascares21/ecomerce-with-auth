// emailService.ts
import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "gd69435@gmail.com",
      pass: process.env.GOOGLE,
    },
  });

  // Send the email
  const info = await transporter.sendMail({
    from: '"Auxload" <your_email@example.com>',
    to,
    subject,
    text,
    html, // optional: if you want HTML content
  });

  console.log("Email sent: %s", info.messageId);
}
