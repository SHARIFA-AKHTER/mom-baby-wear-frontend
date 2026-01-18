/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsService } from "@/app/services/settings.service";
import { useState } from "react";
import { toast } from "sonner";
import { Save, Loader2, Settings, Globe, ShieldCheck, Zap, Database, Hash } from "lucide-react";

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const [key, setKey] = useState("SITE_NAME");
  const [value, setValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: SettingsService.getAll, 
  });

  const settingsList = data?.data || [];

  const mutation = useMutation({
    mutationFn: () => SettingsService.saveSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success("Configuration updated!");
      setValue(""); 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
        <Loader2 className="animate-spin text-[#6C5DD3] mb-4" size={40} />
        <p className="font-black tracking-widest uppercase text-[10px]">Loading Core Systems...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto transition-colors duration-300">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-[#6C5DD3]/10 rounded-lg">
            <Settings className="text-[#6C5DD3]" size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
            System <span className="text-[#6C5DD3]">Settings</span>
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-12">Manage global environment variables and shop configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Update Form (Left Side) --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
               <Zap size={80} className="text-[#6C5DD3]" />
            </div>
            
            <h2 className="font-black text-gray-800 dark:text-gray-200 mb-6 uppercase tracking-tight flex items-center gap-2">
              <Database size={18} className="text-[#6C5DD3]" /> Update Engine
            </h2>

            <div className="space-y-5 relative z-10">
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Configuration Key</label>
                <select 
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 dark:text-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all font-bold text-sm appearance-none cursor-pointer"
                >
                  <option value="SITE_NAME">Site Name</option>
                  <option value="CONTACT_EMAIL">Contact Email</option>
                  <option value="FREE_SHIPPING_LIMIT">Free Shipping Limit</option>
                  <option value="CURRENCY">Currency Symbol</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">New Value</label>
                <input 
                  type="text" 
                  placeholder="Type value here..."
                  className="w-full mt-2 p-4 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 dark:text-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all font-bold text-sm placeholder:text-gray-400"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              <button 
                onClick={() => mutation.mutate()}
                disabled={!value || mutation.isPending}
                className="w-full py-4 bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-purple-200 dark:shadow-none transition-all active:scale-95 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400"
              >
                {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Deploy Change
              </button>
            </div>
          </div>
        </div>

        {/* --- Current Settings List (Right Side) --- */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-800">
            <h2 className="font-black text-gray-800 dark:text-gray-200 mb-6 uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-500" /> Live Environment
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settingsList.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                  No active configurations found
                </div>
              )}
              {settingsList.map((item: any) => (
                <div key={item.id} className="group p-5 bg-gray-50 dark:bg-gray-800/50 rounded-[1.5rem] border border-transparent dark:border-gray-800 hover:border-[#6C5DD3]/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                       <Hash size={14} className="text-[#6C5DD3]" />
                    </div>
                    <Globe size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-[#6C5DD3] transition-colors" />
                  </div>
                  <p className="text-[9px] font-black text-[#6C5DD3] uppercase tracking-widest mb-1">{item.key.replace("_", " ")}</p>
                  <p className="text-sm font-black text-gray-800 dark:text-gray-200 break-all">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
             <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">System synchronized with global CDN</p>
          </div>
        </div>
      </div>
    </div>
  );
}