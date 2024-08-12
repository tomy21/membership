import React from "react";
import TenantTable from "./Table/TenantTable";

export default function Tenants() {
  return (
    <>
      <div className="text-lg mb-5">Tenants</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TenantTable />
      </div>
    </>
  );
}
