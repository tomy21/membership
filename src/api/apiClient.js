import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dev-paymentapi.skyparking.online", // Ganti dengan URL base API Anda
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
