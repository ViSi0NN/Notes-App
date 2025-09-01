import nodemailer from 'nodemailer';
import { User } from '../models/user.model';
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const generateAndSendOtp = async (email: string): Promise<boolean> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

  await User.findOneAndUpdate(
    { email },
    { email, otp, otpExpires },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const mailOptions = {
    from: `"Notes App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for Notes App',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Your One-Time Password (OTP)</h2>
        <p>Use the following code to sign in to your account.</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px;">${otp}</p>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  let mail = await transporter.sendMail(mailOptions);
  console.log(mail);
  
  return true;
};