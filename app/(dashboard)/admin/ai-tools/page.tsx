/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  Sparkles, 
  Ticket, 
  ShieldCheck, 
  Loader2, 
  BrainCircuit,
  ArrowRight,
  Zap,
  Bot,
  Terminal,
  Eraser
} from "lucide-react";
import axiosInstance from "@/app/utils/axiosInstance";

const AIService = {
  checkReview: async (text: string) => {
    const response = await axiosInstance.post("/ai/review", { comment: text });
    return response.data; 
  },
  askAI: async (text: string) => {
    const response = await axiosInstance.post("/ai/chat", { message: text });
    return response.data; 
  },
  getCouponIdea: async (amount: string) => {
    const response = await axiosInstance.post("/ai/coupon", { cartTotal: Number(amount) });
    return response.data; 
  }
};

export default function AIToolsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [input, setInput] = useState("");

  const handleAIAction = async (type: "review" | "chat" | "coupon") => {
    if (!input) return toast.error("Input required to activate AI!");

    setLoading(true);
    setResult(null); 
    
    try {
      let res;
      let finalData: any = {};

      if (type === "review") {
        res = await AIService.checkReview(input);
        finalData = res.data;
      } 
      else if (type === "chat") {
        res = await AIService.askAI(input);
        finalData = { output: res.reply }; 
      } 
      else if (type === "coupon") {
        if (isNaN(Number(input))) {
          toast.error("Enter a numeric cart total!");
          setLoading(false);
          return;
        }
        res = await AIService.getCouponIdea(input);
        finalData = { output: res.coupon || "No optimized coupon found." };
      }

      setResult({ ...finalData, type });
      toast.success("Intelligence report generated!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "AI Gateway timeout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 transition-all duration-500">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-gradient-to-tr from-[#6C5DD3] to-[#a294f9] rounded-[2rem] shadow-2xl shadow-purple-200 dark:shadow-none animate-pulse-slow">
            <BrainCircuit className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              Neural <span className="text-[#6C5DD3]">Lab</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Next-gen AI tools to automate your workflow.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* --- Left: Input Panel --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-sm border border-gray-50 dark:border-gray-800 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" /> Command Input
              </h2>
              <button 
                onClick={() => setInput("")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
              >
                <Eraser size={18} />
              </button>
            </div>

            <div className="relative flex-1 min-h-[300px]">
              <textarea
                className="w-full h-full p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border-2 border-transparent focus:border-[#6C5DD3]/20 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-gray-200 text-lg transition-all outline-none resize-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                placeholder={result?.type === "coupon" ? "Enter Cart Value (e.g. 5000)" : "Drop your data or questions here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Sparkles className="absolute bottom-6 right-6 text-[#6C5DD3]/30" size={30} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <button
                onClick={() => handleAIAction("review")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-purple-50 dark:bg-purple-900/10 hover:bg-[#6C5DD3] text-[#6C5DD3] hover:text-white rounded-[2rem] transition-all duration-300 border border-purple-100 dark:border-purple-900/20 disabled:opacity-50 active:scale-95"
              >
                <ShieldCheck className="group-hover:rotate-12 transition-transform" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Audit Review</span>
              </button>

              <button
                onClick={() => handleAIAction("chat")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-600 text-blue-600 hover:text-white rounded-[2rem] transition-all duration-300 border border-blue-100 dark:border-blue-900/20 disabled:opacity-50 active:scale-95"
              >
                <Bot className="group-hover:-translate-y-1 transition-transform" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Smart Reply</span>
              </button>

              <button
                onClick={() => handleAIAction("coupon")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-orange-50 dark:bg-orange-900/10 hover:bg-orange-600 text-orange-600 hover:text-white rounded-[2rem] transition-all duration-300 border border-orange-100 dark:border-orange-900/20 disabled:opacity-50 active:scale-95"
              >
                <Ticket className="group-hover:rotate-12 transition-transform" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Coupon Logic</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Right: Output Console --- */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-[#0F172A] h-full min-h-[500px] p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col border border-gray-800 group">
            
            {/* Background Decor */}
            <div className="absolute -bottom-10 -left-10 opacity-5 group-hover:opacity-10 transition-opacity">
               <Terminal size={300} className="text-white" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-10 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Console v2.0</span>
                </div>
                {result && (
                  <button onClick={() => setResult(null)} className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-full transition-all">
                    Reset
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <Loader2 className="animate-spin text-[#6C5DD3]" size={60} />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">Computing Inference...</p>
                    <p className="text-gray-600 font-mono text-[10px] mt-2 tracking-widest">Accessing Neural Network</p>
                  </div>
                </div>
              ) : result ? (
                <div className="flex-1 space-y-8 animate-in fade-in zoom-in duration-500">
                  {/* Review Detail */}
                  {result.type === "review" && (
                    <div className="space-y-6">
                      <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] ${result.approved ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {result.approved ? <ShieldCheck size={14} /> : <Zap size={14} />}
                        {result.approved ? "Review Integrity: Verified" : "Review Integrity: Compromised"}
                      </div>
                      <div className="bg-gray-800/40 p-6 rounded-[2rem] border border-gray-700/50">
                        <p className="text-xl font-medium leading-relaxed italic text-gray-200">"{result.reason}"</p>
                      </div>
                      
                      <div className="pt-6">
                        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">
                          <span>AI Confidence Score</span>
                          <span className="text-blue-400">{(result.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-[#6C5DD3] to-blue-400 h-full transition-all duration-1000 ease-out" 
                            style={{ width: `${result.confidence * 100}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat/Coupon Result */}
                  {(result.type === "chat" || result.type === "coupon") && (
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Bot size={14} />
                        {result.type === "chat" ? "AI Recommendation" : "Promo Engine Output"}
                      </div>
                      <div className="text-xl font-medium text-gray-100 leading-relaxed bg-gray-800/40 p-8 rounded-[2rem] border border-gray-700/50 shadow-inner">
                        {result.output}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-700 rounded-[2rem] flex items-center justify-center">
                    <ArrowRight className="text-gray-600" size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-gray-500 uppercase tracking-[0.4em]">System Idle</p>
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Execute a module to view analytical data</p>
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-gray-800 flex justify-between items-center text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                 <span>Sync Status: Optimized</span>
                 <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    <span>Neural-Link Active</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}