/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export const useAuth = () => {

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return useQuery({
    queryKey: ["me", token], 
    queryFn: async () => {
      if (!token) return null;
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.data;
      } catch (err) {
        
        localStorage.removeItem("accessToken");
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!token, 
  });
};