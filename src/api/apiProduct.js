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
  getAll: async () => {
    try {
      const response = await apiClient.get("/v01/member/api/product");
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
  getByUserId: async (idUser) => {
    try {
      const response = await apiClient.get(
        `/v01/member/api/userProduct/byUser?userId=${idUser}`
      );
      console.log("dataDiapi", response);
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
        `/v01/member/api/userProduct/${idMember}`
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
