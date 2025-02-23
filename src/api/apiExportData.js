import { apiClient } from './apiClient';

export const apiExportData = {
    historyPointUser: async (startDate, endDate, idUser) => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/export-data-points/${idUser}`,
                {
                    params: { startDate, endDate },
                    responseType: 'arraybuffer',
                }
            );
            const fileName = `History_Point_${startDate} sd ${endDate}.xlsx`;
            return {
                blob: new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }),
                fileName,
            };
        } catch (error) {
            console.log(error);
        }
    },

    historyParking: async (startDate, endDate, locationCode, statusMember) => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/export-data-post`,
                {
                    params: { startDate, endDate, locationCode, statusMember },
                    responseType: 'arraybuffer',
                }
            );
            const fileName =
                statusMember === 'NON-MEMBER'
                    ? `History_Parking_Casual_${startDate} sd ${endDate}.xlsx`
                    : `History_Parking_${startDate} sd ${endDate}.xlsx`;
            return {
                blob: new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }),
                fileName,
            };
        } catch (error) {
            console.log(error);
        }
    },

    historyTransaction: async (startDate, endDate, locationCode, type) => {
        try {
            const response = await apiClient.get(
                `/v01/cms/api/export-data-transaction`,
                {
                    params: { startDate, endDate, locationCode, type },
                    responseType: 'arraybuffer',
                }
            );
            const fileName =
                type === 'TOPUP'
                    ? `History_transaction_topup_${startDate} sd ${endDate}.xlsx`
                    : `History_membership_${startDate} sd ${endDate}.xlsx`;

            return {
                blob: new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                }),
                fileName,
            };
        } catch (error) {
            console.log(error);
        }
    },
};
