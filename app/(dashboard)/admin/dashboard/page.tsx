// /* eslint-disable @next/next/no-img-element */

// import React from "react";
// import Link from "next/link";

// export default function AdminDashboard() {
//   const stats = [
//     { label: "Total Products", value: "120", icon: "📦", color: "bg-purple-100" },
//     { label: "Total Orders", value: "45", icon: "🛒", color: "bg-cyan-100" },
//     { label: "Total Users", value: "78", icon: "👥", color: "bg-orange-100" },
//     { label: "Active Coupons", value: "12", icon: "🎟️", color: "bg-red-100" },
//   ];

//   return (
//     <div className="flex h-screen bg-[#F9F5F0]">
//       {/* --- Sidebar Section --- */}
//       <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
//         <div className="p-8 text-2xl font-bold flex items-center gap-2">
//           <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xs">H</div>
//           <span>AdminPanel</span>
//         </div>

//         <nav className="flex-1 px-6 space-y-1">
//           <div className="mb-6">
//             <button className="w-full bg-[#6C5DD3] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-opacity-90 transition">
//               Create New <span className="text-xl">+</span>
//             </button>
//           </div>

       
//           {[
//             { name: "Dashboard", icon: "📊", href: "/admin/dashboard" },
//             { name: "Products", icon: "📦", href: "/admin/products" },
//             { name: "Orders", icon: "🛒", href: "/admin/orders" },
//             { name: "Users", icon: "👥", href: "/admin/users" },
//             { name: "Coupons", icon: "🎟️", href: "/admin/coupons" },
//             { name: "Reviews", icon: "🎟️", href: "/admin/reviews" },
//             { name: "Inventory", icon: "🎟️", href: "/admin/inventory" },
//           ].map((item) => (
//             <Link
//               key={item.name}
//               href={item.href} 
//               className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-gray-400 hover:bg-[#F9F5F0] hover:text-[#6C5DD3] hover:font-bold"
//             >
//               <span>{item.icon}</span>
//               <span>{item.name}</span>
//             </Link>
//           ))}
          
//           <div className="pt-10 px-4 font-semibold text-gray-400 uppercase text-xs">Staff</div>
//           <Link href="/staff/stock" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
//             <span>📉</span> Stock
//           </Link>
          // <Link href="/staff/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
          //   <span>📋</span> Staff Orders
          // </Link>
//         </nav>

//         <div className="m-6 p-4 bg-[#F3F0FF] rounded-2xl text-center">
//           <p className="text-sm font-bold text-gray-800">Mobile App</p>
//           <p className="text-[10px] text-gray-500">Download for iOS/Android</p>
//         </div>
//       </aside>

//       {/* --- Main Dashboard Content --- */}
//       <main className="flex-1 flex flex-col overflow-hidden">
     
//         <header className="h-20 flex items-center justify-between px-10">
//           <div className="text-gray-400 bg-white px-4 py-2 rounded-lg w-64 shadow-sm text-sm border border-gray-50">
//             Search anything...
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm font-bold text-gray-800">Sharifa</p>
//               <p className="text-[10px] text-gray-400">Admin</p>
//             </div>
//             <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
//                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content Body */}
//         <div className="flex-1 overflow-auto px-10 pb-10 pt-2">
//           <h1 className="text-2xl font-bold text-gray-800 mb-8">Welcome to Admin Dashboard</h1>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {stats.map((stat, index) => (
//               <div key={index} className="bg-white p-6 rounded-[24px] shadow-sm flex items-center gap-4 border border-transparent
//                hover:border-purple-200 transition-all cursor-default">
//                 <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-xl`}>
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
//                   <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm h-72">
//               <div className="flex justify-between mb-4 font-bold text-gray-800">Sales Trends</div>
//               <div className="w-full h-40 flex items-end justify-around gap-2 bg-gray-50 rounded-xl p-4">
//                  <div className="w-6 bg-purple-200 h-1/2 rounded-t"></div>
//                  <div className="w-6 bg-[#6C5DD3] h-3/4 rounded-t"></div>
//                  <div className="w-6 bg-purple-200 h-2/3 rounded-t"></div>
//                  <div className="w-6 bg-[#6C5DD3] h-full rounded-t"></div>
//                  <div className="w-6 bg-purple-200 h-1/3 rounded-t"></div>
//               </div>
//             </div>
//             <div className="bg-white p-8 rounded-[32px] shadow-sm h-72 flex flex-col items-center justify-center">
//                 <div className="w-32 h-32 border-12 border-orange-100 border-t-[#6C5DD3] rounded-full"></div>
//                 <p className="mt-4 font-bold text-gray-700 text-sm">Customer Status</p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

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
                <div className="absolute inset-0 border-[12px] border-gray-50 rounded-full"></div>
                <div className="absolute inset-0 border-[12px] border-[#6C5DD3] border-t-transparent border-l-transparent rounded-full rotate-45"></div>
                <span className="text-xl font-bold text-gray-800">75%</span>
            </div>
            <p className="mt-6 font-bold text-gray-700">Customer Satisfaction</p>
            <p className="text-xs text-gray-400 mt-1">Based on recent 1k reviews</p>
        </div>
      </div>
    </div>
  );
}