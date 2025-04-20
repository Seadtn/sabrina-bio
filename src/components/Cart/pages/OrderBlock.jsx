import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n.js";
import { addNewCommand } from "../../../api/backend.js";
import SuccessModal from "../../Modals/ModalConfirmation/SuccessModal.js";
import { resetCart } from "../../../redux/cart/slice.ts";
const OrderBlock = () => {
  const dispatch = useDispatch();
  const { totalPrice,items } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMountedCart = useRef(false);
  // Success modal state
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (isMountedCart.current) {
      const dataCart = JSON.stringify(items);
      localStorage.setItem("cart", dataCart);
    }
    isMountedCart.current = true;
  }, [items]);
  const hasFreeDeliveryItem = () => {
    return items.some((item) => item.freeDelivery === true);
  };
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
      totalPrice: hasFreeDeliveryItem() ?totalPrice : totalPrice + 8 ,
      creationDate: new Date().toISOString().split("T")[0],
      confirmationDate: "",
      status: "Pending",
      commandProducts: items.map((product) => ({
        product: {
          id: product.id,
          name: product.title,
          productType:product.type,
        },
        prix: product.price,
        quantity: product.count,
        taste:product.taste,
        unit:product.option,
      })),
    };

    try {
      await addNewCommand(orderData);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      {/* Order form */}
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
                type="tel"
                name="tel"
                maxLength={8}
                max={8}
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
                className={`data__input ${isArabic ? "input-ar" : "input-fr"}`}
                placeholder={t("cartPage.input.phone")}
                required
              />
              <input
                type="tel"
                name="tel2"
                maxLength={8}
                max={8}
                dir={isArabic ? "rtl" : "ltr"}
                lang={isArabic ? "ar" : "fr"}
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
                <input
                  type="radio"
                  name="payment"
                  value="Poste"
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
          <div
            className="order__style"
          >
            {t("cartPage.order.leftLine11")} :{" "}
            <span style={hasFreeDeliveryItem() ? { textDecoration: "line-through" }:{} }>{t("cartPage.order.leftLine12")}</span>
          </div>
          <div className="order__style">
            {t("cartPage.order.leftLine2")} :{" "}
            <span>
              {hasFreeDeliveryItem() ?   totalPrice :totalPrice + 8}{" "}
              {!isArabic ? "DT" : "دت"}
            </span>
          </div>
          <button className="order__button" type="submit">
            <span>{t("cartPage.order.title")}</span>
          </button>
          <div className="order__politics">
            {t("cartPage.order.closingPhrase")}
          </div>
        </div>
      </form>

      {/* Success Modal */}
      <SuccessModal
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          dispatch(resetCart());
          localStorage.setItem("cart");
        }}
        message={t("cartPage.order.successMessage")}
      />
    </>
  );
};

export default OrderBlock;
