import React, { useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import TapTable from "../../../components/TapTable";
import TablePayment from "../Table/TablePayment";

export default function Payment() {
  const [activeTab, setActiveTab] = useState("All");
  const [tabValue, setTabValue] = useState("");
  const listTab = [
    { name: "All", value: "all", id: 1 },
    { name: "Success", value: "COMPLETED", id: 2 },
    { name: "Pending", value: "PENDING", id: 3 },
    { name: "Failed", value: "FAILED", id: 4 },
  ];
  return (
    <>
      <HeaderTitle
        title={"History Payment"}
        subtitle={"View History Payment"}
      />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />
      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TablePayment tab={tabValue} />
      </div>
    </>
  );
}
