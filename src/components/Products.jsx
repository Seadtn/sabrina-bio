import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import Loader from "./loader/Loader";
import i18n from "../i18n/i18n";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

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

  // Update URL with current filter params, but don't trigger data fetch
  const updateUrlParams = useCallback((params = {}) => {
    const urlParams = new URLSearchParams();
    
    const categoryValue = params.category !== undefined ? params.category : category;
    const searchValue = params.search !== undefined ? params.search : searchTerm;
    
    if (categoryValue) urlParams.append("category", categoryValue);
    if (searchValue) urlParams.append("name", searchValue);
    
    const searchString = urlParams.toString();
    const newUrl = searchString ? `${location.pathname}?${searchString}` : location.pathname;
    
    navigate(newUrl, { replace: true });
  }, [category, searchTerm, location.pathname, navigate]);

  // Handle initial query params on first load only
  useEffect(() => {
    if (isInitialLoad) {
      const params = new URLSearchParams(location.search);
      const initialCategory = params.get("category");
      const initialName = params.get("name");

      const initialFilters = {};
      
      if (initialCategory) {
        setCategory(initialCategory);
        initialFilters.categoryId = initialCategory;
      }
      
      if (initialName) {
        setSearchTerm(initialName);
        initialFilters.search = initialName;
      }

      // Fetch products with initial values
      fetchProducts(0, initialFilters);
      setIsInitialLoad(false);
    }
  }, [location.search, fetchProducts, isInitialLoad]);

  // Fetch categories on component mount
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

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!isInitialLoad && category) {
      const fetchSubcategories = async () => {
        try {
          const sousCategories = await getSousCategoriesbyIdCategory(category);
          setSubcategories(sousCategories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    } else if (!isInitialLoad) {
      setSubcategories([]);
    }
  }, [category, isInitialLoad]);

  // Modified handlers to trigger new API calls
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setSubcategory("");
    fetchProducts(0, { categoryId: newCategory, subcategoryId: "" });
    updateUrlParams({ category: newCategory });
  };

  const handleSubcategoryChange = (event) => {
    const newSubcategory = event.target.value;
    setSubcategory(newSubcategory);
    fetchProducts(0, { subcategoryId: newSubcategory });
  };

  // Debounced search function to prevent excessive API calls
  const debouncedSearch = useCallback((value) => {
    const timer = setTimeout(() => {
      fetchProducts(0, { search: value });
      updateUrlParams({ search: value });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [fetchProducts, updateUrlParams]);

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