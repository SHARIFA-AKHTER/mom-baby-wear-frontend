/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Calendar, Loader2, UserCheck, Download, Search } from "lucide-react";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_URL}/newsletter/subscribers`).then((res) => res.json());
        setSubscribers(res.data || []);
      } catch (err) {
        console.error("Failed to load subscribers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-gray-950 p-4 md:p-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#6C5DD3] font-black text-xs uppercase tracking-[0.3em]">
              <UserCheck size={14} />
              Audience Growth
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Newsletter <span className="text-[#6C5DD3]">Subscribers</span>
            </h1>
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-sm text-gray-600 dark:text-gray-300">
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-[#6C5DD3] text-white rounded-[2rem] p-6 relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-indigo-100 font-bold uppercase tracking-widest text-[10px] mb-1">Total Audience</p>
                <h3 className="text-4xl font-black tracking-tighter">{subscribers.length}</h3>
             </div>
             <Mail className="absolute right-6 bottom-6 opacity-20" size={60} />
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="border-none shadow-xl shadow-indigo-100/50 dark:shadow-none bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="border-b border-gray-50 dark:border-gray-800 p-8 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
              <Mail className="text-[#6C5DD3]" size={24} />
              Subscriber List
            </CardTitle>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search emails..." 
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#6C5DD3] transition-all"
              />
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#6C5DD3]">
                <Loader2 className="animate-spin mb-2" size={40} />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fetching Database...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader className="bg-gray-50/50 dark:bg-gray-800/50">
                      <TableRow className="border-b border-gray-100 dark:border-gray-800">
                        <TableHead className="font-black uppercase tracking-tighter p-6">Index</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter">Subscriber Email</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter">Joined Date</TableHead>
                        <TableHead className="font-black uppercase tracking-tighter text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((sub, index) => (
                        <TableRow key={sub.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors border-b border-gray-50 dark:border-gray-800">
                          <TableCell className="p-6 font-bold text-gray-400">
                            {String(index + 1).padStart(2, '0')}
                          </TableCell>
                          <TableCell className="font-bold text-gray-800 dark:text-gray-200">
                            {sub.email}
                          </TableCell>
                          <TableCell className="text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-[#6C5DD3]" />
                              {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                                day: "numeric", month: "short", year: "numeric",
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="text-right p-6">
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                              Active
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View (Better for small screens) */}
                <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
                  {subscribers.map((sub, index) => (
                    <div key={sub.id} className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-[#6C5DD3] uppercase">#{index + 1}</span>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
                      </div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 break-all">{sub.email}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-tighter">
                        <Calendar size={12} />
                        {new Date(sub.createdAt).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                  ))}
                </div>

                {subscribers.length === 0 && (
                  <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-950/50">
                    <Mail className="mx-auto text-gray-200 dark:text-gray-800 mb-4" size={60} />
                    <h4 className="text-xl font-black text-gray-400 uppercase tracking-tighter">Your list is empty</h4>
                    <p className="text-gray-400 text-sm">No one has subscribed to your newsletter yet.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}