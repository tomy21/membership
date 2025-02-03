import { apiClient, apiSkyBayarind } from './apiClient';
import { apiUsers } from './apiUsers';

const getToken = async () => {
    try {
        const token = await apiUsers.getToken();
        return token;
    } catch (error) {
        throw error.response;
    }
};

export const Users = {
    login: async (identifier, password) => {
        try {
            const response = await apiClient.post(
                '/v01/member/api/auth/login',
                {
                    identifier,
                    password,
                }
            );

            return response.data;
        } catch (error) {
            const serverError = error.response?.data || {
                message: 'Unknown error',
            };
            console.warn('Server validation error:', serverError);
            return serverError;
        }
    },

    getAllUser: async (page, limit, search) => {
        try {
            const response = await apiClient.get(`/v01/member/api/auth/user`, {
                params: {
                    page,
                    limit,
                    search,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    requestTokenAktivasion: async (email, referralUrl) => {
        try {
            const response = await apiClient.post(
                `/v01/member/api/auth/request-email-verification`,
                {
                    email,
                    referralUrl,
                }
            );
            return response.data;
        } catch (error) {
            const serverError = error.response?.data || {
                message: 'Unknown error',
            };
            console.warn('Server validation error:', serverError);
            return serverError;
        }
    },

    getByUserId: async () => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/auth/userById`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getByUserIdCMS: async () => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/auth/cms-userById`
            );
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
    getVehicleUnActiveLocation: async (
        type,
        locationCode,
        page,
        limit,
        search
    ) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/vehicle-list/by-userid/vehicle-unactive`,
                {
                    params: {
                        page,
                        limit,
                        search,
                        locationCode,
                        type,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getCardLocation: async () => {
        try {
            const token = await getToken();
            const response = await apiSkyBayarind.get(
                `/v1/customer/members-vehicle`,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
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
    getByLocationCode: async (locationCode, type, page, limit) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/product-byLocation/${locationCode}/${type}`,
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
    getVehicleType: async (codeLocation, page, limit) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/product-byLocation/${codeLocation}`,
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

    getPeriode: async (vehicleType, locationCode, page, limit) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/product-byVehicle/${vehicleType}/${locationCode}`,
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
    getProduct: async (periode, locationCode, type, page, limit) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/product-periode`,
                {
                    params: {
                        periode,
                        locationCode,
                        type,
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
            const response = await apiClient.get(
                `/v01/member/api/location-master/getAll`,
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

    getAllTransactionByUser: async (page, limit, search) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history/transaction-byuser`,
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
            console.log(error);
        }
    },
    getAllHistoryVa: async (VA) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history/transaction-virtualaccount/${VA}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getAllTransaction: async (page, limit, status, search) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history/transaction`,
                {
                    params: {
                        page,
                        limit,
                        status,
                        search,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getAllPayment: async (page, limit, status, search) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history/payments`,
                {
                    params: {
                        page,
                        limit,
                        status,
                        search,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export const LokasiMembership = {
    getLocationMember: async (page, limit, search) => {
        try {
            const response = await apiClient.get(
                '/v01/member/api/location-master/getAll',
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

export const historyParking = {
    getHistoryByUserId: async (page, limit, search) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history-post`,
                {
                    params: { page, limit, search },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const userCMS = {
    login: async (identifier, password) => {
        try {
            const response = await apiClient.post(
                '/v01/cms/api/auth/login-cms',
                {
                    identifier,
                    password,
                }
            );

            return response.data;
        } catch (error) {
            const serverError = error.response?.data || {
                message: 'Unknown error',
            };
            console.warn('Server validation error:', serverError);
            return serverError;
        }
    },

    getByIdUsers: async () => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/auth/cms-userById`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getAllusers: async (page, limit, search) => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/auth/all-data-users`,
                {
                    params: { page, limit, search },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    addNewUsers: async (formData) => {
        try {
            const response = await apiClient.post(
                `/v01/cms/api/auth/register-cms`,
                formData
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    deleteUsers: async (id) => {
        try {
            const response = await apiClient.delete(
                `/v01/cms/api/auth/delete-user/${id}`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getRolesAll: async () => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/auth/getAll-role`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getPermissionsById: async (id) => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/auth/menu-role-permission/${id}`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getMenu: async () => {
        try {
            const response = await apiClient.get(`/v01/cms/api/auth/menu-all`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    logoutCMS: async () => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/auth/logout-cms`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};
