/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  MapPin,
  Send,
  Heart,
  MessageCircle,
  Linkedin,
  Youtube,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInstance";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/joya.joba.9/",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      href: "https://x.com/AkhterShar40032",
      color: "hover:text-sky-500",
    },
    {
      icon: MessageCircle,
      href: "https://web.whatsapp.com",
      color: "hover:text-green-500",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sharifa-akhter-dev",
      color: "hover:text-blue-700",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@SharifaAkhter012",
      color: "hover:text-red-600",
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await axiosInstance.post("/newsletter/subscribe", { email });
      toast.success("Welcome to the club! You've successfully subscribed.");
      setEmail("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Subscription failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-28 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* 1. Brand Section */}
        <div className="md:col-span-4 space-y-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-2xl border border-pink-50 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight dark:text-white leading-none">
                Mom & Baby
              </h2>
              <span className="text-[10px] uppercase tracking-widest font-bold text-pink-500 italic">
                Signature Care
              </span>
            </div>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
            Setting the standard for maternal and newborn essentials. We combine
            safety with elegance to celebrate motherhood.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 rounded-full ${item.color} hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-300`}
              >
                <item.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Collections Links */}
        {/* 2. Collections Links */}
        <div className="md:col-span-2">
          <h3 className="text-gray-900 dark:text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-10">
            Collections
          </h3>
          <ul className="space-y-4">
            {[
              { name: "Mother & Baby Gown", slug: "mother-and-baby-gown" },
              { name: "Baby Clothing", slug: "baby-clothing" },
              { name: "Baby Accessories", slug: "baby-accessories" },
              { name: "Baby Brush", slug: "baby-brush" },
              { name: "New Arrivals", slug: "new-arrivals" },
            ].map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/products?category=${item.slug}`}
                  className="text-gray-500 dark:text-gray-400 hover:text-pink-500 text-sm transition-all flex items-center gap-0 hover:gap-2 group"
                >
                  {/* Arrow animation on hover */}
                  <ArrowRight
                    size={14}
                    className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-pink-500"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Contact (No Phone Number) */}
        <div className="md:col-span-3">
          <h3 className="text-gray-900 dark:text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-10">
            Support
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Email Address
              </span>
              <a
                href="mailto:sr0589071@gmail.com"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
              >
                sr0589071@gmail.com
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Location
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <MapPin size={14} className="text-pink-500" /> Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* 4. Newsletter (Functional) */}
        <div className="md:col-span-3">
          <div className="p-8 bg-gray-50/50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800">
            <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-2 uppercase tracking-tight">
              The Newsletter
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">
              Early access to launches and exclusive member offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              />
              <Button
                disabled={loading}
                className="w-full bg-gray-900 dark:bg-pink-600 text-white rounded-xl py-6 text-xs font-bold transition-all hover:bg-black dark:hover:bg-pink-700 active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Subscribe <Send size={14} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-50 dark:border-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 grayscale opacity-60">
            <Image src="/bkash.png" alt="bkash" width={40} height={25} />
            <Image src="/visa.png" alt="visa" width={40} height={25} />
            <Image
              src="/mastercard.png"
              alt="mastercard"
              width={40}
              height={25}
            />
          </div>

          <p className="text-gray-400 text-[10px] font-medium tracking-widest uppercase order-3 md:order-2">
            © {new Date().getFullYear()} Mom & Baby Wear. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-tighter order-2 md:order-3">
            <Link
              href="/privacy"
              className="hover:text-pink-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-pink-500 transition-colors"
            >
              Terms
            </Link>
            <span className="flex items-center gap-1">
              Dev by <span className="text-pink-600">Sharifa</span>{" "}
              <Heart
                size={12}
                className="text-pink-500 fill-pink-500 animate-pulse"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
