import { apiClient } from "./apiClient";

export const getAllTenants = {
  getTenant: async (page, limit) => {
    try {
      const response = await apiClient.get("v01/member/api/tenant", {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getAllTransactionTenants = {
  getTransaction: async (page, limit) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/transactionTenants",
        {
          params: {
            page,
            limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
