import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n.js";
const OrderBlock = () => {
  const { totalPrice } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <form
      autoComplete="on"
      className="order__row"
      action=""
      method="post"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      <div className="order__column">
        <h4 className="data__label">{t("cartPage.order.catchPhrase1")}</h4>
        <fieldset className="fieldset">
          <div className="data__column">
            <input
              type="text"
              name="name"
              className="data__input"
              placeholder={t("cartPage.input.firstName")}
              required
              pattern="[a-zA-Zа-яґєіїА-ЯҐЄІЇ]+"
              title="The name field can contain only letters"
            />
            <input
              type="text"
              name="surname"
              className="data__input"
              placeholder={t("cartPage.input.lastName")}
              required
              pattern="[a-zA-Zа-яґєіїА-ЯҐЄІЇ]+"
              title="The last name field can only contain letters"
            />
          </div>
          <div className="data__column">
            <input
              type="text"
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              name="email"
              className="data__input"
              placeholder={t("cartPage.input.mail")}
              title="The email address must be in example@gmail.com format"
              required
            />
            <input
              type="tel"
              name="tel"
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "fr"}
              pattern="[0-9]{8}"
              className="data__input"
              placeholder={t("cartPage.input.phone")}
              inputMode="numeric"
              minLength="8"
              maxLength="8"
              title="00000000"
              required
            />
          </div>
        </fieldset>
        <h4 className="data__label">{t("cartPage.order.catchPhrase2")}</h4>
        <fieldset className="fieldset">
          <div className="data__column">
            <input
              type="text"
              name="city"
              className="data__input"
              placeholder={t("cartPage.input.city")}
              pattern="[a-zA-Zа-яґєіїА-ЯҐЄІЇ]+"
              title="The city field can only contain letters"
              required
            />
            <input
              type="number"
              name="Code Postal"
              className="data__input"
              placeholder={t("cartPage.input.postalCode")}
              title="This field can only contain numbers"
              required
            />
          </div>
        </fieldset>
        <h4 className="data__label">{t("cartPage.order.catchPhrase3")}</h4>
        <fieldset className="fieldset">
          <div className="data__column">
          <label className="fieldset__item">
              <input type="radio" className="data__payment" name="payment" />
              <div className="text">{t("cartPage.order.phraseTic3")}</div>
            </label>
            <label className="fieldset__item">
              <input type="radio" className="data__payment" name="payment" />
              <div className="text">{t("cartPage.order.phraseTic2")}</div>
            </label>
          </div>
          <div className="data__column">
          </div>
        </fieldset>
      </div>
      <div className="order__column">
        <div className="order__style">
        {t("cartPage.order.leftLine11")} : <span>{t("cartPage.order.leftLine12")}</span>
        </div>
        <div className="order__style">
          {t("cartPage.order.leftLine2")} : <span>{totalPrice} {!isArabic ? "DT" : "دت"}</span>
        </div>
        <button className="order__button" type="submit" formMethod="post">
          <span>{t("cartPage.order.title")}</span>
        </button>
        <div className="order__politics">
          {t("cartPage.order.closingPhrase")}{" "}
        </div>
      </div>
    </form>
  );
};

export default OrderBlock;
