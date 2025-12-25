
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";


export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data.data;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
