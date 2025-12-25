import React from "react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">Total Products: 120</div>
        <div className="bg-white p-4 rounded shadow">Total Orders: 45</div>
        <div className="bg-white p-4 rounded shadow">Total Users: 78</div>
        <div className="bg-white p-4 rounded shadow">Active Coupons: 12</div>
      </div>
    </div>
  );
}