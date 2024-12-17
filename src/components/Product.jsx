import React, { useEffect, useState } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  let url = "https://fakestoreapi.com/products";
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const products =
    related &&
    product &&
    related.filter((p) => p.category === product.category);
  const single = localStorage.setItem("singleProduct", JSON.stringify(product));

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(url + `/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };

    const relatedProducts = async () => {
      setLoading(true);
      const response = await fetch(url);
      setRelated(await response.json());
      setLoading(false);
    };
    if (single) {
      setProduct(JSON.parse(localStorage.getItem("singleProduct")));
    } else {
      getProduct();
    }

    relatedProducts(window.scrollTo(0, 0));
  }, [single, id, url]);

  if (product && product.id) {
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
                    src={`${process.env.PUBLIC_URL}/images/slider/slide-${
                      Math.floor(Math.random() * 3) + 1
                    }.png`}
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="col-single">
                  <h2>{product.title}</h2>
                  <h4>{product.price} {!isArabic ? "DT" : "دت"} </h4>
                  <h3 id="details"> {!isArabic ? "Description" : "وصف"}</h3>
                  <p>{product.description}</p>
                  {/* <input type="number" value="4" min="1" id="cart-input"/> */}
                  <button className="btn- cartBtn">
                    <i className="fa fa-shopping-cart"></i> {t("homePage.products.buyBtn")}
                  </button>
                </div>
              </>
            )}
          </div>
          <h2 className="title-left">{t("homePage.products.related")}</h2>
          <div className="row products">
            {loading ? (
              <Loader />
            ) : (
              products &&
              products.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="content">
          <div className="row row2">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="product-col4">
                  <img src={"../images/404.svg"} alt="product" />
                </div>
                <div className="col-single">
                  <h3 id="details">Product was not found.</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
