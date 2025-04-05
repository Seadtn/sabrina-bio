import React, { useState } from "react";
import "../App.css";
import {useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";
import { addNewContact } from "../api/backend";

const Contact =  () => {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [msg, setMsg] = useState("");
  const [subject, setSubject] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigate();
  const sendMessage = (subject,mail,msg) => {
    if(subject==="" || mail==="" || msg===""){
      setError(true);
    }
    else{ 
    let contact={
        subject:subject,
        mail:mail,
        msg:msg
      }
      setError(false);
      addNewContact(contact);
      navigation("/")
    }
      
  };
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
                    <i className="fa fa-phone-alt"></i> +216 22 014 257
                  </li>
                  <li dir="ltr" lang="fr">
                    <i className="fa fa-phone-alt"></i> +216 52 052 265
                  </li>
                </ul>
                {error && <div style={{ textAlign: "center"}}>
                    <p style={{color:"red"}}>{t("contactPage.error")}</p>
                </div>}
                <div style={{ textAlign: "start" }}>
                  <label>{t("contactPage.subject")} :</label>
                  <input
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.subject")}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                  <label>{t("contactPage.email")} :</label>
                  <input
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.email")}
                    onChange={(e) => {
                      setMail(e.target.value);
                    }}
                  />
                  <label>{t("contactPage.message")} :</label>
                  <textarea
                    type="text"
                    className="data__input"
                    placeholder={t("contactPage.message")}
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                  />
                  <button className="btn-primary btn-link" onClick={()=>sendMessage(subject,mail,msg)}>
                      {t("contactPage.btn")}
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
