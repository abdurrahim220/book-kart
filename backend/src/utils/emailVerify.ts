/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer';
import { config } from '../config';
import { EmailSendingError } from '../error/mailError';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'z.abdurrahim5@gmail.com',
    pass: 'obrk dunv xxse wlis',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(
      'gmail services is not ready to send the email please check the email configuration',
    );
  } else {
    console.log('gmail services is ready to send the email');
  }
});

const sendEmail = async (to: string, subject: string, body: string) => {
  try {
    await transporter.sendMail({
      from: `"BookKart" <${config.email_user}>`,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    throw new EmailSendingError('Failed to send email');
  }
};

export const sendVerificationToEmail = async (to: string, token: string) => {
  const verificationUrl = `${config.fronted_url}/verify-email/${token}`;
  const html = `
  <h1>Welcome to BookKart! 📚</h1>
  <p>Thank you for registering. Please click link below to verify your email address:</p>
  <a href="${verificationUrl}">${verificationUrl}</a>
  <p>If you didn't request this or already verified , please ignore this email</p>
  `;
  await sendEmail(to, 'Verify your email address', html);
};

export const sendResetPasswordLinkToEmail = async (
  to: string,
  resetUrl: string,
) => {
  // const resetUrl = `${config.fronted_url}/reset-password/${token}`;
  const html = `
  <h1>Welcome to BookKart! 📚</h1>
  <p>You have requested to reset your password. Please click link below to reset your password:</p>
  <a href="${resetUrl}">${resetUrl}</a>
  <p>If you didn't request this email or already reset , please ignore this email</p>
  `;
  await sendEmail(to, 'Reset Password Link', html);
};
