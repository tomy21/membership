import React from "react";

export default function ErrorPage404() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-y-5">
        <img src={"/assets/404-error.png"} className="w-40" alt="" />
        <h1 className="text-2xl">
          Maaf halaman ini belum dapat di akses melalui desktop
        </h1>
      </div>
    </>
  );
}
