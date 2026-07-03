"use client";

import { useState } from "react";
import { forgotPassword } from "@/services/api/auth.service";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    await forgotPassword({ email });

    alert("Reset link sent to email");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow w-96"
    >
      <h1 className="text-xl font-bold mb-4">
        Forgot Password
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button className="bg-blue-600 text-white p-2 w-full rounded">
        Send Reset Link
      </button>
    </form>
  );
}