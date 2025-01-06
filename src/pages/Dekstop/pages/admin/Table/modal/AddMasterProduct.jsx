import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Loading from "../../../../../Dekstop/components/Loading";
import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import {
  Location,
  userCMS,
  Users,
} from "../../../../../../api/apiMembershipV2";
import ListComponent from "../../../../../Mobile/components/ListComponent";
import { Product } from "../../../../../../api/apiBayarind";
import { PiSealCheckDuotone } from "react-icons/pi";

const monthNames = [
  { value: "Januari", label: "Januari" },
  { value: "Februari", label: "Februari" },
  { value: "Maret", label: "Maret" },
  { value: "April", label: "April" },
  { value: "Mei", label: "Mei" },
  { value: "Juni", label: "Juni" },
  { value: "Juli", label: "Juli" },
  { value: "Agustus", label: "Agustus" },
  { value: "September", label: "September" },
  { value: "Oktober", label: "Oktober" },
  { value: "November", label: "November" },
  { value: "Desember", label: "Desember" },
];

export default function AddMasterProduct({ isOpen, onClose, data }) {
  const [formProduct, setFormProduct] = useState({
    product_code: "",
    product_name: "",
    vehicle_type: "",
    location_code: false,
    KID: "",
    price: "",
    card_activation_fee: "",
    start_date: "",
    end_date: "",
    Fee: "",
    Create_by: "",
    Update_by: "",
  });

  const [monthsDuration, setMonthsDuration] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const yearList = Array.from(
    { length: 5 },
    (_, index) => new Date().getFullYear() + index
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userCMS.getByIdUsers();
        setDataUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchProduct = async () => {
      try {
        const response = await Location.getAll();
        setLocationOptions(response.data);
      } catch (error) {
        return null;
      }
    };

    if (monthsDuration > 0 && selectedMonth) {
      calculateDates(monthsDuration, selectedMonth.Code);
    }

    fetchProduct();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formProduct.Type, monthsDuration, selectedMonth]);

  const TypeVehicle = [
    { id: 1, name: "Motor", value: "MOTOR" },
    { id: 2, name: "Mobil", value: "MOBIL" },
  ];

  const listLocation = Array.isArray(locationOptions)
    ? [
        ...new Set(
          locationOptions.map((item) => ({
            Code: item.location_code,
            Name: item.location_name,
            KID: item.KID,
          }))
        ),
      ]
    : [];

  const type = Array.isArray(TypeVehicle)
    ? [
        ...new Set(
          TypeVehicle.map((item) => ({
            Code: item.value,
            Name: item.name,
          }))
        ),
      ]
    : [];

  const monthList = Array.isArray(monthNames)
    ? [
        ...new Set(
          monthNames.map((item) => ({
            Code: item.value,
            Name: item.label,
          }))
        ),
      ]
    : [];

  const formatDateToCustomString = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2); // Bulan mulai dari 0
    const year = date.getFullYear();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const calculateDates = (months, selectedMonth) => {
    if (!months || !selectedMonth) return;

    const monthIndex = monthNames.findIndex(
      (item) => item.value === selectedMonth
    );

    if (monthIndex === -1) {
      console.error("Invalid selectedMonth:", selectedMonth);
      return;
    }

    const currentYear = new Date().getFullYear();

    // Validasi jika tahun yang dipilih lebih kecil dari tahun sekarang
    const selectedYear = formProduct.start_date
      ? new Date(formProduct.start_date).getFullYear()
      : currentYear;

    if (selectedYear < currentYear) {
      setError("Tahun tidak boleh lebih kecil dari tahun sekarang.");
      return;
    }

    const startMonthDate = new Date(selectedYear, monthIndex, 1);
    const newStartDate = startOfMonth(startMonthDate);
    const newEndDate = endOfMonth(
      addMonths(newStartDate, parseInt(months) - 1)
    );

    setFormProduct({
      ...formProduct,
      start_date: formatDateToCustomString(newStartDate),
      end_date: formatDateToCustomString(newEndDate),
    });
  };

  const formatCurrency = (value) => {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, ""); // Hanya angka
    setFormProduct({ ...formProduct, [name]: parseInt(rawValue || 0) });
  };

  const handleMonthsChange = (e) => {
    const value = e.target.value;
    setMonthsDuration(value);
    calculateDates(value, selectedMonth);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Konversi StartDate dan EndDate sebelum dikirim ke API
      const startDateSQL = convertToSQLDateTime(formProduct.start_date);
      const endDateSQL = convertToSQLDateTime(formProduct.end_date);

      const word = selectedLocation.Name.split(" ");
      const initial = word.map((item) => item.charAt(0)).join("");
      const initialWord = initial.toUpperCase();
      const code_Product = `${initialWord}_${selectedType.Name}`;

      const payload = {
        ...formProduct,
        start_date: startDateSQL,
        end_date: endDateSQL,
        vehicle_type: selectedType.Name.toUpperCase(),
        location_code: selectedLocation.Code,
        product_code: code_Product,
        KID: selectedLocation.KID,
        Create_by: dataUser.fullname,
        Update_by: dataUser.fullname,
        periode: `${monthsDuration} bulan`,
      };

      const response = await Product.addProduct(payload);
      console.log(response);
      setSuccessMessage("Created successfully!");

      // if (payload) {
      // } else {
      //   const response = await productBundleAll.storeProduct(payload);
      //   setSuccessMessage(response.message);
      // }

      setLoading(false);
      setShowSuccessModal(true);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  const convertToSQLDateTime = (dateString) => {
    const [date, time] = dateString.split(", ");
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day} ${time}`;
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleClose = () => {
    setFormProduct("");
    onClose();
  };

  const handleIncrement = () => {
    if (monthsDuration < 12) {
      setMonthsDuration((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (monthsDuration > 0) {
      setMonthsDuration((prev) => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-40">
        {loading ? (
          <Loading />
        ) : showSuccessModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex flex-col justify-center items-center space-y-3 mb-10">
                <PiSealCheckDuotone size={50} className="text-green-600" />
                <h3 className="text-lg">{successMessage}</h3>
              </div>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                onClick={handleCloseSuccessModal}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/2 max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex flex-col justify-start">
                <h3 className="text-xl font-semibold text-gray-700">
                  {data ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-sm text-gray-400">
                  Please fill out the form below to add a new product
                </p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-start">
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-600">
                    Product Name
                  </label>
                  <div className="py-1">
                    <input
                      type="text"
                      name="product_name"
                      value={formProduct.product_name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Type Vehicle
                  </label>
                  <ListComponent
                    name={"vehicle_type"}
                    list={type}
                    title={"Select type vehicle"}
                    search={"Search type vehicle"}
                    selected={selectedType}
                    setSelected={setSelectedType}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Location
                  </label>
                  <ListComponent
                    name={"lokasi"}
                    list={listLocation}
                    title={"Select lokasi"}
                    search={"Search lokasi"}
                    selected={selectedLocation}
                    setSelected={setSelectedLocation}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      name="price"
                      value={formatCurrency(formProduct.price)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Card Activete Fee
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      type="text"
                      name="card_activation_fee"
                      value={formatCurrency(formProduct.card_activation_fee)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="Fee"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Fee
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">
                      Rp
                    </span>
                    <input
                      id="Fee"
                      type="text"
                      name="Fee"
                      value={formatCurrency(formProduct.Fee)}
                      onChange={handleCurrencyChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-300 w-full my-5"></div>

              <div className="grid grid-cols-3 gap-4 text-start w-full">
                <div>
                  <label
                    for="monthsDuration"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Duration Members
                  </label>
                  <div className="py-2 flex justify-between items-center space-x-3">
                    <button
                      type="button"
                      className={`border border-amber-400 px-3 py-2.5 rounded-md ${
                        monthsDuration === 0
                          ? "text-gray-300 border-gray-300 cursor-not-allowed"
                          : "text-amber-400 hover:bg-amber-400 hover:text-white"
                      }`}
                      onClick={handleDecrement}
                      disabled={monthsDuration === 0}
                    >
                      -
                    </button>
                    <input
                      id="monthsDuration"
                      type="number"
                      name="monthsDuration"
                      value={monthsDuration}
                      onChange={handleMonthsChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                      placeholder="Masukkan jumlah bulan"
                    />
                    <button
                      type="button"
                      className={`border border-amber-400 px-3 py-2.5 rounded-md ${
                        monthsDuration === 12
                          ? "text-gray-300 border-gray-300 cursor-not-allowed"
                          : "text-amber-400 hover:bg-amber-400 hover:text-white"
                      }`}
                      onClick={handleIncrement}
                      disabled={monthsDuration === 12}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    for="selectedMonth"
                    className="block mb-1 font-semibold text-sm text-gray-600"
                  >
                    Selected Month
                  </label>
                  <ListComponent
                    id={"selectedMonth"}
                    name={"selectedMonth"}
                    list={monthList}
                    title={"Select month"}
                    search={"Search month"}
                    selected={selectedMonth}
                    setSelected={setSelectedMonth}
                  />
                </div>

                <div>
                  <label className="block mb-4 font-semibold text-sm text-gray-600">
                    Year
                  </label>
                  <select
                    name="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md"
                  >
                    {yearList.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-b border-slate-300 w-full my-5"></div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-start">
                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="text" // Gunakan tipe text agar bisa diisi secara manual jika perlu
                    name="start_date"
                    value={formProduct.start_date} // Format custom dd/mm/yyyy HH:mm:ss
                    readOnly
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-sm text-gray-600">
                    End Date
                  </label>
                  <input
                    type="text"
                    name="end_date"
                    value={formProduct.end_date}
                    readOnly
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-b border-slate-300 w-full my-5"></div>

              <div className="mt-6 flex flex-row justify-end space-x-3">
                <button
                  type="reset"
                  className={`px-5 py-2.5 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none transition-colors `}
                  disabled={loading}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : data ? "Update" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
