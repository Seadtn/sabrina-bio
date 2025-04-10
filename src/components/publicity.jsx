import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
//     --tb-text-primary-font: Urbanist; --tb-text-second-font: Cormorant Garamond, sans-serif;
function Publicity() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <div>
      <div className="publicity">
        <div className="publicity_content">
          <div className="publicity_icons">
            <a
              href="https://www.facebook.com/profile.php?id=100085113430629&mibextid=LQQJ4d"
              rel="noreferrer"
              target="_blank"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="http://www.tiktok.com/@sabrinabiotunis"
              rel="noreferrer"
              target="_blank"
            >
              <i className="fab fa-tiktok"></i>
            </a>

            <a
              href="https://www.instagram.com/sabrina_bio_officiel/profilecard/?igsh=MW81c24zZTg2aGF5NQ=="
              rel="noreferrer"
              target="_blank"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="publicity_text" >
            <div className="publicity_text_welcome" >
              <i className="fas fa-shop"></i>
              Bienvenue Chez Sabrine Bio !
            </div>
            <div className="publicity_text_mail">
              <i className="fas fa-phone" ></i>
              <a href="tel:+21658959019">+216 22 014 257</a>
              <a href="tel:+216 52 052 265">+216 52 052 265</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publicity;
