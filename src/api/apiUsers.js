import { apiClient } from './apiClient';

export const apiUsers = {
    getUserId: async () => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/auth/user/byId`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getToken: async () => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/auth/protected`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    verifyToken: async () => {
        try {
            const response = await apiClient.get(
                '/v01/member/api/auth/protected'
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

    updateUserById: async (idUser, data) => {
        try {
            const response = await apiClient.patch(
                `/v01/member/api/auth/usersDetail/${idUser}`,
                data
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    register: async (userData) => {
        try {
            const response = await apiClient.post(
                'v01/member/api/auth/register',
                userData
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

    resetPassword: async (email) => {
        try {
            const response = await apiClient.post(
                'v01/member/api/auth/request-password-reset',
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
                'v01/member/api/auth/reset-password',
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
            console.log(response);
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
    verifikasiPin: async ({ pinVerifikasi }) => {
        try {
            const response = await apiClient.post(
                `/v01/member/api/auth/verifikasi`,
                {
                    Pin: pinVerifikasi,
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                'API error:',
                error.response ? error.response.data : error
            );
            return error.response.data;
        }
    },
};

export const loginUsers = {
    login: async (userData) => {
        try {
            const response = await apiClient.post('/v1/auth/login', userData);
            return response.data;
        } catch (error) {
            const serverError = error.response?.data || {
                message: 'Unknown error',
            };
            console.warn('Server validation error:', serverError);
            return serverError;
        }
    },
};

export const logoutUsers = {
    logout: async () => {
        try {
            const response = await apiClient.get('/v01/member/api/auth/logout');
            console.log(response);
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

    getHistoryPost: async (page, limit, search, status, statusMember) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history-post-all`,
                {
                    params: { page, limit, search, status, statusMember },
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    historyGetAllByUserid: async (idUsers, page, limit, search) => {
        try {
            const response = await apiClient.get(
                `/v01/member/api/history/get-history-user-byid/${idUsers}`,
                {
                    params: { page, limit, search },
                }
            );
            console.log(response);
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
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};
