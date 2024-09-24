import { apiClient } from "./apiClient";
import Cookies from "js-cookie";

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("refreshToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiLocations = {
  getLocation: async (page, limit) => {
    try {
      const response = await apiClient.get("/api/getByLocationAll", {
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
  getLocationActive: async (page, limit) => {
    try {
      const response = await apiClient.get("/api/getByLocationMembers", {
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
export const apiGetProduct = {
  getProduct: async (locId) => {
    try {
      const response = await apiClient.get(
        `/v1.0/dropdown/allproducts/${locId}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
