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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products);
  const { t } = useTranslation();

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilter(filteredProducts);
    } else {
      setFilter(products);
    }
  };

  useEffect(() => {
    let loadProducts = true;

    const getProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products", {
        mode: "cors",
      });

      if (loadProducts) {
        const data = await res.json();
        setProducts(data.slice(7, 13));
        setFilter(data.slice(0, 6));
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
          <SearchBar onSearch={handleSearch} />
          <div className="row products">
            {filter.map((product) => (
              <ProductCard product={product} key={product.id} />
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
          <MostSeller products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
