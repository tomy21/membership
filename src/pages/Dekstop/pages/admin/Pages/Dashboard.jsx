import React from "react";
import HeaderTitle from "../components/HeaderTitle";
import CardHeader from "../../../components/Dashboard/CardHeader";
import { IoPeople } from "react-icons/io5";
import { HiMiniBuildingStorefront } from "react-icons/hi2";
import { FaRegAddressCard, FaWallet } from "react-icons/fa";
import ChartTotalMembers from "../../../components/Dashboard/ChartTotalMembers";
import ChartPie from "../../../components/Dashboard/ChartPie";

function Dashboard() {
  return (
    <>
      <HeaderTitle title={"Dashboard"} subtitle={"Overview"} />

      <div className="max-h-screen overflow-y-auto p-3">
        <div className="flex justify-between items-center w-full space-x-3 ">
          <CardHeader
            title={"Total Membership"}
            value={"10"}
            percentage={50}
            icon={<IoPeople />}
          />
          <CardHeader
            title={"Total Tenant"}
            value={"10"}
            percentage={50}
            icon={<HiMiniBuildingStorefront />}
          />
          <CardHeader
            title={"Total Revenue"}
            value={"10"}
            percentage={50}
            icon={<FaWallet />}
          />
          <CardHeader
            title={"Stock Card"}
            value={"10"}
            percentage={50}
            icon={<FaRegAddressCard />}
          />
        </div>
      </div>

      <div className="flex justify-between items-start w-full p-3 space-x-3">
        <ChartTotalMembers />
        <ChartPie />
      </div>
    </>
  );
}

export default Dashboard;
