"use client";

import { ReactNode } from "react";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-primary text-white px-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg text-center max-w-md">
          Secure, fast and professional authentication system
        </p>
      </div>

      {/* Auth Form */}
      <div className="flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
