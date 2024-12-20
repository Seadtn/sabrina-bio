import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../redux/cart/slice.ts";
import { addFavoriteItems } from "../redux/favorite/slice.ts";
import ModalCart from "./Modals/ModalCart/ModalCart.jsx";
import ModalFavorites from "./Modals/ModalFavorites/ModalFavorites.jsx";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  // eslint-disable-next-line
  const { items, successModal, errorModal } = useSelector(
    (state) => state.cart
  );
  // eslint-disable-next-line
  const { favorites, errorFavModal, successFavModal } = useSelector(
    (state) => state.favorite
  );
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const dataCart = JSON.stringify(items);
      localStorage.setItem("cart", dataCart);
      const dataFavorites = JSON.stringify(favorites);
      localStorage.setItem("favorites", dataFavorites);
    }
    isMounted.current = true;
  }, [items, favorites]);
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
  const onClickAddItem = () => {
    dispatch(
      addItems({
        id: product.id ?? 0,
        count: 1,
        imageUrl:`data:image/*;base64,${product.image}`,
        price: product.price,
        title: product.name,
        newId: Math.random(Math.random(1, 50), Math.random(100, 2000)),
      })
    );
  };
  const shareOnInstagram = () => {
    alert(
      "Instagram does not support direct web sharing to messages. Use the app to share content."
    );
  };
  const onClickAddFavoriteItems = () => {
    const favoriteItem = {
      id: product.id ,
      title: product.name,
      price: product.price,
      imageUrl: `data:image/*;base64,${product.image}`,
      count: 0,
    };
    dispatch(addFavoriteItems(favoriteItem));
  };
  return (
    <div className="col4 product">
      <div className="image-container">
        {/* New Label */}
        {product.inSold && (
          <div
            className="sold-label"
            dir={isArabic ? "rtl" : "ltr"}
            lang={isArabic ? "ar" : "fr"}
          >
            {t("homePage.products.newLabel")}
          </div>
        )}
        {product.productNew && (
            <div
              className="new-label"
              dir={isArabic ? "rtl" : "ltr"}
              lang={isArabic ? "ar" : "fr"}
            >
              {t("homePage.products.newLabel")}
            </div>
          )}

        <Link
          to={`/sabrina-bio/product/${product.id}`}
          className="product-link"
        >
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
          <button className="fast-view-button">
            <i className="fas fa-eye"></i> {t("homePage.products.viewBtn")}
          </button>
          <button className="buy-button" onClick={()=>onClickAddItem()}>
            <i className="fas fa-shopping-cart"></i>{" "}
            {t("homePage.products.buyBtn")}
          </button>
        </div>
      </div>
      <h2 className="product-title">
        {product.name?.length > 25
          ? `${product.name?.substring(0, 25)}...`
          : product.name}
      </h2>
      <p
        className={product.inSold ? "old-price":"price"}
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        {product.price} {!isArabic ? "DT" : "دت"}
      </p>
      {product.inSold === true && (<p
        className="price"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        {product.price*product.soldRatio*0.01} {!isArabic ? "DT" : "دت"}
      </p>)}
      <button className="favorite-button" onClick={onClickAddFavoriteItems}>
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
      {successModal && <ModalCart />}
      {successFavModal && <ModalFavorites />}
    </div>
  );
};

export default ProductCard;
