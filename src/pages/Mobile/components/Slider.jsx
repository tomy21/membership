import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponent from "./CardComponent";

export default function SliderComponent({ openModal }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
  };
  return (
    <>
      <Slider {...settings}>
        <CardComponent openModal={openModal} />
        <CardComponent openModal={openModal} />
        <CardComponent openModal={openModal} />
      </Slider>
    </>
  );
}
