

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { AIService } from "@/app/services/ai.service";
import { toast } from "sonner";
import { Sparkles, MessageSquare, Ticket, ShieldCheck, Loader2 } from "lucide-react";

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
      if (type === "review") {
        res = await AIService.checkReview(input);
      } else if (type === "chat") {
        res = await AIService.askAI(input);
      } else if (type === "coupon") {
        if (isNaN(Number(input))) {
          toast.error("Please enter a valid numeric amount for coupon suggestion!");
          setLoading(false);
          return;
        }
        res = await AIService.getCouponIdea(input);
      }

      // ডাটা পার্সিং লজিক: 
      // ব্যাকএন্ড যদি { success: true, data: { ... } } পাঠায় তবে res.data.data নিতে হবে
      const aiResponseData = res.data?.data || res.data;

      if (typeof aiResponseData === "object") {
        setResult({ ...aiResponseData, type });
      } else {
        // যদি সরাসরি স্ট্রিং আসে (যেমন চ্যাটের ক্ষেত্রে হতে পারে)
        setResult({ output: aiResponseData, type });
      }

      toast.success("AI Analysis Complete!");
    } catch (error: any) {
      console.error("AI Error:", error);
      toast.error(error.response?.data?.message || "Error calling AI service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">AI Intelligence Center</h1>
          <p className="text-sm text-gray-500">Analyze reviews, generate coupons, and chat with AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- Input Section --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
            <textarea
              className="w-full h-40 p-6 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-700 font-medium placeholder:text-gray-300 resize-none transition-all"
              placeholder="Enter text or number (for coupon) here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-4 mt-6">
              <button
                onClick={() => handleAIAction("review")}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl transition-all border border-purple-100 disabled:opacity-50"
              >
                <ShieldCheck size={20} /> <span className="text-[10px] font-bold uppercase tracking-tighter">Check Review</span>
              </button>
              <button
                onClick={() => handleAIAction("chat")}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl transition-all border border-blue-100 disabled:opacity-50"
              >
                <MessageSquare size={20} /> <span className="text-[10px] font-bold uppercase tracking-tighter">AI Chat</span>
              </button>
              <button
                onClick={() => handleAIAction("coupon")}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-2xl transition-all border border-orange-100 disabled:opacity-50"
              >
                <Ticket size={20} /> <span className="text-[10px] font-bold uppercase tracking-tighter">Coupon Idea</span>
              </button>
            </div>
          </div>
        </div>

        {/* --- AI Output Section --- */}
        <div className="lg:col-span-5">
          <div className="bg-white h-full min-h-[300px] p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
               Output Box
            </h2>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin mb-4 text-purple-600" size={40} />
                <p className="text-sm font-medium animate-pulse">AI is processing...</p>
              </div>
            ) : result ? (
              <div className="flex-1 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* রিভিউ আউটপুট */}
                {result.type === "review" && (
                  <div className={`p-6 rounded-2xl border-2 ${result.approved ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <p className={`text-xl font-black ${result.approved ? 'text-green-600' : 'text-red-600'}`}>
                      {result.approved ? "Approved ✅" : "Rejected ❌"}
                    </p>
                    <p className="mt-3 text-sm text-gray-700 font-semibold leading-relaxed">
                      "{result.reason || "Processed by AI engine."}"
                    </p>
                    {result.confidence && (
                      <div className="mt-5 pt-4 border-t border-gray-200/50">
                        <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                          <span>Confidence Score</span>
                          <span>{(result.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                           <div className="bg-purple-500 h-full transition-all duration-1000" style={{ width: `${result.confidence * 100}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* চ্যাট ও কুপন আউটপুট */}
                {(result.type === "chat" || result.type === "coupon") && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-inner">
                    <p className="text-[10px] font-black uppercase text-purple-500 mb-3 tracking-widest">AI Result</p>
                    <div className="text-sm text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                      {/* সব ধরণের ফিল্ড চেক করা হচ্ছে */}
                      {result.output || result.message || result.reason || (typeof result === 'string' ? result : JSON.stringify(result, null, 2))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <p className="text-sm text-gray-400">Response will appear here after analysis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}