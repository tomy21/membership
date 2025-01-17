import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { apiUsers, getUserProductById } from "../../../api/apiUsers";
import Loading from "../components/Loading";
import { IoIosArrowForward } from "react-icons/io";
import MotionProfile from "../components/MotionProfile";
import { format } from "date-fns";
import { Users } from "../../../api/apiMembershipV2";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getInitials = (name) => {
    if (!name || typeof name !== "string") {
      return "";
    }
    const names = name.trim().split(" ");
    if (names.length > 1) {
      return names[0][0] + names[1][0];
    }
    return names[0][0] || "";
  };

  const fetchData = async () => {
    try {
      const userResponse = await Users.getByUserId();
      console.log(userResponse);
      setData(userResponse.data);
      setUserName(userResponse.data.fullname);
      setEmail(userResponse.data.email);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleEditData = (label, value) => {
    setEditData({ label, value }); // Siapkan data untuk diedit
    setShowEdit(true); // Tampilkan modal edit
  };

  const closeShowEdit = () => {
    setShowEdit(false);
    setEditData(null); // Reset data setelah menutup editor
  };

  const handleUpdateData = async (updatedValue) => {
    const updatedData = { ...data.detaildata };
    const idDetails = data.detaildata?.id;

    switch (editData.label) {
      case "Nama Lengkap":
        updatedData.FullName = updatedValue;
        break;
      case "Nomor Handphone":
        updatedData.PhoneNumber = updatedValue;
        break;
      case "Alamat":
        updatedData.Address = updatedValue;
        break;
      case "Jenis Kelamin":
        updatedData.Gender = updatedValue;
        break;
      case "Tanggal Lahir":
        updatedData.Birthdate = updatedValue;
        break;
      default:
        break;
    }

    setIsLoading(true);
    try {
      await getUserProductById.updateUserDetail(idDetails, updatedData);
      closeShowEdit();
      setIsLoading(false);
      fetchData();
    } catch (error) {
      console.error("Failed to update user data:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <div className="w-full">
        <div className="flex flex-col items-start justify-start min-h-[60vh] max-h-screen overflow-auto w-full">
          <div className="flex w-full space-x-4 items-center py-4 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md">
            <FaArrowLeftLong
              className="pl-3 w-10 cursor-pointer"
              onClick={handleBack}
            />
            <h1 className="text-lg font-semibold px-3">Riwayat </h1>
          </div>

          <div className="w-full h-[50%] mt-3 px-5">
            <div className="flex flex-row justify-start items-center">
              <div className="bg-slate-200 w-20 h-20 flex justify-center items-center text-xl rounded-full font-semibold">
                {getInitials(userName?.toUpperCase())}
              </div>
              <div className="flex flex-col justify-start items-start space-y-1 ml-3">
                <h1 className="font-semibold text-base">{userName}</h1>
                <h1 className="font-medium text-xs text-blue-500">{email}</h1>
                <span
                  className={`rounded px-2 py-1 text-xs ${
                    data?.is_active === 1
                      ? "bg-green-200 text-green-600"
                      : "bg-red-200 text-red-600"
                  }`}
                >
                  {data?.is_active === 1 ? "Aktif" : "Tidak Aktif"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start mt-8 px-7 w-full">
            <h1 className="text-slate-700 font-medium text-xl mb-3">
              Informasi
            </h1>
            <div className="border border-slate-200 w-full"></div>

            <div className="flex flex-col justify-start items-start text-start gap-y-2 mt-3 w-full">
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data?.fullname ?? "Input nama lengkap"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() => handleEditData("Nama Lengkap", data?.fullname)}
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Nomor Handphone
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data?.phone_number ?? "Input nomor handphone"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Nomor Handphone", data?.phone_number)
                  }
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Alamat
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.address ?? "Silahkan input alamat"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() => handleEditData("Alamat", data.address)}
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Jenis Kelamin
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.gender === "Female"
                      ? "Perempuan"
                      : data.gender === "Male"
                      ? "Laki-laki"
                      : "Silahkan input Jenis Kelamin"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() => handleEditData("Jenis Kelamin", data.gender)}
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Tanggal Lahir
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.dob
                      ? format(new Date(data.dob), "dd MMMM yyyy")
                      : "Silahkan input tanggal lahir"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() => handleEditData("Tanggal Lahir", data.dob)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <MotionProfile
          onClose={closeShowEdit}
          label={editData?.label}
          valueData={editData?.value}
          onUpdate={handleUpdateData} // Mengirim data yang diupdate ke fungsi
        />
      )}
    </>
  );
}

export default Profile;
