import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../redux/cart/slice.ts";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n/i18n.js";

const ProductOfTheYear = ({ productOTY }) => {
  const product = productOTY?.product;
  const { t } = useTranslation();

  const getDisplayPrice = () => {
    if (product?.price === 0 && product?.prices) {
      const priceValues = Object.values(product?.prices);
      return priceValues.length > 0 ? Math.round(Math.min(...priceValues)) : 0;
    }
  };
  const navigate = useNavigate();
  const displayPrice = getDisplayPrice();
  const dispatch = useDispatch();
  const isArabic = i18n.language === "ar";
  const onClickAddItem = () => {
    dispatch(
      addItems({
        id: product?.id ?? 0,
        count: 1,
        imageUrl: `data:image/*;base64,${product?.image}`,
        price: product?.promotion
          ? Math.round(displayPrice - displayPrice * product?.soldRatio * 0.01)
          : getDisplayPrice(),
        maxQuantity: product?.quantity,
        type: product?.productType,
        taste: product?.availableOptions[0]?.taste,
        option:product?.availableOptions[0]?.value,
        freeDelivery: product?.freeDelivery,
        title: product?.name,
        titleFr: product?.nameFr,
        titleEng: product?.nameEng,
      })
    );
  };
  const { items } = useSelector((state) => state.cart);

  const isInCart = items.some((item) => item.id === product.id);

  return (
    <div>
      <h2 className="title">{t("homePage.menu.ProductOfTheYear")}</h2>
      <section className="product-of-year-section">
        <div className="product-of-year-wrapper">
        {product.productNew && (
          <div
            className="new-label"
            style={{marginTop:"5px"}}
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {t("homePage.products.newLabel")}
          </div>
        )}
        {product.promotion && (
          <div
            className={`${product.productNew ? "sold-label1" : "sold-label2"}`}
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {t("homePage.products.soldLabel")}
          </div>
        )}
        {product.freeDelivery && (
          <div
            className={
              (!product.promotion && !product.productNew) 
                ? "free-delivery-label3"
                : (product.promotion && !product.productNew) ||
                  (!product.promotion && product.productNew)
                  ? "free-delivery-label2"
                  : "free-delivery-label1"
            }
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {t("homePage.products.deliveryLabel")}
          </div>
        )}
          <div className="product-image">
            <img
              src={`data:image/*;base64,${productOTY?.image}`}
              alt="product of the Year"
              loading="lazy"
              onClick={() => navigate(`/product/${product?.id}`)}
            />
          </div>
          <div className="product-info">
            <h2 className="poty-title">{productOTY?.product?.name}</h2>
            {isInCart ? (
              <button
                className="buy-button-poty"
                onClick={() => navigate("/cart")}
              >
                {t("homePage.products.viewCartBtn") || "View Cart"}
              </button>
            ) : product.productType === "STANDARD" ||
              (product.availableOptions.length <= 1 &&
                product.productType !== "STANDARD") ? (
              <button
                className="buy-button-poty"
                onClick={() => onClickAddItem()}
                disabled={product.quantity === 0}
              >
                <i className="fas fa-shopping-cart"></i>{" "}
                {t("homePage.products.buyBtn")}
              </button>
            ) : (
              <button
                className="buy-button-poty"
                onClick={() => navigate(`/product/${product.id}`)}
                disabled={product.quantity === 0}
              >
                <i className="fas fa-shopping-cart"></i>{" "}
                {t("homePage.products.buyBtn")}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductOfTheYear;
