import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "./CardComponent";

export default function SliderComponent({ openModal, memberProducts }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
  };

  console.log(memberProducts);

  if (memberProducts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <img src={"/card-member.png"} className="w-36" alt="No Member" />
        <p className="text-base font-normal -mt-5 text-slate-400">
          Kamu belum ada member
        </p>
      </div>
    );
  }

  if (memberProducts.length === 1) {
    return (
      <div>
        {memberProducts.map((product, index) => (
          <CardComponent key={index} product={product} openModal={openModal} />
        ))}
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {memberProducts.map((product, index) => (
        <CardComponent key={index} product={product} openModal={openModal} />
      ))}
    </Slider>
  );
}
