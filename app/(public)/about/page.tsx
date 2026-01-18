/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { ShieldCheck, Heart, Truck, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">Care for Mom, <span className="text-pink-600">Love for Baby.</span></h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          At MomBabyWear, we believe that the journey of motherhood should be comfortable and stylish. Since 2024, we've been dedicated to providing the highest quality fabrics for both moms and their little ones.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-4 gap-8 mb-20">
        {[
          { icon: <ShieldCheck size={40} className="text-pink-500" />, title: "Premium Quality", desc: "Safe fabrics for sensitive skin." },
          { icon: <Heart size={40} className="text-pink-500" />, title: "Made with Love", desc: "Every design is curated carefully." },
          { icon: <Truck size={40} className="text-pink-500" />, title: "Fast Delivery", desc: "Across all 64 districts in BD." },
          { icon: <Star size={40} className="text-pink-500" />, title: "Happy Moms", desc: "Thousands of satisfied customers." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 items-center gap-12 bg-pink-50 rounded-[3rem] p-8 md:p-16">
        <div>
           <img 
             src="https://i.pinimg.com/736x/00/c4/aa/00c4aa7e3bcc2af3991d8e9b1fdfbc92.jpg" 
             alt="About Us" 
             className="rounded-3xl shadow-2xl"
           />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Our Story</h2>
          <p className="text-gray-600 italic">
            "Started from a small room, our mission was simple: to make every mother feel special during their most beautiful phase of life."
          </p>
          <p className="text-gray-600">
            We source our materials from sustainable suppliers and ensure every stitch meets the highest standard. Our mother-baby matching sets are designed to create memories that last a lifetime.
          </p>
        </div>
      </div>
    </div>
  );
}