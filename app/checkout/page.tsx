
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Truck } from "lucide-react";
import Link from "next/link";
import { PaymentService } from "../services/payment.service";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
  });

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = 60;
  const total = subtotal + deliveryCharge;

  if (!isMounted) return null;

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        total: total,
      };

      const orderResponse = await PaymentService.createOrder(orderPayload);

      if (orderResponse?.success) {
        const dbOrderId = Array.isArray(orderResponse.data)
          ? orderResponse.data[0].id
          : orderResponse.data.id;

        if (!dbOrderId) {
          throw new Error("Order ID missing!");
        }

        const paymentPayload = {
          amount: total,
          orderId: dbOrderId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shipping_method: "NO",
          product_profile: "physical-goods",
        };

        const paymentResponse = await PaymentService.initPayment(paymentPayload);

        if (paymentResponse?.success && paymentResponse?.data) {
          window.location.replace(paymentResponse.data);
        } else {
          alert("Payment gateway is unreachable.");
        }
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Background: Light (gray-50) | Dark (gray-900)
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/cart" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 mb-6 transition">
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Card: Light (white) | Dark (gray-800) */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 text-nowrap">
              <Truck className="text-pink-600" /> Delivery Info
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <input 
                required name="name" value={formData.name} onChange={handleInputChange} 
                className="w-full border dark:border-gray-600 p-3 rounded-xl outline-none focus:border-pink-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Full Name" 
              />
              <input 
                required type="email" name="email" value={formData.email} onChange={handleInputChange} 
                className="w-full border dark:border-gray-600 p-3 rounded-xl outline-none focus:border-pink-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Email Address" 
              />
              <input 
                required name="phone" value={formData.phone} onChange={handleInputChange} 
                className="w-full border dark:border-gray-600 p-3 rounded-xl outline-none focus:border-pink-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Phone Number" 
              />
              <textarea 
                required name="address" value={formData.address} onChange={handleInputChange} rows={3} 
                className="w-full border dark:border-gray-600 p-3 rounded-xl outline-none focus:border-pink-500 dark:bg-gray-700 dark:text-white" 
                placeholder="Full Address" 
              />
              
              <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold hover:bg-pink-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 transition shadow-lg">
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </form>
          </div>

          {/* Summary Card: Light (white) | Dark (gray-800) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Summary</h2>
            <div className="flex justify-between font-bold text-pink-600 dark:text-pink-400 border-t dark:border-gray-700 pt-4 text-xl">
              <span>Total Amount</span>
              <span>৳ {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}