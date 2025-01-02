import React, { useEffect, useState } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";
import { getProductById, getRelatedProducts } from "../api/backend";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      setLoading(true);

      try {
        const productResponse = await getProductById(id);
        setProduct(productResponse);

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
                  {product.price} {!isArabic ? "DT" : "دت"}
                </h4>
                {product.promotion === true && (
                  <h4
                    className="price-product"
                    dir={isArabic ? "rtl" : "ltr"}
                    lang={isArabic ? "ar" : "fr"}
                  >
                    {product.price - product.price * product.soldRatio * 0.01}{" "}
                    {!isArabic ? "DT" : "دت"}
                  </h4>
                )}
                <h3 id="details"> {!isArabic ? "Description" : "وصف"}</h3>
                <p style={{ marginBottom: "10px" }}>{product.description}</p>
                {/* Product Quantity Check */}
                {product.quantity === 0 ? (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {isArabic
                      ? "المنتج نفذ من المخزون"
                      : isFrench
                        ? "Ce produit est épuisé"
                        : "This product is sold out"}
                  </div>
                ) : (
                  <button className="btn-primary">
                    <Link to={"/products"} className="btn-link">
                      <i className="fa fa-shopping-cart"></i>{" "}
                      {t("homePage.products.buyBtn")}
                    </Link>
                  </button>
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
            related.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
