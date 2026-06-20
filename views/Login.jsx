"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthLayout from "../components/auth/AuthLayout";

import { signin } from "../services/authService";

const Login = () => {
  const navigate = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const data = await signin(
        formData.email,
        formData.password
      );

      localStorage.setItem(
        "pending_email",
        data.email
      );

      navigate.push("/verify-otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>

      <h1 className="font-heading text-3xl mb-2 text-center">
        Login
      </h1>

      <p className="text-center text-black/60 mb-8 text-sm">
        Continue to The Success Digest dashboard
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >

        <div>
          <label className="block text-sm mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black transition"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-black/10 rounded-lg px-4 py-3 outline-none focus:border-black transition"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded-lg hover:bg-black/80 transition mt-2 disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>

      </form>

    </AuthLayout>
  );
};

export default Login;