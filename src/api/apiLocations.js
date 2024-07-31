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
  getLocation: async () => {
    try {
      const response = await apiClient.get("/api/getAllLocation");
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
