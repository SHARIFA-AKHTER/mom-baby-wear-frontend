// "use client";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { CheckCircle } from "lucide-react";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const tranId = searchParams.get("tran_id");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
//         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
//         <p className="text-gray-600 mb-6">
//           Your transaction ID: <span className="font-mono font-bold text-gray-900">{tranId || "N/A"}</span>
//         </p>
//         <Link 
//           href="/" 
//           className="inline-block w-full bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition"
//         >
//           Return to Home
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">
        Your transaction ID:{" "}
        <span className="font-mono font-bold text-gray-900">
          {tranId || "N/A"}
        </span>
      </p>
      <div className="space-y-3">
        <Link
          href="/orders" 
          className="inline-block w-full bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition mb-2"
        >
          View Orders
        </Link>
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

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Suspense 
        fallback={
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment details...</p>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}