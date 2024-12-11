import React, { useState } from "react";
import TenantTable from "./Table/TenantTable";
import HeaderTitle from "../../components/HeaderTitle";
import TapTable from "../../components/TapTable";
import MembershipTable from "./Table/MembershipTable";

export default function Tenants() {
  const [activeTab, setActiveTab] = useState("Personals");
  const listTab = [
    { name: "Personals", id: 1 },
    { name: "Tenants", id: 2 },
  ];
  return (
    <>
      <HeaderTitle
        title={"Membership"}
        subtitle={"View List Membership"}
        setActiveTab={setActiveTab}
      />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabName={"Tenants"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        {activeTab === "Personals" ? <MembershipTable /> : <TenantTable />}
      </div>
    </>
  );
}
