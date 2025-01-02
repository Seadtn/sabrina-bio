import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

const Footer = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="footer" >
      <div className="container" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr'}>
        <div className="row">
          <div className="footer-co11"    style={{ textAlign: isArabic ? "right" : "left" }}>
            <h3 >{t("homePage.footer.headers.aboutUs")}</h3>
            <p>
            {t("homePage.footer.aboutUs.par1")}
            </p>
            <p>
            {t("homePage.footer.aboutUs.par2")}
            </p>
          </div>
          <div className="footer-co12" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr' }   style={{ textAlign: isArabic ? "right" : "left" }}>
            <h3>{t("homePage.footer.headers.links")}</h3>
            <ul>
              <li>
                <Link to="/">{t("homePage.menu.home")}</Link>
              </li>
              <li>
                <Link to="/products">{t("homePage.menu.products")}</Link>
              </li>
              <li>
                <Link to="/contact">{t("homePage.menu.contact")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-co13" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr'}   style={{ textAlign: isArabic ? "right" : "left" }}>
            <h3>{t("homePage.footer.headers.followUs")}</h3>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100085113430629&mibextid=LQQJ4d"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-facebook"></i> {t("general.facebook")}
                </a>
              </li>
              <li>
                <a
                  href="http://www.tiktok.com/@sabrinabiotunis"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-tiktok"></i> {t("general.tiktok")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sabrina_bio_officiel/profilecard/?igsh=MW81c24zZTg2aGF5NQ=="
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i> {t("general.instagram")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <p className="copyright">
          Copyright Sabrine Bio store &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
