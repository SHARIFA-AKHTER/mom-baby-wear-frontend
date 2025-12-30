/* eslint-disable @typescript-eslint/no-unused-vars */
 "use client";

import { useEffect, useState } from "react";
import { CouponService } from "@/app/services/coupon.service";
import { 
  Ticket, Plus, Trash2, Calendar, CheckCircle2, 
  XCircle, Loader2, BadgePercent, CircleDollarSign, X 
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
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await CouponService.getAll();
      setCoupons(data);
    } catch (err) {
      console.error("Failed to fetch coupons", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await CouponService.delete(id);
      setCoupons((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <Ticket className="text-pink-600" size={32} /> Coupons
          </h1>
          <p className="text-gray-500 text-sm">Create and manage your promo codes</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-100"
        >
          <Plus size={20} /> New Coupon
        </button>
      </div>

      {/* Coupon Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-pink-600 mb-2" size={40} />
          <p className="text-gray-400 font-medium">Loading coupons...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all relative group">
              <div className="absolute top-4 right-4">
                {coupon.isActive ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-red-400" size={20} />}
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                  {coupon.discountType === "PERCENT" ? <BadgePercent size={24} /> : <CircleDollarSign size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter">{coupon.code}</h3>
                  <p className="text-xs font-bold text-pink-500 uppercase">
                    {coupon.discountType === "PERCENT" ? `${coupon.discountValue}% OFF` : `৳${coupon.discountValue} FLAT`}
                  </p>
                </div>
              </div>

              <div className="space-y-2 py-4 border-t border-dashed border-gray-100">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Min. Purchase:</span>
                  <span className="font-bold">৳{coupon.minOrderValue || 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Expires:</span>
                  <span className="font-bold text-gray-600">{new Date(coupon.expiry).toLocaleDateString()}</span>
                </div>
              </div>

              <button onClick={() => handleDelete(coupon.id)} className="mt-4 w-full py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
                <Trash2 size={14} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <CreateCouponModal 
          onClose={() => setIsModalOpen(false)} 
          onRefresh={() => { fetchCoupons(); setIsModalOpen(false); }} 
        />
      )}
    </div>
  );
}                    