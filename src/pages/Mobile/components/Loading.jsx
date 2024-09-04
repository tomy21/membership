import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black w-full">
      <ScaleLoader
        size={150}
        color={"#ffff"}
        loading={true}
        style={{ margin: 0 }}
      />
    </div>
  );
};

export default Loading;
