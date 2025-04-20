import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Arrows from "./arrows";

const Categories = () => {
  const { t } = useTranslation();
  
  const img = [
    { id: 4, url: "/images/Categories/herbs.jpg", path: "homePage.products.category.herbs" },
    { id: 2, url: "/images/Categories/oils.jpg", path: "homePage.products.category.oils" },
    { id: 1, url: "/images/Categories/cosmetics.jpg", path: "homePage.products.category.cosmetic" },
    { id: 5, url: "/images/Categories/diseases.jpg", path: "homePage.products.category.diseases" },
    { id: 3, url: "/images/Categories/pain.jpg", path: "homePage.products.category.pain" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
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
  };

  return (
    <div className="container">
      <h2 className="title">{t("homePage.categories.title")}</h2>
      <Slider {...settings}>
        {img.map((image) => (
          <div className="newCategoryCardGroup" key={image.id}>
            <Link
              to={`/products?category=${image.id}`}
              className="CategoryCardGroup"
            >
              <img
                className="card-image"
                src={process.env.PUBLIC_URL + image.url}
                alt={t(image.path)}
                loading="lazy"
              />
            </Link>
            <div className="category-text">{t(image.path)}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
