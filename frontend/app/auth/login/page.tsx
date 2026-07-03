"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-12">
          <h1 className="text-4xl font-bold text-white mb-4">Collaborate. Create. Ship.</h1>
          <p className="text-lg text-white/80 max-w-md">
            The all-in-one workspace for teams to manage projects, tasks, and real-time collaboration.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["AR", "SC", "MR", "EW"].map((avatar, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white text-sm font-semibold"
                >
                  {avatar}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">2,500+</span> teams already onboard
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}
