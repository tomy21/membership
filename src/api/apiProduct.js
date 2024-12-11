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
  getAllByType: async (VehicleType) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/product/byType?VehicleType=${VehicleType}`
      );
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

export const getMemberById = {
  getById: async () => {
    // Check if idMember is provided

    try {
      // Make API call
      const response = await apiClient.get(
        `/v01/member/api/userProduct/byUser`
      );
      const data = response.data;

      // Check if data exists
      if (!data) {
        return { error: "Data not found for the provided ID" };
      }

      // Return data if everything is successful
      return data;
    } catch (error) {
      // Check if the error is a 404 Not Found
      if (error.response && error.response?.statusCode === 404) {
        return { error: "User product not found for the provided ID." }; // Handle 404 error
      }

      // Handle other errors
      if (error.response) {
        const apiError =
          error.response?.data?.message ||
          "An error occurred while fetching data";
        return { error: apiError };
      }

      // Handle general errors
      return { error: error.message || "An unknown error occurred" };
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
  patchMember: async (idMember, updatedData) => {
    try {
      const response = await apiClient.patch(
        `/v01/member/api/userProduct/${idMember}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  patchMemberById: async (idProduct, updatedData) => {
    try {
      const response = await apiClient.patch(
        `/v01/member/api/userProduct/updateData/byIdProduct/${idProduct}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getMemberById: async (idProduct) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/updateData/byIdProduct/${idProduct}`
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

  getById: async () => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/history-post/getById`
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

export const History = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/history/payment-detail",
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

export const Transaction = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(
        "/v01/member/api/member-master-data",
        {
          params: {
            page,
            limit,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
