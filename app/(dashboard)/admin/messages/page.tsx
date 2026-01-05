/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageService } from "@/app/services/message.service";
import { Mail, Trash2, Calendar, MessageSquare, Loader2, Inbox } from "lucide-react";
import { toast } from "sonner"; 

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
      toast.success("Message deleted successfully");
    },
    onError: () => toast.error("Failed to delete message"),
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      {/* Header Section */}
      <div className="mx-auto max-w-6xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <div className="bg-pink-100 p-2 rounded-lg">
              <Inbox className="text-pink-600" size={24} />
            </div>
            Customer Inbox
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage all received inquiries from your website.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border text-sm font-semibold text-gray-600">
          Total: {messages.length} Messages
        </div>
      </div>

      {/* Messages List Container */}
      <div className="mx-auto max-w-6xl space-y-4">
        {messages.length > 0 ? (
          messages.map((msg: any) => (
            <div 
              key={msg.id} 
              className="group relative bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* User Info & Message */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials */}
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold shadow-inner uppercase">
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-none">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-pink-600 hover:underline flex items-center gap-1 mt-1">
                        <Mail size={12} /> {msg.email}
                      </a>
                    </div>
                  </div>

                  {/* Message Box */}
                  <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 text-sm md:text-base leading-relaxed border border-gray-50 flex gap-3">
                    <MessageSquare size={18} className="text-gray-400 shrink-0 mt-1" />
                    <p className="whitespace-pre-line">{msg.message}</p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-[12px] font-medium text-gray-400">
                    <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                      <Calendar size={13} /> 
                      {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center justify-end border-t md:border-t-0 pt-3 md:pt-0">
                  <button 
                    onClick={() => {
                      if(window.confirm("Are you sure you want to delete this message?")) {
                        deleteMutation.mutate(msg.id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
                  >
                    {deleteMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
                    <span className="md:hidden lg:inline">Delete</span>
                  </button>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Mail className="text-gray-300" size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Your inbox is empty</h2>
            <p className="text-gray-500">When customers contact you, messages will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}