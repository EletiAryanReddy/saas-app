"use client";

import { useState } from "react";
import { sendOtp } from "@/services/api/auth.service";

export default function PhoneLogin({
  onSent,
}: any) {
  const [phone, setPhone] = useState("");

  const submit = async () => {
    await sendOtp({ phone });
    onSent(phone);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-bold mb-4">
        Phone Login
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="+919999999999"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white p-2 w-full rounded"
      >
        Send OTP
      </button>
    </div>
  );
}