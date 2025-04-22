import React from "react";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../i18n/i18n.js";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteItems } from "../redux/favorite/slice.ts";
import { useTranslation } from "react-i18next";
import { addItems } from "../redux/cart/slice.ts";
import { openFastViewModal } from "../redux/fastView/slice.ts";

const ProductSliderCard = ({ product }) => {
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { favorites } = useSelector((state) => state.favorite);
  const isFavorited = favorites.some((item) => item.id === product.id);
  const { items } = useSelector((state) => state.cart);
  const isInCart = items.some((item) => item.id === product.id);
  const getDisplayPrice = () => {
    if (product.price === 0 && product.prices) {
      // Get the lowest price from the prices object
      const priceValues = Object.values(product.prices);
      return priceValues.length > 0 ?  Math.round(Math.min(...priceValues)) : 0;
    }
    return  Math.round(product.price);
  };

  const getName = (product) => {
    if (isArabic) {
      return product.name || product.nameFr || product.nameEng || "";
    } else if (isFrench) {
      return product.nameFr || product.name || product.nameEng || "";
    } else {
      return product.nameEng || product.name || product.nameFr || "";
    }
  };

  const displayPrice = getDisplayPrice();
  const promotionalPrice = product.promotion
    ? displayPrice - displayPrice * product.soldRatio * 0.01
    : null;
  const dispatch = useDispatch();
  const onClickAddFavoriteItems = () => {
    let favoriteItem = {};
    if (product.productType !== "STANDARD") {
      favoriteItem = {
        id: product.id,
        title: product.name,
        titleFr: product.nameFr,
        titleEng: product.nameEng,
        price: product.promotion
          ?  Math.round(displayPrice - displayPrice * product.soldRatio * 0.01)
          : getDisplayPrice(),
        imageUrl: `data:image/*;base64,${product.image}`,
        unit: product.availableOptions[0].unit,
        value: product.availableOptions[0].value,
        count: 0,
      };
    } else {
      favoriteItem = {
        id: product.id,
        title: product.name,
        titleFr: product.nameFr,
        titleEng: product.nameEng,
        price: product.promotion
          ?  Math.round(displayPrice - displayPrice * product.soldRatio * 0.01)
          : getDisplayPrice(),
        imageUrl: `data:image/*;base64,${product.image}`,
        unit: "",
        value: "",
        count: 0,
      };
    }
    dispatch(addFavoriteItems(favoriteItem));
  };
  const onClickAddItem = () => {
    dispatch(
      addItems({
        id: product.id ?? 0,
        count: 1,
        imageUrl: `data:image/*;base64,${product.image}`,
        price: product.promotion
          ?  Math.round(displayPrice - displayPrice * product.soldRatio * 0.01)
          : getDisplayPrice(),
        maxQuantity: product.quantity,
        type: product.productType,
        taste: product.availableOptions[0]?.taste,
        freeDelivery: product.freeDelivery === null ? false : product.freeDelivery,
        option:
          product.availableOptions[0]?.value >= 1000
            ? product.availableOptions[0]?.value / 1000
            : product.availableOptions[0]?.value,
        title: product.name,
        titleFr: product.nameFr,
        titleEng: product.nameEng,
      })
    );
  };
  const handleFastView = () => {
    dispatch(openFastViewModal(product));
  };
  return (
    <div className="col4 product" style={{ margin: "10px" }}>
      <div className="image-container">
        {product.productNew && (
          <div
            className="new-label"
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
            className={`${product.promotion ? "free-delivery-label1" : "free-delivery-label2"}`}
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {t("homePage.products.deliveryLabel")}
          </div>
        )}
        <Link to={`/product/${product.id}`} className="product-link">
          <img
            src={`data:image/*;base64,${product.image}`}
            alt={product.name.substring(0, 25)}
            loading="lazy"
          />
        </Link>
      </div>
      <h2 className="product-title">
        <>
          {(() => {
            const name = getName(product);

            const truncatedName =
              name?.length > 25 ? `${name.substring(0, 25)}...` : name;

            const unit = product.availableOptions?.[0]?.unit;
            const value = product.availableOptions?.[0]?.value;

            const localizedUnit =
              value >= 1000
                ? unit === "g"
                  ? isArabic
                    ? "كغ"
                    : "Kg"
                  : unit === "ml"
                    ? isArabic
                      ? "ل"
                      : "L"
                    : ""
                : unit === "g"
                  ? isArabic
                    ? "غ"
                    : "g"
                  : unit === "ml"
                    ? isArabic
                      ? "مل"
                      : "ml"
                    : "";

            const optionDisplay =
              product.productType !== "STANDARD" && value
                ? ` ${value >= 1000 ? value / 1000 : value} ${localizedUnit} `
                : "";

            return (
              <>
                {truncatedName}
                <small style={{ color: "gray" }}>{optionDisplay}</small>
              </>
            );
          })()}
        </>
      </h2>
      <button className="icon-fast-view-button" onClick={handleFastView}>
        <i className="fas fa-book"></i>
      </button>
      <div className="price-container">
        <p
          className={product.promotion ? "old-price" : "price"}
          dir={isArabic ? "rtl" : "ltr"}
          lang={isArabic ? "ar" : "fr"}
        >
          {displayPrice} {!isArabic ? "DT" : "دت"}
        </p>

        {product.promotion && (
          <p
            className="price"
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {promotionalPrice} {!isArabic ? "DT" : "دت"}
          </p>
        )}
      </div>
      {product.quantity === 0 && (
        <div style={{ color: "red", marginBottom: "2px", textAlign: "center" }}>
          {isArabic
            ? "المنتج نفذ من المخزون"
            : isFrench
              ? "Ce produit est épuisé"
              : "This product is sold out"}
        </div>
      )}
      <button
        className={isFavorited ? "favorite-button " : "unfavorite-button "}
        onClick={onClickAddFavoriteItems}
      >
        <i className="fas fa-heart"></i>
      </button>

      {/* Buy  Button */}
      {isInCart ? (
        <button className="view-cart-button" onClick={() => navigate("/cart")}>
          {t("homePage.products.viewCartBtn") || "View Cart"}
        </button>
      ) : product.productType === "STANDARD" ||
        (product.availableOptions.length <= 1 &&
          product.productType !== "STANDARD") ? (
        <button
          className="buy-button"
          onClick={() => onClickAddItem()}
          disabled={product.quantity === 0}
        >
          <i className="fas fa-shopping-cart"></i>{" "}
          {t("homePage.products.buyBtn")}
        </button>
      ) : (
        <button
          className="buy-button"
          onClick={() => navigate(`/product/${product.id}`)}
          disabled={product.quantity === 0}
        >
          <i className="fas fa-shopping-cart"></i>{" "}
          {t("homePage.products.buyBtn")}
        </button>
      )}
    </div>
  );
};

export default ProductSliderCard;
