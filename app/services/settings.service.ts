import axiosInstance from "@/app/utils/axiosInstance";

export const SettingsService = {

  getAll: async () => {
    const response = await axiosInstance.get("/adminSettings");
    return response.data;
  },

  saveSetting: async (key: string, value: string) => {
    const response = await axiosInstance.post("/adminSettings", {
      key,
      value,
    });
    return response.data;
  },
};