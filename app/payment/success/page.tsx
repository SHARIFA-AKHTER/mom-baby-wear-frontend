"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your transaction ID: <span className="font-mono font-bold text-gray-900">{tranId || "N/A"}</span>
        </p>
        <Link 
          href="/" 
          className="inline-block w-full bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}