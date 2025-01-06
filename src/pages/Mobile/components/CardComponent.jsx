import React, { useEffect, useState } from "react";
import { vehicleAdd } from "../../../api/apiBayarind";

export default function CardComponent({ openModal, product }) {
  // console.log(product);
  const [listLocationCard, setListLocationCard] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await vehicleAdd.getDetailVehicle(product.id);
      const data = response.data;
      setListLocationCard(data.membership);
    } catch {
      console.log("error");
    }
  };
  console.log(listLocationCard.length);
  return (
    <div
      className="relative w-full max-w-sm mx-auto cursor-pointer"
      onClick={() => openModal(product)}
    >
      <img
        src={
          product.vehicle_type === "MOBIL"
            ? "/assets/card03.png"
            : "/assets/card02.png"
        }
        alt={product?.rfid || "Product Image"}
        className="w-64 m-auto "
      />
      {product?.rfid && (
        <div
          className={`absolute bottom-[5%] left-[20%] sm:top-6 sm:left-6 text-white text-xs sm:text-sm px-3 py-2 rounded-full ${
            listLocationCard.length > 0 ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ whiteSpace: "nowrap" }}
        >
          {product?.rfid}
        </div>
      )}
    </div>
  );
}
