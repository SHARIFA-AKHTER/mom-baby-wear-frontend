"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useCartStore } from "../store/cart.store";
import axiosInstance from "../utils/axiosInstance";


export const useCart = () => {
  const queryClient = useQueryClient();
  const { setItems, addItem, removeItem, clearCart, items } = useCartStore();

  // Fetch cart
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosInstance.get("/cart");
      setItems(res.data.data.items || []);
      return res.data.data;
    },
    staleTime: 1000 * 60,
  });

  // Add item
  const addMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const res = await axiosInstance.post("/cart/add", { productId, quantity });
      return res.data.data;
    },
    onSuccess: (data) => {
      setItems(data.items || []);
      queryClient.invalidateQueries(["useCart"]);
    },
  });

  // Remove item
  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await axiosInstance.post("/cart/remove", { productId });
      return res.data.data;
    },
    onSuccess: (data) => {
      setItems(data.items || []);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  // Clear cart
  const clearMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/cart/clear");
      return res.data.data;
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return {
    items,
    cartQuery,
    addMutation,
    removeMutation,
    clearMutation,
    addItem,
    removeItem,
    clearCart,
  };
};
