import { apiClient, apiSkyBayarind } from "./apiClient";

export const Users = {
  login: async (identifier, password) => {
    try {
      const response = await apiClient.post("/v01/member/api/auth/login", {
        identifier,
        password,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getByUserId: async () => {
    try {
      const response = await apiClient.get(`/v01/member/api/auth/userById`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getVehicle: async (page, limit, search) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/vehicle-list/by-userid`,
        {
          params: {
            page,
            limit,
            search,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getVehicleByType: async (type, page, limit, search) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/vehicle-list/${type}`,
        {
          params: {
            page,
            limit,
            search,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const MembershipProduct = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(`/v01/member/api/product`, {
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
  getByLocationCode: async (locationCode, page, limit) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/product-byLocation/${locationCode}`,
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

export const Location = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(`/v01/member/api/location-master`, {
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

export const Provider = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(`/v01/member/api/provider`, {
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
  getAllByType: async (type, locationCode) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/provider/byType?type=${type}&locationCode=${locationCode}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const Payment = {
  submitPayment: async (id) => {
    try {
      const response = await apiSkyBayarind.post(
        `/v1/productPurchase/purchase/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
