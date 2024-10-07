import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

export default function StatusMembers({ loading }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <>
      <table className="w-full mt-5">
        <thead>
          <tr className="border-b border-slate-500 text-black text-sm">
            <th className="p-2 text-start">Order ID</th>
            <th className="p-2 text-start">Order date</th>
            <th className="p-2 text-start">Product</th>
            <th className="p-2 text-start">Periode</th>
            <th className="p-2 text-start">Quantity</th>
            <th className="p-2 text-start">Used</th>
            <th className="p-2 text-start"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <tr className="text-xs text-center">
                <td colSpan={9} className="p-10">
                  <div>
                    <ScaleLoader size={10} color={"#bbb"} />
                  </div>
                </td>
              </tr>
            </>
          ) : (
            <>
              <tr className="text-xs odd:bg-slate-50 even:bg-white border-b border-slate-200">
                <td className="px-2 py-4 text-start">#0912311</td>
                <td className="px-2 py-4 text-start">20 Sep 2024</td>
                <td className="px-2 py-4 text-start">Member 12 Bulan</td>
                <td className="px-2 py-4 text-start">Sep - Aug</td>
                <td className="px-2 py-4 text-start">300</td>
                <td className="px-2 py-4 text-start">200</td>
                <td className="px-2 py-4 text-start">
                  <FaEllipsisH />
                </td>
              </tr>
              <tr className="text-xs odd:bg-slate-50 even:bg-white border-b border-slate-200">
                <td className="px-2 py-4 text-start">#0912311</td>
                <td className="px-2 py-4 text-start">20 Sep 2024</td>
                <td className="px-2 py-4 text-start">Member 12 Bulan</td>
                <td className="px-2 py-4 text-start">Sep - Aug</td>
                <td className="px-2 py-4 text-start">300</td>
                <td className="px-2 py-4 text-start">250</td>
                <td className="px-2 py-4 text-start">
                  <FaEllipsisH />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
}
