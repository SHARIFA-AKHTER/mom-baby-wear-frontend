"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Loader2, TrendingUp } from "lucide-react";

export function SalesChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["dashboard-monthly-sales"],
    queryFn: async () => {

      const res = await axiosInstance.get("/dashboard/monthly-sales");
      return res.data?.data || []; 
    },
  });

  if (isLoading) {
    return (
      <div className="h-87.5 w-full flex items-center justify-center bg-white dark:bg-gray-900 rounded-[2rem]">
        <Loader2 className="animate-spin text-[#6C5DD3]" size={40} />
      </div>
    );
  }

  return (
    <div className="h-100 w-full bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tighter dark:text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-[#6C5DD3]" />
            Revenue Analytics
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Monthly Performance
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6C5DD3" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6C5DD3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-gray-800" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{ 
                borderRadius: '20px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#6C5DD3' }}
          />
          <Area
            type="monotone"
            dataKey="revenue" 
            stroke="#6C5DD3"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}