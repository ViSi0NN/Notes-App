import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/common/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useApi } from '../hooks/useApi';
import { requestOtp, verifySignInOtp } from '../services/authService';
import { useAppDispatch } from '../hooks/redux';
import { loginSuccess } from '../store/authSlice';

interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const requestOtpApi = useApi(requestOtp);
  const verifyOtpApi = useApi<AuthResponse>(verifySignInOtp);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
        dispatch(loginSuccess(token));
        navigate('/dashboard');
    }
  }, [location, dispatch, navigate]);


  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    const result = await requestOtpApi.request(email);
    if (result) {
      setOtpSent(true);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const result = await verifyOtpApi.request(email, otp);
    if (result && result.token) {
      // --- Changed: Dispatch token to Redux store ---
      dispatch(loginSuccess(result.token));
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center md:text-start">Sign in</h2>
      <p className="text-sm text-gray-400 mb-6 text-center font-semibold md:text-start ">Please login to continue to your account.</p>

      <form onSubmit={otpSent ? handleSignIn : handleRequestOtp}>
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={otpSent}
        />
      {otpSent && (
        <Input
          label="OTP"
          id="otp"
          name="otp"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      )}
        
        <div className="flex items-center justify-between mb-4">
          <a href="#" onClick={(e) => { e.preventDefault(); if (otpSent) setOtpSent(false); }} className="text-sm text-blue-500 hover:underline">
            {otpSent ? 'Change Email' : ''}
          </a>
          {otpSent && <a href="#" onClick={handleRequestOtp} className="text-sm text-blue-500 hover:underline">Resend OTP</a>}
        </div>

        <Button type="submit" loading={requestOtpApi.loading || verifyOtpApi.loading}>
          {otpSent ? 'Sign In' : 'Get OTP'}
        </Button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Need an account?{' '}
        <Link to="/signup" className="font-medium text-blue-500 hover:underline">
          Create one
        </Link>
      </p>

      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
      </div>

      <Button variant="secondary" onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
    </AuthLayout>
  );
};

export default SignIn;