import React, { useState, useEffect } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { Link } from "react-router-dom";
import { getAllCategories, getPaginatedProducts, getSousCategoriesbyIdCategory } from "../api/backend";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(""); 
  const [subcategories, setSubcategories] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const [categories, setCategories] = useState([]);
  const PRODUCTS_LIMIT = 9;

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      try {
        const data = await getPaginatedProducts(0, PRODUCTS_LIMIT);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (category) {
      const fetchSubcategories = async () => {
        try {
          const sousCategories = await getSousCategoriesbyIdCategory(category);
          setSubcategories(sousCategories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [category]);

  useEffect(() => {
    const getPrice = (product) => {
      if (product.productType !== "STANDARD" && product.availableOptions?.length > 0) {
        const prices = Object.values(product.prices);
        const baseValue = Math.min(...prices);
        return product.promotion
          ? baseValue - baseValue * product.soldRatio * 0.01
          : baseValue;
      }
      return product.promotion
        ? product.price - product.price * product.soldRatio * 0.01
        : product.price;
    };

    let filtered = products.filter((product) => {
      const matchesCategory = category
        ? product.category?.id + "" === category
        : true;
      const matchesSubcategory = subcategory
        ? product.souscategory?.id + "" === subcategory
        : true;
      const matchesSearchTerm = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearchTerm;
    });

    if (sortOption === "highPrice") {
      filtered = filtered.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (sortOption === "lowPrice") {
      filtered = filtered.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortOption === "name") {
      filtered = filtered.sort((a, b) => {
        return (
          a.name.localeCompare(b.name) ||
          a.nameFr.localeCompare(b.nameFr) ||
          a.nameEng.localeCompare(b.nameEng)
        );
      });
    }

    setFilteredProducts(filtered);
  }, [category, subcategory, searchTerm, sortOption, products]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubcategory(""); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (event) => {
    setSubcategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleViewMore = async () => {
    setLoadingMore(true);
    try {
      const data = await getPaginatedProducts(
        currentOffset + PRODUCTS_LIMIT,
        PRODUCTS_LIMIT
      );
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setCurrentOffset((prevOffset) => prevOffset + PRODUCTS_LIMIT);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">{t("homePage.products.title")}</h2>

        {/* Filters */}
        <div className="filters" dir={isArabic ? "rtl" : "ltr"} lang={isArabic ? "ar" : "fr"}>
          <div className="filter-category">
            <label>{t("homePage.categories.title")} :</label>
            <select value={category} onChange={handleCategoryChange} className="data__input">
              <option value="">{t("homePage.products.category.all")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {isArabic ? cat.arabicName : isFrench ? cat.frenchName : cat.englishName}
                </option>
              ))}
            </select>
          </div>

          {subcategories.length > 0 && (
            <div className="filter-category">
              <label>{t("homePage.subcategories.title")} :</label>
              <select value={subcategory} onChange={handleSubcategoryChange} className="data__input">
                <option value="">{t("homePage.products.category.all")}</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {isArabic ? sub.arabicName : isFrench ? sub.frenchName : sub.englishName}
                  </option>
                ))}
              </select>
            </div>
          )}

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
            <select value={sortOption} onChange={handleSortChange} className="data__input">
              <option value="">{t("homePage.products.sort.select")}</option>
              <option value="highPrice">
                {t("homePage.products.sort.highPrice")}
              </option>
              <option value="lowPrice">
                {t("homePage.products.sort.lowPrice")}
              </option>
              <option value="name">{t("homePage.products.sort.name")}</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="row products">
          {loading ? (
            <Loader />
          ) : (
            filteredProducts?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>

        {/* "View More" Button */}
        {filteredProducts?.length > 0 && filteredProducts?.length % PRODUCTS_LIMIT === 0 && (
          <div className="viewContainer">
            <button className="btn-primary" onClick={handleViewMore} disabled={loadingMore}>
              <Link to="#" className="btn-link">
                {loadingMore ? (
                  <div className="loading-more">
                    <span className="loader-circle"></span>
                    {t("homePage.products.viewAllBtn")}
                  </div>
                ) : (
                  t("homePage.products.viewAllBtn")
                )}
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
