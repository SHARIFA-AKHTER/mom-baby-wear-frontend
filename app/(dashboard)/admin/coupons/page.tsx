/* eslint-disable @typescript-eslint/no-unused-vars */
                 
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CouponService } from "@/app/services/coupon.service";
import { 
  Ticket, Plus, Trash2, CheckCircle2, 
  XCircle, Loader2, BadgePercent, CircleDollarSign,  Calendar, Info
} from "lucide-react";
import CreateCouponModal from "./components/CreateCouponModal";

interface Coupon {
  id: string;
  code: string;
  discountType: "PERCENT" | "FLAT";
  discountValue: number;
  expiry: string;
  minOrderValue?: number;
  isActive: boolean;
}

export default function CouponPage() {
  const [couponsData, setCouponsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await CouponService.getAll();
      setCouponsData(res?.data?.data || res?.data || res);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
    } finally {
      setLoading(false);
    }
  };

  const couponList: Coupon[] = Array.isArray(couponsData) 
    ? couponsData 
    : (couponsData as any)?.result || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await CouponService.delete(id);
      const updatedList = couponList.filter((c) => c.id !== id);
      setCouponsData(Array.isArray(couponsData) ? updatedList : { ...couponsData, result: updatedList });
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            Promo <span className="text-[#6C5DD3]">Codes</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Create discounts to boost your shop sales</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white px-8 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-200 dark:shadow-none transition-all active:scale-95 w-full md:w-auto"
        >
          <Plus size={18} /> Add New Coupon
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <Loader2 className="animate-spin text-[#6C5DD3] mb-4" size={40} />
          <p className="font-bold tracking-widest uppercase text-[10px]">Loading Rewards...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {couponList.map((coupon) => (
            <div key={coupon.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 p-7 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all relative overflow-hidden group">
              
              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 ${coupon.isActive ? 'bg-green-500' : 'bg-red-500'}`} />

              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-[#6C5DD3]">
                  {coupon.discountType === "PERCENT" ? <BadgePercent size={28} /> : <CircleDollarSign size={28} />}
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-tighter ${
                  coupon.isActive 
                  ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-800' 
                  : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800'
                }`}>
                  {coupon.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {coupon.isActive ? "Live" : "Inactive"}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight group-hover:text-[#6C5DD3] transition-colors">
                  {coupon.code}
                </h3>
                <p className="text-sm font-bold text-gray-400 dark:text-gray-500 mt-1">
                  Save <span className="text-[#6C5DD3] dark:text-purple-400">
                    {coupon.discountType === "PERCENT" ? `${coupon.discountValue}%` : `৳${coupon.discountValue}`}
                  </span> on every order
                </p>
              </div>

              <div className="space-y-3 py-5 border-t border-dashed border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-1.5">
                    <Info size={12} /> Min. Purchase
                  </span>
                  <span className="text-sm font-black text-gray-800 dark:text-gray-200">৳{coupon.minOrderValue || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-1.5">
                    <Calendar size={12} /> Valid Until
                  </span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {new Date(coupon.expiry).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(coupon.id)} 
                className="mt-2 w-full py-3.5 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
              >
                <Trash2 size={14} className="group-hover/btn:rotate-12 transition-transform" /> Remove Coupon
              </button>
            </div>
          ))}

          {/* Empty State */}
          {!loading && couponList.length === 0 && (
            <div className="col-span-full text-center py-28 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket className="text-gray-300 dark:text-gray-600" size={40} />
              </div>
              <h3 className="text-gray-800 dark:text-gray-100 font-black text-xl">No active coupons</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 max-w-xs mx-auto">Boost your sales by creating your first promotional discount code today.</p>
            </div>
          )}
        </div>
      )}

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <CreateCouponModal 
          onClose={() => setIsModalOpen(false)} 
          onRefresh={() => { fetchCoupons(); setIsModalOpen(false); }} 
        />
      )}
    </div>
  );
}