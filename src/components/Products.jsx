import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { useLocation } from "react-router-dom";
import { getAllCategories, getPaginatedProducts, getSousCategoriesbyIdCategory } from "../api/backend";

const Products = () => {
  const [products, setProducts] = useState([]);
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

  const location = useLocation();

  // Fetch products
  const fetchProducts = useCallback(async (offset = 0, filters = {}) => {
    const {
      categoryId = category,
      subcategoryId = subcategory,
      search = searchTerm,
      sort = sortOption,
    } = filters;

    setLoading(offset === 0);
    setLoadingMore(offset > 0);

    try {
      const data = await getPaginatedProducts({
        offset,
        limit: PRODUCTS_LIMIT,
        categoryId,
        subcategoryId,
        search,
        sort,
      });

      if (offset === 0) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      setCurrentOffset(offset);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [category, subcategory, searchTerm, sortOption]);

  // Handle initial query param for category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get("category");
    if (initialCategory) {
      setCategory(initialCategory);
      fetchProducts(0, { categoryId: initialCategory });
    } else {
      fetchProducts();
    }
  }, [location.search, fetchProducts]);

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

  // Debounce function to prevent too many API calls
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Modified handlers to trigger new API calls
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setSubcategory("");
    fetchProducts(0, { categoryId: newCategory, subcategoryId: "" });
  };

  const handleSubcategoryChange = (event) => {
    const newSubcategory = event.target.value;
    setSubcategory(newSubcategory);
    fetchProducts(0, { subcategoryId: newSubcategory });
  };

  // Debounced search handler
  const debouncedSearch = debounce((value) => {
    fetchProducts(0, { search: value });
  }, 500);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    fetchProducts(0, { sort: value });
  };

  const handleViewMore = () => {
    fetchProducts(currentOffset + PRODUCTS_LIMIT);
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">{t("homePage.products.title")}</h2>

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
              <option value="highPrice">{t("homePage.products.sort.highPrice")}</option>
              <option value="lowPrice">{t("homePage.products.sort.lowPrice")}</option>
              <option value="name">{t("homePage.products.sort.name")}</option>
            </select>
          </div>
        </div>

        <div className="row products">
          {loading ? (
            <Loader />
          ) : (
            products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          )}
        </div>

        {products?.length > 0 && products?.length % PRODUCTS_LIMIT === 0 && (
          <div className="viewContainer">
            <button className="btn-primary" onClick={handleViewMore} disabled={loadingMore}>
              {loadingMore ? (
                <div className="loading-more">
                  <span className="loader-circle"></span>
                  {t("homePage.products.viewAllBtn")}
                </div>
              ) : (
                t("homePage.products.viewAllBtn")
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
