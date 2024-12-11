import React from "react";
import TransactionTable from "./Table/TransactionTable";
import HeaderTitle from "../../components/HeaderTitle";
import TapTable from "../../components/TapTable";

export default function Transaction() {
  return (
    <>
      <HeaderTitle title={"Transaction"} subtitle={"View Transaction"} />

      <TapTable
        listTab={["Transaction"]}
        activeTab={"Transaction"}
        setActiveTab={() => {}}
        tabPage={true}
        tabName={"Transaction"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TransactionTable />
      </div>
    </>
  );
}
