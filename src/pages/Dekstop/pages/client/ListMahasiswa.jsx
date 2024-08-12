import React from "react";
import TableMahasiswa from "./Table/TableMahasiswa";

export default function ListMahasiswa() {
  return (
    <>
      <div className="text-lg mb-5">List Mahasiswa</div>

      <div className="w-full bg-white rounded-md flex flex-col justify-start items-center">
        <TableMahasiswa />
      </div>
    </>
  );
}
