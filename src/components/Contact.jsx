import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

const Contact = () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <>
      <div
        className="container"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <div className="content">
          <div className="row_contact mtop">
            <div className=" sign-col">
              <img
                className="contact__img"
                src={process.env.PUBLIC_URL + "/images/contact.jpg"}
                alt="contact"
              />
            </div>
            <div className="sign-col">
              <div className="form-box">
                <h2 className="left-">{t("homePage.menu.contact")}</h2>
                <p>{t("contactPage.description")}</p>
                <ul className="-span">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100085113430629&mibextid=LQQJ4d"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="fab fa-facebook"></i>{" "}
                      {t("general.facebook")}
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
                      <i className="fab fa-instagram"></i>{" "}
                      {t("general.instagram")}
                    </a>
                  </li>
                  <li dir="ltr" lang="fr">
                    <i className="fa fa-phone-alt"></i> +216 22 547 506
                  </li>
                  <li dir="ltr" lang="fr">
                    <i className="fa fa-phone-alt"></i> +216 22 547 506
                  </li>
                </ul>
                <div style={{ textAlign: "start" }}>
                  <label>{t("contactPage.subject")} :</label>
                  <input
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.subject")}
                  />
                  <label>{t("contactPage.email")} :</label>
                  <input
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.email")}
                  />
                  <label>{t("contactPage.message")} :</label>
                  <textarea
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.message")}
                  />
                  <button className="btn-primary">
                    <Link to="/products" className="btn-link">
                      {t("contactPage.btn")}
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
