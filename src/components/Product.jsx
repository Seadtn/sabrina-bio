import React, { useEffect, useState } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { getProductById, getRelatedProducts } from "../api/backend";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addItems } from "../redux/cart/slice.ts";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const dispatch = useDispatch();
  const onClickAddItem = () => {
  dispatch(
    addItems({
      id: product.id ?? 0,
      count: 1,
      imageUrl: `data:image/*;base64,${product.image}`,
      price:product.promotion
      ? displayPrice - displayPrice * product.soldRatio * 0.01: getDisplayPrice(),
      maxQuantity:product.quantity,
      type: product.productType,
      taste:selectedTaste,
      option:selectedOption,
      title: product.name,
    })
  );
};
  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);
      try {
        const productResponse = await getProductById(id);
        setProduct(productResponse);

        // Set initial selections if available
        if (productResponse.tastes?.length > 0) {
          setSelectedTaste(productResponse.tastes[0]);
        }
        if (productResponse.availableOptions?.length > 0) {
          setSelectedOption(productResponse.availableOptions[0].value);
        }

        if (productResponse.category?.id) {
          const relatedResponse = await getRelatedProducts(
            productResponse.category.id
          );
          setRelated(relatedResponse);
        }
      } catch (error) {
        console.error("Error fetching product or related products:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProductAndRelated();
  }, [id]);

  const getDisplayPrice = () => {
    if (!product.hasTaste && !product.availableOptions?.length) {
      return product.price;
    }

    // For products with options, get price based on selected option
    if (selectedOption && product.prices) {
      return product.prices[selectedOption] || 0;
    }
    return 0;
  };

  const displayPrice = getDisplayPrice();
  const promotionalPrice = product.promotion
    ? displayPrice - displayPrice * product.soldRatio * 0.01
    : null;

  // Replace the existing renderOptions function with:
  const renderOptions = () => {
    if (!product.availableOptions?.length) return null;

    return (
      <div className="options-section">
        <h3 className="options-title">
          {product.productType === "GRAMMAGE"
            ? t("homePage.products.details.grammage")
            : t("homePage.products.details.dosage")}
        </h3>
        <div className="options-container">
          {product.availableOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedOption(option.value)}
              className={`option-button ${
                selectedOption === option.value ? "selected" : ""
              }`}
            >
              {option.value}{" "}
              {!isArabic
                ? product.productType === "GRAMMAGE"
                  ? "g"
                  : product.productType === "DOSAGE"
                    ? "ml"
                    : ""
                : product.productType === "GRAMMAGE"
                  ? "غ"
                  : product.productType === "DOSAGE"
                    ? "مل"
                    : ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Replace the existing renderTastes function with:
  const renderTastes = () => {
    if (!product.hasTaste || !product.tastes?.length) return null;

    return (
      <div className="options-section">
        <h3 className="options-title">
          {" "}
          {t("homePage.products.details.gouts")}
        </h3>
        <div className="options-container">
          {product.tastes.map((taste) => (
            <button
              key={taste}
              onClick={() => setSelectedTaste(taste)}
              className={`option-button ${
                selectedTaste === taste ? "selected" : ""
              }`}
            >
              {taste}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="container"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      <div className="content">
        <div className="row_product row2">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="col-single">
                <img
                  src={`data:image/*;base64,${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="col-single">
                <h2>{product.name}</h2>

                <h4
                  className={
                    product.promotion ? "old-price-product" : "price-product"
                  }
                  dir={isArabic ? "rtl" : "ltr"}
                  lang={isArabic ? "ar" : "fr"}
                >
                  {displayPrice} {!isArabic ? "DT" : "دت"}
                </h4>

                {product.promotion && (
                  <h4
                    className="price-product"
                    dir={isArabic ? "rtl" : "ltr"}
                    lang={isArabic ? "ar" : "fr"}
                  >
                    {promotionalPrice?.toFixed(2)} {!isArabic ? "DT" : "دت"}
                  </h4>
                )}

                <h3 id="details">{!isArabic ? "Description" : "وصف"}</h3>
                <p style={{ marginBottom: "10px" }}>{product.description}</p>
                {(product.hasTaste || product.availableOptions?.length > 0) && (
                  <>
                    {renderOptions()}
                    {renderTastes()}
                  </>
                )}
                {product.quantity === 0 ? (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {isArabic
                      ? "المنتج نفذ من المخزون"
                      : isFrench
                        ? "Ce produit est épuisé"
                        : "This product is sold out"}
                  </div>
                ) : (
                  <Button
                    variant="outlined"
                    disabled={
                      (product.hasTaste && !selectedTaste) ||
                      (product.availableOptions?.length > 0 && !selectedOption)
                    }
                    sx={{
                      padding: "1rem 3rem",
                      textTransform: "uppercase",
                      fontSize: "1rem",
                      letterSpacing: "0.1rem",
                      backgroundColor: "#2fcb00",
                      border: "1px solid #2fcb00",
                      cursor: "pointer",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "#2fcb00", 
                        borderColor: "#2fcb00",
                      },
                    }}
                    onClick={() => onClickAddItem()}
                  >
                    {"  "}<i className="fa fa-shopping-cart"></i>{"  "}
                    {t("homePage.products.buyBtn")}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        <h2 className="title-left">{t("homePage.products.related")}</h2>
        <div className="row products">
          {loading ? (
            <Loader />
          ) : (
            related &&
            related.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
