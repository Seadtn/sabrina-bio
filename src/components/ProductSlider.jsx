import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import Arrows from "./arrows";
import ProductSliderCard from "./ProductSliderCard";

function ProductSlider(props) {
  const { products,title } = props;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: products.length <4 ? products.length : 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <Arrows />,
    nextArrow: <Arrows />,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: products.length <3 ? products.length : 3,
        },
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: products.length <2 ? products.length : 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: products.length <1 ? products.length : 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2 className="title">{title}</h2>
      <div>
        <Slider {...settings}>
          {products.map((product, index) => (
            <ProductSliderCard key={index} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductSlider;
