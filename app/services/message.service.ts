// @/app/services/message.service.ts
import axiosInstance from "@/app/utils/axiosInstance";

export const MessageService = {
  // (Admin/Staff)
  getAllMessages: async () => {
    const res = await axiosInstance.get("/contact/all-messages");
    return res.data; 
  },

  deleteMessage: async (id: string) => {
    const res = await axiosInstance.delete(`/contact/${id}`);
    return res.data;
  },

 sendMessage: async (data: { name: string; email: string; message: string }) => {

    const res = await axiosInstance.post("/contact/send-message", data);
    return res.data;
  },
};