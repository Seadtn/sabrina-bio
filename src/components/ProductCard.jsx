import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from "../i18n/i18n";
const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const isArabic = i18n.language === 'ar';
  return (
    <div className="col4 product">
      <div className="image-container">
        <Link to={`/product/${product.id}`} className="product-link">
          <img src={product.image} alt={product.title.substring(0, 25)} />
        </Link>
        <div className="hover-buttons" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr'}>
          <button className="fast-view-button">
            <i className="fas fa-eye"></i> {t('homePage.products.viewBtn')}
          </button>
          <button className="buy-button">
            <i className="fas fa-shopping-cart"></i> {t('homePage.products.buyBtn')}
          </button>
        </div>
      </div>
      <h2>
        {product.title.length > 25
          ? `${product.title.substring(0, 25)}...`
          : product.title}
      </h2>
      <p className="price">{product.price} DT</p>
      <button className="favorite-button">
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
};

export default ProductCard;
