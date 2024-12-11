import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-transparent z-50">
      <ScaleLoader size={150} color={"#bbb"} loading={true} />
    </div>
  );
};

export default Loading;
