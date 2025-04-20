import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cart/slice.ts";

const ProductOfTheYear = ({ product }) => {
  const { t } = useTranslation();

  const getDisplayPrice = () => {
    // if (product.price === 0 && product.prices) {
    //   // Get the lowest price from the prices object
    //   const priceValues = Object.values(product.prices);
    //   return priceValues.length > 0 ? Math.min(...priceValues) : 0;
    // }
    return 100;
  };
  const displayPrice = getDisplayPrice();
  const dispatch = useDispatch();
  const onClickAddItem = () => {
    dispatch(
      addItems({
        id: product.id ?? 0,
        count: 1,
        imageUrl: `data:image/*;base64,${product.image}`,
        price: product.promotion
          ? displayPrice - displayPrice * product.soldRatio * 0.01
          : getDisplayPrice(),
        maxQuantity: product.quantity,
        type: product.productType,
        taste: product.availableOptions[0]?.taste,
        option: product.availableOptions[0]?.value >= 1000 ? product.availableOptions[0]?.value / 1000 : product.availableOptions[0]?.value,
        title: product.name,
        titleFr: product.nameFr,
        titleEng: product.nameEng,
      })
    );
  };
  return (
    <div>
      <h2 className="title" >
        منتج السنة
      </h2>
      <section className="product-of-year-section">
        <div className="product-of-year-wrapper">
          <div className="product-image">
            <img
              src={process.env.PUBLIC_URL + "/images/publicity/productOTY.jpg"}
              alt="Product of the Year"
              loading="lazy"
            />
          </div>
          <div className="product-info">
            <h2 className="poty-title">{"اللحسة الصحراوية للنساء"}</h2>
            <button
              className="buy-button-poty"
              onClick={() => onClickAddItem()}
            >
              <i className="fas fa-shopping-cart" style={{ marginRight: '8px' }}></i>
              {t("homePage.products.buyBtn")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
  
};

export default ProductOfTheYear;
