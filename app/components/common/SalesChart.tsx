/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';


const SalesChart = ({ data }: { data: any[] }) => {
  return (

    <div className="h-87.5 w-full bg-white p-6 rounded-[32px] shadow-sm border border-gray-50">
      <h3 className="mb-6 font-bold text-gray-800 flex items-center gap-2">
        Sales Overview#1f2e4e
      </h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 12}} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 12}} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#6C5DD3" 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#6C5DD3", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;