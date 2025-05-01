import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Arrows from "./arrows";
import { getAllCategories } from "../api/backend";
import i18n from "../i18n/i18n";

const Categories = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const [categories, setCategories] = React.useState([]);
  useEffect(() => { 
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    prevArrow: <Arrows />,
    nextArrow: <Arrows />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className="container" >
      <h2 className="title">{t("homePage.categories.title")}</h2>
      <Slider {...settings} 
      >
        {categories.map((category) => (
          <div className="newCategoryCardGroup" key={category.id}>
            <Link
              to={`/products?category=${category.id}`}
              className="CategoryCardGroup"
            >
              <img
                className="card-image"
                src={'data:image/jpeg;base64,' + arrayBufferToBase64(category.image)}
                alt={isArabic ? category.arabicName : isFrench ? category.frenchName : category.englishName}
                loading="lazy"
              />
            </Link>
            <div className="category-text">{isArabic ? category.arabicName : isFrench ? category.frenchName : category.englishName}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
