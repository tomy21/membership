import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { vehicleAdd } from "../../../api/apiBayarind";
import { format } from "date-fns";
import { MembershipProduct } from "../../../api/apiMembershipV2";
import ListComponent from "../components/ListComponent";
import { FaCarAlt } from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";

export default function DetailLokasiMember() {
  const location = useLocation();
  const navigate = useNavigate();
  const [listLocationCard, setListLocationCard] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [countExpired, setCountExpired] = useState(0);
  const [modalPerpanjang, setModalPerpanjang] = useState(false);
  const [idMembers, setIdMembers] = useState("");
  const [periodeList, setPeriodeList] = useState([]);
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [errors, setErrors] = useState({});
  const [tariff, setTariff] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchPeriode = async () => {
      const type = listLocationCard.vehicle_type;
      const locationCode = idMembers.location_id;

      try {
        const response = await MembershipProduct.getPeriode(type, locationCode);

        setPeriodeList(response.data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    const fetchProduct = async () => {
      const type = listLocationCard.vehicle_type;
      const locationCode = idMembers.location_id;
      const periode = selectedPeriode.Name;
      if (selectedPeriode) {
        try {
          const response = await MembershipProduct.getProduct(
            periode,
            locationCode,
            type
          );
          setProductList(response.data);
        } catch (error) {
          console.error("Failed to fetch product data:", error);
        }
      }
    };

    if (selectedProduct) {
      setTariff(selectedProduct.Price);
      setStartDate(selectedProduct.StartDate);
      setEndDate(selectedProduct.EndDate);
    }

    fetchList();
    fetchPeriode();
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    listLocationCard.vehicle_type,
    idMembers.location_id,
    selectedPeriode,
    selectedProduct,
  ]);

  const fetchList = async () => {
    try {
      const response = await vehicleAdd.getDetailVehicle(
        location.state.selectedProduct.id
      );
      const data = response.data;
      setListLocationCard(data);

      // Hitung jumlah is_active true dan false
      const activeCount = data.membership.length;
      const expiredCount = data.membership.filter(
        (item) => !item.is_active
      ).length;

      setCountActive(activeCount);
      setCountExpired(expiredCount);
    } catch {
      console.log("error");
    }
  };

  const periodData = Array.isArray(periodeList)
    ? [
        ...new Set(
          periodeList.map((item) => ({
            Code: item.periode,
            Name: item.periode,
          }))
        ),
      ]
    : [];

  const productData = Array.isArray(ProductList)
    ? [
        ...new Set(
          ProductList.map((item) => ({
            Code: item.id,
            Name: item.product_name,
            StartDate: item.start_date,
            EndDate: item.end_date,
            Price: item.price,
          }))
        ),
      ]
    : [];

  const handlePerpanjang = (items) => {
    setIdMembers(items);
    setModalPerpanjang(true);
  };

  const handleProceed = () => {
    const newErrors = {};
    if (!selectedPeriode)
      newErrors.selectedPeriode = "Pilih periode terlebih dahulu";
    if (!selectedProduct)
      newErrors.selectedProduct = "Pilih produk terlebih dahulu";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const data = {
        type: "Extend",
        // periodId: periodeId,
        productId: selectedProduct.Code,
        location: idMembers.location_name,
        locationCode: idMembers.location_id,
        plateNumber: listLocationCard.plate_number,
        vehicleType: listLocationCard.vehicle_type,
        tariff: tariff,
        startDate: startDate,
        endDate: endDate,
      };
      navigate("/payment_member", {
        state: data,
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="w-full bg-amber-400 px-2 py-3 flex flex-row justify-start items-center space-x-28">
        <FaArrowLeftLong onClick={handleBack} />
        <h1>Detail Members</h1>
      </div>

      <div className="min-h-screen w-full p-3">
        <div className="flex flex-col justify-start items-start w-full">
          <div className="flex justify-between items-center w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-2xl font-bold text-white">
                {listLocationCard.plate_number}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {listLocationCard.rfid}
              </p>

              <div className="flex flex-col justify-start items-start mt-10">
                <h1 className="text-base text-start font-medium text-teal-500">
                  Total Lokasi Member
                </h1>
                <h1 className="text-center text-xl text-white font-semibold mt-2">
                  {countActive}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center bg-teal-500 p-4 rounded-full shadow-md">
              {listLocationCard.vehicle_type === "MOBIL" ? (
                <FaCarAlt size={40} className="text-white" />
              ) : (
                <RiEBikeFill size={40} className="text-white" />
              )}
            </div>
          </div>

          <h1 className="text-xl font-semibold mt-10 text-start">
            List Lokasi Members
          </h1>

          <div className="border-b border-slate w-full py-2"></div>

          {listLocationCard.membership &&
            listLocationCard.membership.map((item, index) => (
              <div
                className="flex flex-col justify-start items-start w-full"
                key={index}
              >
                <div className="min-w-60 max-w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-slate-700 h-12 mt-4 rounded-t-lg text-start px-4 py-3">
                  <p className="text-sm text-white font-semibold">
                    {item.location_name}
                  </p>
                </div>

                <div className="w-full flex justify-between items-start bg-white h-40 text-start px-4 py-3 rounded-b-lg rounded-tr-lg shadow-lg border border-gray-200">
                  <div>
                    <div className="flex flex-col mb-4">
                      <h1 className="text-sm font-medium text-gray-500">
                        Tanggal Active
                      </h1>
                      <h1 className="text-sm font-semibold text-gray-900">
                        {format(new Date(item.start_date), "dd MMM yyyy HH:mm")}
                      </h1>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-sm font-medium text-gray-500">
                        Tanggal Expired
                      </h1>
                      <h1 className="text-sm font-semibold text-gray-900">
                        {format(new Date(item.end_date), "dd MMM yyyy HH:mm")}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end h-full">
                    <span
                      className={`${
                        new Date(item.end_date) < new Date()
                          ? "bg-red-100 text-red-600"
                          : item.is_active
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      } px-4 py-2 text-xs rounded-full font-medium shadow-sm`}
                    >
                      {new Date(item.end_date) < new Date()
                        ? "Expired"
                        : item.is_active
                        ? "Aktif"
                        : "Belum Aktif"}
                    </span>
                    {new Date(item.end_date) < new Date() && (
                      <button
                        className="mt-2 flex justify-center items-center bg-gradient-to-r from-blue-500 to-cyan-500 h-10 px-4 py-2 text-xs rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
                        onClick={() => handlePerpanjang(item)}
                      >
                        Perpanjang
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {modalPerpanjang && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
          <div className="bg-white p-4 rounded-md shadow-md w-full">
            <div className="flex flex-col justify-start items-start w-full py-5">
              <div className="text-base font-semibold text-start">
                <h1>Perpanjang Membership</h1>
              </div>
              <p className="text-xs text-slate-400">
                Pilih produk sesuai periode
              </p>
            </div>

            <div className="border-t border-slate-400 w-full py-3"></div>

            <div className="flex flex-col w-full items-start justify-start">
              <label className="text-gray-400">Periode Membership</label>
              <ListComponent
                id="periode-select"
                name={"periode"}
                list={periodData}
                title={"Pilih periode"}
                search={"Cari periode"}
                selected={selectedPeriode}
                setSelected={setSelectedPeriode}
              />
              {errors.selectedPeriode && (
                <p className="text-red-500">{errors.selectedPeriode}</p>
              )}
            </div>

            <div className="flex flex-col w-full mt-4  items-start justify-start">
              <label className="text-gray-400">Produk Membership</label>
              <ListComponent
                id="product-select"
                name="product"
                list={productData}
                title={"Pilih product"}
                search={"Cari product"}
                selected={selectedProduct}
                setSelected={setSelectedProduct}
              />
              {errors.selectedProduct && (
                <p className="text-red-500">{errors.selectedProduct}</p>
              )}
            </div>

            <div className="my-4 text-left">
              <label
                htmlFor="price"
                className="text-gray-600 font-medium mb-2 block"
              >
                Harga
              </label>
              <div className="relative bg-gray-100 rounded-lg shadow-inner p-3">
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <span className="text-gray-500 font-medium">IDR</span>
                </div>
                <input
                  id="price"
                  name="price"
                  type="text"
                  disabled
                  value={
                    tariff !== 0
                      ? `${parseInt(tariff).toLocaleString("id-ID")}`
                      : "0"
                  }
                  className="w-full bg-transparent pl-16 text-gray-800 text-lg font-medium outline-none"
                />
              </div>
            </div>

            <div className="border-t border-slate-400 w-full py-3"></div>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => setModalPerpanjang(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleProceed}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
