import { apiClient } from "./apiClient";

export const getMemberPayments = {
  getPayment: async (page, limit) => {
    try {
      const response = await apiClient.get("/v01/member/api/payments", {
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
