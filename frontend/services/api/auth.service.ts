import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export const login = (data: any) =>
  axios.post(`${API}/auth/login`, data);

export const register = (data: any) =>
  axios.post(`${API}/auth/register`, data);

export const sendOtp = (data: any) =>
  axios.post(`${API}/auth/send-otp`, data);

export const verifyOtp = (data: any) =>
  axios.post(`${API}/auth/verify-otp`, data);

export const forgotPassword = (data: any) =>
  axios.post(`${API}/auth/forgot-password`, data);

export const resetPassword = (data: any) =>
  axios.post(`${API}/auth/reset-password`, data);

export const verifyEmail = (data: any) =>
  axios.post(`${API}/auth/verify-email`, data);

export const sendVerifyEmail = (data: any) =>
  axios.post(`${API}/auth/send-verify-email`, data);

export const getMe = (token: string) =>
  axios.get(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });