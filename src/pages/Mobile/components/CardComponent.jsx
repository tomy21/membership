import React from "react";

export default function CardComponent({ openModal, product }) {
  return (
    <div className="relative" onClick={() => openModal(product)}>
      <img
        src={
          product.TypeVehicle === "Mobil"
            ? "/assets/card03.png"
            : "/assets/card02.png"
        }
        alt={product.LocationName || "Product Image"}
        className="w-64 m-auto "
      />
      <div className="absolute bottom-0 left-[6rem] text-white flex flex-row justify-center items-center space-x-2 mb-4 w-32 text-start">
        {product &&
          product.TrxHistories &&
          product.TrxHistories.map((data) => (
            <p className="text-[10px] font-medium" key={data.Id}>
              {data.MemberProduct?.LocationName}
            </p>
          ))}
      </div>
    </div>
  );
}
