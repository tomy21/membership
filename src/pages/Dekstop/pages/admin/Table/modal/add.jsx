import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import MemberProductForm from "./MemberProductForm";
import TrxMemberQuotaForm from "./TrxMemberQuotaForm";
import MemberProductBundleForm from "./MemberProductBundleForm";
import StepProgress from "../../components/StepProgress";

export default function AddModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [productId, setProductId] = useState(null);
  const [quotaId, setQuotaId] = useState(null);
  const [dataQuotaStart, setDataQuotaStart] = useState([]);
  const [dataQuotaEnd, setDataQuotaEnd] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductBundle, setDataProductBundle] = useState([]);
  const [dataQuota, setDataQuota] = useState([]);

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  console.log("dataProduct", dataProduct);
  console.log("dataProductBundle", dataProductBundle);
  console.log("dataQuota", dataQuota);

  const handleMemberProductSubmit = async (data) => {
    console.log("data member Product", data);
    setDataProduct(data);
    handleNextStep();
    // try {
    //   const response = await fetch(
    //     "http://localhost:3008/v01/member/api/product",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   const result = await response.json();
    //   setProductId(result.Id); // Asumsikan response mengandung ID produk
    //   handleNextStep();
    // } catch (error) {
    //   console.error("Error saving product:", error);
    // }
  };

  const handleQuotaSubmit = async (data) => {
    setDataQuota(data);
    setDataQuotaStart(data.startDate);
    setDataQuotaEnd(data.endDate);
    handleNextStep();
    console.log("dataQuota", data);
    // try {
    //   const response = await fetch(
    //     "http://localhost:3008/v01/member/api/quota",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   const result = await response.json();
    //   setQuotaId(result.Id); // Asumsikan response mengandung ID quota
    //   handleNextStep();
    // } catch (error) {
    //   console.error("Error saving quota:", error);
    // }
  };
  console.log("startQuota", dataQuotaStart);
  const handleBundleSubmit = async (data) => {
    setDataProductBundle(data);
    console.log("bundle", data);
    // try {
    //   const response = await fetch(
    //     "http://localhost:3008/v01/member/api/bundle",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   if (response.ok) {
    //     onSuccess();
    //     onClose(); // Tutup modal setelah sukses
    //   } else {
    //     console.error("Failed to create bundle");
    //   }
    // } catch (error) {
    //   console.error("Error creating bundle:", error);
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg w-1/2 h-[95vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Add New Product</h3>
          <button
            className="text-gray-500 hover:text-gray-700 w-5 h-5"
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
        <StepProgress step={step} />
        <div className="flex-grow p-6 overflow-y-auto">
          {step === 1 && (
            <MemberProductForm onSubmit={handleMemberProductSubmit} />
          )}
          {step === 2 && (
            <TrxMemberQuotaForm
              productId={productId}
              previous={handlePreviousStep}
              onSubmit={handleQuotaSubmit}
            />
          )}
          {step === 3 && (
            <MemberProductBundleForm
              quotaId={quotaId}
              previous={handlePreviousStep}
              onSubmit={handleBundleSubmit}
            />
          )}
        </div>
        {/* <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          {step > 1 && (
            <button
              onClick={handlePreviousStep}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Previous
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Next
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}
