import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CartEmpty from "./pages/CartEmpty";
import CartItem from "./pages/CartItem";
import OrderBlock from "./pages/OrderBlock";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n.js";
const Cart = () => {
  const { totalPrice, items } = useSelector((state) => state.cart);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMountedCart = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isMountedCart.current) {
      const dataCart = JSON.stringify(items);
      localStorage.setItem("cart", dataCart);
    }
    isMountedCart.current = true;
  }, [items]);

  return (
    <>
      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <section className="cart">
            <div
              className="container"
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "fr"}
            >
              <div className="cart__title">{t("cartPage.cart.title")}</div>
              <div className="cart__orders">
                {items.map((item) => (
                  <CartItem key={item.newId} {...item} />
                ))}
              </div>
              <div className="cart__fullsum">
                <span>{t("cartPage.cart.total")} :</span> {totalPrice} {!isArabic ? "DT" : "دت"}
              </div>
            </div>
          </section>
          <section className="order">
            <div
              className="container"
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "fr"}
            >
              <h3 className="order__title">{t("cartPage.order.title")}</h3>
              <OrderBlock />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
