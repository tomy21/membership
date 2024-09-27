import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function Voucher() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLokasi, setFilteredLokasi] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // const term = event.target.value.toLowerCase();
    // const filtered = lokasi.filter(
    //   (item) =>
    //     item.name.toLowerCase().includes(term) ||
    //     item.address.toLowerCase().includes(term)
    // );
    // setFilteredLokasi(filtered);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
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
            <h1 className="text-lg font-semibold px-8">Voucher</h1>
          </div>

          {/* <div className="w-full px-2 py-2">
            <input
              type="text"
              placeholder="Cari Lokasi"
              className="w-full p-3 mb-4 border rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div> */}
          <div className="flex flex-col space-y-2 items-start justify-start w-full px-2 py-2 max-h-[92vh] overflow-y-auto">
            <div className="flex flex-col justify-center items-center w-full h-screen opacity-40">
              <img src={"/assets/voucher.png"} alt="" className="w-40" />
              <p>Mohon maaf voucher untuk anda belum tersedia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Voucher;
