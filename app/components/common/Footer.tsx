/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Heart,
  MessageCircle, // For WhatsApp
  Linkedin,
  Youtube
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/joya.joba.9/", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, href: "https://x.com/AkhterShar40032", color: "hover:text-sky-500" },
    { icon: MessageCircle, href: "https://web.whatsapp.com", color: "hover:text-green-500" }, 
    { icon: Linkedin, href: "https://www.linkedin.com/in/sharifa-akhter-784bb6252", color: "hover:text-blue-700" },
    { icon: Youtube, href: "https://www.youtube.com/@SharifaAkhter012", color: "hover:text-blue-700" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-pink-100">
                <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                className="object-cover"
                />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              Mom & Baby
            </span>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Premium quality essentials for mothers and newborns. We prioritize your comfort and your baby's smile.
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 rounded-lg ${item.color} hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm`}
              >
                <item.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest mb-6">Shopping</h3>
          <ul className="space-y-3">
            {['New Arrivals', 'Best Sellers', 'Baby Care', 'Maternity Wear', 'Offers'].map((item) => (
              <li key={item}>
                <Link href={`/products?category=${item.toLowerCase()}`} className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-200 group-hover:bg-pink-500 transition-all"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Customer Service */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-widest mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={18} className="text-pink-500 shrink-0" />
              <span>Gulshan-1, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 font-semibold">
              <Phone size={18} className="text-pink-500 shrink-0" />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <Mail size={18} className="text-pink-500 shrink-0" />
              <span>support@momnbaby.com</span>
            </li>
          </ul>
        </div>

        {/* 4. Newsletter */}
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-950 p-6 rounded-3xl border border-pink-100/50 dark:border-gray-800">
          <div className="relative z-10">
            <h3 className="text-gray-900 dark:text-white font-bold text-sm uppercase mb-2">Join the Club</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 font-medium">Get updates on new drops and exclusive offers.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-400"
              />
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-6 font-bold shadow-lg shadow-pink-200 dark:shadow-none transition-transform active:scale-95">
                Subscribe <Send size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-50 dark:border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 dark:text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-pink-500 underline underline-offset-4">Mom & Baby Wear</span>. Quality guaranteed.
          </p>
          
          {/* Payment Icons (Optional but Professional) */}
          <div className="flex gap-4 grayscale opacity-50">
             <Image src="/bkash.png" alt="bkash" width={40} height={25} />
             <Image src="/visa.png" alt="visa" width={40} height={25} />
             <Image src="/mastercard.png" alt="mastercard" width={40} height={25} />
          </div>

          <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1">Dev with <Heart size={12} className="text-pink-500 fill-pink-500" /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}