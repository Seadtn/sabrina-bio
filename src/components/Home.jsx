import React, { useState, useEffect } from 'react';
import BannerSection from './BannerSection';
import ProductCard from './ProductCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';
import DeliveryCards from './DeliveryCards';
import i18n from '../i18n/i18n';
import SearchBar from './SearchBar'; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState(products);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const isArabic = i18n.language === 'ar';
    
    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            const filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilter(filteredProducts);
        } else {
            setFilter(products); 
        }
    };

    useEffect(() => {
        let loadProducts = true;

        const getProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products', { mode: 'cors' });
            setLoading(true);

            if (loadProducts) {
                const data = await res.json();
                setProducts(data);
                setFilter(data);
                setLoading(false);
            }
            return () => {
                loadProducts = false;
            };
        };
        getProducts();
    }, []);

    const filterProducts = (category) => {
        const data = products.filter(product => product.category === category);
        setFilter(data);
    };

    const Loading = () => {
        return (
            <>
                <div className="col4 product">
                    <Skeleton height={350} />
                </div>
                <div className="col4 product">
                    <Skeleton height={350} />
                </div>
                <div className="col4 product">
                    <Skeleton height={350} />
                </div>
                <div className="col4 product">
                    <Skeleton height={350} />
                </div>
            </>
        );
    };

    return (
        <div className="container">
            <BannerSection />
            <DeliveryCards />
            <div className="content">
                <h2 className="title">{t('homePage.products.title')}</h2>
                <SearchBar onSearch={handleSearch} />
                <div className="categories">
                    <div className="content">
                        <div className="row" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'fr'}>
                            <span id="all" onClick={() => setFilter(products)}>{t('homePage.products.category.all')}</span>
                            <span id="all" onClick={() => filterProducts('jewelery')}>{t('homePage.products.category.cosmetic')}</span>
                            <span id="all" onClick={() => filterProducts('men\'s clothing')}>{t('homePage.products.category.oils')}</span>
                            <span id="all" onClick={() => filterProducts('women\'s clothing')}>{t('homePage.products.category.herbs')}</span>
                        </div>
                    </div>
                </div>
                <div className="row products">
                    {loading ? <Loading /> :
                        filter.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;
