/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SettingsService } from "@/app/services/settings.service";
import { useState } from "react";
import { toast } from "sonner";
import { Save, Loader2, Settings, Globe, ShieldCheck } from "lucide-react";

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
      toast.success("Setting updated successfully!");
      setValue(""); 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update setting");
    },
  });

  if (isLoading) return <Loader2 className="animate-spin mx-auto mt-20 text-purple-600" />;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="text-purple-600" /> Admin Settings
        </h1>
        <p className="text-sm text-gray-500">Configure your website global variables here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Update Form --- */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-700 mb-4">Add or Update Setting</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Setting Key</label>
              <select 
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-purple-400"
              >
                <option value="SITE_NAME">Site Name</option>
                <option value="CONTACT_EMAIL">Contact Email</option>
                <option value="FREE_SHIPPING_LIMIT">Free Shipping Limit</option>
                <option value="CURRENCY">Currency Symbol</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Value</label>
              <input 
                type="text" 
                placeholder="Enter value..."
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-purple-400"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <button 
              onClick={() => mutation.mutate()}
              disabled={!value || mutation.isPending}
              className="w-full py-3 bg-[#6C5DD3] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 disabled:bg-gray-300"
            >
              {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Configuration
            </button>
          </div>
        </div>

        {/* --- Current Settings List --- */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-500" /> Active Configs
          </h2>
          <div className="space-y-3">
            {settingsList.length === 0 && <p className="text-gray-400 text-sm">No settings found.</p>}
            {settingsList.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-purple-500 uppercase">{item.key.replace("_", " ")}</p>
                  <p className="text-sm font-bold text-gray-700">{item.value}</p>
                </div>
                <Globe size={16} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}