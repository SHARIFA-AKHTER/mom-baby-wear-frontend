import axiosInstance from "@/app/utils/axiosInstance";

export const AIService = {

  checkReview: async (text: string) => {
    const response = await axiosInstance.post("/ai/review", { 
        comment: text 
    });
    return response.data;
  },

  askAI: async (text: string) => {
    const response = await axiosInstance.post("/ai/chat", { 
        message: text 
    });
    return response.data;
  },


  getCouponIdea: async (amount: string) => {
    const response = await axiosInstance.post("/ai/coupon", { 
        cartTotal: Number(amount) 
    });
    return response.data;
  }
};