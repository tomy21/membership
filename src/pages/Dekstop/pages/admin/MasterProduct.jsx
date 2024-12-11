import React, { useState } from "react";
import MasterProductTable from "./Table/MasterProductTable";
import HeaderTitle from "../../components/HeaderTitle";
import TapTable from "../../components/TapTable";

export default function MasterProduct() {
  const [activeTab, setActiveTab] = useState("Membership");
  const listTab = [
    { name: "Master Product", id: 1 },
    { name: "Membership", id: 2 },
    { name: "Voucher", id: 3 },
  ];
  return (
    <>
      <HeaderTitle
        title={"Product"}
        subtitle={"View List Product"}
        setActiveTab={activeTab}
      />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabName={"Tenants"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <MasterProductTable />
      </div>
    </>
  );
}
