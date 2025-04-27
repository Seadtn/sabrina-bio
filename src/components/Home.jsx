import React, { useState, useEffect } from "react";
import BannerSection from "./BannerSection";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import {
  getActiveProductOTY,
  getBestSellers,
  getLatestOnSoldProduct,
  getProductsInHomePage,
} from "../api/backend";
import ClientAvis from "./ClientAvis";
import ProductOfTheYear from "./ProductOfYear";
import ProductSlider from "./ProductSlider";
import Loader from "./loader/Loader";

const Home = () => {
  const [NewProducts, setNewproducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [products, setProducts] = useState([]);
  const [productOTY, setProductOTY] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    let loadProducts = true;
    const getProducts = async () => {
      if (loadProducts) {
        const newProduct = await getLatestOnSoldProduct();
        setNewproducts(newProduct);
        const poty = await getActiveProductOTY();
        setProductOTY(poty);
        const bestSellerProducts = await getBestSellers();
        setBestSeller(bestSellerProducts);
        const prods = await getProductsInHomePage();
        setProducts(prods);
      }
      return () => {
        loadProducts = false;
      };
    };
    getProducts();
  }, []);

  return (
    (NewProducts.length>0 &&  products.lengths>0) ? (
      <Loader />
    ) : ( <div>
      <BannerSection />
      <div className="container">
        <Categories />

        {productOTY && <ProductOfTheYear productOTY={productOTY} />}
        {/* On Sold Products Section */}
        <div className="content">
          <ProductSlider
            products={bestSeller}
            title={t("homePage.mostSellerSection.title")}
          />
        </div>
        <div className="content most-seller-section">
          <h2 className="title">{t("homePage.products.title")}</h2>
          <div className="row products">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <div className="viewContainer">
            <button className="btn-primary">
              <Link to="/products" className="btn-link">
                {t("homePage.products.viewAllBtn")}
              </Link>
            </button>
          </div>
        </div>

        {/* Publicity Banner */}
        <div className="publicity-banner">
          <img
            src={process.env.PUBLIC_URL + "/images/publicity/pub.jpg"}
            alt="Publicité"
            className="publicity-img"
            loading="lazy"
          />
        </div>

        {/* Client Avis Section */}
        <ClientAvis />
        {/* On Sold Products Section */}
        <div className="content">
          <ProductSlider
            products={NewProducts}
            title={t("homePage.products.new")}
          />
        </div>
      </div>
      {/* Floating WhatsApp Button (invisible by default) */}
      <a
        href="https://wa.me/21652052265" // Use wa.me for WhatsApp links
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", opacity: 0 }} // Invisible by default
      >
      </a>
    </div>)
  );

};

export default Home;
