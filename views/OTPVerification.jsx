"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLayout from "../components/auth/AuthLayout";

import {
  resendOtp,
  verifyOtp,
} from "../services/authService";

import {
  saveAuthData,
} from "../utils/auth";

const OTPVerification = () => {
  const navigate = useRouter();

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("pending_email")
      : null;

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] =
    useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const data = await verifyOtp(email, otp);

      saveAuthData(
        data.token,
        data.user
      );

      localStorage.removeItem(
        "pending_email"
      );

      navigate.push("/add-post");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);

    setError("");

    setMessage("");

    try {
      const data = await resendOtp(email);

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout>

      <h1 className="font-heading text-3xl mb-2 text-center">
        Verify OTP
      </h1>

      <p className="text-center text-black/60 mb-8 text-sm">
        Enter the OTP sent to your email
      </p>

      <form
        onSubmit={handleVerify}
        className="flex flex-col gap-5"
      >

        <input
          type="text"
          maxLength={6}
          required
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          placeholder="Enter OTP"
          className="w-full border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black transition text-center tracking-[8px] text-lg"
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-600 text-sm">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded-lg hover:bg-black/80 transition disabled:opacity-50"
        >
          {loading
            ? "Verifying..."
            : "Verify & Continue"}
        </button>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resending}
          className="text-sm text-black/70 hover:text-black transition"
        >
          {resending
            ? "Resending..."
            : "Resend OTP"}
        </button>

      </form>

    </AuthLayout>
  );
};

export default OTPVerification;