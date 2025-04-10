import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import i18n from "i18next";
import "../App.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { searchProductsByName } from "../api/backend";
import Publicity from "./publicity";

const languages = {
  ar: { label: "العربية", flag: "/images/flags/arabic.jpg" },
  fr: { label: "Français", flag: "/images/flags/french.png" },
  en: { label: "English", flag: "/images/flags/english.jpg" },
};

const NavBar = () => {
  const { items } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorite);
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const totalCartAmount = items.reduce((sum, item) => item.count + sum, 0);
  const totalFavoritesAmount = favorites.reduce(
    (sum, item) => item.count + sum,
    0
  );

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng);
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      const products = await searchProductsByName(searchTerm);
      setSearchResults(products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleProductClick = (id) => {
    navigate("/product/" + id);
    setSearchResults([]);
  };

  return (
    <div>
      <Publicity />

      <nav className="navbar">
        <div className="navbar-left">
          <div className="dropdown" ref={dropdownRef}>
            <div className="selected-language" onClick={toggleDropdown}>
              <img
                src={process.env.PUBLIC_URL + languages[selectedLanguage].flag}
                alt={languages[selectedLanguage].label}
                style={{ width: "40px", height: "auto", borderRadius: "4px" }}
              />
            </div>

            {dropdownOpen && (
              <div className="language-dropdown">
                {Object.entries(languages)
                  .filter(([key]) => key !== selectedLanguage) // 👈 Filter out the selected one
                  .map(([key, { label, flag }]) => (
                    <span
                      key={key}
                      onClick={() => changeLanguage(key)}
                      style={{
                        display: "inline-block",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={process.env.PUBLIC_URL + flag}
                        alt={label}
                        style={{
                          width: "40px",
                          height: "auto",
                          borderRadius: "4px",
                        }}
                      />
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="logo navbar-center">
          <Link to="/">
            <h4>
              Sabrina <span>Bio</span>
            </h4>
          </Link>
        </div>

        <div className="navbar-right">
          <ul
            className={isMobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setIsMobile(false)}
            dir={isArabic && isMobile ? "rtl" : "ltr"}
            lang={isArabic && isMobile ? "ar" : "fr"}
          >
            {" "}
            <li className="nav-element">
              <SearchBar onSearch={handleSearch} searchTerm="" />
            </li>
            <li className="nav-element">
              <Link to="/">{t("homePage.menu.home")}</Link>
            </li>
            <li className="nav-element">
              <Link to="/products">{t("homePage.menu.products")}</Link>
            </li>
            <li className="nav-element">
              <Link to="/contact">{t("homePage.menu.contact")}</Link>
            </li>
            <li className="nav-element">
              <Link to="/favorite">
                <i className="fas fa-heart">
                  <span id="itemsNum">{totalFavoritesAmount}</span>
                </i>
              </Link>
            </li>
            <li className="nav-element">
              <Link to="/cart">
                <i className="fas fa-shopping-cart">
                  <span id="itemsNum">{totalCartAmount}</span>
                </i>
              </Link>
            </li>
          </ul>
          <button
            className="mobile-icon"
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? (
              <i className="fas fa-times menu"></i>
            ) : (
              <i className="fas fa-bars menu"></i>
            )}
          </button>
        </div>
      </nav>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => handleProductClick(product.id)}
            >
              <Link to={`/product/${product.id}`} style={{ display: "flex" }}>
                <img
                  src={"data:image/*;base64," + product.image}
                  alt={product.name}
                  className="search-result-image"
                />
                <p>{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;
