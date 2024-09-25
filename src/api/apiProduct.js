import { apiClient } from "./apiClient";

export const storeProduct = {
  createProduct: async (formProduct) => {
    try {
      const response = await apiClient.post(
        "/v01/member/api/product",
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getProductAll = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get("/v01/member/api/product", {
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

export const getProductById = {
  getById: async (idProduct) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/product/${idProduct}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getProductByLocation = {
  getByCode: async (code) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/product/byLocation?LocationCode=${code}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const updateProduct = {
  updateProduct: async (idProduct, bodyProduct) => {
    try {
      const response = await apiClient.patch(
        `/v01/member/api/product/${idProduct}`,
        bodyProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

// Users Member Product
export const storeProductUser = {
  createProduct: async (formProduct) => {
    try {
      const response = await apiClient.post(
        "/v01/member/api/userProduct",
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const getAllUserMembers = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/v01/member/api/userProduct");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const getMemberByUserId = {
  getByUserId: async (idUser, page, limit) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/byUser?userId=${idUser}`,
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
export const getMemberById = {
  getById: async (idMember) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/byUser?userId=${idMember}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const verifikasiPlate = {
  verifikasi: async (platNo) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/verifikasi?platNo=${platNo}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const storeProductMember = {
  storeMember: async (formProduct) => {
    try {
      const response = await apiClient.post(
        `/v01/member/api/userProduct`,
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const updateProductUsers = {
  patchMember: async (idMember, formProduct) => {
    try {
      const response = await apiClient.patch(
        `/v01/member/api/userProduct/${idMember}`,
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const deleteProductMember = {
  patchMember: async (idMember, formProduct) => {
    try {
      const response = await apiClient.delete(
        `/v01/member/api/userProduct/${idMember}`,
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getProductBundleAll = {
  getAll: async () => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/memberProductBundles"
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const getBundleByType = {
  getByType: async (typeVehicle) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/products/type/${typeVehicle}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const getBundleById = {
  getById: async (idProduct) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/memberProductBundles/${idProduct}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const getQuota = {
  getById: async (idProduct) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/quota/${idProduct}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const productBundleAll = {
  storeProduct: async (formProduct) => {
    try {
      const response = await apiClient.post(
        "/v01/member/api/memberProductBundles",
        formProduct
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/memberProductBundles",
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

  getById: async (id) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/memberProductBundles/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getByIdProduct: async (idProduct) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/product/getByProductId/${idProduct}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProductQuote: async (id) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/quota-memberBundle/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateProduct: async (id, formData) => {
    try {
      const response = await apiClient.put(
        `/v01/member/api/memberProductBundles/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  deleteProduct: async (id, DeletedBy) => {
    try {
      const response = await apiClient.put(
        `/v01/member/api/memberProductBundles/delete/${id}`,
        { DeletedBy }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const HistoryPost = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get("/v01/member/api/history-post", {
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

  getById: async (id) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/history-post/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getByCard: async (Card) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/history-post/${Card}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
