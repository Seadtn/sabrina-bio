import React from "react";
import SliderData from "../SliderData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

const BannerSection = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  return (
    <div className="homeSlide" style={{ position: "relative" }}>
      <div
        className="background-overlay img__slider"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/slider/slider-background-${isArabic ? "ar": "fren"}.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right:0,
          zIndex:1,
          width: "100%",
          height: "100%",
        }}
      ></div>

      {/* Slider Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Slider {...settings}>
          {SliderData.map((slider, index) => {
            return (
              <div
                className="box"
                key={index}
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
              >
                <div className={`left-${isArabic ? "ar" : "fr"}`}>
                  <div>
                    <h1>
                      {t(`homePage.slider.type.${slider.type}`, {
                        itm: slider.Percent,
                      })}
                    </h1>
                    <p>{t("homePage.slider.description")}</p>
                    <button className="btn-primary">
                      <Link to="/products" className="btn-link">
                        {t("homePage.slider.collectionBtn")}
                      </Link>
                    </button>
                  </div>

                  <img
                    src={process.env.PUBLIC_URL + slider.cover}
                    alt="slider"
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default BannerSection;
