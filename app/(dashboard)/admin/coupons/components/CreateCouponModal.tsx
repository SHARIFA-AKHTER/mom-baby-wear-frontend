/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CouponService } from "@/app/services/coupon.service";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";

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
        alert("Please select an expiry date");
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

      console.log("Sending Payload:", payload);

      await CouponService.create(payload);
      alert("Coupon Created Successfully!");
      onRefresh();
      onClose();
    } catch (err: any) {
      console.error("Validation Error Details:", err.response?.data);
      
     
      const backendError = err.response?.data?.message || "Invalid Data Format";
      const zodDetails = err.response?.data?.errorSources?.[0]?.message; 
      
      alert(`Error: ${zodDetails || backendError}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-black text-gray-800">Add New Coupon</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20}/>
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Coupon Code */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Coupon Code</label>
            <input
              type="text"
              placeholder="e.g. SAVE20"
              className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none font-bold uppercase"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              required
            />
          </div>

          {/* Type and Value */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Type</label>
              <select 
                className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                value={formData.discountType}
                onChange={(e) => setFormData({...formData, discountType: e.target.value})}
              >
                <option value="PERCENT">Percent (%)</option>
                <option value="FLAT">Flat (৳)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Value</label>
              <input
                type="number"
                placeholder="0"
                className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 font-bold"
                value={formData.discountValue}
                onChange={(e) => setFormData({...formData, discountValue: e.target.value})}
                required
                min="1"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Expiry Date</label>
            <input
              type="date"
              className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
              value={formData.expiry}
              onChange={(e) => setFormData({...formData, expiry: e.target.value})}
              required
              min={new Date().toISOString().split("T")[0]} 
            />
          </div>

          {/* Min Order Value */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Min Order Amount (Optional)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full p-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 font-bold"
              value={formData.minOrderValue}
              onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={submitting}
            type="submit" 
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-pink-100 transition-all flex items-center justify-center gap-2 disabled:bg-pink-300"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20}/>
                <span>CREATING...</span>
              </>
            ) : "CREATE COUPON"}
          </button>
        </form>
      </div>
    </div>
  );
}