import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random password (8 characters: letters + numbers)
function generateRandomPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 404 }
      );
    }

    // Generate new random password
    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    // Send new password via email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #036627; text-align: center;">Software Hub</h1>
          <h2>Password Reset</h2>
          <p>Hi ${user.name},</p>
          <p>Your password has been reset. Here is your new password:</p>
          <div style="text-align: center; padding: 20px; background: #f0f7f0; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 28px; font-weight: bold; color: #036627; letter-spacing: 2px;">
              ${newPassword}
            </span>
          </div>
          <p style="color: #999; font-size: 14px;">
            Please login with this new password and change it to something memorable.
          </p>
          <p style="color: #999; font-size: 14px; border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Software Hub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your New Password - Software Hub',
      html,
    });

    return NextResponse.json({
      success: true,
      message: 'New password sent to your email',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}