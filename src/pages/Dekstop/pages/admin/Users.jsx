import React from "react";
import TableUsers from "./Table/TableUsers";

export default function Users() {
  return (
    <>
      <div className="text-lg mb-5">Transaction</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableUsers />
      </div>
    </>
  );
}
