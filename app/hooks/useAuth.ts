/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const token = isClient ? Cookies.get("accessToken") : null;

  return useQuery({
    queryKey: ["me", token],
    queryFn: async () => {
      if (!token) return null;
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data.data;
      } catch (err) {
        return null;
      }
    },
    enabled: isClient && !!token,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};