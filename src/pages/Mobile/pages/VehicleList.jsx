import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { Users } from "../../../api/apiMembershipV2";
import { format } from "date-fns";
import { IoLocationSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

export default function VehicleList() {
  const [listVehicle, setVehicle] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await Users.getVehicle();
    console.log(result);
    setVehicle(result.data);
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="w-full bg-amber-400 px-5 py-3 flex flex-row justify-start items-center space-x-28">
        <FaArrowLeftLong onClick={handleBack} />
        <h1>Vehicle List</h1>
      </div>

      <div className="max-h-screen min-h-[90vh] w-full p-3 overflow-y-auto relative">
        {listVehicle.map((items, index) => (
          <div
            key={index}
            className="bg-white shadow-md w-full rounded-lg border border-slate-300 text-xs relative max-h-60 mb-3"
          >
            <div className="absolute bg-white rounded-full h-6 w-6 -left-4 top-7 border-r border-slate-300"></div>
            <div className="absolute bg-white rounded-full h-6 w-6 -right-4 top-7 border-l border-slate-300"></div>

            <div className="flex justify-between items-center w-full mb-3 border-b border-dashed py-3 px-3">
              <h1>{items.member_customer_no.toUpperCase()}</h1>
              <h3>{format(new Date(items?.updatedAt), "dd MMM yyyy HH:mm")}</h3>
            </div>

            <div className="flex justify-between items-start w-full">
              <div className="flex flex-row justify-start items-center text-left w-full mb-3 py-3 px-3 space-x-5">
                {items.vehicle_type === "MOTOR" ? (
                  <img src="/assets/motorcycle.png" className="w-10" alt="" />
                ) : (
                  <img src="/assets/car.png" className="w-10" alt="" />
                )}

                <div className="flex flex-col justify-start items-start space-y-2">
                  <div className="flex flex-col justify-start items-start">
                    <h1 className="text-xs font-semibold text-slate-400">
                      Plate Number
                    </h1>
                    <h1 className="text-sm">
                      {items?.plate_number.toUpperCase() ?? "-"}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <h1 className="text-sm font-semibold text-slate-400">
                      RFID
                    </h1>
                    <h1 className="text-xs">
                      {items?.rfid === "" ? "-" : items?.rfid}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-end items-center text-left w-full mb-3 py-3 px-3 space-x-5">
                <IoPencil size={20} className="text-blue-600" />
                <div className="border-l border-slate-200 h-5"></div>
                <IoTrashOutline size={20} className="text-red-600" />
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bg-blue-600 rounded-full w-10 h-10 bottom-10 right-5 m-auto flex justify-center items-center text-white">
          <FaPlus size={20} />
        </div>
      </div>
    </>
  );
}
