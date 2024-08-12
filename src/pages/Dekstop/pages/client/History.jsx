import React from "react";
import HistoryTable from "./Table/HistoryTable";

export default function History() {
  return (
    <>
      <div className="text-lg mb-5">History Membership</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <HistoryTable />
      </div>
    </>
  );
}
