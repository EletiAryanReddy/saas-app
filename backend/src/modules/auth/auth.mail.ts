import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  return transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

export const sendResetPasswordMail = async (
  email: string,
  token: string
) => {
  const resetLink =
    `http://localhost:3000/auth/reset-password?token=${token}`;

  return sendMail(
    email,
    "Reset Your Password",
    `
    <h2>Password Reset</h2>
    <p>Click below to reset password:</p>
    <a href="${resetLink}">${resetLink}</a>
    `
  );
};

export const sendVerifyEmailMail = async (
  email: string,
  token: string
) => {
  const verifyLink =
    `http://localhost:3000/auth/verify-email?token=${token}`;

  return sendMail(
    email,
    "Verify Your Email",
    `
    <h2>Email Verification</h2>
    <p>Click below to verify your email:</p>
    <a href="${verifyLink}">${verifyLink}</a>
    `
  );
};