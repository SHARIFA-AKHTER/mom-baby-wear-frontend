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

  // ১. রিভিউ ডাটা ফেচ করা
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
  //   e.preventDefault();
  //   if (!comment.trim()) return toast.error("Please write a comment");
  //   reviewMutation.mutate({ productId, rating, comment });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!comment.trim()) {
    return toast.error("Please write a comment");
  }


  const reviewPayload = {
    productId: productId, 
    rating: Number(rating), 
    comment: comment.trim(),
  };

  reviewMutation.mutate(reviewPayload);
};

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
      
        <div>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-pink-600" />
            <h3 className="text-2xl font-bold text-gray-800">Share Your Thoughts</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rate the product</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike?"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none resize-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={reviewMutation.isPending}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-md disabled:bg-gray-300"
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

        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Verified Reviews ({reviews.length})</h3>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50 rounded-3xl border-2 border-dashed">
              <Star size={40} className="text-gray-200 mb-2" />
              <p className="text-gray-500">No approved reviews yet.</p>
            </div>
          ) : (
            <div className="space-y-5 overflow-y-auto max-h-150 pr-4 custom-scrollbar">
              {reviews.map((review: any) => (
                <div key={review.id} className="p-5 bg-white border rounded-2xl hover:shadow-md transition shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                        {review.user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-none">{review.user?.name || "Customer"}</p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {format(new Date(review.createdAt), "dd MMM, yyyy")}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm italic bg-gray-50 p-3 rounded-lg">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}