/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Cart parsing error:", error);
      }
    }
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = 60;
  const total = subtotal + deliveryCharge;

  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center border border-gray-100">
          <ShoppingBag size={80} className="mx-auto text-pink-200 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link
            href="/"
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 
            transition flex items-center gap-2 mx-auto w-fit"
          >
            <ArrowLeft size={20} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-500 font-medium">{cartItems.length} Items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-50">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-pink-600 font-extrabold text-lg mt-1">
                      ৳ {item.price.toLocaleString()}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3 bg-gray-50 w-fit p-1 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border rounded-md hover:bg-pink-50 hover:text-pink-600 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-gray-700 min-w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border rounded-md hover:bg-pink-50 hover:text-pink-600 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="self-end sm:self-center text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition"
                    title="Remove item"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl h-fit border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-800">৳ {deliveryCharge}</span>
              </div>
            </div>

            <div className="border-t border-dashed pt-6 mb-8 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-black text-pink-600">৳ {total.toLocaleString()}</span>
            </div>

            <button 
              onClick={() => router.push('/checkout')}
              className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-100 active:scale-95"
            >
              Proceed to Checkout
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-6">
              Secure Checkout • 100% Satisfaction Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}