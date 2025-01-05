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
        btnClose: "Close",
      },
      homePage: {
        menu: {
          welcome: "Welcome",
          home: "Home",
          products: "Products",
          contact: "Contact Us",
          livraisonText: "Free delivery starting from ",
          livraisonPrix: "100 DT",
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
          soldLabel: "On Sale",
          category: {
            all: "All",
            herbs: "Herbs and grains",
            oils: "Natural Oils",
            cosmetic: "Cosmetics",
          },
          sort: {
            title: "Sort By",
            select: "Select option",
            highPrice: "High Price",
            lowPrice: "Low Price",
            name: "Name,",
          },
          search: {
            title: "Search",
            input: "Search by  name...",
          },
          details: {
            grammage: "Weight",
            dosage: "Dose",
            gouts: "Flavors",
          },
          viewAllBtn: "View All",
          viewBtn: "Fast View",
          buyBtn: "Buy",
          related: "Related Products",
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
      cartPage: {
        cart: {
          title: "Your order",
          total: "Total",
          price: "DT",
          empty: {
            title: "The cart is empty",
            desc1: "Chances are you haven't added anything to your cart yet.",
            desc2: "To do so, please visit the catalog.",
            btn: "Go to the catalog ",
          },
        },
        order: {
          title: "Checkout",
          catchPhrase1:
            "Personal data is familiar with the terms of confidentiality",
          catchPhrase2: "Delivery method",
          linePhrase: "Delivery address",
          catchPhrase3:
            "You can pay for your purchase in one of the following ways",
          phraseTic1: "Full subscription via Privat 24",
          phraseTic2: "Cash on delivery",
          phraseTic3: "Poste money transfer",
          catchPhrase4: "Promo code",
          leftLine11: "Delivery ",
          leftLine12: "8 DT",
          leftLine2: "Total price",
          closingPhrase:
            "By clicking on the 'pay for the order' button, I accept the terms of the public offer and policy Privacy",
          empty: {
            title: "Favorites",
            desc1: "THERE ARE NO PRODUCTS IN FAVORITES",
            desc2: "POKE ON ❤ YOU DON'T LOSE",
            btn: "Go to the catalog",
          },
        },
        input: {
          firstName: "First Name",
          lastName: "Last Name",
          phone: "Phone",
          mail: "Email",
          city: "City",
          postalCode: "Postal Code",
        },
      },
      favorites: {
        title: "Favorites",
      },
      contactPage: {
        subject: "Subject",
        email: "Your Email",
        message: "Message",
        description:
          "Sabrina Bio is a Tunisian small business offering natural cosmetic products like oils and herbs. We believe in the power of nature to enhance beauty and well-being",
        btn: "Send",
        error: "Please fill in all fields",
        modal: {
          msg: "Your command has been sent successfully!",
        },
      },
      Modals: {
        modalCart: {
          title: "Performed",
          msg: "The product has been successfully added to the cart",
          btn1: "Continue shopping",
          btn2: "Go to cart",
        },
        ModalFavorites: {
          title: "Performed",
          msg: "The product has been successfully added to favorites",
          btn1: "Continue shopping",
          btn2: "Go to favorites",
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
        btnClose: "اغلاق",
      },
      homePage: {
        menu: {
          welcome: "مرحبا",
          home: "الصفحة الرئيسية",
          products: "المنتجات",
          contact: "اتصل بنا",
          livraisonText: "توصيل مجاني ابتداءً من ",
          livraisonPrix: "100 د.ت",
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
          soldLabel: "مُخفض",
          category: {
            all: "الكل",
            herbs: "الأعشاب و الحبوب",
            oils: "الزيوت الطبيعية",
            cosmetic: "مستحضارات تجميل",
          },
          sort: {
            title: "ترتيب حسب",
            select: "اختر الخيار",
            highPrice: "أعلى سعر",
            lowPrice: "أقل سعر",
            name: "الاسم",
          },
          search: {
            title: "بحث",
            input: "ابحث بالاسم...",
          },
          details: {
            grammage: "الوزن",
            dosage: "الجرعة",
            gouts: "النّكهات",
          },
          viewAllBtn: "عرض الكل",
          viewBtn: "عرض سريع",
          buyBtn: "شراء",
          related: "منتجات ذات صلة",
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
      cartPage: {
        cart: {
          title: "طلبك",
          total: "المجموع",
          price: "دينار تونسي",
          empty: {
            title: "السلة فارغة",
            desc1: "من المحتمل أنك لم تضف أي شيء إلى سلتك بعد.",
            desc2: "للقيام بذلك، يرجى زيارة الكتالوج.",
            btn: "اذهب إلى الكتالوج",
          },
        },
        order: {
          title: "إتمام الطلب",
          catchPhrase1: "البيانات الشخصية متوافقة مع شروط الخصوصية",
          catchPhrase2: "طريقة التوصيل",
          linePhrase: "عنوان التوصيل",
          catchPhrase3: "يمكنك الدفع لشرائك بإحدى الطرق التالية",
          phraseTic1: "الاشتراك الكامل عبر Privat 24",
          phraseTic2: "الدفع نقدًا عند التسليم ",
          phraseTic3: "تحويل أموال بواسطة Poste",
          catchPhrase4: "رمز الخصم",
          leftLine11: " التوصيل",
          leftLine12: "8 د.ت",
          leftLine2: "السعر الإجمالي",
          closingPhrase:
            "بالنقر على زر 'دفع الطلب'، أوافق على شروط العرض العام وسياسة الخصوصية",
          empty: {
            title: "المفضلة",
            desc1: "لا توجد منتجات في المفضلة",
            desc2: "اضغط ❤ حتى لا تفقدها",
            btn: "اذهب إلى الكتالوج",
          },
        },
        input: {
          firstName: "الاسم ",
          lastName: "لقب العائلة",
          phone: "الهاتف",
          mail: "البريد الإلكتروني",
          city: "المدينة",
          postalCode: "الرمز البريدي",
        },
      },
      favorites: {
        title: "المفضلة",
      },
      contactPage: {
        subject: "الموضوع",
        email: "بريدك الإلكتروني",
        message: "الرسالة",
        description:
          "سابرينا بايو هي شركة صغيرة تونسية تقدم منتجات تجميل طبيعية مثل الزيوت والأعشاب. نحن نؤمن بقوة الطبيعة في تعزيز الجمال والرفاهية.",
        btn: "إرسال",
        error: "الرجاء ملء جميع البيانات ",
        modal: {
          msg: "تم إرسال طلبك بنجاح!",
        },
      },
      Modals: {
        modalCart: {
          title: "تم بنجاح",
          msg: "تمت إضافة المنتج إلى السلة بنجاح",
          btn1: "متابعة التسوق",
          btn2: "الذهاب إلى السلة",
        },
        ModalFavorites: {
          title: "تم بنجاح",
          msg: "تمت إضافة المنتج إلى المفضلة بنجاح",
          btn1: "متابعة التسوق",
          btn2: "الذهاب إلى المفضلة",
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
        btnClose: "Fermer",
      },
      homePage: {
        menu: {
          welcome: "Bienvenue",
          home: "Accueil",
          products: "Produits",
          contact: "Nos Contacts",
          livraisonText: "Livraison gratuite à partir de ",
          livraisonPrix: "100 DT",
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
          soldLabel: "Soldé",
          category: {
            all: "Tout",
            herbs: "Herbes et Grains",
            oils: "Huiles Naturelles",
            cosmetic: "Cosmétiques",
          },
          sort: {
            title: "Trier par",
            select: "Sélectionner une option",
            highPrice: "Prix élevé",
            lowPrice: "Prix bas",
            name: "Nom",
          },
          search: {
            title: "Rechercher",
            input: "Rechercher par nom...",
          },
          details: {
            grammage: "Grammage",
            dosage: "Dosage",
            gouts: "Goûts",
          },
          viewAllBtn: "Voir tout",
          viewBtn: "Vue rapide",
          buyBtn: "Acheter",
          related: "Produits Connexes",
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
      cartPage: {
        cart: {
          title: "Votre commande",
          total: "Total",
          price: "DT",
          empty: {
            title: "Le panier est vide",
            desc1:
              "Il est probable que vous n'ayez pas encore ajouté d'articles à votre panier.",
            desc2: "Pour ce faire, veuillez visiter le catalogue.",
            btn: "Aller au catalogue",
          },
        },
        order: {
          title: "Passer à la caisse",
          catchPhrase1:
            "Les données personnelles sont conformes aux conditions de confidentialité",
          catchPhrase2: "Mode de livraison",
          linePhrase: "Adresse de livraison",
          catchPhrase3:
            "Vous pouvez payer votre achat de l'une des manières suivantes",
          phraseTic1: "Abonnement complet via Privat 24",
          phraseTic2: "Paiement à la livraison",
          phraseTic3: "Transfert d'argent a travers Poste",
          catchPhrase4: "Code promo",
          leftLine11: "Livraison ",
          leftLine12: "8 DT",
          leftLine2: "Prix total",
          closingPhrase:
            "En cliquant sur le bouton 'payer la commande', j'accepte les conditions de l'offre publique et la politique de confidentialité",
          empty: {
            title: "Favoris",
            desc1: "IL N'Y A AUCUN PRODUIT DANS LES FAVORIS",
            desc2: "POKEZ SUR ❤ POUR NE PAS PERDRE",
            btn: "Aller au catalogue",
          },
        },
        input: {
          firstName: "Prénom",
          lastName: "Nom de famille",
          phone: "Téléphone",
          mail: "E-mail",
          city: "Ville",
          postalCode: "Code postal",
        },
      },
      favorites: {
        title: "Favoris",
      },
      contactPage: {
        subject: "Sujet",
        email: "Votre Email",
        message: "Message",
        description:
          "Sabrina Bio est une petite entreprise tunisienne qui propose des produits cosmétiques naturels comme des huiles et des herbes. Nous croyons au pouvoir de la nature pour sublimer la beauté et le bien-être.",
        btn: "Envoyer",
        error: "Veuillez remplir tous les champs",
        modal: {
          msg: "Votre commande a été envoyée avec succès !",
        },
      },
      Modals: {
        modalCart: {
          title: "Effectué",
          msg: "Le produit a été ajouté avec succès au panier",
          btn1: "Continuer vos achats",
          btn2: "Aller au panier",
        },
        ModalFavorites: {
          title: "Effectué",
          msg: "Le produit a été ajouté avec succès aux favoris",
          btn1: "Continuer vos achats",
          btn2: "Aller aux favoris",
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
