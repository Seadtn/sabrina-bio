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
import { Chip } from "@mui/material";
import FastOrderBlock from "./fastOrderBlock.jsx";
import Slider from "react-slick";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
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
          ? Math.round(displayPrice - displayPrice * product.soldRatio * 0.01)
          : getDisplayPrice(),
        maxQuantity: product.quantity,
        type: product.productType,
        freeDelivery:
          product.freeDelivery === null ? false : product.freeDelivery,
        taste: selectedTaste,
        option: selectedOption,
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
          setSelectedOption(
            productResponse.availableOptions[0].value
          );
        }

        if (productResponse.category?.id) {
          const relatedResponse = await getRelatedProducts(
            productResponse.category.id
          );
          setRelated(relatedResponse);
        }
        setSelectedImage(`data:image/*;base64,${productResponse?.image}`);
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
  const isMobile = useMediaQuery("(max-width:768px)");
  const handleImageClick = (image) => {
    if (typeof image === "string") {
      setSelectedImage(`data:image/*;base64,${image}`);
    } else {
      const base64String = arrayBufferToBase64(image);
      setSelectedImage(`data:image/*;base64,${base64String}`);
    }
  };

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
              style={{
                color: selectedOption === option.value ? "" : "black",
              }}
            >
              {option.value >= 1000
                ? `${option.value / 1000} ${
                    isArabic
                      ? product.productType === "GRAMMAGE"
                        ? "كغ"
                        : product.productType === "DOSAGE"
                          ? "ل"
                          : ""
                      : product.productType === "GRAMMAGE"
                        ? "Kg"
                        : product.productType === "DOSAGE"
                          ? "L"
                          : ""
                  }`
                : `${option.value} ${
                    isArabic
                      ? product.productType === "GRAMMAGE"
                        ? "غ"
                        : product.productType === "DOSAGE"
                          ? "مل"
                          : ""
                      : product.productType === "GRAMMAGE"
                        ? "g"
                        : product.productType === "DOSAGE"
                          ? "ml"
                          : ""
                  }`}
            </button>
          ))}
        </div>
      </div>
    );
  };
  const images = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: images.length,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
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
  const handleImageSource = (imgData) => {
    let imageSrc = "";

    // If imgData is a base64 string (detected by starting with "data:image")
    if (typeof imgData === "string") {
      imageSrc = `data:image/jpeg;base64,${imgData}`;
    }
    // If imgData is a byte[] array, convert it to base64
    else if (imgData && imgData.length) {
      // Convert byte[] array to base64 string
      const base64String = arrayBufferToBase64(imgData);
      imageSrc = `data:image/jpeg;base64,${base64String}`;
    }
    return (
      <img src={imageSrc} className="thumbnail" alt="Product" loading="lazy" />
    );
  };

  // Helper function to convert byte[] array to base64 string
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
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
                  src={selectedImage}
                  alt={product.name}
                  className="product-image"
                />
                {/* Slider component */}
                {(product.image2 || product.image3 || product.image4) && (
                  <div className="thumbnail-slider">
                    <Slider {...settings}>
                      {images.map((imgData, idx) => {
                        return (
                          <div
                            key={idx}
                            onClick={() => handleImageClick(imgData)}
                          >
                            {handleImageSource(imgData)} {/* Render image */}
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                )}
              </div>

              <div className="col-single">
                <h2> {getName(product)}</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {product.productNew && (
                    <Chip
                      label={t("homePage.products.newLabel")}
                      size="small"
                      sx={{
                        backgroundColor: "#2fcb00",
                        color: "white",
                        padding: "5px",
                        marginRight: "3px",
                        marginTop: "5px",
                        marginLeft: "3px",
                      }}
                    />
                  )}
                  {product.promotion && (
                    <Chip
                      label={t("homePage.products.soldLabel")}
                      color="warning"
                      size="small"
                      sx={{
                        color: "white",
                        padding: "5px",
                        marginRight: "3px",
                        marginTop: "5px",
                        marginLeft: "3px",
                      }}
                    />
                  )}
                  {product.freeDelivery && (
                    <Chip
                      label={t("homePage.products.deliveryLabel")}
                      size="small"
                      sx={{
                        backgroundColor: "rgb(231, 31, 31)",
                        color: "white",
                        padding: "5px",
                        marginRight: "3px",
                        marginTop: "5px",
                        marginLeft: "3px",
                      }}
                    />
                  )}
                </div>
                <h4
                  className={
                    product.promotion ? "old-price-product" : "price-product"
                  }
                  dir={isArabic ? "rtl" : "ltr"}
                  lang={isArabic ? "ar" : "fr"}
                >
                  {Math.round(displayPrice)} {!isArabic ? "DT" : "دت"}
                </h4>

                {product.promotion && (
                  <h4
                    className="price-product"
                    dir={isArabic ? "rtl" : "ltr"}
                    lang={isArabic ? "ar" : "fr"}
                  >
                    {Math.round(promotionalPrice)} {!isArabic ? "DT" : "دت"}
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
                    <i className="fa fa-shopping-cart"></i>{" "}
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

          <FastOrderBlock
            product={product}
            price={product.promotion ? promotionalPrice : displayPrice}
            taste={product.availableOptions?.[0]?.taste}
            option={
              product.availableOptions?.[0]
                ? product.availableOptions[0].value >= 1000
                  ? product.availableOptions[0].value / 1000
                  : product.availableOptions[0].value
                : null
            }
          />

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
