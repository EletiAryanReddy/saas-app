"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/api/auth.service";
import GoogleLoginButton from "./GoogleLoginButton";

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await register({
      name,
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
        Sign Up
      </h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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
        Create Account
      </button>

      <GoogleLoginButton />

      <p
        onClick={() =>
          router.push("/auth/login")
        }
        className="text-blue-600 cursor-pointer mt-3 text-sm"
      >
        Already have account?
      </p>
    </form>
  );
}