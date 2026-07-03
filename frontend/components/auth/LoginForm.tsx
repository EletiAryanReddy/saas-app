"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/api/auth.service";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await login({
      email,
      password,
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
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow w-96"
    >
      <h1 className="text-2xl font-bold mb-4">
        Login
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className="bg-blue-600 text-white p-2 w-full rounded">
        Login
      </button>

      <GoogleLoginButton />

      <p
        onClick={() =>
          router.push("/auth/forgot-password")
        }
        className="text-blue-600 cursor-pointer mt-3 text-sm"
      >
        Forgot password?
      </p>

      <p
        onClick={() =>
          router.push("/auth/signup")
        }
        className="text-blue-600 cursor-pointer mt-2 text-sm"
      >
        Create account
      </p>
    </form>
  );
}