import React, { useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";

function Location() {
  const [activeTab, setActiveTab] = useState("Locations");
  return (
    <>
      <HeaderTitle
        title={"Location"}
        subtitle={"View List Location Membership"}
        setActiveTab={activeTab}
      />
    </>
  );
}

export default Location;
