import React from "react";
import MembershipTable from "./Table/MembershipTable";

export default function Membership() {
  return (
    <>
      <div className="text-lg mb-5">Membership</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <MembershipTable />
      </div>
    </>
  );
}
