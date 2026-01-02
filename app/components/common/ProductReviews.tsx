/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "@/app/services/review.service"; 
import { toast } from "sonner";
import { format } from "date-fns";

interface ReviewProps {
  productId: string;
}

export default function ProductReviews({ productId }: ReviewProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => ReviewService.getByProductId(productId),
  });

  const reviews = data?.data || []; 

  const reviewMutation = useMutation({
    mutationFn: (newReview: { productId: string; rating: number; comment: string }) => 
      ReviewService.create(newReview),
    onSuccess: () => {
      toast.success("Review submitted! Waiting for admin approval.");
      setComment("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Please login to give a review";
      toast.error(msg);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error("Please write a comment");
    
    reviewMutation.mutate({
      productId,
      rating: Number(rating),
      comment: comment.trim(),
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-6">
      {/* Container Grid: Mobile (1 column), Tablet/Desktop (2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
        
        {/* Left Side: Review Form (2/5 columns on large screen) */}
        <div className="lg:col-span-2 sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-pink-50 rounded-lg">
              <MessageSquare className="text-pink-600" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">Share Your Thoughts</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center sm:text-left">
                How would you rate this product?
              </label>
              <div className="flex justify-center sm:justify-start gap-1 md:gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-1 transition-transform active:scale-90"
                  >
                    <Star
                      size={window?.innerWidth < 640 ? 32 : 36}
                      className={`${
                        star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience with this product..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none resize-none transition text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={reviewMutation.isPending}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md disabled:bg-gray-300 active:scale-[0.98]"
            >
              {reviewMutation.isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} />
                  Submit Review
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Reviews List (3/5 columns on large screen) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Verified Reviews ({reviews.length})
            </h3>
            {reviews.length > 0 && (
               <div className="hidden sm:block h-px flex-1 bg-gray-100 mx-4"></div>
            )}
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <Star size={32} className="text-gray-200" />
              </div>
              <p className="text-gray-500 font-medium">No approved reviews yet.</p>
              <p className="text-sm text-gray-400 mt-1">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:gap-6 overflow-y-auto max-h-150 md:max-h-200 pr-2 md:pr-4 custom-scrollbar">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-4 md:p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow duration-300 shadow-sm group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 md:h-12 md:w-12 bg-linear-to-br from-pink-50 to-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold border border-pink-200 shadow-sm">
                        {review.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-base">{review.user?.name || "Customer"}</p>
                        <div className="flex text-yellow-400 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < review.rating ? "currentColor" : "none"} 
                              className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] md:text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md self-start sm:self-auto">
                      {format(new Date(review.createdAt), "dd MMM, yyyy")}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-transparent group-hover:border-pink-50 transition-colors">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}