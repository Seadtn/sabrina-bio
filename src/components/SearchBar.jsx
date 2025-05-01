import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import i18n from "../i18n/i18n";
import { FaSearch } from "react-icons/fa";

// Arabic normalization helper
const normalizeArabic = (text = "") => {
  return text
    .normalize("NFKD")
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/[ـ]/g, "")
    .trim();
};

const SearchBar = ({ onSearch, searchTerm = "", className, setSearchResults }) => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchTerm);
  const debounceTimeout = useRef(null);

  // 👇 Hide search bar on /products page
  if (location.pathname === "/products") {
    return null;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const normalized = normalizeArabic(value);

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onSearch(normalized);
    }, 300); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizeArabic(inputValue);
    if (normalized !== "") {
      setSearchResults([]); // Optional: clear previous search results
      navigate(`/products?name=${encodeURIComponent(normalized)}`);
    }
  };

  return (
    <form
      className={className}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder={t("general.search")}
        value={inputValue}
        onChange={handleInputChange}
        className={isArabic ? "search-input-ar" : "search-input-fr"}
      />
      <button
        type="submit"
        className={isArabic ? "search-button-ar" : "search-button-fr"}
      >
        <FaSearch style={{ color: "white" }} />
      </button>
    </form>
  );
};

export default SearchBar;
