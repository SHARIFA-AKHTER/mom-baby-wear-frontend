// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useState } from "react";
// import { Mail, Phone, Send, Loader2 } from "lucide-react";
// import { useMutation } from "@tanstack/react-query";
// import { MessageService } from "@/app/services/message.service";
// import { toast } from "sonner";

// export default function ContactSection() {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });


//   const { mutate, isPending } = useMutation({
//     mutationFn: MessageService.sendMessage,
//     onSuccess: () => {
//       toast.success("Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" }); 
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutate(formData);
//   };

//   return (
//     <section className="py-20 bg-[#FFF9FB]"> 
//       <div className="max-w-6xl mx-auto px-4">
        
//         {/* Title Section */}
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Get In Touch</h2>
//           <div className="h-1 w-20 bg-pink-500 mx-auto mt-4 rounded-full"></div>
//           <p className="text-gray-500 mt-4 max-w-md mx-auto">
//             Have questions about our products? We're here to help you and your little one.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-center">
          
//           {/* Left Side: Info */}
//           <div className="space-y-10">
//             <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-5 border border-pink-50">
//               <div className="bg-pink-100 p-4 rounded-2xl text-pink-600">
//                 <Phone size={28} />
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold text-gray-800">Call Support</h4>
//                 <p className="text-gray-500 text-sm mb-1">Mon-Fri from 9am to 6pm</p>
//                 <p className="text-xl font-bold text-pink-600">+880 1700-000000</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-3xl shadow-sm flex items-start gap-5 border border-pink-50">
//               <div className="bg-pink-100 p-4 rounded-2xl text-pink-600">
//                 <Mail size={28} />
//               </div>
//               <div>
//                 <h4 className="text-lg font-bold text-gray-800">Email Inquiry</h4>
//                 <p className="text-gray-500 text-sm mb-1">We respond within 24 hours</p>
//                 <p className="text-xl font-bold text-pink-600">hello@momandbaby.com</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Form */}
//           <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-pink-100/50 border border-gray-100">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="grid md:grid-cols-2 gap-5">
//                 <input
//                   type="text"
//                   required
//                   placeholder="Your Name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50 outline-none transition-all"
//                 />
//                 <input
//                   type="email"
//                   required
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50 outline-none transition-all"
//                 />
//               </div>
//               <textarea
//                 required
//                 placeholder="How can we help you today?"
//                 rows={5}
//                 value={formData.message}
//                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                 className="w-full p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50 outline-none transition-all resize-none"
//               ></textarea>
              
//               <button
//                 type="submit"
//                 disabled={isPending}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-pink-200 disabled:bg-gray-400 disabled:shadow-none"
//               >
//                 {isPending ? (
//                   <Loader2 className="animate-spin" size={20} />
//                 ) : (
//                   <>
//                     Send Message
//                     <Send size={20} />
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

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
    onSuccess: () => {
      toast.success("Message sent successfully!");
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
    <section className="relative py-16 md:py-24 bg-[#FFF9FB] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Section */}
        <div className="text-center mb-12 md:mb-20">
          <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-3">
            Get In <span className="text-pink-600">Touch</span>
          </h2>
          <div className="h-1.5 w-24 bg-pink-500 mx-auto mt-6 rounded-full"></div>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Have questions about our products? We're here to help you and your little one. 
            Drop us a message and we'll get back to you shortly!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Info Cards (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 flex items-start gap-5">
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-600 group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">Call Support</h4>
                <p className="text-gray-500 text-sm mb-2">9am to 6pm (Mon-Sat)</p>
                <p className="text-lg md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">+880 1700-000000</p>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 flex items-start gap-5">
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-600 group-hover:scale-110 transition-transform duration-300">
                <Mail size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">Email Inquiry</h4>
                <p className="text-gray-500 text-sm mb-2">Response within 24 hours</p>
                <p className="text-lg md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">hello@momandbaby.com</p>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-50 flex items-start gap-5">
              <div className="bg-pink-100 p-4 rounded-2xl text-pink-600 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">Our Office</h4>
                <p className="text-gray-500 text-sm mb-2">Visit us at</p>
                <p className="text-lg md:text-xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Right Side: Form (Takes 3 columns) */}
          <div className="lg:col-span-3 bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl shadow-pink-100/40 border border-white relative overflow-hidden">
            {/* Subtle form header */}
            <div className="flex items-center gap-3 mb-8">
               <MessageCircle className="text-pink-500" />
               <h3 className="text-xl font-bold text-gray-800">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Jone Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. hello@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 focus:bg-white focus:ring-0 outline-none transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Your Message</label>
                <textarea
                  required
                  placeholder="Tell us what you need..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 focus:bg-white focus:ring-0 outline-none transition-all resize-none placeholder:text-gray-300"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-pink-200 hover:shadow-pink-300 disabled:bg-gray-400 disabled:shadow-none active:scale-95"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Send Message
                    <Send size={20} />
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