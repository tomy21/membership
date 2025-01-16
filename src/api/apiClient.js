import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://apiintegration.skyparking.online',
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiSkyBayarind = axios.create({
    baseURL: 'https://apimembership.skyparking.online',
    withCredentials: true,
});
