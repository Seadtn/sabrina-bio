import React from "react";
import { Link } from "react-router-dom";
import i18n from "../i18n/i18n";

const MostSellerCard = ({ product }) => {
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";

  // Function to detect if the user is on a mobile device
const isMobile = () => {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
};

// Share on Facebook Messenger
const shareOnMessenger = () => {
  const link = `${window.location.origin}/product/${product.id}`;
  const app_id = '504118245453297'; // Replace with your Facebook app ID

  if (isMobile()) {
    // Use Messenger deep link for mobile
    const url = `fb-messenger://share?link=${encodeURIComponent(link)}&app_id=${encodeURIComponent(app_id)}`;
    window.open(url, '_blank');
  } else {
    // Fallback to Messenger's web share link for desktop
    const url = `https://www.messenger.com/t/?link=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  }
};

// Share on WhatsApp
const shareOnWhatsApp = () => {
  const link = `${window.location.origin}/product/${product.id}`;

  if (isMobile()) {
    // WhatsApp deep link for mobile
    const url = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  } else {
    // WhatsApp Web share for desktop
    const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  }
};

// Share on Telegram
const shareOnTelegram = () => {
  const link = `${window.location.origin}/product/${product.id}`;

  if (isMobile()) {
    // Telegram deep link for mobile
    const url = `tg://msg_url?url=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  } else {
    // Telegram Web share for desktop
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}`;
    window.open(url, '_blank');
  }
};
const getDisplayPrice = () => {
  if (product.price === 0 && product.prices) {
    // Get the lowest price from the prices object
    const priceValues = Object.values(product.prices);
    return priceValues.length > 0 ? Math.min(...priceValues) : 0;
  }
  return product.price;
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
// Get the actual price to display
const displayPrice = getDisplayPrice();

  return (
    <div className="col4 product" style={{ margin: "10px" }}>
      <div className="image-container">
        <Link
          to={`/product/${product.id}`}
          className="product-link"
        >
          <img
            src={`data:image/*;base64,${product.image}`}
            alt={product.name.substring(0, 25)}
          />
        </Link>
      </div>
      <h2 className="product-title">
      <>
          {(() => {
            const name = getName(product)

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

      {product.promotion === true ? (
        <p
          className="price"
          dir={isArabic ? "rtl" : "ltr"}
          lang={isArabic ? "ar" : "fr"}
        >
          {displayPrice - displayPrice * product.soldRatio * 0.01}{" "}
          {!isArabic ? "DT" : "دت"}
        </p>
      ) : (
        <p
          className="price"
          dir={isArabic ? "rtl" : "ltr"}
          lang={isArabic ? "ar" : "fr"}
        >
          {displayPrice} {!isArabic ? "DT" : "دت"}
        </p>
      )}
      <button className="favorite-button">
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

export default MostSellerCard;
