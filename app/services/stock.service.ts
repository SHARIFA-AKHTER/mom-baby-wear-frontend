import axiosInstance from "../utils/axiosInstance";

export const StockService = {
  getAllLogs: async () => {
    const response = await axiosInstance.get("/stockLog");
    return response.data?.data || response.data;
  },

  createLog: async (data: { productId: string; change: number; reason: string }) => {
    const response = await axiosInstance.post("/stockLog/create", data);
    return response.data;
  }
};