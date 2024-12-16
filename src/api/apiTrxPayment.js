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

export const getIdTrx = {
  getIdStatus: async (trxId) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/history/payments-detail?trxId=${trxId}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const viewTransaction = {
  getTransaction: async (cardNo, page, limit) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/member-master-data",
        {
          params: {
            cardNo,
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
