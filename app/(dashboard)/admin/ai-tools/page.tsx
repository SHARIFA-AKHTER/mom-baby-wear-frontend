
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { 
  Sparkles, 
  MessageSquare, 
  Ticket, 
  ShieldCheck, 
  Loader2, 
  BrainCircuit,
  ArrowRight
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
    if (!input) return toast.error("Please enter some value!");

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
          toast.error("Please enter a valid numeric amount!");
          setLoading(false);
          return;
        }
        res = await AIService.getCouponIdea(input);
        finalData = { output: res.coupon || "No coupon available for this amount." };
      }

      setResult({ ...finalData, type });
      toast.success("AI Analysis Complete!");
    } catch (error: any) {
      console.error("AI Error:", error);
      toast.error(error.response?.data?.message || "Error calling AI service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100">
            <BrainCircuit className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">AI Intelligence Center</h1>
            <p className="text-gray-500 font-medium">Powering your shop with automated intelligence.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* --- Left: Input Area --- */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50 space-y-6">
            <div className="relative">
              <textarea
                className="w-full h-56 p-8 bg-gray-50 rounded-[2rem] border-2 border-transparent focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 text-gray-700 text-lg transition-all outline-none resize-none placeholder:text-gray-300"
                placeholder={result?.type === "coupon" ? "Enter order amount (e.g. 3500)..." : "Ask AI or paste a review here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Sparkles className="absolute top-6 right-6 text-indigo-200" size={24} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleAIAction("review")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white rounded-[1.5rem] transition-all duration-300 border border-purple-100 disabled:opacity-50 shadow-sm"
              >
                <ShieldCheck className="group-hover:scale-110 transition-transform" size={28} />
                <span className="text-xs font-bold uppercase tracking-wider">Review Guard</span>
              </button>

              <button
                onClick={() => handleAIAction("chat")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-[1.5rem] transition-all duration-300 border border-blue-100 disabled:opacity-50 shadow-sm"
              >
                <MessageSquare className="group-hover:scale-110 transition-transform" size={28} />
                <span className="text-xs font-bold uppercase tracking-wider">Support Bot</span>
              </button>

              <button
                onClick={() => handleAIAction("coupon")}
                disabled={loading}
                className="group flex flex-col items-center gap-3 p-6 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white rounded-[1.5rem] transition-all duration-300 border border-orange-100 disabled:opacity-50 shadow-sm"
              >
                <Ticket className="group-hover:scale-110 transition-transform" size={28} />
                <span className="text-xs font-bold uppercase tracking-wider">Coupon Gen</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- Right: Output Box --- */}
        <div className="lg:col-span-5">
          <div className="bg-gray-900 h-full min-h-100 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col text-white">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <BrainCircuit size={150} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Terminal Output
                </h3>
                {result && <button onClick={() => setResult(null)} className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-tighter underline">Clear</button>}
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="animate-spin text-indigo-400" size={48} />
                  <p className="text-indigo-200 font-mono text-sm tracking-widest uppercase">Processing Request...</p>
                </div>
              ) : result ? (
                <div className="flex-1 space-y-6 animate-in slide-in-from-right-8 duration-500">
                  {/* Review Results Display */}
                  {result.type === "review" && (
                    <div className="space-y-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${result.approved ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {result.approved ? "Status: Safe" : "Status: Flagged"}
                      </div>
                      <p className="text-2xl font-bold leading-tight italic text-gray-200">"{result.reason}"</p>
                      
                      <div className="pt-6 border-t border-gray-800">
                        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
                          <span>Confidence Index</span>
                          <span>{(result.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-linear-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000" style={{ width: `${result.confidence * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Chat & Coupon Results Display */}
                  {(result.type === "chat" || result.type === "coupon") && (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        {result.type === "chat" ? "Bot Reply" : "Recommended Code"}
                      </div>
                      <div className="text-xl font-medium text-gray-200 leading-relaxed bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                        {result.output}
                      </div>
                      {result.type === "coupon" && (
                        <p className="text-xs text-gray-500 font-medium">*Apply this code at checkout to save big!</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                  <div className="p-6 border-2 border-dashed border-gray-700 rounded-full">
                    <ArrowRight className="text-gray-500" size={32} />
                  </div>
                  <p className="text-sm font-mono text-gray-500 uppercase tracking-widest leading-loose">
                    Waiting for input...<br/>Select a tool to begin.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}