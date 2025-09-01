import { Request, Response } from 'express';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { generateAndSendOtp } from '../services/email.service';
import axios from 'axios';
import querystring from 'querystring';
import dotenv from "dotenv";
dotenv.config();

const generateJwt = (userId: string , name : string , email : string) => {
  return jwt.sign({ userId  , name , email}, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    
    await generateAndSendOtp(email);
    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

export const verifyOtpAndSignUp = async (req: Request, res: Response) => {
    const { name, email, dateOfBirth, otp } = req.body;

    if (!name || !email || !dateOfBirth || !otp) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
        
        user.name = name;
        user.dateOfBirth = new Date(dateOfBirth);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateJwt(user.id,user.name,user.email);
        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
            message : "Successfully Logged In"
        });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ message: 'Server error during sign up.' });
    }
};

export const verifyOtpAndSignIn = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateJwt(user.id,user.name,user.email);
    res.status(200).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
      message : "Successfully Logged In"
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ message: 'Server error during sign in.' });
  }
};

export const googleAuth = (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_OAUTH_REDIRECT_URL}&response_type=code&scope=profile email`;
  res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', querystring.stringify({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
    }));

    const { id_token, access_token } = tokenResponse.data;

    const profileResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers: { Authorization: `Bearer ${id_token}` },
    });
    
    const profile = profileResponse.data;

    let user = await User.findOne({ email: profile.email });
    if (!user) {
        user = await User.create({
            googleId: profile.id,
            name: profile.name,
            email: profile.email,
        });
    } else {
        if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
        }
    }

    const token = generateJwt(user.id,user.name , user.email);
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);

  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.redirect(`${process.env.CLIENT_URL}/signin?error=google_oauth_failed`);
  }
};