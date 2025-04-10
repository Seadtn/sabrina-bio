import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ onSearch, searchTerm }) => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <form
      className="search-bar"
      dir={isArabic ? "rtl" : "ltr"}
      lang={isArabic ? "ar" : "fr"}
    >
      {/* <input
        type="text"
        placeholder={t("general.search")}
        value={searchTerm}
        onChange={handleInputChange}
        className={isArabic ? "search-input-ar" : "search-input-fr"}
      /> */}
      <button type="submit" className={isArabic ? "search-button-ar" : "search-button-fr"}>
        <FaSearch style={{ color: "white" }} />
      </button>
    </form>
  );
};

export default SearchBar;
