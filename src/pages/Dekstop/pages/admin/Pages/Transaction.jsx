import React, { useState } from "react";
import TransactionTable from "../Table/TransactionTable";
import TapTable from "../../../components/TapTable";
import HeaderTitle from "../components/HeaderTitle";

export default function Transaction() {
  const [activeTab, setActiveTab] = useState("All");
  const [tabValue, setTabValue] = useState("");
  const listTab = [
    { name: "All", value: "all", id: 1 },
    { name: "Success", value: "PAID", id: 2 },
    { name: "Pending", value: "PENDING", id: 3 },
    { name: "Failed", value: "FAILED", id: 4 },
  ];
  return (
    <>
      <HeaderTitle title={"Transaction"} subtitle={"View Transaction"} />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TransactionTable tab={tabValue} />
      </div>
    </>
  );
}
