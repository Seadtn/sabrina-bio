import React from 'react'
import SliderData from '../SliderData'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../App.css'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n'

const BannerSection = () =>{
    const { t } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
        return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
    }
    return (
        <div className="homeSlide" >
        <Slider {...settings}>
            {
                SliderData.map((slider,index)=>{
                    return(
                        <div className="box" key={index} dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr'}>
                            <div className="left">
                                <h1>{t(`homePage.slider.type.${slider.type}`, { itm: slider.Percent })}</h1>
                                <p>{t('homePage.slider.description')}</p>
                                <button className="btn-primary">
                                    <Link to='/products' className="btn-link">
                                        {t('homePage.slider.collectionBtn')}
                                    </Link>
                                </button>
                            </div>
                            <div className="right">
                                <img src={slider.cover} alt="slider"/>
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
        </div>
    )
}

export default BannerSection