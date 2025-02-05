import React, { useState } from "react";
import HeaderTitle from "../components/HeaderTitle";
import TableLocation from "../Table/TableLocation";
import TapTable from "../../../components/TapTable";

function Location() {
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
      <HeaderTitle title={"Location"} subtitle={"View List Location"} />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabValue={tabValue}
        setTabValue={setTabValue}
      />

      <TableLocation />
    </>
  );
}

export default Location;
