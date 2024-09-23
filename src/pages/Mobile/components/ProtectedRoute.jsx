import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [idUser, setIdUser] = useState(null);
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem("refreshToken"); // Atau bisa gunakan sessionStorage

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");

      if (!token || token === undefined) {
        navigate("/"); // Redirect ke login jika tidak ada token
        return;
      }

      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          // Cek apakah token sudah expired
          const currentTime = Date.now() / 1000; // Waktu sekarang dalam detik
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token sudah expired, redirect ke login
            Cookies.remove("refreshToken"); // Hapus token yang sudah expired
            navigate("/"); // Redirect ke halaman login
          } else {
            // Jika token valid, ambil ID user
            setIdUser(decodedToken.Id);
          }
        } catch (error) {
          console.error("Token decoding failed: ", error);
          navigate("/"); // Jika decoding gagal, redirect ke login
        }
      }
    };
    fetchToken();
  }, [navigate]);

  // Jika tidak ada refreshToken, redirect ke halaman login
  if (!refreshToken) {
    return navigate("/");
  }

  // Jika ada refreshToken, render komponen yang diinginkan
  return children;
};

export default ProtectedRoute;
