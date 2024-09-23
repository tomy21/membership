import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import CardListMember from "../components/CardListMember";
import Cookies from "js-cookie";

export default function DetailLokasiMember() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");
      if (!token || token === undefined) {
        navigate("/");
      }
    };
    fetchToken();
  }, [navigate]);

  return (
    <>
      <div className="w-full bg-amber-400 px-2 py-3 flex flex-row justify-start items-center space-x-28">
        <FaArrowLeftLong onClick={handleBack} />
        <h1>Detail Members</h1>
      </div>

      <div className="min-h-screen w-full p-3">
        <CardListMember dataList={location.state.selectedProduct} />
      </div>
    </>
  );
}
