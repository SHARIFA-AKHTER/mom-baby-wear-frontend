"use client";
import React from "react";
import { LucideIcon } from "lucide-react"; 

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon; 
  color: string;
}

const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-transparent hover:border-purple-100 transition-all flex items-center justify-between group">
      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
      </div>
      
      {/* Icon Wrapper */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 ${color}`}>
      
        <Icon size={28} />
      </div>
    </div>
  );
};

export default StatsCard;