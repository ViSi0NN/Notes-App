import { Router } from 'express';
import { requestOtp, verifyOtpAndSignUp, verifyOtpAndSignIn, googleAuth, googleAuthCallback } from '../controllers/auth.controller';

const router = Router();

router.post('/request-otp', requestOtp);
router.post('/signup', verifyOtpAndSignUp);
router.post('/signin', verifyOtpAndSignIn);

// Google OAuth Routes
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);


export default router;