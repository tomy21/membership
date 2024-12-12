import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Users } from "../../../api/apiMembershipV2";
import { format } from "date-fns";
import { FaTimes } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BiRfid } from "react-icons/bi";
import { vehicleAdd } from "../../../api/apiBayarind";
import { BsPatchCheck } from "react-icons/bs";
import { TbFaceIdError } from "react-icons/tb";

export default function VehicleList() {
  const [listVehicle, setVehicle] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRfid, setIsModalRfid] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isModalError, setIsModalError] = useState(false);
  const [rfidHex, setRfidHex] = useState("");
  const [formData, setFormData] = useState({
    vehicle_type: "",
    plate_number: "",
    plate_number_image: null,
    stnk_image: null,
  });
  // const location = useLocation();
  const navigate = useNavigate();

  const handleScanRfid = async () => {
    try {
      if ("NDEFReader" in window) {
        const ndef = new NDEFReader();
        await ndef.scan();
        console.log("NFC scan started");

        ndef.addEventListener("reading", (event) => {
          const { message, serialNumber } = event;
          console.log(`Serial Number: ${serialNumber}`);
          setRfidHex(serialNumber); // Simpan serial number ke state
        });
      } else {
        setIsModalRfid(false);
        setIsModalError(true);
      }
    } catch (error) {
      console.error("NFC reading error:", error);
      alert("Failed to read NFC tag. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await Users.getVehicle();
    setVehicle(result.data);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("vehicle_type", formData.vehicle_type);
    data.append("plate_number", formData.plate_number);
    data.append("plate_number_image", formData.plate_number_image);
    data.append("stnk_image", formData.stnk_image);

    try {
      const response = await vehicleAdd.addVehicle(data);
      console.log("Success:", response.data);
      if (response.status === true) {
        setIsModalOpen(false);
        setIsSuccessModalOpen(true); // Buka modal success
        setFormData({
          vehicle_type: "",
          plate_number: "",
          plate_number_image: null,
          stnk_image: null,
        });
        fetchData();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error:", error.response || error.message);
    }
  };
  return (
    <>
      <div className="w-full bg-amber-400 px-5 py-3 flex flex-row justify-start items-center space-x-28">
        <FaArrowLeftLong onClick={handleBack} />
        <h1>Vehicle List</h1>
      </div>

      <div className="max-h-screen w-full p-3 overflow-y-auto relative">
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
                <BiRfid
                  onClick={() => setIsModalRfid(true)}
                  size={20}
                  className="text-blue-600"
                />
                <div className="border-l border-slate-200 h-5"></div>
                <IoTrashOutline size={20} className="text-red-600" />
              </div>
            </div>
          </div>
        ))}

        <div className="fixed bg-blue-600 rounded-full w-16 h-16 bottom-10 right-5 m-auto flex justify-center items-center text-white">
          <FaPlus size={20} onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalOpen(false)} // Menutup modal jika klik di luar
        >
          <div
            className="bg-white w-3/4 min-h-1/2 max-h-[100vh] flex flex-col justify-start items-start rounded-xl p-5 relative"
            onClick={(e) => e.stopPropagation()} // Mencegah modal menutup saat diklik
          >
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <h1 className="text-lg font-medium">Add Vehicle</h1>
              <FaTimes
                size={20}
                className="text-red-600 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            {/* Garis Pembatas */}
            <div className="border-b border-slate-300 w-full my-3"></div>

            {/* Konten Modal */}
            <div className="w-full">
              {/* Tambahkan isi modal di sini */}
              <form onSubmit={handleSubmit} className="text-start">
                {/* Vehicle Type */}
                <div className="mb-4">
                  <label
                    htmlFor="vehicle_type"
                    className="block text-sm font-medium mb-2"
                  >
                    Vehicle Type
                  </label>
                  <select
                    name="vehicle_type"
                    id="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="MOTOR">Motor</option>
                    <option value="MOBIL">MOBIL</option>
                  </select>
                </div>

                {/* Plate Number */}
                <div className="mb-4">
                  <label
                    htmlFor="plate_number"
                    className="block text-sm font-medium mb-2"
                  >
                    Plate Number
                  </label>
                  <input
                    type="text"
                    name="plate_number"
                    id="plate_number"
                    value={formData.plate_number}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Enter plate number"
                    required
                  />
                </div>

                {/* Plate Number Image */}
                <div className="mb-4">
                  <label
                    htmlFor="plate_number_image"
                    className="block text-sm font-medium mb-2"
                  >
                    Plate Number Image
                  </label>
                  <input
                    type="file"
                    name="plate_number_image"
                    id="plate_number_image"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>

                {/* STNK Image */}
                <div className="mb-4">
                  <label
                    htmlFor="stnk_image"
                    className="block text-sm font-medium mb-2"
                  >
                    STNK Image
                  </label>
                  <input
                    type="file"
                    name="stnk_image"
                    id="stnk_image"
                    onChange={handleFileChange}
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 rounded-lg shadow-lg p-6 relative text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 text-green-600 rounded-full p-3">
                <BsPatchCheck size={30} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600 mb-4">
              Your vehicle has been successfully added.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setIsSuccessModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 rounded-lg shadow-lg p-6 relative text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 text-red-600 rounded-full p-3">
                <TbFaceIdError size={30} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Gagal !</h2>
            <p className="text-gray-600 mb-4">
              Your device does not support NFC or permission is not granted.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600 transition"
              onClick={() => setIsModalError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalRfid && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsModalRfid(false)} // Menutup modal jika klik di luar
        >
          <div
            className="bg-white w-80 rounded-lg shadow-lg p-6 relative text-center"
            onClick={(e) => e.stopPropagation()} // Mencegah modal menutup saat diklik
          >
            <div className="flex justify-between items-center w-full">
              <h1 className="text-lg font-medium">Scan RFID</h1>
              <FaTimes
                size={20}
                className="text-red-600 cursor-pointer"
                onClick={() => setIsModalRfid(false)}
              />
            </div>

            <div className="border-b border-slate-300 w-full my-3"></div>

            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-4">
                Tap the RFID card on your phone to read the ID.
              </p>

              <button
                onClick={handleScanRfid}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Start Scan
              </button>

              {rfidHex && (
                <div className="mt-4">
                  <h3 className="text-sm text-gray-600">RFID HEX:</h3>
                  <p className="text-lg font-bold text-blue-600">{rfidHex}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
