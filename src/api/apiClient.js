import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://dev-valetapi.skyparking.online",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSkyBayarind = axios.create({
  baseURL: "https://dev-paymentapi.skyparking.online",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
