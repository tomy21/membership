import axios from 'axios';

export const apiClient = axios.create({
    // baseURL: 'http://localhost:3008',
    baseURL: 'https://apiintegration.skyparking.online',
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiSkyBayarind = axios.create({
    baseURL: 'https://dev-paymentapi.skyparking.online',
    // baseURL: 'https://apimembership.skyparking.online',
    withCredentials: true,
});
