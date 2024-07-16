import React from "react";
import NavbarClient from "../../components/NavbarClient";
import CardValue from "../../components/CardValue";

function Dashboard() {
  return (
    <>
      <NavbarClient client={false} />
      <div className="container m-auto min-h-screen">
        <div className="flex flex-col items-start justify-center h-full mt-5">
          <div className="flex flex-row justify-start items-center space-x-5">
            <CardValue
              title={"Total Member Motor"}
              value={3000}
              growth={-0.1}
            />
            <CardValue
              title={"Total Member Mobil"}
              value={3000}
              growth={-0.1}
            />
            <CardValue title={"Total Quota"} value={2000} growth={2} />
            <CardValue title={"Total Income"} value={1000} growth={3} />
            <div className="flex flex-row justify-between items-center w-52">
              <div className="flex flex-col space-y-5 border-r border-gray-300 px-5">
                <h1 className="text-slate-400 font-medium text-sm">
                  Vehicle In
                </h1>
                <h1 className="font-medium text-2xl">300</h1>
              </div>
              <div className="flex flex-col space-y-5">
                <h1 className="text-slate-400 font-medium text-sm">
                  Vehicle Out
                </h1>
                <h1 className="font-medium text-2xl">300</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
