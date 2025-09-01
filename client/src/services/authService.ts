import { apiClient } from './api';

export const requestOtp = (email: string) => {
  return apiClient.post('/auth/request-otp', { email });
};

export const verifySignUpOtp = (formData: { name: string, dateOfBirth: string, email: string, otp: string }) => {
  return apiClient.post('/auth/signup', formData);
};

export const verifySignInOtp = (email: string, otp: string) => {
  return apiClient.post('/auth/signin', { email, otp });
};