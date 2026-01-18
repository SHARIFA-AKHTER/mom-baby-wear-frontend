/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { UserService } from "@/app/services/user.service";
import { Trash2, Shield, Loader2, Users, Search, Mail, User as UserIcon } from "lucide-react";

interface User {
  id: string;
  email: string;
  name?: string;
  role: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
}

export default function AdminUsers() {
  const [usersData, setUsersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    UserService.getAll()
      .then((res: any) => {
        setUsersData(res.data?.data || res.data || res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const userList: User[] = Array.isArray(usersData) 
    ? usersData 
    : usersData?.result || [];

  const filteredUsers = userList.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await UserService.delete(id);
      const filteredList = userList.filter((u) => u.id !== id);
      setUsersData(Array.isArray(usersData) ? filteredList : { ...usersData, result: filteredList });
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="animate-spin mb-4 text-[#6C5DD3]" size={40} />
        <p className="font-black tracking-widest uppercase text-xs">Accessing Database...</p>
      </div>
    );
  }

  return (
    <div className="transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
            User <span className="text-[#6C5DD3]">Access</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage system permissions and accounts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-gray-200 w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-[#6C5DD3]/10 text-[#6C5DD3] dark:bg-[#6C5DD3]/20 px-4 py-2.5 rounded-xl text-xs font-black border border-[#6C5DD3]/20 uppercase tracking-widest">
             Active: {userList.length}
          </div>
        </div>
      </div>

      {/* Desktop View Table */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <th className="p-6">User Profile</th>
              <th className="p-6">Access Level</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/5 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#6C5DD3] to-[#8E84E5] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-100 dark:shadow-none transition-transform group-hover:rotate-6">
                      {user.name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black text-gray-800 dark:text-gray-200 leading-none">{user.name || "Anonymous"}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-medium">
                        <Mail size={12} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                   <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-xs uppercase tracking-tighter border dark:border-gray-700">
                     <Shield size={14} className="text-[#6C5DD3]" />
                     {user.role}
                   </span>
                </td>
                <td className="p-6">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    user.status === 'ACTIVE' 
                    ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                    : 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-3 text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all active:scale-90"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid View */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-50 dark:border-gray-800 shadow-sm group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#6C5DD3] text-white flex items-center justify-center font-black text-xl">
                  {user.name?.[0] || user.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-gray-800 dark:text-white leading-tight">{user.name || "N/A"}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Role: {user.role}</p>
                </div>
              </div>
              <span className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${
                user.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                {user.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
              <div className="flex items-center gap-2 text-gray-400 text-xs truncate max-w-37.5">
                <Mail size={14} />
                <span className="truncate">{user.email}</span>
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="flex items-center gap-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-xl text-xs font-black uppercase transition-all"
              >
                <Trash2 size={16} /> REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800 transition-all">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-gray-300 dark:text-gray-600" size={40} />
          </div>
          <h3 className="text-gray-800 dark:text-gray-200 font-bold text-lg">No matches found</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm">We couldn't find any users matching your criteria.</p>
        </div>
      )}
    </div>
  );
}