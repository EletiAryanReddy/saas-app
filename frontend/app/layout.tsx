import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NotificationProvider from "@/components/notification/NotificationProvider";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaSPro - Team Collaboration Platform",
  description: "All-in-one workspace for teams to manage projects and collaborate in real time",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <NotificationProvider />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
