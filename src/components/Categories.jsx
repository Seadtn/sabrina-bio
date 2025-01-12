import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

const Categories = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const img = [
    {
      url: "/images/Categories/herbs.jpg", // Replace with a real image URL for herbs
      path: "homePage.products.category.herbs",
    },
    {
      url: "/images/Categories/oils.jpg", // Replace with a real image URL for oils
      path: "homePage.products.category.oils",
    },
    {
      url: "/images/Categories/cosmetics.jpg", // Replace with a real image URL for cosmetics
      path: "homePage.products.category.cosmetic",
    },
    {
      url: "/images/Categories/diseases.jpg", // Replace with a real image URL for cosmetics
      path: "homePage.products.category.diseases",
    },
    {
      url: "/images/Categories/pain.jpg", // Replace with a real image URL for cosmetics
      path: "homePage.products.category.pain",
    },
  ];

  return (
    <div >
      <h2 className="title">{t("homePage.categories.title")}</h2>
      <div
        className="row"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        {img.map((image) => (
          <div
            key={image.path}
            className="CategoryCardGroup"
          >
            <img className="card-image" src={process.env.PUBLIC_URL+image.url} alt="" />
            <div className="category-text">{t(image.path)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
