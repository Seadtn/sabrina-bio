import React, { useEffect, useState, useRef } from "react";
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
import { openFastViewModal } from "../redux/fastView/slice.ts";
import { useMediaQuery } from "@mui/material";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // New state for toggling description
  const descriptionRef = useRef(null); // Reference for the description section
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const dispatch = useDispatch();
  const handleFastView = () => {
    dispatch(openFastViewModal(product));
  };
  const [hasMoreLines, setHasMoreLines] = useState(false);

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
        taste: selectedTaste,
        option: selectedOption >= 1000 ? selectedOption / 1000 : selectedOption,
        title: product.name,
        titleFr: product.nameFr,
        titleEng: product.nameEng,
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
  const getName = (product) => {
    if (isArabic) {
      return product.name || product.nameFr || product.nameEng || "";
    } else if (isFrench) {
      return product.nameFr || product.nameEng || product.name || "";
    } else {
      return product.nameEng || product.nameFr || product.name || "";
    }
  };
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
  const isMobile = useMediaQuery("(max-width:768px)"); // Adjust breakpoint as needed

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
              style={{color:selectedOption === option.value ?"":"black"}}
            >
              {option.value >= 1000
                ? `${option.value / 1000} ${
                    !isArabic
                      ? product.productType === "GRAMMAGE"
                        ? "Kg"
                        : product.productType === "DOSAGE"
                          ? "L"
                          : ""
                      : product.productType === "GRAMMAGE"
                        ? "كغ"
                        : product.productType === "DOSAGE"
                          ? "ل"
                          : ""
                  }`
                : `${option.value} ${
                    !isArabic
                      ? product.productType === "GRAMMAGE"
                        ? "g"
                        : product.productType === "DOSAGE"
                          ? "ml"
                          : ""
                      : product.productType === "GRAMMAGE"
                        ? "غ"
                        : product.productType === "DOSAGE"
                          ? "مل"
                          : ""
                  }`}
            </button>
          ))}
        </div>
      </div>
    );
  };

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

  useEffect(() => {
    const checkLineCount = () => {
      const element = descriptionRef.current;
      if (element && product.description) {
        // Create a temporary element to measure the text
        const temp = document.createElement("div");
        temp.style.cssText = `
          width: ${element.clientWidth}px;
          position: absolute;
          visibility: hidden;
          font-size: ${window.getComputedStyle(element).fontSize};
          line-height: ${window.getComputedStyle(element).lineHeight};
          font-family: ${window.getComputedStyle(element).fontFamily};
        `;
        temp.innerHTML = product.description;
        document.body.appendChild(temp);

        // Calculate lineHeight
        const computedStyle = window.getComputedStyle(temp);
        let lineHeight = computedStyle.lineHeight;

        if (lineHeight === "normal") {
          // Estimate line height as 1.2 times the font size if "normal"
          const fontSize = parseFloat(computedStyle.fontSize);
          lineHeight = fontSize * 1.2; // Fallback multiplier for "normal"
        } else {
          lineHeight = parseFloat(lineHeight);
        }
        // Calculate number of lines
        const height = temp.clientHeight;
        const lineCount = Math.ceil(height / lineHeight);
        // Clean up
        document.body.removeChild(temp);

        setHasMoreLines(lineCount > 7);
      }
    };

    checkLineCount();
    // Add resize listener to recheck on window resize
    window.addEventListener("resize", checkLineCount);

    return () => {
      window.removeEventListener("resize", checkLineCount);
    };
  }, [product.description]);
  const toggleDescription = () => {
    if (!isMobile) {
      setIsDescriptionExpanded(false);
      handleFastView();
    } else {
      setIsDescriptionExpanded((prev) => !prev);
    }
  };

  const handleClickOutside = (e) => {
    if (descriptionRef.current && !descriptionRef.current.contains(e.target)) {
      setIsDescriptionExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="container"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="content">
          <div className="row_product row2">
            <>
              <div className="col-single">
                <img
                  src={`data:image/*;base64,${product?.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="col-single">
                <h2> {getName(product)}</h2>

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
                    {"  "}
                    <i className="fa fa-shopping-cart"></i>
                    {"  "}
                    {t("homePage.products.buyBtn")}
                  </Button>
                )}
                <h3 id="details">{!isArabic ? "Description" : "وصف"}</h3>
                <div
                  ref={descriptionRef}
                  className={`description-container ${
                    isDescriptionExpanded
                      ? "description-expanded"
                      : "description-collapsed"
                  }`}
                >
                  <p>{product.description}</p>
                </div>
                {product.description && hasMoreLines && (
                  <Button
                    variant="text"
                    onClick={toggleDescription}
                    sx={{
                      padding: "0.5rem 1rem",
                      textTransform: "none",
                      fontSize: "1rem",
                      letterSpacing: "0.1rem",
                      backgroundColor: "transparent",
                      color: "#2fcb00",
                    }}
                  >
                    {isDescriptionExpanded
                      ? t("homePage.products.details.showLess")
                      : t("homePage.products.details.viewAll")}
                  </Button>
                )}
              </div>
            </>
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
      )}
    </div>
  );
};

export default Product;
