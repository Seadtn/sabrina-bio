import React from "react";
import { useSelector } from "react-redux";
import FavoritesEmpty from "./pages/FavoritesEmpty";
import FavoritesBlock from "./pages/FavoritesBlock";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n.js";
const Favorites = () => {
  window.scrollTo(0, 0);
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { favorites } = useSelector((state) => state.favorite);
  const isMountedFavorites = React.useRef(false);

  React.useEffect(() => {
    if (isMountedFavorites.current) {
      const dataFavorites = JSON.stringify(favorites);
      localStorage.setItem("favorites", dataFavorites);
    }
    isMountedFavorites.current = true;
  }, [favorites]);

  return (
    <>
      {favorites.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <section
          className="favorites"
          dir={isArabic ? "rtl" : "ltr"}
          lang={isArabic ? "ar" : "fr"}
        >
          <div className="container">
            <div className="favorites__title">{t("favorites.title")}</div>
            <div className="favorites__row">
              {favorites.map((item) => (
                <FavoritesBlock key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Favorites;
