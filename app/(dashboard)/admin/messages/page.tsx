/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageService } from "@/app/services/message.service";
import {
  Mail,
  Trash2,
  MessageSquare,
  Loader2,
  Inbox,
  Sparkles,
  Clock
} from "lucide-react";
import { toast } from "sonner"; 
import { format } from "date-fns";

export default function AdminMessagesPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: MessageService.getAllMessages,
  });

  const messages = data?.data || [];

  const deleteMutation = useMutation({
    mutationFn: MessageService.deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success("Inquiry removed from inbox");
    },
    onError: () => toast.error("System failed to delete message"),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="h-10 w-10 animate-spin text-[#6C5DD3] mb-4" />
        <p className="font-black tracking-widest uppercase text-[10px]">Syncing Mailbox...</p>
      </div>
    );
  }

  return (
    <div className="transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#6C5DD3]/10 p-2 rounded-xl">
              <Inbox className="text-[#6C5DD3]" size={28} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              Customer <span className="text-[#6C5DD3]">Inbox</span>
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-12">
            Communicate and manage direct inquiries from your clients.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl shadow-xl shadow-purple-200 dark:shadow-none border border-gray-50 dark:border-gray-800 flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest">
             Live: {messages.length} Threads
           </span>
        </div>
      </div>

      {/* Messages List Container */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              className="group bg-white dark:bg-gray-900 border border-gray-50 dark:border-gray-800 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Side: Sender Profile */}
                <div className="lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:border-r border-gray-50 dark:border-gray-800 pr-4">
                  <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-[#6C5DD3] to-[#a294f9] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-200 dark:shadow-none uppercase">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-gray-800 dark:text-gray-100 text-lg leading-tight uppercase tracking-tight truncate">
                      {msg.name}
                    </h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-[11px] font-bold text-[#6C5DD3] hover:underline flex items-center gap-1.5 transition-all"
                    >
                      <Mail size={12} /> {msg.email}
                    </a>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">
                       <Clock size={12} />
                       {format(new Date(msg.createdAt), "dd MMM, yyyy")}
                    </div>
                  </div>
                </div>

                {/* Right Side: Message Content */}
                <div className="flex-1 space-y-6">
                  {/* Original Inquiry */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare size={14} className="text-gray-300" />
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Inquiry</span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed border border-transparent dark:border-gray-800">
                      <p className="whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>

                  {/* AI Auto Reply */}
                  {msg.autoReply && (
                    <div className="bg-[#6C5DD3]/5 dark:bg-[#6C5DD3]/10 rounded-3xl p-6 border border-[#6C5DD3]/10 relative group/ai">
                      <div className="absolute -top-3 left-6 bg-[#6C5DD3] text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Sparkles size={10} className="animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest">AI Response Sent</span>
                      </div>
                      <p className="text-sm text-[#6C5DD3] dark:text-[#a294f9] italic font-medium leading-relaxed">
                        "{msg.autoReply}"
                      </p>
                    </div>
                  )}

                  {/* Desktop Action (Delete) */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => {
                        if (window.confirm("Permanently archive and delete this message?")) {
                          deleteMutation.mutate(msg.id);
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-2 px-6 py-2.5 text-gray-400 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                      {deleteMutation.isPending ? (
                        <Loader2 className="animate-spin" size={14} />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete Thread
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-32 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
            <div className="bg-gray-50 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Mail className="text-gray-200 dark:text-gray-600" size={48} />
            </div>
            <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
              Inbox <span className="text-[#6C5DD3]">Zen</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2 max-w-xs mx-auto font-medium">
              Everything is handled. Your customer inbox is completely clear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}