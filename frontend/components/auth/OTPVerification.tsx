"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/services/api/auth.service";

export default function OTPVerification({
  phone,
}: any) {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const submit = async () => {
    const res = await verifyOtp({
      phone,
      otp,
    });

    localStorage.setItem(
      "accessToken",
      res.data.accessToken
    );

    localStorage.setItem(
      "refreshToken",
      res.data.refreshToken
    );

    router.push("/dashboard");
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-bold mb-4">
        Verify OTP
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) =>
          setOtp(e.target.value)
        }
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white p-2 w-full rounded"
      >
        Verify
      </button>
    </div>
  );
}