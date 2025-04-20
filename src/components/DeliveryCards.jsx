import React from "react";
import { MdPayment } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

function DeliveryCards() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div style={{ marginBottom: "50px" }} className="container">
      <h2 className="title">{t("homePage.deliverySection.services")}</h2>

      <div
        className="row"
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "fr"}
      >
        <div className="deliveryCardGroup">
          <div className="left">
            <TbTruckDelivery className="deliveryCardIcon" />
          </div>
          <div className="right">
            <p className="deliveryCardTitle">
              {t("homePage.deliverySection.delivery.title")}
            </p>
            <p className="deliveryCardDesc">
              {t("homePage.deliverySection.delivery.description")}
            </p>
          </div>
        </div>
        <div className="deliveryCardGroup">
          <div className="left">
            <MdPayment className="deliveryCardIcon" />
          </div>
          <div className="right">
            <p className="deliveryCardTitle">
              {t("homePage.deliverySection.payment.title")}
            </p>
            <p className="deliveryCardDesc">
              {t("homePage.deliverySection.payment.description")}
            </p>
          </div>
        </div>
        <div className="deliveryCardGroup">
          <div className="left">
            <RiCustomerService2Fill className="deliveryCardIcon" />
          </div>
          <div className="right">
            <p className="deliveryCardTitle">
              {t("homePage.deliverySection.service.title")}
            </p>
            <p className="deliveryCardDesc">
              {t("homePage.deliverySection.service.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryCards;
