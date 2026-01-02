/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("/wishlist");
      const rawData = res.data.data;
      

      if (Array.isArray(rawData)) return rawData;
      
      if (rawData && rawData.items) return rawData.items;

      return [];
    },
  });

  const addToWishlist = useMutation({
    mutationFn: async (productId: string) => {
      return await axiosInstance.post("/wishlist/add", { productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Added to wishlist!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add");
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (productId: string) => {
      return await axiosInstance.delete(`/wishlist/remove/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success("Removed from wishlist");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to remove");
    },
  });

  return { wishlistItems, isLoading, addToWishlist, removeFromWishlist };
};