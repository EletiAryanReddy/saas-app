"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/api/auth.service";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] =
    useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    await resetPassword({
      token,
      password,
    });

    alert("Password reset successful");
    router.push("/auth/login");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow w-96"
    >
      <h1 className="text-xl font-bold mb-4">
        Reset Password
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="New Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className="bg-green-600 text-white p-2 w-full rounded">
        Reset Password
      </button>
    </form>
  );
}