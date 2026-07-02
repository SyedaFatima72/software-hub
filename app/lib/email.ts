import nodemailer from 'nodemailer';

// Create transporter - CORRECT function name
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string, name: string) {
  const verificationLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #036627; text-align: center;">Software Hub</h1>
        <h2>Verify Your Email</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up! Please click the button below to verify your email address:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background: #036627; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #999; font-size: 14px;">This link will expire in 24 hours.</p>
        <p style="color: #999; font-size: 14px; border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
          If you didn't sign up for Software Hub, please ignore this email.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Software Hub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - Software Hub',
    html,
  });
}

export async function sendOTPEmail(email: string, otp: string, name: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #036627; text-align: center;">Software Hub</h1>
        <h2>Reset Your Password</h2>
        <p>Hi ${name},</p>
        <p>Your OTP for password reset is:</p>
        <div style="text-align: center; padding: 20px; background: #f0f7f0; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #036627; letter-spacing: 8px;">
            ${otp}
          </span>
        </div>
        <p style="color: #999; font-size: 14px;">This OTP will expire in 5 minutes.</p>
        <p style="color: #999; font-size: 14px; border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Software Hub" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset OTP - Software Hub',
    html,
  });
}