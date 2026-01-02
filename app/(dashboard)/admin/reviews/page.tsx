/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/app/services/review.service"; 
import { Check, Trash2, Loader2, Star, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => ReviewService.getAll(),
  });

  const reviews = data?.data || [];

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
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Review Management</h1>
        <p className="text-sm text-gray-500">Total {reviews.length} reviews found</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-2xl border border-dashed text-gray-400">
          No reviews available.
        </div>
      ) : (
        <>
          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden lg:block bg-white border rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b text-sm">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">Customer</th>
                  <th className="p-4 font-semibold text-gray-700">Product</th>
                  <th className="p-4 font-semibold text-gray-700">Feedback</th>
                  <th className="p-4 font-semibold text-gray-700">Status</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {reviews.map((review: any) => (
                  <tr key={review.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold uppercase">
                           {review.user?.name?.charAt(0) || <User size={16} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{review.user?.name || "N/A"}</p>
                          <p className="text-[10px] text-gray-400">{review.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <img 
                          src={review.product?.images?.[0] || "/placeholder.jpg"} 
                          alt="product" 
                          className="w-10 h-10 rounded-md object-cover border"
                        />
                        <span className="text-xs font-medium line-clamp-1 max-w-37.5">
                          {review.product?.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1 italic">"{review.comment}"</p>
                      <p className="text-[10px] text-gray-400 mt-1">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        review.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {review.approved ? 'LIVE' : 'PENDING'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!review.approved && (
                          <button
                            onClick={() => approveMutation.mutate(review.id)}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => window.confirm("Delete?") && deleteMutation.mutate(review.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
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

          {/* Mobile Card View (Hidden on Desktop) */}
          <div className="lg:hidden grid grid-cols-1 gap-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold uppercase">
                      {review.user?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{review.user?.name}</p>
                      <p className="text-[10px] text-gray-400">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    review.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {review.approved ? 'LIVE' : 'PENDING'}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                  <img src={review.product?.images?.[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <p className="text-xs font-semibold text-gray-700 line-clamp-1">{review.product?.title}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  {!review.approved && (
                    <button
                      onClick={() => approveMutation.mutate(review.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => window.confirm("Delete?") && deleteMutation.mutate(review.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-red-100"
                  >
                    <Trash2 size={16} /> Delete
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