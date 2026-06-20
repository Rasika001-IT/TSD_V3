const BASE_URL = "/api/admin";

export const signin = async (email, password) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signin failed");
  }

  return data;
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch(
    `${BASE_URL}/signin/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  return data;
};

export const resendOtp = async (email) => {
  const response = await fetch(
    `${BASE_URL}/signin/resend-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Resend OTP failed");
  }

  return data;
};

export const logoutAdmin = async (token) => {
  const response = await fetch(
    `${BASE_URL}/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};