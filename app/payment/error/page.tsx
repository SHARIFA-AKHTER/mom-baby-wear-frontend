"use client";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed!</h1>
        <p className="text-gray-600 mb-6">
          Sorry, your payment could not be processed due to a technical issue. Please try again.
        </p>
        <div className="space-y-3">
          <Link 
            href="/checkout" 
            className="inline-block w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition"
          >
            Try Again
          </Link>
          <Link 
            href="/" 
            className="inline-block w-full text-sm text-gray-500 hover:text-pink-600 transition underline"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}