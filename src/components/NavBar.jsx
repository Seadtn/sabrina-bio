import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import i18n from "i18next";
import "../App.css";
import { useTranslation } from "react-i18next";

const languages = {
  ar: { label: "العربية", flag: "/images/flags/arabic.jpg" },
  fr: { label: "Français", flag: "/images/flags/french.png" },
  en: { label: "English", flag: "/images/flags/english.jpg" },
};

const NavBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

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

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <h4>
            Sabrine <span>Bio</span>
          </h4>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">{t("homePage.menu.home")}</Link>
          </li>
          <li>
            <Link to="/products">{t("homePage.menu.products")}</Link>
          </li>
          <li>
            <Link to="/contact">{t("homePage.menu.contact")}</Link>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <div className="selected-language" onClick={toggleDropdown}>
              <img
                src={languages[selectedLanguage].flag}
                alt={languages[selectedLanguage].label}
              />
              {languages[selectedLanguage].label}
              <i className={`fas fa-chevron-${dropdownOpen ? "up" : "down"}`} />
            </div>
            {dropdownOpen && (
              <div className="language-dropdown">
                {Object.entries(languages).map(([key, { label, flag }]) => (
                  <span key={key} onClick={() => changeLanguage(key)}>
                    <img src={flag} alt={label} /> {label}
                  </span>
                ))}
              </div>
            )}
          </li>
          <Link to="#">
            <i class="fas fa-heart cart">
              <span id="itemsNum">0</span>
            </i>
          </Link>
          <Link to="/cart">
            <i className="fas fa-shopping-cart cart">
              <span id="itemsNum">0</span>
            </i>
          </Link>

        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
