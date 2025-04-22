import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom"; // for navigation
import i18n from "../i18n/i18n";
import { FaSearch } from "react-icons/fa";

// Arabic normalization helper
const normalizeArabic = (text = "") => {
  return text
    .normalize("NFKD")
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/أ|إ|آ/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[ـ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const SearchBar = ({ onSearch, searchTerm = "", className ,setSearchResults}) => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const location = useLocation();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchTerm);

  // 👇 Don't show search bar on the /products page
  if (location.pathname === "/products") {
    return null;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const normalized = normalizeArabic(value);
    onSearch(normalized); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = normalizeArabic(inputValue);
    if (normalized !== "") {
      setSearchResults([]); // Clear previous search results
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
