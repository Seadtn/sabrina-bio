import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientAvis = () => {
  const data = [
    {
      type: "beforeAfter",
      before: process.env.PUBLIC_URL + "/images/publicity/before.jpg", // Before example
      after: process.env.PUBLIC_URL + "/images/publicity/after.jpg", // After example
      avisImage: process.env.PUBLIC_URL + "/images/publicity/comment.jpg", // Avis example
    },
    {
        type: "comment",
          images: [
            process.env.PUBLIC_URL + "/images/publicity/comment.jpg",
            process.env.PUBLIC_URL + "/images/publicity/comment.jpg",
            process.env.PUBLIC_URL + "/images/publicity/comment.jpg",
            process.env.PUBLIC_URL + "/images/publicity/comment.jpg",

          ],
        
      }
  ];

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
    <div className="client-avis-section">
      <h2 className="title">آراء عملائنا</h2>
      <Slider {...settings}>
        {data.map((item, index) => {
          if (item.type === "beforeAfter") {
            return (
              <div class="before-after-container" key={index}>
                <div class="image-pair">
                  <div class="image-box">
                    <img src={item.before} alt="Avant" loading="lazy"/>
                    <span class="label">ثبل</span>
                  </div>
                  <div class="image-box">
                    <img src={item.after} alt="Après" loading="lazy"/>
                    <span class="label">بعد</span>
                  </div>
                </div>

                <div class="client-avis-capture">
                  <img src={item.avisImage} alt="Capture avis client" loading="lazy"/>
                </div>

                <div class="client-comment">
                  <p>{item.comment}</p>
                </div>
                <div class="testimonial-content">
                  <div class="product-image">
                    <img src={item.i} alt={'product'+index} loading="lazy"/>
                  </div>
                  <div>
                    <h3 class="client-name">{"اللحسة الصحراوية للنساء"}</h3>
                  </div>

                  <div class="buy-button-avis">
                    <a href={item.productLink}>التطلع على المنتح</a>
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
                      <img
                        key={i}
                        src={img}
                        alt={`Avis ${i + 1}`}
                        className="capture-img"
                      />
                    ))}
                </div>
                <div class="testimonial-content">
                  <div class="product-image">
                    <img src={item.i} alt="Produit" loading="lazy"/>
                  </div>
                  <div>
                    <h3 class="client-name">{"اللحسة الصحراوية للنساء"}</h3>
                  </div>

                  <div class="buy-button-avis">
                  <a href={item.productLink}>التطلع على المنتح</a>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </Slider>
    </div>
  );
};

export default ClientAvis;
