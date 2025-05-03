import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { addNewCommand } from "../api/backend.js";
import SuccessModal from "./Modals/ModalConfirmation/SuccessModal.js";
import { resetCart } from "../redux/cart/slice.ts";
import i18n from "../i18n/i18n.js";
import { useDispatch } from "react-redux";

const FastOrderBlock = ({ product, price, option, taste }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const formRef = useRef(null);

  const hasFreeDeliveryItem = () => product.freeDelivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      firstName: formData.get("name"),
      lastName: formData.get("surname"),
      phone2: formData.get("tel2"),
      mail: "",
      phone: formData.get("tel"),
      city: formData.get("city"),
      postalCode: formData.get("Code Postal"),
      paymentMethod: formData.get("payment"),
      totalPrice: hasFreeDeliveryItem() ? Math.round(price * quantity) : Math.round((price * quantity) + 8),
      creationDate: new Date().toISOString().split("T")[0],
      confirmationDate: "",
      status: "Pending",
      commandProducts: [{
        product: {
          id: product.id,
          name: product.title,
          productType: product.type,
        },
        prix: Math.round(price),
        quantity: quantity,
        taste: taste,
        unit: option,
      }]
    };

    try {
      await addNewCommand(orderData);
      setSuccessModalOpen(true);
      dispatch(resetCart());
      localStorage.setItem("cart");
      formRef.current.reset();
      setQuantity(1);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <form
        ref={formRef}
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
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                placeholder={t("cartPage.input.firstName")}
                required
              />
              <input
                type="text"
                name="surname"
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
                placeholder={t("cartPage.input.lastName")}
                required
              />
            </div>
            <div className="data__column">
              <input
                type="tel"
                name="tel"
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                maxLength={8}
                className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
                placeholder={t("cartPage.input.phone")}
                required
              />
              <input
                type="tel"
                name="tel2"
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                maxLength={8}
                className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
                placeholder={t("cartPage.input.phone2")}
              />
            </div>
          </fieldset>

          <h4 className="data__label">{t("cartPage.order.catchPhrase2")}</h4>
          <fieldset className="fieldset">
            <div className="data__column">
              <input
                type="text"
                name="city"
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
                placeholder={t("cartPage.input.city")}
                required
              />
              <input
                type="number"
                name="Code Postal"
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
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
                <input
                  type="radio"
                  name="payment"
                  value="Poste"
                  dir={isArabic ? "rtl" : "ltr"}
                  lang={isArabic ? "ar" : "fr"}
                  required
                  style={{ width: "20px" }}
                  className={`${isArabic ? "input-ar" : "input-fr"}`}
                />
                <div className="text">{t("cartPage.order.phraseTic3")}</div>
              </label>
              <label className="fieldset__item">
                <input
                  type="radio"
                  name="payment"
                  value="Especes"
                  dir={isArabic ? "rtl" : "ltr"}
                  lang={isArabic ? "ar" : "fr"}
                  required
                  style={{ width: "20px" }}
                  className={`${isArabic ? "input-ar" : "input-fr"}`}
                />
                <div className="text">{t("cartPage.order.phraseTic2")}</div>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="order__column">
          <div className="order__style">
            {t("cartPage.order.leftLine11")} :{" "}
            <span style={hasFreeDeliveryItem() ? { textDecoration: "line-through" } : {}}>
              {t("cartPage.order.leftLine12")}
            </span>
          </div>
          <div className="order__style">
            {t("cartPage.order.leftLine2")} :{" "}
            <span>
              {hasFreeDeliveryItem() ? Math.round(price * quantity) : Math.round((price * quantity) + 8)}{" "}
              {!isArabic ? "DT" : "دت"}
            </span>
          </div>

          {/* Quantity controls */}
          <div className="quantity__control" style={{ display: "flex", alignItems: "center",width: "50%" }}>
            <button className="btn-primary" type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button className="btn-primary" type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          <button className="order__button" type="submit" disabled={quantity < 1}>
            <span>{t("cartPage.order.title")}</span>
          </button>
          <div className="order__politics">{t("cartPage.order.closingPhrase")}</div>
        </div>
      </form>

      <SuccessModal
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        message={t("cartPage.order.successMessage")}
      />
    </>
  );
};

export default FastOrderBlock;
