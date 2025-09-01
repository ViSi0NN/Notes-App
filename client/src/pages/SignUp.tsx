import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/common/AuthLayout";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useApi } from "../hooks/useApi";
import { requestOtp, verifySignUpOtp } from "../services/authService";
import { useAppDispatch } from "../hooks/redux";
import { loginSuccess } from "../store/authSlice";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const requestOtpApi = useApi(requestOtp);
  const verifyOtpApi = useApi<AuthResponse>(verifySignUpOtp);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    const result = await requestOtpApi.request(formData.email);
    if (result) {
      setOtpSent(true);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const result = await verifyOtpApi.request(formData);
    if (result && result.token) {
      // --- Changed: Dispatch token to Redux store ---
      dispatch(loginSuccess(result.token));
      navigate("/dashboard");
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 md:text-start text-center">
        Sign up
      </h2>
      <p className="text-sm text-gray-600 mb-6 md:text-start text-center">
        Sign up to enjoy the feature of HD
      </p>

      <form onSubmit={otpSent ? handleSignUp : handleRequestOtp}>
        <Input
          label="Your Name"
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          disabled={otpSent}
        />
        <Input
          label="Date of Birth"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          required
          value={formData.dateOfBirth}
          onChange={handleChange}
          disabled={otpSent}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          disabled={otpSent}
        />

        {otpSent && (
          <Input
            label="OTP"
            id="otp"
            name="otp"
            type="text"
            required
            value={formData.otp}
            onChange={handleChange}
          />
        )}

        <div className="mt-6">
          <Button
            type="submit"
            loading={requestOtpApi.loading || verifyOtpApi.loading}
          >
            {otpSent ? "Sign Up" : "Get OTP"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="font-medium text-blue-500 hover:underline"
        >
          Sign in
        </Link>
      </p>

      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <Button variant="secondary" onClick={handleGoogleSignIn}>
        Sign up with Google
      </Button>
    </AuthLayout>
  );
};

export default SignUp;
