import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  minusItems,
  plusItems,
  removeItems,
} from "../../../redux/cart/slice.ts";
import i18n from "../../../i18n/i18n.js";
import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

const CartItem = ({
  id,
  newId,
  title,
  titleFr,
  titleEng,
  imageUrl,
  price,
  count,
  maxQuantity,
  type,
  option,
  freeDelivery,
  taste,
}) => {
  const dispatch = useDispatch();
  const isArabic = i18n.language === "ar";
  const isFrench = i18n.language === "fr";
  const { t } = useTranslation();

  const onClickPlus = () => {
    if (count < maxQuantity) {
      dispatch(plusItems(newId));
    }
  };

  const onClickMinus = () => {
    dispatch(minusItems(newId));
  };

  const onClickRemove = () => {
    dispatch(removeItems(newId));
  };
  const getName = () => {
    if (isArabic) {
      return title || titleFr || titleEng || "";
    } else if (isFrench) {
      return titleFr || titleEng || title || "";
    } else {
      return titleEng || titleFr || title || "";
    }
  };
  const getUnitLabel = (type, option, isArabic) => {
    if (!isArabic) {
      if (type === "GRAMMAGE" && option >= 1000) return "Kg";
      if (type === "DOSAGE" && option >= 1000) return "L";
      if(type === "GRAMMAGE" && option < 1000) return "g";
      if(type === "DOSAGE" && option < 1000) return "ml";
    } else {
      if (type === "GRAMMAGE" && option >= 1000) return "كغ";
      if (type === "DOSAGE" && option >= 1000) return "ل";
      if(type === "GRAMMAGE" && option < 1000) return "غ";
      if(type === "DOSAGE" && option < 1000) return "مل";
    }
    return "";
  };
  const getOption=(opt,type)=>{
    if((type === "GRAMMAGE" || type === "DOSAGE") && opt>=1000){
      return opt/1000
    }
    if((type === "GRAMMAGE" || type === "DOSAGE") && opt<1000){
      return opt
    }
    return ""
  }
  return (
    <>
      <div
        className="cart__order"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <div className="cart__column">
          <div className="cart__item">
            <div className="cart__img">
              <img src={imageUrl} alt={getName()} loading="lazy" />
            </div>

            <div className="cart__info">
              <Link to={`/product/${id}`} className="cart__name">
                {getName()} <br />{" "}
                {freeDelivery && (
                  <div>
                    <Chip
                      label={t("homePage.products.deliveryLabel")}
                      color="success"
                      size="small"
                      sx={{
                        color: "white",
                        padding: "5px",
                        marginRight: "10px",
                        marginTop: "5px",
                        marginLeft: "10px",
                      }}
                    />
                    <br />{" "}
                  </div>
                )}
                <small
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "gray",
                  }}
                >
                  {" "}
                  {getOption(Number(option),type)} {getUnitLabel(type, Number(option), isArabic)}{" "}
                  {taste ? "-" + taste : ""}
                </small>
              </Link>
              <div className="cart__amount">
                <button
                  aria-label="minusBtn"
                  disabled={count === 1}
                  className="cart__minus"
                  onClick={onClickMinus}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 10 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0.285706H5.71429H4.28571H0V1.71428H4.28571H5.71429H10V0.285706Z"
                      fill="#2fcb00"
                    ></path>
                  </svg>
                </button>
                <div className="cart__number">{count}</div>
                <button
                  aria-label="plusBtn"
                  disabled={count >= maxQuantity}
                  className="cart__plus"
                  onClick={onClickPlus}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.28571 4.28571V0H5.71429V4.28571H10V5.71429H5.71429V10H4.28571V5.71429H0V4.28571H4.28571Z"
                      fill="#2fcb00"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="cart__column">
          <div className="cart__block">
            <button
              aria-label="trashBtn"
              className="cart__trashbin"
              onClick={onClickRemove}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.75 5H25V7.5H22.5V23.75C22.5 24.0815 22.3683 24.3995 22.1339 24.6339C21.8995 24.8683 21.5815 25 21.25 25H3.75C3.41848 25 3.10054 24.8683 2.86612 24.6339C2.6317 24.3995 2.5 24.0815 2.5 23.75V7.5H0V5H6.25V1.25C6.25 0.918479 6.3817 0.600537 6.61612 0.366116C6.85054 0.131696 7.16848 0 7.5 0H17.5C17.8315 0 18.1495 0.131696 18.3839 0.366116C18.6183 0.600537 18.75 0.918479 18.75 1.25V5ZM20 7.5H5V22.5H20V7.5ZM8.75 11.25H11.25V18.75H8.75V11.25ZM13.75 11.25H16.25V18.75H13.75V11.25ZM8.75 2.5V5H16.25V2.5H8.75Z"
                  fill="#2fcb00"
                />
              </svg>
            </button>
            <div className="cart__price">
              {price * count} {!isArabic ? "DT" : "دت"}
            </div>
          </div>
        </div>
      </div>
      <div className="cart__hr"></div>
    </>
  );
};

export default CartItem;
