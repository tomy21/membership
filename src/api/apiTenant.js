import { apiClient } from "./apiClient";

export const Tenants = {
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

  createOrder: async (formData) => {
    try {
      const response = await apiClient.post(
        "/v01/member/api/transactionTenants",
        formData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getAllTransactionTenants = {};
