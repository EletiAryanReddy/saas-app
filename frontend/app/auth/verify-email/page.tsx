"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/services/api/auth.service";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      verifyEmail({ token })
        .then(() => {
          alert("Email verified successfully");
        })
        .catch(() => {
          alert("Verification failed");
        });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Email Verification</h1>
    </div>
  );
}