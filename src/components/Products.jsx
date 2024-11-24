import React, { useState, useEffect } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { Link } from "react-router-dom";

const Products = () => {
  let url = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); 
  const [visibleProductsCount, setVisibleProductsCount] = useState(9); 
  const [loadingMore, setLoadingMore] = useState(false); // This controls the loader on the "View More" button
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    let loadProducts = true;
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { mode: "cors" });
        if (loadProducts) {
          const data = await res.json();
          setProducts(data);
          setFilteredProducts(data); // Initialize filtered products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (loadProducts) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      loadProducts = false;
    };
  }, [url]);

  // Filter and sort products whenever filters change
  useEffect(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });

    // Sorting logic
    if (sortOption === "highPrice") {
      filtered = filtered.sort((a, b) => b.price - a.price); // Sort by high price
    } else if (sortOption === "lowPrice") {
      filtered = filtered.sort((a, b) => a.price - b.price); // Sort by low price
    } else if (sortOption === "name") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title)); // Sort by name
    }

    setFilteredProducts(filtered);
  }, [category, searchTerm, sortOption, products]);

  // Handler functions
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleViewMore = () => {
    setLoadingMore(true); // Start loading when "View More" is clicked

    setTimeout(() => {
      setVisibleProductsCount(visibleProductsCount + 9); // Show 9 more products
      setLoadingMore(false); // End the loading after products are shown
    }, 1000); // Simulate loading time
  };

  return (
    <div
      className="container"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      <div className="content">
        <h2 className="title">{t("homePage.products.title")}</h2>

        {/* Filters */}
        <div className="filters">
          <div className="filter-category">
            <label>{t("homePage.categories.title")} :</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="data__input"
            >
              <option value="">{t("homePage.products.category.all")}</option>
              <option value="electronics">
                {t("homePage.products.category.herbs")}
              </option>
              <option value="jewelery">
                {t("homePage.products.category.oils")}
              </option>
              <option value="men's clothing">
                {t("homePage.products.category.cosmetic")}
              </option>
            </select>
          </div>

          <div className="filter-search">
            <label>{t("homePage.products.search.title")} :</label>
            <input
              type="text"
              className="data__input"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t("homePage.products.search.input")}
            />
          </div>

          <div className="filter-category">
            <label>{t("homePage.products.sort.title")} :</label>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="data__input"
            >
              <option value="">{t("homePage.products.sort.select")}</option>
              <option value="highPrice">{t("homePage.products.sort.highPrice")}</option>
              <option value="lowPrice">{t("homePage.products.sort.lowPrice")}</option>
              <option value="name">{t("homePage.products.sort.name")}</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="row products">
          {loading ? (
            <Loader />
          ) : (
            filteredProducts.slice(0, visibleProductsCount).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>

        {/* "View More" Button */}
        {filteredProducts.length > visibleProductsCount && (
          <div className="viewContainer" >
            <button
              className="btn-primary"
              onClick={handleViewMore}
              disabled={loadingMore}
            >
            <Link to="#" className="btn-link">
              {loadingMore ? (
                <div className="loading-more">
                  {/* Custom loader for the "View More" button */}
                  <span className="loader-circle"></span> {/* Example loader circle */}
                  {t("homePage.products.viewAllBtn")}
                </div>
              ) : (
                t("homePage.products.viewAllBtn")
              )}</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
