import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cart/slice.ts";
import { addFavoriteItems } from "../redux/favorite/slice.ts";
import { openFastViewModal } from "../redux/fastView/slice.ts";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  // eslint-disable-next-line
  const isFrench = i18n.language === "fr";

  const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
      navigator.userAgent
    );
  };
  const navigate = useNavigate();
  // Share on Facebook Messenger
  const shareOnMessenger = () => {
    const link = `${window.location.origin}/product/${product.id}`;
    const app_id = "504118245453297"; // Replace with your Facebook app ID

    if (isMobile()) {
      // Use Messenger deep link for mobile
      const url = `fb-messenger://share?link=${encodeURIComponent(link)}&app_id=${encodeURIComponent(app_id)}`;
      window.open(url, "_blank");
    } else {
      // Fallback to Messenger's web share link for desktop
      const url = `https://www.messenger.com/t/?link=${encodeURIComponent(link)}`;
      window.open(url, "_blank");
    }
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const link = `${window.location.origin}/product/${product.id}`;

    if (isMobile()) {
      // WhatsApp deep link for mobile
      const url = `https://wa.me/?text=${encodeURIComponent(link)}`;
      window.open(url, "_blank");
    } else {
      // WhatsApp Web share for desktop
      const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(link)}`;
      window.open(url, "_blank");
    }
  };

  // Share on Telegram
  const shareOnTelegram = () => {
    const link = `${window.location.origin}/product/${product.id}`;

    if (isMobile()) {
      // Telegram deep link for mobile
      const url = `tg://msg_url?url=${encodeURIComponent(link)}`;
      window.open(url, "_blank");
    } else {
      // Telegram Web share for desktop
      const url = `https://t.me/share/url?url=${encodeURIComponent(link)}`;
      window.open(url, "_blank");
    }
  };
  const onClickAddItem = () => {
    dispatch(
      addItems({
        id: product.id ?? 0,
        count: 1,
        imageUrl: `data:image/*;base64,${product.image}`,
        price: product.promotion
          ? product.price - product.price * (product.soldRatio * 0.01)
          : product.price,
        maxQuantity: product.quantity,
        type: product.productType,
        title: isArabic ? product.name  : isFrench ? product.nameFr :product.nameEng ,
      })
    );
  };
  const getDisplayPrice = () => {
    if ( product.prices && product.productType!=="STANDARD") {
      const priceValues = Object.values(product.prices);
      return priceValues.length > 0 ? Math.min(...priceValues) : 0;
    }
    return product.price;
  };

  const displayPrice = getDisplayPrice();

  const promotionalPrice = product.promotion
    ? displayPrice - displayPrice * product.soldRatio * 0.01
    : null;
  const onClickAddFavoriteItems = () => {
    const favoriteItem = {
      id: product.id,
      title: product.name,
      price: product.promotion
        ? product.price - product.price * (product.soldRatio * 0.01)
        : product.price,
      imageUrl: `data:image/*;base64,${product.image}`,
      count: 0,
    };
    dispatch(addFavoriteItems(favoriteItem));
  };
  const handleFastView = () => {
    dispatch(openFastViewModal(product));
  };
  return (
    <div className="col4 product">
      <div className="image-container">
        {/* New Label */}
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

        <Link to={`/product/${product.id}`} className="product-link">
          <img
            src={`data:image/*;base64,${product.image}`}
            alt={product.name?.substring(0, 25)}
          />
        </Link>
        <div
          className="hover-buttons"
          dir={isArabic ? "rtl" : "ltr"}
          lang={isArabic ? "ar" : "fr"}
        >
          <button className="fast-view-button" onClick={handleFastView}>
            <i className="fas fa-eye"></i> {t("homePage.products.viewBtn")}
          </button>
          {product.productType === "STANDARD" ? (
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
      </div>
      <h2
        className="product-title"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : isFrench ? "fr" : "en"}
      >
        <>
          {(() => {
            const name = isArabic
              ? product.name
              : isFrench
                ? product.nameFr
                : product.nameEng;

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
      <button className="favorite-button" onClick={onClickAddFavoriteItems}>
        <i className="fas fa-heart"></i>
      </button>

      {/* Social Share Buttons */}
      <div className="share-buttons">
        <button onClick={shareOnMessenger} className="share-button messenger">
          <i className="fab fa-facebook-messenger"></i> {/* Messenger icon */}
        </button>
        <button onClick={shareOnWhatsApp} className="share-button whatsapp">
          <i className="fab fa-whatsapp"></i>
        </button>
        <button onClick={shareOnTelegram} className="share-button telegram">
          <i className="fab fa-telegram"></i> {/* Telegram icon */}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
