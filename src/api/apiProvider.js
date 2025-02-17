import { apiClient } from './apiClient';

export const ProviderPayment = {
    getProvider: async (pages, limit, search) => {
        try {
            const response = await apiClient.get('/v01/member/api/provider', {
                params: { pages, limit, search },
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getById: async (isOpen) => {
        try {
            const response = await apiClient.get(
                '/v01/member/api/listProvider/list',
                {
                    params: {
                        isOpen,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
};
