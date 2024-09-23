import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserProductById } from "../../../api/apiUsers";
import Loading from "../components/Loading";
import { IoIosArrowForward } from "react-icons/io";
import MotionProfile from "../components/MotionProfile";
import { format } from "date-fns";

function Profile() {
  const [idUser, setIdUser] = useState(null);
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
  }, [idUser]);

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("refreshToken");
      if (!token) {
        navigate("/");
        return;
      }
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setIdUser(decodedToken.Id);
      setUserName(decodedToken.sub);
      setEmail(decodedToken.email);
    };
    fetchToken();
  }, [navigate]);

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
    if (!idUser) return;

    try {
      const userResponse = await getUserProductById.userById(idUser);
      console.log(userResponse);
      setData(userResponse);
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

  return (
    <>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <div className="container w-full">
        <div className="flex flex-col items-start justify-start min-h-[60vh] w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300 h-20">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-10">Profil</h1>
          </div>

          <div className="relative w-full bg-amber-300 h-12 mb-10">
            <div className="flex flex-row justify-start items-start">
              <div className="bg-slate-200 w-20 h-20 flex justify-center items-center text-3xl rounded-full absolute left-5 top-2 font-semibold">
                {getInitials(userName?.toUpperCase())}
              </div>
              <div className="flex flex-col justify-start items-start fixed right-16 top-[6.2rem]">
                <h1 className="font-semibold text-xl">{userName}</h1>
                <h1 className="font-medium text-sm text-blue-500 mb-4">
                  {email}
                </h1>
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
                    {data?.detaildata?.FullName ?? "Input nama lengkap"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Nama Lengkap", data?.detaildata?.FullName)
                  }
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Nomor Handphone
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    +62{data.data?.PhoneNumber ?? "Input nomor handphone"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Nomor Handphone", data.data?.PhoneNumber)
                  }
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Alamat
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.detaildata?.Address ?? "Silahkan input alamat"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Alamat", data.detaildata?.Address)
                  }
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Jenis Kelamin
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.detaildata?.Gender === "P"
                      ? "Perempuan"
                      : data.detaildata?.Gender === "L"
                      ? "Laki-laki"
                      : "Silahkan input Jenis Kelamin"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Jenis Kelamin", data.detaildata?.Gender)
                  }
                />
              </div>
              <div className="flex justify-between items-center border border-slate-200 w-full px-2 py-2 rounded-md shadow-inner">
                <div className="">
                  <label htmlFor="" className="text-sm font-medium">
                    Tanggal Lahir
                  </label>
                  <h1 className="text-slate-500 text-sm">
                    {data.detaildata?.Birthdate
                      ? format(
                          new Date(data.detaildata.Birthdate),
                          "dd MMMM yyyy"
                        )
                      : "Silahkan input tanggal lahir"}
                  </h1>
                </div>
                <IoIosArrowForward
                  onClick={() =>
                    handleEditData("Tanggal Lahir", data.detaildata?.Birthdate)
                  }
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
