import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "http://localhost:3008",
  baseURL: process.env.REACT_APP_URL_APIVALET,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSkyBayarind = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_URL_APIPAYMENT,
});
