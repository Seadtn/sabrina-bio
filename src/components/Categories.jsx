import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { Link } from "react-router-dom";

const Categories = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const img = [
    { id: 4, url: "/images/Categories/herbs.jpg", path: "homePage.products.category.herbs" },
    { id: 2, url: "/images/Categories/oils.jpg", path: "homePage.products.category.oils" },
    { id: 1, url: "/images/Categories/cosmetics.jpg", path: "homePage.products.category.cosmetic" },
    { id: 5, url: "/images/Categories/diseases.jpg", path: "homePage.products.category.diseases" },
    { id: 3, url: "/images/Categories/pain.jpg", path: "homePage.products.category.pain" },
  ];

  return (
    <div>
      <h2 className="title">{t("homePage.categories.title")}</h2>
      <div
        className="row"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        {img.map((image) => (
          <Link
            key={image.path}
            to={`/products?category=${image.id}`} // Pass the category ID in the query
            className="CategoryCardGroup"
          >
            <img
              className="card-image"
              src={process.env.PUBLIC_URL + image.url}
              alt={t(image.path)}
            />
            <div className="category-text">{t(image.path)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
