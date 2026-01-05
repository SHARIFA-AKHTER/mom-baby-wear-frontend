// /* eslint-disable @next/next/no-img-element */

import React from "react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Products", value: "120", icon: "📦", color: "bg-purple-100", text: "text-purple-600" },
    { label: "Total Orders", value: "45", icon: "🛒", color: "bg-cyan-100", text: "text-cyan-600" },
    { label: "Total Users", value: "78", icon: "👥", color: "bg-orange-100", text: "text-orange-600" },
    { label: "Active Coupons", value: "12", icon: "🎟️", color: "bg-red-100", text: "text-red-600" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-[24px] shadow-sm flex items-center gap-4 border border-transparent hover:border-purple-200 transition-all">
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
              <p className="text-gray-400 text-xs font-semibold uppercase">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm">
          <h2 className="font-bold text-gray-800 mb-6">Weekly Sales Analysis</h2>
          <div className="w-full h-48 flex items-end justify-around gap-2 bg-gray-50 rounded-2xl p-6">
             <div className="w-8 bg-purple-200 h-1/2 rounded-t-lg"></div>
             <div className="w-8 bg-[#6C5DD3] h-3/4 rounded-t-lg shadow-lg"></div>
             <div className="w-8 bg-purple-200 h-2/3 rounded-t-lg"></div>
             <div className="w-8 bg-[#6C5DD3] h-full rounded-t-lg shadow-lg"></div>
             <div className="w-8 bg-purple-200 h-1/3 rounded-t-lg"></div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-12 border-gray-50 rounded-full"></div>
                <div className="absolute inset-0 border-12 border-[#6C5DD3] border-t-transparent border-l-transparent rounded-full rotate-45"></div>
                <span className="text-xl font-bold text-gray-800">75%</span>
            </div>
            <p className="mt-6 font-bold text-gray-700">Customer Satisfaction</p>
            <p className="text-xs text-gray-400 mt-1">Based on recent 1k reviews</p>
        </div>
      </div>
    </div>
  );
}