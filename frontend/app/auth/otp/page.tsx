"use client";

import { useState } from "react";
import PhoneLogin from "@/components/auth/PhoneLogin";
import OTPVerification from "@/components/auth/OTPVerification";

export default function OTPPage() {
  const [phone, setPhone] =
    useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!phone ? (
        <PhoneLogin onSent={setPhone} />
      ) : (
        <OTPVerification phone={phone} />
      )}
    </div>
  );
}