import { apiClient } from "./apiClient";

export const apiUsers = {
  getUserId: async (id) => {
    try {
      const response = await apiClient.get(`/v01/member/api/auth/user/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

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

  resetPassword: async (email) => {
    try {
      const response = await apiClient.post(
        "v01/member/api/auth/request-password-reset",
        {
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  newPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post(
        "v01/member/api/auth/reset-password",
        {
          token: token,
          newPassword: newPassword,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getUserProductById = {
  userById: async (idUser) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/byUser`,
        { params: { userId: idUser } }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateUserProductById: async (idUser, data) => {
    try {
      const response = await apiClient.patch(
        `/v01/member/api/userProduct/${idUser}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateUserDetail: async (idUser, userDetails) => {
    try {
      const response = await apiClient.put(
        `/v01/member/api/auth/usersDetail/${idUser}`,
        userDetails
      );
      return response.data;
    } catch (error) {
      throw error.response.data || error.message;
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
  getHistory: async (idUsers, page, limit) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/memberHistory/users`,
        {
          params: { userId: idUsers, page, limit },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

// get All UsersMember
export const getAllMembers = {
  getData: async (page, limit) => {
    try {
      const response = await apiClient.get(`/v01/member/api/auth/user`, {
        params: {
          page,
          limit,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
