import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListComponent from "./ListComponent";
import {
  getBundleById,
  getBundleByType,
  updateProductUsers,
} from "../../../api/apiProduct";

export default function CardListMember({ dataList }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalScanOpen, setIsModalScanOpen] = useState(false);
  const [isNfcSupported, setIsNfcSupported] = useState(true); // Track NFC support
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedIdCard, setSelectedIdCard] = useState(null);
  const [productBundle, setProductBundle] = useState([]);
  const [selectBundleProduct, setSelectBundleProduct] = useState("");
  const [dataBundle, setDataBundle] = useState("");
  const [errors, setErrors] = useState({});
  const [nfcData, setNfcData] = useState(null);
  const [dataListRFID, setDataListRFID] = useState({ RfId: null });
  const [manualInput, setManualInput] = useState("");
  const [dataMember, setDataMember] = useState([]);

  const handleExtend = (transaction) => {
    // Simpan data transaksi yang dipilih dan buka modal
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleScanRFID = (transaction) => {
    setSelectedIdCard(transaction);
    setIsModalScanOpen(true);
  };

  const startNfcScan = async () => {
    if ("NDEFReader" in window) {
      try {
        const ndef = new window.NDEFReader();
        await ndef.scan();
        ndef.onreading = (event) => {
          const { message } = event;
          const record = message.records[0];
          if (record.recordType === "text") {
            const textDecoder = new TextDecoder();
            const rfid = textDecoder.decode(record.data);
            setNfcData(rfid); // Save scanned RFID data
            setManualInput(rfid); // Set the manual input to the scanned data
            setDataListRFID((prevState) => ({ ...prevState, RfId: rfid }));
            setIsModalScanOpen(false); // Close modal after scan
          }
        };
      } catch (error) {
        console.log("NFC scanning failed: ", error);
        setIsNfcSupported(false); // If NFC scan fails, assume NFC is not supported
      }
    } else {
      setIsNfcSupported(false); // If Web NFC is not supported
    }
  };

  // Start NFC scan when modal opens
  useEffect(() => {
    if (isModalScanOpen) {
      startNfcScan();
    }
  }, [isModalScanOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  useEffect(() => {
    if (selectedTransaction) {
      fetchData();
    }

    fetchDataMemberUserProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTransaction, selectBundleProduct]);

  const fetchDataMemberUserProduct = async () => {
    try {
      const responseMember = await updateProductUsers.getMemberById(
        dataList.Id
      );
      setDataMember(responseMember.data);
      console.log("data", responseMember.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    if (selectedTransaction) {
      try {
        const responseBundle = await getBundleByType.getByType(
          selectedTransaction.MemberProduct.VehicleType
        );
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

  const handleCloseModalRFID = () => {
    setIsModalScanOpen(false);
    setManualInput(""); // Reset manual input when closing modal
  };

  const handleManualInputChange = (e) => {
    setManualInput(e.target.value);
  };

  const handleManualInputSubmit = async () => {
    try {
      setDataListRFID((prevState) => ({ ...prevState, RfId: manualInput }));

      await updateProductUsers.patchMemberById(dataList.Id, {
        RfId: manualInput, // data yang ingin diupdate
      });

      setIsModalScanOpen(false);
      fetchDataMemberUserProduct();
    } catch (error) {
      console.error("Failed to update RFID:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start px-3 py-4 border border-slate-200 rounded-md shadow-inner">
        <div className="flex flex-col justify-start items-start w-full gap-y-3">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-gray-400 text-base font-medium">ID Member</h1>
            <h3 className="text-xl font-medium tracking-widest">
              {dataMember?.CardId}
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-gray-400 text-base font-medium">Plat Nomor</h1>
            <h3 className="text-xl font-medium tracking-widest">
              {dataMember?.PlateNumber}
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start w-full">
            <h1 className="text-gray-400 text-base font-medium">No Kartu</h1>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-medium tracking-widest">
                {dataMember.RfId ?? "-"}
              </h3>
              <button
                className="bg-sky-400 rounded-md text-sm px-2 py-2 text-white"
                onClick={() => handleScanRFID(dataList)}
              >
                Input No Kartu
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-base font-semibold text-start mb-3 mt-3 max-h-[70vh] overflow-auto">
        Detail Lokasi
      </h1>
      <div className="w-full border-b border-dashed border-slate-300 mt-2 mb-5"></div>
      {dataList?.TrxHistories.map((data, index) => (
        <div
          className="w-full min-h-32 flex flex-col justify-start items-start mb-4 gap-y-3 border border-slate-200 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          key={index}
        >
          <div className="w-full bg-slate-300 text-start px-4 py-3 rounded-t-lg border-b border-slate-200">
            <h1 className="w-full font-semibold text-slate-700 text-lg">
              {data?.MemberProduct?.LocationName ?? "-"}
            </h1>
          </div>

          <div className="flex flex-row justify-start items-center gap-x-2 px-4">
            <h1 className="text-sm font-medium text-slate-500">
              Expired Date :
            </h1>
            <h1 className="text-sm font-medium text-slate-600">
              {data?.ProductBundle?.EndDate
                ? format(new Date(data?.ProductBundle?.EndDate), "dd MMMM yyyy")
                : "-"}
            </h1>
          </div>

          <div className="flex justify-end items-end w-full px-4 py-2">
            <button
              onClick={() => handleExtend(data)}
              className="bg-sky-500 text-white rounded-md px-4 py-2 hover:bg-sky-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 shadow-md"
            >
              Perpanjang
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

      {isModalScanOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Scan No Kartu</h2>
            <img
              src={"/assets/card-payment.svg"}
              className="w-32 m-auto"
              alt="RFID Card Scan"
            />
            {isNfcSupported ? (
              <div className="mt-4">
                <p className="text-gray-500 mt-4 text-center">
                  Hold your card close to the phone to scan.
                </p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  value={manualInput}
                  onChange={handleManualInputChange}
                  placeholder="Enter card number manually"
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                  onClick={handleManualInputSubmit}
                >
                  Submit Card Number
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-red-500 text-center">
                  Web NFC is not supported. Please enter your card number
                  manually.
                </p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  value={manualInput}
                  onChange={handleManualInputChange}
                  placeholder="Enter card number manually"
                />
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                  onClick={handleManualInputSubmit}
                >
                  Submit Card Number
                </button>
              </div>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
              onClick={handleCloseModalRFID}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
