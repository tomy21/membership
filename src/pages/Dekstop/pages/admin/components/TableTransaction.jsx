import React, { useState } from "react";
import {
  FaCheck,
  FaCheckDouble,
  FaCheckToSlot,
  FaListCheck,
  FaRegTrashCan,
} from "react-icons/fa6";
import { IoMdCall, IoMdMail, IoMdTime } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const formatNumber = (amount) => {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1) + " M";
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + " Jt";
  } else {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};
function TableTransaction({ dataTransaksi }) {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    dataTransaksi.reduce((acc, items) => {
      acc[items.id] = false;
      return acc;
    }, {})
  );

  console.log(checkedItems);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
      acc[key] = newSelectAll;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  };

  const handleItemCheck = (id) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: !checkedItems[id],
    };
    setCheckedItems(newCheckedItems);
    setSelectAll(Object.values(newCheckedItems).every((value) => value));
  };

  const countCheckedItems = () => {
    return Object.values(checkedItems).filter((value) => value).length;
  };

  return (
    <>
      <div className="overflow-x-auto max-h-[58vh] w-full mt-5 ">
        <table className="text-xs cursor-pointer w-full">
          <thead className="bg-red-200 sticky top-0 z-10">
            <tr className="font-semibold p-2 text-start">
              <th className="px-2 py-5 rounded-tl-xl">
                <input
                  type="checkbox"
                  className="border border-slate-200"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-2 py-5 text-start">Order Id</th>
              <th className="px-2 py-5 text-start">Tanggal</th>
              <th className="px-2 py-5 text-start">Client</th>
              <th className="px-2 py-5 text-start">Kontak</th>
              <th className="px-2 py-5 text-start">Lokasi</th>
              <th className="px-2 py-5 text-center">Total Members</th>
              <th className="px-2 py-5 text-center">Harga</th>
              <th className="px-2 py-5 text-center">Status</th>
              <th className="px-2 py-5 text-center rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white relative">
            {dataTransaksi.map((items, index) => (
              <tr className={index % 2 === 0 ? "bg-gray-100" : ""} key={index}>
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[items.id]}
                    onChange={() => handleItemCheck(items.id)}
                  />
                </td>
                <td className="text-start text-sm px-2 py-2">
                  #{items.orderId}
                </td>
                <td className="text-start px-2 py-2">{items.createdOn}</td>
                <td className=" flex flex-row justify-start items-center space-x-3 px-2 py-2">
                  <img
                    alt=""
                    src={
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex flex-col justify-start items-start space-y-1">
                    <h1 className="font-semibold text-sm">{items.name}</h1>
                    <p className="text-xs font-normal text-gray-400 flex flex-row justify-start items-center space-x-2">
                      <IoMdTime />
                      Today at 01 Jam ago
                    </p>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <div className="flex flex-col justify-start items-start space-y-1">
                    <div className="flex flex-row justify-start items-start space-x-2">
                      <IoMdMail />
                      <p>{items.email}</p>
                    </div>
                    <div className="flex flex-row justify-start items-start space-x-2">
                      <IoMdCall />
                      <p>(+62) {items.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="text-start px-2 py-2">{items.location}</td>
                <td className="text-center px-2 py-2">{items.jumlah}</td>
                <td className="text-center px-2 py-2">
                  IDR {formatNumber(items.price)}
                </td>
                <td className="text-center px-2 py-2">
                  <div className="bg-blue-100 text-medium text-blue-700 px-3 py-1 rounded-xl">
                    New
                  </div>
                </td>
                <td className="text-center px-2 py-2">
                  <div className="flex flex-row justify-center items-center space-x-1">
                    <button className="rounded-xl bg-red-100 text-red-600 px-2 py-1">
                      Reject
                    </button>
                    <div className="border-l border-gray-400 h-8"></div>
                    <button className="rounded-xl bg-emerald-100 text-emerald-600 px-2 py-1">
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {countCheckedItems() > 0 && (
          <div className="absolute bottom-20 right-72 px-5 py-3 shadow-md text-sm flex justify-between items-center bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-center w-[15vw]">
              <div className="flex flex-row justify-start items-center space-x-1">
                <MdOutlineBookmarkBorder size={20} className="text-blue-500" />
                <h1 className="text-sm font-normal text-gray-400">
                  Orders : {countCheckedItems()}
                </h1>
              </div>
              <div className="flex flex-row justify-start items-center space-x-2">
                <FaCheck size={15} className="text-green-500" />
                <div className="h-5 border-r border-slate-300"></div>
                <FaRegTrashCan size={15} className="text-red-500" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TableTransaction;
