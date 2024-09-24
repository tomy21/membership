import React, { useEffect, useState } from "react";

export default function CardComponent({ openModal, product }) {
  const [vehicleType, setVehicleType] = useState("");

  useEffect(() => {
    if (product?.TrxHistories?.[0]?.MemberProduct?.VehicleType) {
      setVehicleType(product.TrxHistories[0].MemberProduct.VehicleType);
    } else {
      setVehicleType("Motor");
    }
  }, [product]);

  return (
    <div className="relative" onClick={() => openModal(product)}>
      <img
        src={
          vehicleType === "Mobil" ? "/assets/card03.png" : "/assets/card02.png"
        }
        alt={product?.PlateNumber || "Product Image"}
        className="w-64 m-auto "
      />
      <div className="absolute bottom-0 left-[4rem] text-white flex flex-row justify-center items-center space-x-2 mb-4 w-32 text-start">
        {product?.PlateNumber}
      </div>
    </div>
  );
}
