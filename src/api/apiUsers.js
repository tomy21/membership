import { apiClient } from "./apiClient";
import Cookies from "js-cookie";

export const apiUsers = {
  register: async (userData) => {
    try {
      const response = await apiClient.post(
        "v01/member/api/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getUserById = {
  userById: async (idUser) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/auth/user/${idUser}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const verifikasiUsers = {
  verifikasiPin: async ({ memberUserId, pinVerifikasi }) => {
    try {
      const response = await apiClient.post(`/v01/member/api/auth/verifikasi`, {
        MemberUserId: memberUserId,
        Pin: pinVerifikasi,
      });
      return response.data;
    } catch (error) {
      console.error("API error:", error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  },
};

export const loginUsers = {
  login: async (userData) => {
    try {
      const response = await apiClient.post(
        "/v01/member/api/auth/login",
        userData
      );
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
      const response = await apiClient.post("/v01/member/api/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

// History
export const historyMembers = {
  getHistory: async (idUsers) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/memberHistory/users?userId=${idUsers}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
