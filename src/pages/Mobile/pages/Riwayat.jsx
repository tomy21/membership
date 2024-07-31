import React, { useEffect, useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { historyMembers } from "../../../api/apiUsers";

const listRiwayat = [
  {
    TypeTransaction: "topup",
    CreatedOn: "2021-12-12 12:12:12",
    Description: "Berhasil top up",
    Amount: 100000,
  },
  {
    TypeTransaction: "in",
    CreatedOn: "2024-07-03 08:12:12",
    Description: "Masuk area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
  {
    TypeTransaction: "out",
    CreatedOn: "2021-07-03 17:12:12",
    Description: "Keluar area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
  {
    TypeTransaction: "in",
    CreatedOn: "2024-07-02 08:12:12",
    Description: "Masuk area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
  {
    TypeTransaction: "out",
    CreatedOn: "2021-07-02 17:12:12",
    Description: "Keluar area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
  {
    TypeTransaction: "in",
    CreatedOn: "2024-07-01 08:12:12",
    Description: "Masuk area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
  {
    TypeTransaction: "out",
    CreatedOn: "2021-07-01 17:12:12",
    Description: "Keluar area parkir",
    LocationName: "SKY Karawaci Office Park",
  },
];

function Riwayat() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listRiwayat, setListRiwayat] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [filteredLokasi, setFilteredLokasi] = useState(listRiwayat);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");
      if (!token) {
        navigate("/");
      }
      if (token) {
        const decodedToken = jwtDecode(token);
        setIdUser(decodedToken.id);
      }
    };
    fetchToken();
  }, [navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (idUser) {
        try {
          const history = await historyMembers.getHistory(idUser);
          console.log("History Data:", history.data);
          setListRiwayat(history.data);
        } catch (error) {
          console.error("Failed to fetch history:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchHistory();
  }, [idUser]);

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  //   const term = event.target.value.toLowerCase();
  //   const filtered = listRiwayat.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(term) ||
  //       item.address.toLowerCase().includes(term)
  //   );
  //   setFilteredLokasi(filtered);
  // };

  const handleBack = () => {
    navigate(-1);
  };
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-3">History Transaksi</h1>
          </div>

          {listRiwayat.length === 0 ? (
            <div className="flex flex-col justify-center items-center w-full h-screen opacity-60">
              <img src={"/parchment.png"} className="w-24 opacity-20" alt="" />
              <p className="text-sm text-gray-500 mt-5">
                Belum ada riwayat transaksi
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-screen px-2 py-2 max-h-full bg-white overflow-y-auto">
              {listRiwayat.map((items, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center bg-slate-100 w-full py-2 rounded-lg px-3"
                >
                  <div className="flex flex-row justify-center items-center space-x-3 py-2">
                    {items.TypeTransaction === "topup" ? (
                      <MdOutlineAccountBalanceWallet
                        size={30}
                        className="text-sky-500"
                      />
                    ) : items.TypeTransaction === "in" ? (
                      <MdArrowDropUp size={30} className="text-emerald-500" />
                    ) : (
                      <MdArrowDropDown size={30} className="text-red-500" />
                    )}
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-xs font-semibold">
                        {items.Description}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold">
                        {items.TypeTransaction === "topup"
                          ? formatCurrency(items.Amount)
                          : items.LocationName}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-start w-14">
                    <h1 className="text-xs font-medium">
                      {format(new Date(items.CreatedOn), "dd MMM yy")}
                    </h1>
                    <h1 className="text-xs font-medium">
                      {format(new Date(items.CreatedOn), "HH:mm:ss")}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Riwayat;
