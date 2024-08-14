import React, { useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

export default function MemberProductBundleForm({
  quotaId,
  onSubmit,
  previous,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cardActivateFee, setCardActivateFee] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      Name: name,
      Price: price,
      CardActivateFee: cardActivateFee,
      Fee: fee,
      TrxMemberQuoteId: quotaId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative h-full w-full">
      <div className="flex flex-wrap justify-center items-start gap-3 text-sm w-full">
        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bundle Name"
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full"
            required
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label htmlFor="productName">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Bundle Name"
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full no-spinner"
            required
          />
        </div>

        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label
            htmlFor="start-date"
            className="text-sm font-medium text-gray-700"
          >
            Fee Administration
          </label>
          <input
            type="text"
            id="start-date"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full no-spinner"
          />
        </div>
        <div className="flex flex-col justify-start items-start gap-y-2 w-72">
          <label
            htmlFor="start-date"
            className="text-sm font-medium text-gray-700"
          >
            Fee Activation Member
          </label>
          <input
            type="text"
            id="end-date"
            value={cardActivateFee}
            onChange={(e) => setCardActivateFee(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md ring-1 focus:border-blue-500 focus:outline-none w-full no-spinner"
          />
        </div>
      </div>
      <div className="py-4 border-t border-slate-200 flex justify-end items-end absolute bottom-0 w-full">
        <button
          onClick={previous}
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          <FaArrowLeftLong />
        </button>
        <button
          type="submit"
          className="mr-2 px-4 py-2 bg-indigo-500 text-white rounded-md"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </form>
  );
}
