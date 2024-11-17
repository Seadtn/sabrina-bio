import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      general: {
        search: "Search....",
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "Tiktok",
      },
      homePage: {
        menu: {
          welcome: "Welcome",
          home: "Home",
          products: "Products",
          contact: "Contact",
          livraisonText: "Free delivery starting from ",
          livraisonPrix: "300 DT",
        },
        slider: {
          collectionBtn: "visit collections",
          description:
            "Discover the ultimate online destination for beauty enthusiasts! Explore the latest trends in cosmetics that make a difference. From in-depth reviews to must-have products for women, men, and kids, we have everything you need to elevate your beauty game",
          type: {
            firstShop: "{{itm}}% Off For Your First Shopping",
            newProduct: "Check out our new arrivals !",
            sold: "{{itm}}% off this item",
          },
        },
        products: {
          title: "Our Products",
          new: "New Products",
          newLabel: "New",
          category: {
            all: "All",
            herbs: "Herbs and grains",
            oils: "Natural Oils",
            cosmetic: "Cosmetics",
          },
          viewAllBtn: "View All",
          viewBtn: "Fast View",
          buyBtn: "Buy",
        },
        deliverySection: {
          delivery: {
            title: "Fast Delivery",
            description:
              "Order today and receive your products in record time.",
          },
          payment: {
            title: "Cash on Delivery",
            description: "We offer a cash on delivery payment option.",
          },
          service: {
            title: "24/7 Customer Service",
            description:
              "Our customer service team is available to assist you day and night.",
          },
          services: "Our Services",
        },
        mostSellerSection: {
          title: "Our Best-Selling",
        },
        footer: {
          headers: {
            links: "Links",
            aboutUs: "About Us",
            followUs: "Follow us",
          },
          aboutUs: {
            par1: "Sabrina Bio is a Tunisian small business offering natural cosmetic products like oils and herbs. We believe in the power of nature to enhance beauty and well-being.",
            par2: "Our products are crafted with care, promoting sustainability and the timeless beauty secrets of Tunisia. Choose Sabrina Bio for pure, natural beauty solutions.",
          },
        },
        categories: {
          title: "Our Categories",
        },
      },

      // Add more translations here
    },
  },
  ar: {
    translation: {
      general: {
        search: "البحث.....",
        facebook: "فيسبوك",
        instagram: "إنستغرام",
        tiktok: "تيك توك",
      },
      homePage: {
        menu: {
          welcome: "مرحبا",
          home: "الصفحة الرئيسية",
          products: "المنتجات",
          contact: "اتصل بنا",
          livraisonText: "توصيل مجاني ابتداءً من ",
          livraisonPrix: "300 د.ت",
        },
        slider: {
          collectionBtn: "زيارة المجموعات",
          description:
            "اكتشف الوجهة النهائية على الإنترنت لعشاق الجمال! استكشف أحدث الاتجاهات في مستحضرات التجميل التي تُحدث فرقًا. من المراجعات المتعمقة إلى المنتجات الأساسية للنساء والرجال والأطفال، لدينا كل ما تحتاجه لتحسين روتينك الجمالي",
          type: {
            firstShop: "خصم على تسوقك الأول ٪{{itm}}",
            newProduct: "! تصفح أحدث المنتجات لدينا",
            sold: "خصم على هذا العنصر ٪{{itm}}",
          },
        },
        products: {
          title: "منتجاتنا",
          new: "منتجاتنا الجديدة",
          newLabel: "جديد",
          category: {
            all: "الكل",
            herbs: "الأعشاب و الحبوب",
            oils: "الزيوت الطبيعية",
            cosmetic: "مستحضارات تجميل",
          },
          viewAllBtn: "عرض الكل",
          viewBtn: "عرض سريع",
          buyBtn: "شراء",
        },
        deliverySection: {
          delivery: {
            title: "توصيل سريع",
            description: ".اطلب اليوم واستلم منتجاتك في وقت قياسي",
          },
          payment: {
            title: "الدفع عند الاستلام",
            description: ".نقدم خيار الدفع عند الاستلام",
          },
          service: {
            title: "خدمة العملاء على مدار الساعة",
            description: "فريق خدمة العملاء لدينا متاح لمساعدتك ليلاً ونهارًا",
          },
          services: "خدماتنا",
        },
        mostSellerSection: {
          title: "الأكثر مبيعا",
        },
        footer: {
          headers: {
            links: "روابط",
            aboutUs: "من نحن",
            followUs: "تابعنا",
          },
          aboutUs: {
            par1: "صابرينا بيو هي شركة تونسية صغيرة تقدم منتجات تجميل طبيعية مثل الزيوت والأعشاب. نحن نؤمن بقوة الطبيعة في تعزيز الجمال والرفاهية.",
            par2: "منتجاتنا مصنوعة بعناية، تروج للاستدامة وأسرار الجمال الخالدة في تونس. اختر صابرينا بيو لحلول الجمال الطبيعية والنقية.",
          },
        },
        categories: {
          title: "فئاتنا",
        },
      },

      // Add more translations here
    },
  },
  fr: {
    translation: {
      general: {
        search: "Recherche.....",
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "Tiktok",
      },
      homePage: {
        menu: {
          welcome: "Bienvenue",
          home: "Accueil",
          products: "Produits",
          contact: "Contactez",
          livraisonText: "Livraison gratuite à partir de ",
          livraisonPrix: "300 DT",
        },
        slider: {
          collectionBtn: " Visiter les collections",
          description:
            "Découvrez la destination en ligne ultime pour les passionnés de beauté ! Explorez les dernières tendances en cosmétique qui font la différence. Des critiques approfondies aux produits incontournables pour les femmes, les hommes et les enfants, nous avons tout ce qu'il vous faut pour rehausser votre routine beauté",
          type: {
            firstShop: "{{itm}}% de réduction pour vos premiers achats",
            newProduct: "Découvrez nos nouvelles arrivées !",
            sold: "{{itm}}% de réduction sur cet article",
          },
        },
        products: {
          title: "Nos Produits",
          new: "Nouveaux Produits",
          newLabel: "Nouveau",
          category: {
            all: "Tout",
            herbs: "Herbes et Grains",
            oils: "Huiles Naturelles",
            cosmetic: "Cosmétiques",
          },
          viewAllBtn: "Voir tout",
          viewBtn: "Vue rapide",
          buyBtn: "Acheter",
        },
        deliverySection: {
          delivery: {
            title: "livraison rapide",
            description:
              "Commendez aujourd'hui et reçevez vos produits en temps record.",
          },
          payment: {
            title: "paiment à la livraison",
            description: "Nous offrons une option de paiement à la livraison.",
          },
          service: {
            title: "Service Clientèle 24/7",
            description:
              " Notre équipe de service clientèle est à votre disposition jour et nuit.",
          },
          services: "Nos Services",
        },
        mostSellerSection: {
          title: "les Plus Vendus",
        },
        footer: {
          headers: {
            links: "Liens",
            aboutUs: "À propos de nous",
            followUs: "Suivez-nous",
          },
          aboutUs: {
            par1: "Sabrina Bio est une petite entreprise tunisienne offrant des produits cosmétiques naturels tels que des huiles et des herbes. Nous croyons au pouvoir de la nature pour sublimer la beauté et le bien-être.",
            par2: "Nos produits sont soigneusement élaborés, promouvant la durabilité et les secrets de beauté intemporels de la Tunisie. Choisissez Sabrina Bio pour des solutions de beauté pures et naturelles.",
          },
        },
        categories: {
          title: "Nos catégories",
        },
      },
      // Add more translations here
    },
  },
};

i18n
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "ar", // Default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
