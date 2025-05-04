import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getActiveTestimonials } from "../api/backend";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ClientAvis = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getActiveTestimonials();
        setTestimonials(response);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    testimonials.length > 0 && (
      <div className="client-avis-section">
        <h2 className="title">{t("homePage.avisClient.title")}</h2>
        <Slider {...settings}>
          {testimonials.map((item, index) => {
            if (item.type === "beforeAfter") {
              return (
                <div className="before-after-container" key={index}>
                  <div className="image-pair">
                    <div className="image-box">
                      <img
                        src={`data:image/jpeg;base64,${item.beforeImageUrl}`}
                        alt="Avant"
                        loading="lazy"
                      />
                      <span className="label">
                        {t("homePage.avisClient.before")}
                      </span>
                    </div>
                    <div className="image-box">
                      <img
                        src={`data:image/jpeg;base64,${item.afterImageUrl}`}
                        alt="Après"
                        loading="lazy"
                      />
                      <span className="label">
                        {t("homePage.avisClient.after")}
                      </span>
                    </div>
                  </div>

                  {item.avisImageUrl && (
                    <div className="client-avis-capture">
                      <img
                        src={`data:image/jpeg;base64,${item.avisImageUrl}`}
                        alt="Capture avis client"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="testimonial-content">
                    <div>
                      <h3 className="client-name">{item.productName}</h3>
                    </div>

                    <div
                      className="buy-button-avis"
                      onClick={() => navigate("product/" + item.productId)}
                    >
                      <Link>{t("homePage.avisClient.btn")}</Link>
                    </div>
                  </div>
                </div>
              );
            } else if (item.type === "comment") {
              return (
                <div key={index} className="comment-slide">
                  <div className="comment-captures">
                    {item.images &&
                      item.images.map((img, i) => (
                        (img &&<img
                          key={i}
                          src={`data:image/jpeg;base64,${img}`}
                          alt={`Avis ${i + 1}`}
                          className="capture-img"
                        />)
                      ))}
                  </div>
                  <div className="testimonial-content">
                    <div>
                      <h3 className="client-name">{item.productName}</h3>
                    </div>

                    <div
                      className="buy-button-avis"
                      onClick={() => navigate("product/" + item.productId)}
                    >
                      {/* TODO : translate this */}
                      <Link>{t("homePage.avisClient.btn")}</Link> 
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </Slider>
      </div>
    )
  );
};

export default ClientAvis;
