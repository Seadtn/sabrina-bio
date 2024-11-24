import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { useTranslation } from "react-i18next";
import Arrows from "./arrows";
import MostSellerCard from "./MostSellerCard";
function MostSeller(props) {
    const { products } = props;
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <Arrows/>,  
    nextArrow: <Arrows />,  
  };

  return (
    <div>
      <h2 className="title">{t("homePage.mostSellerSection.title")}</h2>
      <div >
        <Slider {...settings}>
          {products.map((product) => {
            return <MostSellerCard product={product}/>
          })}
        </Slider>
      </div>
    </div>
  );
}

export default MostSeller;
