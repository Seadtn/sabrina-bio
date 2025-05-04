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
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    
    const getProducts = async () => {
      try {
        const [newProduct, poty, bestSellerProducts, prods] = await Promise.all([
          getLatestOnSoldProduct(),
          getActiveProductOTY(),
          getBestSellers(),
          getProductsInHomePage(),
        ]);

        if (isMounted) {
          setNewproducts(newProduct);
          setProductOTY(poty);
          setBestSeller(bestSellerProducts);
          setProducts(prods);
        }
      } catch (error) {
        console.error("Error loading homepage data", error);
      } finally {
        if (isMounted) setLoading(false); // ✅ Stop loading once done
      }
    };

    getProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <Loader />; // ✅ Display loader while loading

  return (
    <div>
      <BannerSection />
      <div className="container">
        <Categories />

        {productOTY && <ProductOfTheYear productOTY={productOTY} />}

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

        <div className="publicity-banner">
          <img
            src={process.env.PUBLIC_URL + "/images/publicity/pub.jpg"}
            alt="Publicité"
            className="publicity-img"
            loading="lazy"
          />
        </div>

        <ClientAvis />

        <div className="content">
          <ProductSlider
            products={NewProducts}
            title={t("homePage.products.new")}
          />
        </div>
      </div>

      <a
        href="https://wa.me/21652052265"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", opacity: 0 }}
      >
        <span className="sr-only">Contact us on WhatsApp</span>
      </a>
    </div>
  );
};

export default Home;
