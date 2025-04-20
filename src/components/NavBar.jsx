import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation(); // Get the current location
  const { favorites } = useSelector((state) => state.favorite);
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("languageSabrinaBio") || "ar";
  });
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

  const changeLanguage = (langKey) => {
    i18n.changeLanguage(langKey);
    setSelectedLanguage(langKey);
    localStorage.setItem("languageSabrinaBio", langKey);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("languageSabrinaBio");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
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

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <div>
      <Publicity />

      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="dropdown" ref={dropdownRef}>
              <div className="selected-language" onClick={toggleDropdown}>
                <img
                  src={
                    process.env.PUBLIC_URL + languages[selectedLanguage].flag
                  }
                  alt={languages[selectedLanguage].label}
                  style={{ width: "40px", height: "auto", borderRadius: "4px" }}
                  loading="lazy"
                />
              </div>

              {dropdownOpen && (
                <div className="language-dropdown">
                  {Object.entries(languages)
                    .filter(([key]) => key !== selectedLanguage)
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
                          loading="lazy"
                        />
                      </span>
                    ))}
                </div>
              )}
            </div>
            <SearchBar onSearch={handleSearch} className="search-bar" />
          </div>
          <div className="logo navbar-center">
            <Link to="/">
              <h4>
                Sabrina <span>Bio</span>
              </h4>
            </Link>
          </div>

          <div className="navbar-right">
            <div>
              {/* Mobile Nav Menu */}
              <ul
                className={isMobile ? "nav-links-mobile" : "nav-links"}
                onClick={() => setIsMobile(false)}
                dir={isArabic && isMobile ? "rtl" : "ltr"}
                lang={isArabic && isMobile ? "ar" : "fr"}
              >
                <li className="nav-element">
                  {/* <Link to="/">{t("homePage.menu.home")}</Link> */}
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
            </div>
            {
              <div>
                {/* Floating Buttons Container */}
                <div className="floating-buttons">
                  {/* Only show Favorite button if we're not on the Favorite page */}
                  {location.pathname !== "/favorite" && (
                    <button
                      className="floating-button favorite"
                      onClick={() => {
                        navigate("/favorite");
                        setIsMobile(false);
                      }}
                      title={t("homePage.menu.favorite")}
                    >
                      <i className="fas fa-heart"></i>
                      {totalFavoritesAmount > 0 && (
                        <span className="badge">{totalFavoritesAmount}</span>
                      )}
                    </button>
                  )}

                  {/* Only show Cart button if we're not on the Cart page */}
                  {location.pathname !== "/cart" && (
                    <button
                      className="floating-button"
                      onClick={() => {
                        navigate("/cart");
                        setIsMobile(false);
                      }}
                      title={t("homePage.menu.cart")}
                    >
                      <i className="fas fa-shopping-cart"></i>
                      {totalCartAmount > 0 && (
                        <span className="badge">{totalCartAmount}</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            }
            <button
              className="mobile-icon"
              onClick={() => setIsMobile(!isMobile)}
            >
              {isMobile ? (
                <i className="fas fa-times menu" style={{color:"black"}}></i>
              ) : (
                <i className="fas fa-bars menu" style={{color:"black"}}></i>
              )}
            </button>
          </div>
        </div>
        <div className="search-mobile-margin">
          <SearchBar onSearch={handleSearch} className="search-bar-mobile" />
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
                  loading="lazy"
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
