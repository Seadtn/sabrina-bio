import React, { useState, useEffect } from "react";
import BannerSection from "./BannerSection";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import DeliveryCards from "./DeliveryCards";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import MostSeller from "./MostSeller";
import {getBestSellers, getProductsInHomePage } from "../api/backend";


const Home = () => {
  const [NewProducts, setNewproducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);

  const [filter, setFilter] = useState(NewProducts);
  const { t } = useTranslation();




  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filteredProducts = NewProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilter(filteredProducts);
    } else {
      setFilter(NewProducts);
    }
  };

  useEffect(() => {
    let loadProducts = true;

    const getProducts = async () => {
      
      if (loadProducts) {
        const newProduct = await getProductsInHomePage();
        setNewproducts(newProduct);
        setFilter(newProduct);
        const bestSellerProducts = await getBestSellers();
        setBestSeller(bestSellerProducts);
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
        <div className="content">
          <h2 className="title">{t("homePage.products.new")}</h2>
          <SearchBar onSearch={handleSearch}  className={"search-bar"}/>
          <div className="row products">
            {filter.map((product,index) => (
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
        <DeliveryCards />
        <div className="content">
          <MostSeller products={bestSeller} />
        </div>
      </div>
    </div>
  );
};

export default Home;
