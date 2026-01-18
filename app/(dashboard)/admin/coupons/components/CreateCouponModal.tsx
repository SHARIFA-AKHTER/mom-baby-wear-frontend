/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CouponService } from "@/app/services/coupon.service";
import { X, Loader2, Ticket, Calendar, Percent, Banknote, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateCouponModal({ onClose, onRefresh }: { onClose: () => void; onRefresh: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENT",
    discountValue: "",
    expiry: "",
    minOrderValue: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.expiry) {
        toast.error("Please set an expiration date");
        setSubmitting(false);
        return;
      }

      const expiryDate = new Date(formData.expiry);
      expiryDate.setHours(23, 59, 59, 999); 
      const isoExpiry = expiryDate.toISOString();

      const payload = {
        code: formData.code.toUpperCase().trim(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        expiry: isoExpiry,
        minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : undefined,
      };

      await CouponService.create(payload);
      toast.success("New coupon is now active!");
      onRefresh();
      onClose();
    } catch (err: any) {
      const backendError = err.response?.data?.message || "Invalid Data Format";
      const zodDetails = err.response?.data?.errorSources?.[0]?.message; 
      toast.error(zodDetails || backendError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md transition-all">
      <div className="bg-white dark:bg-gray-950 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* Header with Gradient Accent */}
        <div className="relative p-8 bg-gradient-to-r from-pink-500 to-rose-600">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="grid grid-cols-6 gap-2 rotate-12 scale-150">
                {[...Array(12)].map((_, i) => <Ticket key={i} size={40} className="text-white" />)}
             </div>
          </div>
          <div className="relative flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl">
                <Ticket size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Campaign Creator</h2>
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Generate new promo codes</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X size={20}/>
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Visual Code Preview */}
          <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-2">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Customer Sees This:</span>
             <div className="text-2xl font-black text-pink-600 dark:text-pink-400 tracking-[0.2em] uppercase">
                {formData.code || "SAVE-XXX"}
             </div>
          </div>

          <div className="space-y-5">
            {/* Coupon Code Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} className="text-pink-500" /> Redemption Code
              </label>
              <input
                type="text"
                placeholder="e.g. FLASH50"
                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-pink-500/20 outline-none font-black text-lg uppercase tracking-widest transition-all"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                required
              />
            </div>

            {/* Type and Value Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Percent size={12} className="text-pink-500" /> Offer Type
                </label>
                <select 
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/20 font-bold text-sm appearance-none cursor-pointer"
                  value={formData.discountType}
                  onChange={(e) => setFormData({...formData, discountType: e.target.value})}
                >
                  <option value="PERCENT">Percentage (%)</option>
                  <option value="FLAT">Flat Amount (৳)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Banknote size={12} className="text-pink-500" /> Discount Value
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/20 font-black text-lg"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               {/* Expiry Date */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={12} className="text-pink-500" /> Deadline
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/20 font-bold text-sm"
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                  required
                  min={new Date().toISOString().split("T")[0]} 
                />
              </div>

              {/* Min Order Value */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <HashIcon size={12} className="text-pink-500" /> Min Order (Optional)
                </label>
                <input
                  type="number"
                  placeholder="৳ 0"
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-pink-500/20 font-bold"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={submitting}
            type="submit" 
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-5 rounded-[1.5rem] font-black tracking-[0.2em] shadow-xl shadow-pink-200 dark:shadow-none transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
          >
            {submitting ? (
              <Loader2 className="animate-spin" size={20}/>
            ) : (
              <>
                DEPLOY COUPON
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Simple Helper for Lucide consistency
function HashIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
  );
}