import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://apiintegration.skyparking.online",
  // baseURL: "http://localhost:3008",
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSkyBayarind = axios.create({
  baseURL: "https://apimembershipservice.skyparking.online",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
