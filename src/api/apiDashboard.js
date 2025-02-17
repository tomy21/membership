import { apiClient } from './apiClient';

export const apiDashboard = {
    lineChart: async (range) => {
        try {
            const response = await apiClient.get(
                '/v01/cms/api/memberships/statistics',
                {
                    params: {
                        range,
                    },
                }
            );
            console.log(response.data);
            return response;
        } catch (error) {
            return error.response.data;
        }
    },

    valueDashboard: async () => {
        try {
            const response = await apiClient.get(
                '/v01/cms/api/memberships/dashboard-value'
            );

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },
};
