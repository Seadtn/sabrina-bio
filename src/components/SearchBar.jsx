import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const isArabic = i18n.language === "ar";
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Call onSearch with the current input
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSearch}
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      <input
        type="text"
        placeholder={t("general.search")}
        value={searchTerm}
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
