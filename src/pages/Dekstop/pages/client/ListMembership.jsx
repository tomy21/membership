import React from "react";
import ListMembershipTable from "./Table/ListMembershipTable";

export default function ListMembership() {
  return (
    <>
      <div className="text-lg mb-5">List Membership</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <ListMembershipTable />
      </div>
    </>
  );
}
