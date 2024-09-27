import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { apiLocations } from "../../../api/apiLocations";

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
  },
];

function Lokasi() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [locationData, setLocationData] = useState([]);
  const [filteredLokasi, setFilteredLokasi] = useState(lokasi);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await apiLocations.getLocation(page, limit);
  //     setLocationData(response.data);
  //   };

  //   fetchData();
  // }, [page, limit]);

  const data = [
    {
      Name: "SKY UNIVERSITAS PELITA HARAPAN",
      Address:
        "Jl. M.H. Thamrin Boulevard 1100, Lippo Village, Tangerang, Banten 15811",
    },
  ];

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  //   const term = event.target.value.toLowerCase();
  //   const filtered = lokasi.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(term) ||
  //       item.address.toLowerCase().includes(term)
  //   );
  //   setFilteredLokasi(filtered);
  // };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container">
        {/* <NavbarMobile /> */}
        <div className="flex flex-col items-start justify-start min-h-full w-full">
          <div className="flex w-full space-x-20 justify-start items-center py-3 bg-amber-300">
            <FaArrowLeftLong
              className="pl-3 w-10"
              onClick={() => handleBack()}
            />
            <h1 className="text-lg font-semibold px-3">Lokasi Member</h1>
          </div>

          <div className="w-full px-2 py-2">
            <input
              type="text"
              placeholder="Cari Lokasi"
              className="w-full p-3 mb-4 border rounded-md"
              value={searchTerm}
              // onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col space-y-2 items-start justify-start w-full px-2 py-2 max-h-[75vh] overflow-y-auto">
            {data.map((items, index) => (
              <div
                key={index}
                className="flex flex-row items-center shadow-md space-x-2 px-2 py-2 w-full border border-gray-300 rounded-lg bg-white"
              >
                <img
                  src={"/assets/lokasi/no-pictures.png"}
                  alt="lokasi"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col justify-start items-start text-xs w-full">
                  <h1 className="font-semibold text-sm text-start truncate w-full">
                    {items?.Name}
                  </h1>
                  {/* <h1 className="text-sm text-gray-400">Sisa kuota :</h1>
                  <div className="flex flex-row space-x-5 text-gray-500 justify-start w-full items-center">
                    <p>Mobil : {items.totalQuotaMobil}</p>
                    <p>Motor : {items.totalQuotaMotor}</p>
                  </div> */}
                  <div className="w-full border-b border-gray-200 my-2"></div>
                  <address className="text-start">{items.Address}</address>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lokasi;
