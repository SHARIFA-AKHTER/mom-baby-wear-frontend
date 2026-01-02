import axiosInstance from "@/app/utils/axiosInstance";

export const SettingsService = {

  getAll: async () => {
    const response = await axiosInstance.get("/admin-settings");
    return response.data;
  },

  saveSetting: async (key: string, value: string) => {
    const response = await axiosInstance.post("/admin-settings", {
      key,
      value,
    });
    return response.data;
  },
};