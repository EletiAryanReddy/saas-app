"use client";

import { usePathname } from "next/navigation";
import AppShell from "./AppShell";

const AUTH_PATHS = ["/auth/login", "/auth/signup", "/auth/forgot-password", "/auth/reset-password", "/auth/verify-email", "/auth/otp"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
