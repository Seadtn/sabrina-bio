import React from "react";
import { Link } from "react-router-dom";
import emptyImg from "../../../assets/img/empty-cart.png";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n.js";
const CartEmpty = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <div
      className="cart__empty"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      <div className="container">
        <h2>{t("cartPage.cart.empty.title")}</h2>
        <img src={emptyImg} alt="Empty cart" />
        <p>
        {t("cartPage.cart.empty.desc1")}
          <br />
          {t("cartPage.cart.empty.desc2")}
        </p>
        <Link to="/sabrina-bio/products" className="cart__button-back">
          <span>{t("cartPage.cart.empty.btn")}</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
