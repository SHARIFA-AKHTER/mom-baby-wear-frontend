
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
  Heart
} from "lucide-react";

export default function Footer() {
  return (
 
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        
      
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full object-cover border border-pink-100"
            />
            <span className="text-xl font-bold text-pink-600">
              Mom & Baby Wear
            </span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Quality and comfort for you and your little one. We provide the best essentials for modern parenting.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <a key={index} href="#" className="p-2.5 bg-white border border-gray-100 text-gray-400 rounded-full hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-gray-900 font-bold text-[15px] uppercase tracking-wider mb-6">Explore</h3>
          <ul className="space-y-3">
            {['Products', 'Categories', 'Offers', 'Contact Us'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-gray-500 hover:text-pink-600 text-[14px] transition-colors inline-block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Support & Contact */}
        <div>
          <h3 className="text-gray-900 font-bold text-[15px] uppercase tracking-wider mb-6">Support</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-500">
              <MapPin size={18} className="text-pink-500 shrink-0 mt-0.5" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <Phone size={17} className="text-pink-500 shrink-0" />
              <span>+880 1700-000000</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500">
              <Mail size={17} className="text-pink-500 shrink-0" />
              <span>hello@momandbaby.com</span>
            </li>
          </ul>
        </div>

        {/* 4. Newsletter - Modern Look */}
        <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100/50">
          <h3 className="text-gray-900 font-bold text-[15px] uppercase tracking-wider mb-3">Newsletter</h3>
          <p className="text-gray-500 text-xs mb-4">Get 10% off on your first order!</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
            />
            <Button className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl py-5 font-bold text-xs uppercase tracking-widest transition-all shadow-md shadow-pink-100">
              Join Now <Send size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-pink-500">Mom & Baby Wear</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors">Terms</Link>
            <span className="flex items-center gap-1">Made with <Heart size={12} className="text-pink-500 fill-pink-500" /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}