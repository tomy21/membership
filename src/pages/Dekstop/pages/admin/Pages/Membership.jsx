import React from "react";
import MembershipTable from "../Table/MembershipTable";
import HeaderTitle from "../components/HeaderTitle";

export default function Membership() {
  return (
    <>
      <HeaderTitle
        title={"Customer"}
        subtitle={"View All customer membership"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <MembershipTable />
      </div>
    </>
  );
}
