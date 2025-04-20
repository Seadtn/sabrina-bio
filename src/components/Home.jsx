import React, { useState, useEffect } from "react";
import BannerSection from "./BannerSection";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import { getActiveProductOTY, getBestSellers, getLatestOnSoldProduct, getProductsInHomePage } from "../api/backend";
import ClientAvis from "./ClientAvis";
import ProductOfTheYear from "./ProductOfYear";
import ProductSlider from "./ProductSlider";

const Home = () => {
  const [NewProducts, setNewproducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  // const [loading, setLoading] = useState(true); // TODO: Add loading state
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
    <div>
      <BannerSection />
      <div className="container">
        <Categories />
        
        { productOTY && <ProductOfTheYear productOTY={productOTY} />}
        {/* On Sold Products Section */}
        <div className="content">
          <ProductSlider products={bestSeller} title={t("homePage.mostSellerSection.title")} />
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
        {/* <ClientAvis /> */}
        {/* On Sold Products Section */}
        <div className="content">
          <ProductSlider products={NewProducts} title={t("homePage.products.new")}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
