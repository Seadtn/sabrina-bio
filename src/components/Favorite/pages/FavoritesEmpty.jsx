import React from "react";
import { Link } from "react-router-dom";

import favorites from "../../../assets/img/favorites.svg";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n.js";
const FavoritesEmpty = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <>
      <div
        className="favorites__empty"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <div className="container">
          <h2>{t("cartPage.order.empty.title")}</h2>
          <img src={favorites} alt="Empty favorites" loading="lazy"/>
          <p>
          {t("cartPage.order.empty.desc1")}
            <br />
            {t("cartPage.order.empty.desc2")}
          </p>
          <Link to="/products" className="favorites__button-back">
            <span>{t("cartPage.order.empty.btn")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FavoritesEmpty;
