import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { userCMS } from "../../../../../../api/apiMembershipV2";
import { TiWarning } from "react-icons/ti";
import { BsPatchCheck } from "react-icons/bs";
import Loading from "../../../../components/Loading";

export default function AddUsers({ isOpen, onClose, data }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    username: "",
    phone_number: "",
    role: 1,
    referralUrl: "asdasd",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsError(false);
    if (!isError) {
      onClose();
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const currentUrl = window.location.href;
    const siteUrl = new URL(currentUrl).origin;

    try {
      const formDataWithUrl = {
        ...formData,
        referralUrl: siteUrl,
      };

      const response = await userCMS.addNewUsers(formDataWithUrl);

      if (response.status === "success") {
        setLoading(false);
        setIsModalOpen(true);
        setMessage(response.message);
      } else {
        setLoading(false);
        setIsModalOpen(true);
        setMessage(response.message);
      }
    } catch (error) {
      setIsError(true);
      setIsModalOpen(true);
      setLoading(false);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullname: "",
      email: "",
      username: "",
      phone_number: "",
      role: "",
      referralUrl: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-md w-1/4">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex flex-col justify-start">
              <h3 className="text-xl font-semibold text-gray-700">
                {data ? "Edit User" : "Add New User"}
              </h3>
              <p className="text-sm text-gray-400">
                Please fill out the form below to add a new user
              </p>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 py-4"
          >
            {[
              { name: "fullname", label: "Full Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "username", label: "Username", type: "text" },
              { name: "phone_number", label: "No. Handphone", type: "text" },
            ].map((field) => (
              <div key={field.name} className="px-4">
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label htmlFor={field.name} className="font-semibold">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`col-span-2 border rounded-md p-2 w-full ${
                      errors[field.name] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="px-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label htmlFor="role" className="font-semibold">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`col-span-2 border rounded-md p-2 w-full ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="1">User</option>
                </select>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div className="border-t border-gray-300 w-full"></div>

            <div className="flex justify-end items-center px-4 space-x-3">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed bg-black bg-opacity-50 w-full inset-0 z-50 flex items-center justify-center p-5">
          {/* Modal Container */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto animate-fade-in flex flex-col justify-center items-center">
            {/* Header */}
            <div className="flex justify-center">
              <div
                className={`p-3 rounded-full ${
                  isError
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {isError ? <TiWarning size={30} /> : <BsPatchCheck size={30} />}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {isError ? "Warning" : "Success"}
              </h2>
            </div>

            {/* Body */}
            <div className="mt-4 text-sm text-center text-gray-600">
              {message}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 mt-7 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <Loading />
        </div>
      )}
    </>
  );
}
