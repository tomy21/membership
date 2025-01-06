import React, { useState } from "react";
import TableUsers from "../Table/TableUsers";
import HeaderTitle from "../components/HeaderTitle";
import TapTable from "../../../components/TapTable";
import AddUsers from "../Table/modal/AddUsers";
import TableRoles from "../Table/TableRoles";

export default function Roles() {
  const [activeTab, setActiveTab] = useState("Internal");
  const [tabValue, setTabValue] = useState("");
  const [successAdd, setSuccessAdd] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const listTab = [
    { id: 1, name: "Internal", value: "internal" },
    { id: 2, name: "Tenant", value: "tenant" },
  ];

  const handleAdd = () => {
    setIsModalAdd(true);
  };

  const handleCloseModal = () => {
    setIsModalAdd(false);
    setSuccessAdd(true); // Set successAdd menjadi true
  };

  return (
    <>
      <HeaderTitle
        title={"User CMS"}
        subtitle={"Monitoring and management of users"}
        setActiveTab={activeTab}
      />

      <TapTable
        listTab={listTab}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabPage={true}
        tabValue={tabValue}
        setTabValue={setTabValue}
        add={true}
        addAction={handleAdd}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableRoles
          addSuccess={successAdd}
          resetSuccess={() => setSuccessAdd(false)}
        />
      </div>

      {isModalAdd && (
        <AddUsers isOpen={isModalAdd} onClose={handleCloseModal} />
      )}
    </>
  );
}
