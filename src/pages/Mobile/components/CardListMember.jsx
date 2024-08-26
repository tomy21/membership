import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListComponent from "./ListComponent";
import { getBundleById, getBundleByType } from "../../../api/apiProduct";

export default function CardListMember({ dataList }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [productBundle, setProductBundle] = useState([]);
  const [selectBundleProduct, setSelectBundleProduct] = useState("");
  const [dataBundle, setDataBundle] = useState("");
  const [errors, setErrors] = useState({});

  const handleExtend = (transaction) => {
    // Simpan data transaksi yang dipilih dan buka modal
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // console.log("ini data", dataList.TrxHistories[0].MemberProduct.VehicleType);
  // console.log("ini data2", );

  useEffect(() => {
    if (selectedTransaction) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTransaction, selectBundleProduct]);

  const fetchData = async () => {
    if (selectedTransaction) {
      try {
        const responseBundle = await getBundleByType.getByType(
          selectedTransaction.MemberProduct.VehicleType
        );
        console.log("id", selectBundleProduct);
        const filteredProductBundle = responseBundle.data.filter(
          (item) => item.id > selectedTransaction.MemberProductBundleId
        );
        setProductBundle(filteredProductBundle);
        if (selectBundleProduct) {
          const dataListBundle = await getBundleById.getById(
            selectBundleProduct.Code
          );
          console.log("dataBundle", dataListBundle.data);
          setDataBundle(dataListBundle.data);
        }
      } catch (error) {
        console.error("Error fetching product bundles:", error);
      }
    }
  };

  const handleConfirmExtend = () => {
    // Lanjutkan ke halaman pembayaran
    const newErrors = {};
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      navigate("/payment_member", {
        state: {
          type: "Extend",
          userProductId: selectedTransaction.MemberUserProductId,
          periodId: selectBundleProduct.Code,
          productId: selectedTransaction.MemberProductId,
          location: selectedTransaction.MemberProduct.LocationName,
          vehicleType: selectedTransaction.MemberProduct.VehicleType,
          platNomor: dataList?.PlateNumber,
          startDate: dataBundle.StartDate,
          endDate: dataBundle.EndDate,
          tariff: selectBundleProduct.Tariff,
        },
      });
    }
  };

  const bundleName = productBundle.map((item) => ({
    Code: item.id,
    Name: item.Name,
    Tariff: item.Price,
  }));

  return (
    <>
      <div className="flex flex-col justify-start items-start px-3 py-4">
        <div className="flex flex-col justify-start items-start w-full gap-y-3">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-gray-400 text-base font-medium">ID Member</h1>
            <h3 className="text-xl font-medium tracking-widest">
              {dataList?.CardId}
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-gray-400 text-base font-medium">Plat Nomor</h1>
            <h3 className="text-xl font-medium tracking-widest">
              {dataList?.PlateNumber}
            </h3>
          </div>
        </div>
      </div>
      <h1 className="text-base font-semibold text-slate-400 text-start mb-3 mt-2 max-h-[70vh] overflow-auto">
        Detail Lokasi
      </h1>
      <div className="w-full border-b border-dashed border-slate-300 mt-2 mb-5"></div>
      {dataList?.TrxHistories.map((data, index) => (
        <div
          className="w-full min-h-32 bg-green-200 border border-green-600 px-3 py-4 rounded-md shadow-md flex flex-col justify-start items-start mb-2 gap-y-3"
          key={index}
        >
          <h1>{data?.MemberProduct?.LocationName ?? "-"}</h1>
          <div className="flex flex-row justify-start items-center gap-x-2">
            <h1 className="text-sm font-medium text-slate-400">
              Expired Date :
            </h1>
            <h1 className="text-sm font-medium text-slate-400">
              {data?.ProductBundle?.EndDate
                ? format(new Date(data?.ProductBundle?.EndDate), "dd MMMM yyyy")
                : "-"}
            </h1>
          </div>
          <div className="flex justify-end items-end w-full">
            <button
              onClick={() => handleExtend(data)}
              className="bg-sky-300 rounded-md p-2"
            >
              Extend Member
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Extend Product</h2>
            <p className="flex flex-col justify-start items-start">
              <strong>Location:</strong>{" "}
              {selectedTransaction?.MemberProduct?.LocationName}
            </p>
            <p className="flex flex-col justify-start items-start">
              <strong>Vehicle Type:</strong>{" "}
              {selectedTransaction?.MemberProduct?.VehicleType}
            </p>
            <p className="flex flex-col justify-start items-start">
              <strong>Plate Number:</strong> {dataList?.PlateNumber}
            </p>

            <div className="flex flex-col w-full justify-start items-start m-auto mt-2">
              <label className="text-gray-400">Product Member</label>
              <ListComponent
                list={bundleName}
                title={"Pilih Paket Member"}
                search={"Cari Paket Member"}
                selected={selectBundleProduct}
                setSelected={setSelectBundleProduct}
              />
              {errors.selectBundleProduct && (
                <p className="text-red-500">{errors.selectBundleProduct}</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 rounded-md p-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExtend}
                className="bg-blue-500 text-white rounded-md p-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
