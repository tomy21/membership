import { apiClient, apiSkyBayarind } from "./apiClient";
import { apiUsers } from "./apiUsers";

const getToken = async () => {
  try {
    const token = await apiUsers.getToken();
    return token;
  } catch (error) {
    throw error.response;
  }
};

export const apiBayarindVa = {
  createVa: async (idProduct, data) => {
    try {
      const token = await getToken();

      const response = await apiSkyBayarind.post(
        `/v1/productPurchase/purchase/${idProduct}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error.response.data);
      return error.response;
    }
  },
};

export const apiBayarindTopUp = {
  createVaTopup: async (data) => {
    try {
      const token = await getToken();

      const response = await apiSkyBayarind.post(
        "/v1/productPurchase/TOP_UP",
        data,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
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
            Authorization: `Bearer ${token.token}`,
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
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
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

export const vehicleAdd = {
  addVehicle: async (data) => {
    try {
      const token = await getToken();

      const response = await apiSkyBayarind.post(
        `/v1/productPurchase/register-vehicle`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/vehicle-list/by-id/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
