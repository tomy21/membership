import React, { useState } from "react";
import NavbarClient from "../../components/NavbarClient";
import ListData from "../../components/ListData";
import TableDashboard from "../../components/TableDashboard";
import { IoLocationOutline } from "react-icons/io5";

const lokasi = [
  {
    id: 1,
    Code: "004SK",
    name: "SKY UNIVERSITAS PELITA HARAPAN",
    PlateNumber: [
      { plate: "B123ABC" },
      { plate: "B123ABD" },
      { plate: "B123ABE" },
      { plate: "B123ABF" },
      { plate: "B123ABG" },
    ],
  },
  {
    id: 2,
    Code: "007SK",
    name: "SKY ZONA 3 SILOAM KARAWACI",
    PlateNumber: [
      { plate: "B113ABC" },
      { plate: "B123ABC" },
      { plate: "B123ABE" },
    ],
  },
  {
    id: 3,
    Code: "002SK",
    name: "SKY CYBERPARK KARAWACI",
    PlateNumber: [
      { plate: "D113ADC" },
      { plate: "B123ABC" },
      { plate: "B123ABE" },
    ],
  },
  {
    id: 4,
    Code: "003SK",
    name: "SKY KARAWACI OFFICE PARK",
    PlateNumber: [
      { plate: "AB111AAC" },
      { plate: "B123ABC" },
      { plate: "B123ABE" },
    ],
  },
  {
    id: 5,
    Code: "901SK",
    name: "SKY BCA FORESTA",
    PlateNumber: [
      { plate: "B113ABC" },
      { plate: "B123ABC" },
      { plate: "B123ABE" },
    ],
  },
];

function DashboardClient() {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPlate, setSelectedPlate] = useState("");
  const [selectedPlateQuery, setSelectedPlateQuery] = useState("");
  return (
    <>
      <NavbarClient client={true} />
      <div className="container max-h-screen m-auto ">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-start items-start py-4">
            <h1 className="text-base font-bold">Halo Tomy Cool</h1>
            <p className="text-sm text-gray-400">
              Selamat datang, di membership sky parking
            </p>
          </div>
          <div className="w-64 px-2">
            <ListData
              list={lokasi}
              title={"Pilih Lokasi"}
              search={"Cari Lokasi"}
              selected={location}
              setSelected={setLocation}
              query={selectedLocation}
              setQuery={setSelectedLocation}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/3 max-h-screen">
            <div className="border border-gray-400 rounded-lg bg-opacity-80 backdrop-filter backdrop-blur-lg backdrop-saturate-150">
              <div className="flex flex-col justify-start items-start p-3">
                <h1 className="text-sm text-gray-400 font-reguler mb-5">
                  ID : SKY000123
                </h1>

                <h1 className="text-3xl font-semibold">Tom Cook</h1>
                <p className="text-xs text-slate-400 font-medium mb-7">
                  Join Member : 10 Jun 2024
                </p>

                <p className="text-sm font-semibold text-gray-300">
                  (+62) 812-7890-8771
                </p>
                <p className="text-sm font-semibold text-gray-300">
                  tom@example.com
                </p>
                <p className="text-sm font-semibold text-gray-300 mb-7">
                  B431QWE
                </p>

                <p className="text-sm font-semibold text-blue-600">
                  Member Detail
                </p>
                <div className="w-full border-b-2 border-dashed h-1 border-slate-400 px-10 my-5"></div>

                <h1 className="text-sm font-medium text-gray-400 mb-3">
                  Last Activity
                </h1>

                <p className="text-sm text-slate-400 font-medium">Parking</p>
                <h1 className="text-3xl font-semibold">IN</h1>
                <p className="text-xs text-slate-400 font-medium mb-7">
                  13 Jun 2024 10:40
                </p>
                <div className="flex flex-row justify-center items-center space-x-2 mb-4">
                  <IoLocationOutline size={20} />
                  <p className="text-xs text-slate-400 font-medium">
                    SKY Karawaci Office Park
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-h-screen ">
            <div className="flex flex-col space-y-4 justify-start items-start">
              <div className="flex space-x-4 justify-start items-center w-full border border-gray-400 py-3 px-2 rounded-md">
                <div className="flex flex-col space-y-2 justify-start items-start px-10 border-gray-300 border-r last:border-r-0">
                  <h1 className="text-xs font-semibold text-gray-400">
                    Account status
                  </h1>
                  <h1 className="text-xl font-semibold text-emerald-500">
                    Active
                  </h1>
                </div>

                <div className="flex flex-col space-y-2 justify-start items-start px-10 border-gray-300 border-r last:border-r-0">
                  <h1 className="text-xs font-semibold text-gray-400">
                    Total Points
                  </h1>
                  <div className="flex justify-between items-center w-40">
                    <h1 className="text-xl font-medium">100 K</h1>
                    <button className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-md text-sm hover:bg-emerald-200 shadow-md">
                      <h1>Top up</h1>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 justify-start items-start px-10 border-gray-300 border-r last:border-r-0">
                  <h1 className="text-xs font-semibold text-gray-400">
                    Status Parking
                  </h1>
                  <h1 className="text-xl font-semibold text-emerald-500">IN</h1>
                </div>

                <div className="flex flex-col space-y-2 justify-start items-start px-10 w-72 border-gray-300">
                  <h1 className="text-xs font-semibold text-gray-400">
                    Plat Nomor Kendaraan
                  </h1>

                  <ListData
                    list={location?.PlateNumber || []}
                    title={"Pilih Plat Nomor"}
                    search={"Cari Plat Nomor"}
                    selected={selectedPlate}
                    setSelected={setSelectedPlate}
                    query={selectedPlateQuery}
                    setQuery={setSelectedPlateQuery}
                  />
                </div>
              </div>

              <div className="border border-gray-400 w-full rounded-md">
                <TableDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardClient;
