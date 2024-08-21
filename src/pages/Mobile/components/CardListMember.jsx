import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardListMember({ dataList }) {
  const navigate = useNavigate();

  const handleExtend = (transaction) => {
    navigate("/payment_member", {
      state: {
        type: "Extend",
        periodId: transaction.MemberProductBundleId,
        productId: transaction.MemberUserProductId,
        location: transaction.MemberProduct.LocationName,
        vehicleType: transaction.MemberProduct.VehicleType,
        platNomor: dataList?.PlateNumber,
        startDate: transaction.ProductBundle.startDate,
        endDate: transaction.ProductBundle.endDate,
      },
    });
  };
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
              {}
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
    </>
  );
}
