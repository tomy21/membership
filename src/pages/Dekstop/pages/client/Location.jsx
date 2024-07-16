import React, { useState } from "react";
import NavbarClient from "../../components/NavbarClient";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const lokasi = [
  {
    id: 1,
    Code: "004SK",
    name: "SKY UNIVERSITAS PELITA HARAPAN",
    address:
      "UPH Gedung E Jl. MH Thamrin Boulevard 1100 Lippo Village, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15811",
    longitude: "-6.227670434536965",
    latitude: "106.61161533063233",
    Quota: 2000,
    Used: 1500,
    status: "active",
  },
  {
    id: 2,
    Code: "007SK",
    name: "SKY ZONA 3 SILOAM KARAWACI",
    address:
      "Siloam Lippo Karawaci, Jalan No.6, Bencongan, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810",
    longitude: "-6.224613282542231",
    latitude: "106.59778983567094",
    Quota: 3000,
    Used: 2300,
    status: "active",
  },
  {
    id: 3,
    Code: "002SK",
    name: "SKY CYBERPARK KARAWACI",
    address:
      "Jalan Bulevar Gajah Mada, Panunggangan Barat, Karawaci, RT.001/RW.009, Panunggangan Bar., Kec. Cibodas, Kota Tangerang, Banten 15138",
    longitude: "-6.220317308330536",
    latitude: "106.62009126765807",
    Quota: 800,
    Used: 800,
    status: "active",
  },
  {
    id: 4,
    Code: "003SK",
    name: "SKY KARAWACI OFFICE PARK",
    address:
      "Pinang Utara, RT.001/RW.006, Panunggangan Bar., Kec. Cibodas, Kota Tangerang, Banten 15138",
    longitude: "-6.22284433423623",
    latitude: "106.61860169904499",
    Quota: 2000,
    Used: 1800,
    status: "active",
  },
  {
    id: 5,
    Code: "901SK",
    name: "SKY BCA FORESTA",
    address:
      "Kav. Commercial Foresta Business Loft Lot. L1, Jl. BSD Raya Utama, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331",
    longitude: "-6.287336036272309",
    latitude: "106.63938310091616",
    Quota: 1000,
    Used: 1000,
    status: "active",
  },
  {
    id: 6,
    Code: "009SK",
    name: "SKY MAXBOXX LIPPO VILLAGE",
    address: "Bencongan, Kec. Tangerang, Kabupaten Tangerang, Banten 15118",
    longitude: "-6.227891204656627",
    latitude: "106.60568231225996",
    Quota: 1000,
    Used: 1000,
    status: "active",
  },
  {
    id: 7,
    Code: "005SK",
    name: "SKY ZONA 2 HELI",
    address:
      "Jl. Boulevard Diponegoro No.105, Klp. Dua, Kec. Klp. Dua, Kabupaten Tangerang, Banten 15810",
    longitude: "-6.226144475739573",
    latitude: "106.61024230097321",
    Quota: 2000,
    Used: 1500,
    status: "active",
  },
  {
    id: 8,
    Code: "05QSK",
    name: "SKY OT BUILDING",
    address:
      "Jl. Lkr. Luar Barat No.1 Kav. 35-36, RT.1/RW.3, Rawa Buaya, Cengkareng, West Jakarta City, Jakarta 11740",
    longitude: "-6.165931485829253",
    latitude: "106.72790509895599",
    Quota: 2000,
    Used: 1500,
    status: "active",
  },
  {
    id: 9,
    Code: "00000",
    name: "SKY HYPERMART KARAWACI",
    address:
      "Jl. Falatehan, Panunggangan Bar., Kec. Cibodas, Kota Tangerang, Banten 15138",
    longitude: "-6.221479376975427",
    latitude: "106.6190891160838",
    Quota: 2000,
    Used: 1500,
    status: "active",
  },
  {
    id: 10,
    Code: "00001",
    name: "SKY LIPPO THAMRIN",
    address:
      "Jl. MH. Thamrin, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530",
    longitude: "-6.333889744915961",
    latitude: "107.13692943859516",
    Quota: 2000,
    Used: 1500,
    status: "active",
  },
];

const itemsPerPage = 7;

function Location() {
  const [data, setData] = useState(lokasi);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const filteredData = data.filter((item) =>
    item.Code.toLowerCase().includes(filter.toLowerCase())
  );

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedData = filteredData.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <>
      <NavbarClient />
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <div className="flex justify-between mb-5">
            <div>
              <h1 className="text-start font-semibold text-xl">Location</h1>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder="Search history..."
              value={filter}
              onChange={handleFilterChange}
              className="border p-2 rounded-md text-xs w-52"
            />
            <div className="flex flex-row space-x-2">
              <div className="flex flex-row space-x-2 justify-end items-center text-emerald-500 border-l border-gray-300 px-3">
                <IoCloudDownloadOutline />
                <p className="text-xs">Export</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]">
                    #
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">
                    Location
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[40%]">
                    Address
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                    Quota
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                    Used
                  </th>
                  <th className="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">
                    Satus
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="p-2 text-start whitespace-nowrap text-xs font-medium text-gray-900">
                      {idx + 1}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.name}
                    </td>
                    <td className="p-2 text-start text-xs text-gray-900">
                      {item.address}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.Quota}
                    </td>
                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      {item.Used}
                    </td>

                    <td className="p-2 text-start whitespace-nowrap text-xs text-gray-900">
                      <span
                        className={`px-5 py-1 rounded-full text-xs font-reguler ${
                          item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 px-2 py-1 bg-gray-100">
              <span className="text-xs text-gray-500">Result 10 of 10</span>
              <div className="flex justify-center items-center">
                <span className="text-xs text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
