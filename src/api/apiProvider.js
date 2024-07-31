import { apiClient } from "./apiClient";

export const getAllProvider = {
  getProvider: async () => {
    try {
      const response = await apiClient.get("/v01/member/api/listProvider");
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
