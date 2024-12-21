import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n.js";
import { addNewCommand } from "../../../api/backend.js";

const OrderBlock = () => {
  const { totalPrice, items } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMountedCart = useRef(false);

  useEffect(() => {
    console.log(items)
    if (isMountedCart.current) {
      const dataCart = JSON.stringify(items);
      localStorage.setItem("cart", dataCart);
    }
    isMountedCart.current = true;
  }, [items]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const orderData = {
      firstName: formData.get("name"),
      lastName: formData.get("surname"),
      mail: formData.get("email"),
      phone: formData.get("tel"),
      city: formData.get("city"),
      postalCode: formData.get("Code Postal"),
      paymentMethod: formData.get("payment"),
      totalPrice: totalPrice,
      status:"Pending",
      commandProducts: items.map((product) => ({
        product: {
          id: product.id, 
          name: product.name,
          price: product.price,
        },
        quantity: product.count,
      })),
    };

    try {
      await addNewCommand(orderData); 
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form
      autoComplete="on"
      className="order__row"
      onSubmit={handleSubmit}
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
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.firstName")}
              required
            />
            <input
              type="text"
              name="surname"
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.lastName")}
              required
            />
          </div>
          <div className="data__column">
            <input
              type="email"
              name="email"
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.mail")}
              required
            />
            <input
              type="tel"
              name="tel"
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "fr"}
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.phone")}
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
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.city")}
              required
            />
            <input
              type="number"
              name="Code Postal"
              className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
              placeholder={t("cartPage.input.postalCode")}
              required
            />
          </div>
        </fieldset>
        <h4 className="data__label">{t("cartPage.order.catchPhrase3")}</h4>
        <fieldset className="fieldset">
          <div className="data__column">
            <label className="fieldset__item">
              <input type="radio" name="payment" value="creditCard" required />
              <div className="text">{t("cartPage.order.phraseTic3")}</div>
            </label>
            <label className="fieldset__item">
              <input type="radio" name="payment" value="paypal" required />
              <div className="text">{t("cartPage.order.phraseTic2")}</div>
            </label>
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
        <button className="order__button" type="submit">
          <span>{t("cartPage.order.title")}</span>
        </button>
        <div className="order__politics">
          {t("cartPage.order.closingPhrase")}
        </div>
      </div>
    </form>
  );
};

export default OrderBlock;
