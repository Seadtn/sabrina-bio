import React from "react";
import { Link } from "react-router-dom";
import i18n from "../i18n/i18n";

const MostSellerCard = ({ product }) => {
  const isArabic = i18n.language === "ar";

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/dialog/send?app_id=YOUR_APP_ID&link=${encodeURIComponent(
      window.location.origin + `/product/${product.id}`
    )}&redirect_uri=${encodeURIComponent(window.location.origin)}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${product.title} - ${window.location.origin}/product/${product.id}`
    )}`;
    window.open(url, "_blank");
  };

  const shareOnInstagram = () => {
    alert(
      "Instagram does not support direct web sharing to messages. Use the app to share content."
    );
  };

  return (
    <div className="col4 product" style={{margin:"10px"}}>
      <div className="image-container">
        <Link to={`/product/${product.id}`} className="product-link">
          <img src={`${process.env.PUBLIC_URL}/images/slider/slide-${Math.floor(Math.random() * 3) + 1}.png`} alt={product.title.substring(0, 25)} />
        </Link>
      </div>
      <h2 className="product-title">
        {product.title.length > 25
          ? `${product.title.substring(0, 25)}...`
          : product.title}
      </h2>
      <p
        className="price"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        {product.price} {!isArabic ? "DT" : "دت"}
      </p>
      <button className="favorite-button">
        <i className="fas fa-heart"></i>
      </button>

      {/* Social Share Buttons */}
      <div className="share-buttons">
        <button onClick={shareOnFacebook} className="share-button facebook">
          <i className="fab fa-facebook"></i>
        </button>
        <button onClick={shareOnWhatsApp} className="share-button whatsapp">
          <i className="fab fa-whatsapp"></i>
        </button>
        <button onClick={shareOnInstagram} className="share-button instagram">
          <i className="fab fa-instagram"></i>
        </button>
      </div>
    </div>
  );
};

export default MostSellerCard;
