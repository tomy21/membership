import { apiSkyBayarind } from "./apiClient";
import Cookies from "js-cookie";

const getToken = () => {
  const token = Cookies.get("refreshToken");
  return token;
};

export const apiBayarindVa = {
  createVa: async (data) => {
    try {
      const totalAmount = data.amount;
      const formData = new FormData();
      formData.append("providerId", data.providerId);
      formData.append("productId", data.productId);
      formData.append("periodId", data.periodId);
      formData.append("plateNumber", data.plateNumber);
      formData.append("expiredByMinute", data.expiredByMinute);
      formData.append("amount", totalAmount);

      // Asumsikan files adalah array dari file
      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const token = getToken();

      const response = await apiSkyBayarind.post(
        "/api/v1.0/transfer-va/create-va",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  },
};

export const apiBayarindTopUp = {
  createVaTopup: async (data) => {
    try {
      const token = getToken();
      const dataSubmit = {
        providerId: data.providerId,
        expiredByMinute: data.expiredByMinute,
        amount: data.amount.toString(),
      };
      const response = await apiSkyBayarind.post(
        "/api/v1.0/transfer-va/topup",
        dataSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        throw error.response.data;
      } else if (error.request) {
        console.error("Error request:", error.request);
        throw new Error("No response received from server");
      } else {
        console.error("Error message:", error.message);
        throw new Error("Error occurred during request setup");
      }
    }
  },
};

export const apiBarindCekstatus = {
  cekStatus: async (Id) => {
    try {
      const token = getToken();

      const response = await apiSkyBayarind.get(
        `/api/v1.0/transfer-va/status/${Id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const apiBayarindExtend = {
  extend: async (userProductId, productId, periodeId, partnerId) => {
    try {
      const token = getToken();

      const response = await apiSkyBayarind.put(
        `/api/v1.0/transfer-va/extendmember?userProductId=${userProductId}&productId=${productId}&periodeId=${periodeId}&partnerId=${partnerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },
};
