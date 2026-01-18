/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { Mail, Phone, Send, Loader2, MapPin, MessageCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { MessageService } from "@/app/services/message.service";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: MessageService.sendMessage,
    onSuccess: (data: any) => {
      toast.success("Message sent successfully!");
      if (data?.data?.autoReply) {
        setTimeout(() => {
          toast("AI Assistant:", {
            description: data.data.autoReply,
            icon: <MessageCircle className="text-pink-500" />,
            duration: 6000,
          });
        }, 1000);
      }
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <section className="relative py-12 md:py-24 bg-[#FFF9FB] dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
    
      <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="hidden sm:block absolute bottom-0 left-0 w-64 h-64 bg-pink-100/50 dark:bg-pink-900/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-pink-600 font-bold tracking-widest uppercase text-xs md:text-sm">Contact Us</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-2">
            Get In <span className="text-pink-600">Touch</span>
          </h2>
          <div className="h-1 w-16 md:w-24 bg-pink-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-2">
            Have questions? We're here to help you and your little one. 
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Info Cards */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {[
              { icon: Phone, label: "Call Support", sub: "9am to 6pm (Mon-Sat)", val: "+880 1700-000000" },
              { icon: Mail, label: "Email Inquiry", sub: "Response within 24 hours", val: "hello@momandbaby.com" },
              { icon: MapPin, label: "Our Office", sub: "Visit us at", val: "Dhaka, Bangladesh" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white dark:bg-gray-900 p-5 md:p-8 rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-pink-50 dark:border-gray-800 flex items-center lg:items-start gap-4 md:gap-5">
                <div className="bg-pink-100 dark:bg-pink-900/30 p-3 md:p-4 rounded-xl md:rounded-2xl text-pink-600 shrink-0">
                  <item.icon size={20} className="md:w-7 md:h-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-200">{item.label}</h4>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] md:text-sm mb-0.5 md:mb-1">{item.sub}</p>
                  <p className="text-sm md:text-xl font-black text-gray-900 dark:text-white truncate group-hover:text-pink-600 transition-colors">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-pink-100/30 dark:shadow-none border border-white dark:border-gray-800 transition-all">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
               <MessageCircle className="text-pink-500 w-5 h-5 md:w-6 md:h-6" />
               <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jone Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 md:p-4 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl md:rounded-2xl border-2 border-transparent focus:border-pink-200 dark:focus:border-pink-900 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-sm md:text-base"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. hello@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 md:p-4 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl md:rounded-2xl border-2 border-transparent focus:border-pink-200 dark:focus:border-pink-900 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-sm md:text-base"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">Your Message</label>
                <textarea
                  required
                  placeholder="Tell us what you need..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 md:p-4 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-xl md:rounded-2xl border-2 border-transparent focus:border-pink-200 dark:focus:border-pink-900 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all resize-none text-sm md:text-base"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-2 md:gap-3 shadow-lg shadow-pink-100 dark:shadow-none disabled:bg-gray-400 active:scale-[0.98]"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="md:w-5 md:h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}