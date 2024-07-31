import { apiSkyBayarind } from "./apiClient";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const getToken = () => {
  const token = Cookies.get("refreshToken");
  return token;
};

export const apiBayarindVa = {
  createVa: async (data) => {
    try {
      const formData = new FormData();
      formData.append("providerId", data.providerId);
      formData.append("productId", data.productId);
      formData.append("plateNumber", data.platNomor);
      formData.append("expiredByMinute", data.expiredByMinute);
      formData.append("amount", data.amount);

      // Asumsikan files adalah array dari file
      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const token = getToken();
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log("apiBayarind", token);

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
      console.log("apiBayarind", response);
      return response;
    } catch (error) {
      throw error.response;
    }
  },
};
