import React from "react";
import HeaderTitle from "../components/HeaderTitle";
import TableCard from "../Table/TableCard";

export default function CardList() {
  return (
    <>
      <HeaderTitle
        title={"List Card"}
        subtitle={"Monitoring and management of cards membership"}
      />

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableCard />
      </div>
    </>
  );
}
