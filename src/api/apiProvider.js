import { apiClient } from "./apiClient";

export const getAllProvider = {
  getProvider: async () => {
    try {
      const response = await apiClient.get("/v01/member/api/listProvider");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getProviderById = {
  getById: async (isOpen) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/listProvider/list",
        {
          params: {
            isOpen,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
