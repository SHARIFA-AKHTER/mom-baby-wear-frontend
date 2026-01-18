/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/app/services/review.service"; 
import {  Trash2, Loader2, Star, AlertCircle, MessageSquareOff, Quote, ShieldCheck, Timer } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminReviewsPage() {
  const queryClient = useQueryClient(); 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => ReviewService.getAll(),
  });

  const reviewsData = data?.data || data;
  const reviews = Array.isArray(reviewsData) 
    ? reviewsData 
    : reviewsData?.result || [];

  const approveMutation = useMutation({
    mutationFn: (id: string) => ReviewService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review published live!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to approve");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ReviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review removed.");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  });

  if (isError) {
    const status = (error as any)?.response?.status;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white dark:bg-gray-900 rounded-[3rem] border border-red-100 dark:border-red-900/20">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
          {status === 403 ? "Access Denied" : "System Error"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm font-medium">
          {status === 403 
            ? "You don't have administrative privileges to manage reviews." 
            : "We couldn't synchronize with the feedback engine."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-400">
        <Loader2 className="animate-spin text-[#6C5DD3] mb-4" size={40} />
        <p className="font-black tracking-widest uppercase text-[10px]">Analyzing Feedback...</p>
      </div>
    );
  }

  return (
    <div className="transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
            User <span className="text-[#6C5DD3]">Feedback</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Moderate and curate customer testimonials</p>
        </div>
        <div className="bg-[#6C5DD3] text-white px-6 py-3 rounded-2xl shadow-xl shadow-purple-200 dark:shadow-none flex items-center gap-3">
          <Quote size={18} className="opacity-70" />
          <span className="text-xs font-black uppercase tracking-widest">Total: {reviews.length}</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-32 text-center rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <MessageSquareOff className="mx-auto text-gray-200 dark:text-gray-700 mb-6" size={60} />
          <h3 className="text-gray-400 font-black uppercase tracking-widest text-sm">Silence is golden</h3>
          <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">No customer reviews found in the database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {reviews.map((review: any) => (
            <div key={review.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden">
              
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-6 py-1 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest ${
                review.approved ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
              }`}>
                {review.approved ? 'Public' : 'Awaiting'}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Left: Product & User Info */}
                <div className="shrink-0 space-y-4">
                  <div className="relative w-20 h-20 mx-auto sm:mx-0">
                    <img 
                      src={review.product?.images?.[0] || "/placeholder.jpg"} 
                      className="w-full h-full rounded-2xl object-cover border-2 border-gray-50 dark:border-gray-800 group-hover:border-[#6C5DD3] transition-colors" 
                      alt="" 
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg text-[#6C5DD3] border border-gray-100 dark:border-gray-700 font-black text-xs">
                      {review.rating}<Star size={10} fill="currentColor" className="ml-0.5" />
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-black text-gray-800 dark:text-gray-100 truncate max-w-30">{review.user?.name || "Guest"}</p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <Timer size={12} className="text-[#6C5DD3]" />
                       <p className="text-[10px] font-bold text-gray-400">{format(new Date(review.createdAt), "MMMM dd, yyyy")}</p>
                    </div>
                    <h4 className="text-xs font-black text-[#6C5DD3] uppercase mb-3 line-clamp-1">{review.product?.title}</h4>
                    <div className="relative">
                      <Quote size={24} className="absolute -top-2 -left-3 text-gray-100 dark:text-gray-800 z-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed relative z-10">"{review.comment}"</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    {!review.approved && (
                      <button
                        onClick={() => approveMutation.mutate(review.id)}
                        disabled={approveMutation.isPending}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-100 dark:shadow-none transition-all active:scale-95"
                      >
                        {approveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />} 
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => window.confirm("Permanently delete this feedback?") && deleteMutation.mutate(review.id)}
                      disabled={deleteMutation.isPending}
                      className="flex-1 bg-red-50 dark:bg-red-900/10 text-red-500 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}