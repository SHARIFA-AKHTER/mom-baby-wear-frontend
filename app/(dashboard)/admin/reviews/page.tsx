/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/app/services/review.service"; 
import { Check, Trash2, Loader2, Star, User, AlertCircle, MessageSquareOff } from "lucide-react";
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
      toast.success("Review approved!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to approve review");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ReviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review deleted!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  });

  if (isError) {
    const status = (error as any)?.response?.status;
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          {status === 403 ? "Access Forbidden" : "Something went wrong"}
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          {status === 403 
            ? "You don't have permission to view this page. Please login as Admin." 
            : "Could not fetch reviews. Check your connection."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-pink-600 mb-2" size={40} />
        <p className="text-gray-500 font-medium">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen font-sans">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Review Management</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and moderate customer feedback</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 text-sm font-bold text-pink-600">
          Total Reviews: {reviews.length}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-3xl border-2 border-dashed border-gray-200">
          <MessageSquareOff className="mx-auto text-gray-200 mb-4" size={60} />
          <p className="text-gray-400 font-medium">No reviews available to show.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product Info</th>
                  <th className="p-4">Rating & Comment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {reviews.map((review: any) => (
                  <tr key={review.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 font-bold border border-pink-100">
                           {review.user?.name?.charAt(0) || <User size={16} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{review.user?.name || "Anonymous"}</p>
                          <p className="text-[10px] text-gray-400 truncate max-w-[120px]">{review.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={review.product?.images?.[0] || "/placeholder.jpg"} 
                          alt="product" 
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                        />
                        <span className="text-xs font-semibold text-gray-700 line-clamp-1 max-w-[150px]">
                          {review.product?.title || "Unknown Product"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 italic line-clamp-2 leading-relaxed">"{review.comment}"</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        review.approved ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {review.approved ? 'LIVE' : 'PENDING'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!review.approved && (
                          <button
                            onClick={() => approveMutation.mutate(review.id)}
                            className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition shadow-sm"
                            title="Approve Review"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => window.confirm("Are you sure to delete this review?") && deleteMutation.mutate(review.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                          title="Delete Review"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold uppercase border border-pink-200">
                      {review.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-none">{review.user?.name || "Anonymous"}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black border ${
                    review.approved ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}>
                    {review.approved ? 'LIVE' : 'PENDING'}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <img src={review.product?.images?.[0] || "/placeholder.jpg"} className="w-12 h-12 rounded-lg object-cover border" alt="" />
                  <p className="text-xs font-bold text-gray-700 line-clamp-1">{review.product?.title}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic bg-gray-50/50 p-3 rounded-lg border border-gray-50">"{review.comment}"</p>
                </div>

                <div className="flex gap-2 pt-2">
                  {!review.approved && (
                    <button
                      disabled={approveMutation.isPending}
                      onClick={() => approveMutation.mutate(review.id)}
                      className="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                      {approveMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />} 
                      Approve
                    </button>
                  )}
                  <button
                    disabled={deleteMutation.isPending}
                    onClick={() => window.confirm("Delete?") && deleteMutation.mutate(review.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-red-100 active:scale-95 transition-all"
                  >
                    {deleteMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}