import React, { useState } from "react";
import TransactionTable from "./Table/TransactionTable";
import TapTable from "../../components/TapTable";
import HeaderTitle from "./components/HeaderTitle";

export default function Transaction() {
  const [activeTab, setActiveTab] = useState("All");
  const listTab = [
    { name: "All", id: 1 },
    { name: "Success", id: 2 },
    { name: "Pending", id: 3 },
    { name: "Failed", id: 34 },
  ];
  return (
    <>
      <HeaderTitle title={"Transaction"} subtitle={"View Transaction"} />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabName={"All"}
      />
      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TransactionTable />
      </div>
    </>
  );
}
