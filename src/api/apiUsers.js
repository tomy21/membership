import apiClient from "./apiClient";

export const apiUsers = {
  register: async (userData) => {
    try {
      const response = await apiClient.post("/v1.0/account/register", userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const loginUsers = {
  login: async (userData) => {
    try {
      const response = await apiClient.post("/v1.0/account/login", userData);
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const logoutUsers = {
  logout: async () => {
    try {
      const response = await apiClient.post("/v1.0/account/logout");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
