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

export const pointPayment = {
    pointPayment: async (idProduct, data) => {
        try {
            const token = await getToken();
            const response = await apiSkyBayarind.post(
                `/v1/productPurchase/purchasePoints/${idProduct}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error.response;
        }
    },

    extendsPoint: async (productId, plateNumber, bankId) => {
        try {
            const token = await getToken();
            const response = await apiSkyBayarind.post(
                `/v1/productPurchase/extend-membership-point/${productId}`,
                {
                    plate_number: plateNumber,
                    bank_id: bankId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error.response;
        }
    },
};

export const apiBayarindVa = {
    createVa: async (idProduct, data) => {
        try {
            const token = await getToken();

            const response = await apiSkyBayarind.post(
                `/v1/productPurchase/purchase/${idProduct}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error.response;
        }
    },
};

export const apiBayarindTopUp = {
    createVaTopup: async (data) => {
        try {
            const token = await getToken();

            const response = await apiSkyBayarind.post(
                '/v1/productPurchase/TOP_UP',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
                return error.response.data;
            } else if (error.request) {
                console.error('Error request:', error.request);
                return new Error('No response received from server');
            } else {
                console.error('Error message:', error.message);
                return new Error('Error occurred during request setup');
            }
        }
    },
};

export const apiBarindCekstatus = {
    cekStatus: async (Id) => {
        try {
            const token = getToken();

            const response = await apiSkyBayarind.get(
                `/api/v1.0/transfer-va/status/${Id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const apiBayarindExtend = {
    extend: async (productId, plateNumber, bankId) => {
        try {
            const token = await apiUsers.getToken();
            // console.log(token);
            const response = await apiSkyBayarind.post(
                `/v1/productPurchase/extend-membership/${productId}`,
                {
                    plate_number: plateNumber,
                    bank_id: bankId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.response.data);
            return error.response;
        }
    },
};

export const vehicleAdd = {
    addVehicle: async (data) => {
        try {
            const token = await getToken();

            const response = await apiSkyBayarind.post(
                `/v1/productPurchase/register-vehicle`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'multipart/form-data',
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
                `/v01/member/api/vehicle-list/by-id/${id}`
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    udpatedRFID: async (plate_number, rfid) => {
        try {
            const token = await getToken();
            const response = await apiSkyBayarind.post(
                `/v1/customer/update-rfid`,
                {
                    plate_number: plate_number,
                    RFID_Number: rfid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },

    getDetailVehicle: async (id) => {
        const token = await getToken();
        try {
            const response = await apiSkyBayarind.get(
                `/v1/customer/members-vehicle/${id}`,
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

export const Product = {
    addProduct: async (data) => {
        try {
            // const token = await getToken();

            const response = await apiSkyBayarind.post(
                `/v1/product/membership-product`,
                data
            );
            console.log(response.status);
            return response;
        } catch (error) {
            throw error.response.data;
        }
    },
};

export const Card = {
    getAllCard: async (page, limit, search) => {
        try {
            const response = await apiSkyBayarind.get(
                '/v1/card/get-master-card',
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

    createNewCard: async (data) => {
        try {
            const response = await apiSkyBayarind.post(
                '/v1/card/create-master-card',
                {
                    no_card: data,
                }
            );
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },
};
