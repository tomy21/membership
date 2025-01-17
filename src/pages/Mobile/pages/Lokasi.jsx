import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { LokasiMembership } from "../../../api/apiMembershipV2";

function Lokasi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await LokasiMembership.getLocationMember(
        page,
        limit,
        searchTerm
      );
      setLocationData(response.data);
    };

    fetchData();
  }, [page, limit, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container">
        {/* <NavbarMobile /> */}
        <div className="flex flex-col items-start justify-start min-h-full w-full">
          <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
            <FaArrowLeftLong
              className="pl-3 w-10 cursor-pointer"
              onClick={handleBack}
            />
            <h1 className="text-lg font-semibold px-3">Lokasi Member</h1>
          </div>

          <div className="w-full px-2 py-2">
            <input
              type="text"
              placeholder="Cari Lokasi"
              className="w-full p-3 mb-4 border rounded-md"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col space-y-2 items-start justify-start w-full px-2 py-2 max-h-[75vh] overflow-y-auto">
            {locationData.map((items, index) => (
              <div
                key={index}
                className="flex flex-row items-center shadow-md space-x-2 px-2 py-2 w-full border border-gray-300 rounded-lg bg-white"
              >
                <img
                  src={"/assets/lokasi/no-pictures.png"}
                  alt="lokasi"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col justify-start items-start text-xs w-full">
                  <h1 className="font-semibold text-sm text-start truncate w-full">
                    {items?.location_name}
                  </h1>
                  {/* <h1 className="text-sm text-gray-400">Sisa kuota :</h1>
                  <div className="flex flex-row space-x-5 text-gray-500 justify-start w-full items-center">
                    <p>Mobil : {items.totalQuotaMobil}</p>
                    <p>Motor : {items.totalQuotaMotor}</p>
                  </div> */}
                  <div className="w-full border-b border-gray-200 my-2"></div>
                  <p className="text-justify">{items.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lokasi;
