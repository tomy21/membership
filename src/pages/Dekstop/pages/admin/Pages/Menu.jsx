import React from "react";
import HeaderTitle from "../components/HeaderTitle";
import TableMenus from "../Table/TableMenus";

export default function Menu() {
  return (
    <>
      <HeaderTitle
        title={"Menu CMS"}
        subtitle={"Monitoring and management of menus"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableMenus />
      </div>
    </>
  );
}
