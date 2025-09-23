import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    // Sections Headings
    whoWeAre: "Who We Are",
    ourServices: "Our Services",
    pricingPlans: "Pricing Plans",
    pricingSubtitle:
      "Affordable plans designed for every school's needs. Choose the perfect plan for your educational institution.",
    aboutIntro:
      "Madrassati is a modern platform designed to connect schools, teachers, and parents in one place. We simplify communication, grades, and schedules—making education more transparent and accessible for everyone.",
    service_parent_title: "Parent Dashboard",
    service_parent_text:
      "Track grades, schedules, and announcements in real time.",
    service_teacher_title: "Teacher Tools",
    service_teacher_text:
      "Manage classes, share grades, and communicate with parents easily.",
    service_school_title: "School Management",
    service_school_text:
      "Organize timetables, attendance, and reports seamlessly.",
    service_secure_title: "Secure Platform",
    service_secure_text:
      "Data is protected and accessible only to authorized users.",
    contactUs: "Contact Us",
    contactSubtitle: "We're here to help and answer your questions",
    getInTouch: "Get in Touch",
    sendUsMessage: "Send us a message",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    callUs: "Call Us",
    emailUs: "Email Us",
    planStarterTitle: "Starter",
    planStarterDesc:
      "Perfect for small private schools or institutions starting their digital journey. 200 students.",
    planGrowthTitle: "Growth",
    planGrowthDesc:
      "Ideal for mid-sized schools looking for advanced digital communication and management. 500 students.",
    planPremiumTitle: "Premium",
    planPremiumDesc:
      "Designed for large educational institutions needing a robust and scalable platform. 1000 students.",
    // Navigation
    home: "Home",
    about: "About",
    pricing: "Pricing",
    testimonials: "Testimonials",
    contact: "Contact",
    login: "Login",

    // Hero Section
    heroTitle: "Madrassati",
    heroSubtitle:
      "Stay connected to your child's school life anytime, anywhere. Experience the future of education management.",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Testimonials
    testimonialsTitle: "What Our Users Say",
    testimonialsSubtitle:
      "Trusted by Parents, Teachers, and Students worldwide",

    // Login/Register
    welcomeBack: "Welcome Back!",
    signInSubtitle:
      "Sign in to continue your educational journey with Madrassati",
    createAccount: "Create Account",
    joinMadrassati: "Join Madrassati!",
    registerSubtitle:
      "Start your educational journey with our comprehensive school management platform",
    signIn: "Sign In",
    enterCredentials: "Enter your credentials to access your account",
    fullName: "Full name",
    emailAddress: "Email address",
    password: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone number",
    selectGender: "Select Gender",
    male: "Male",
    female: "Female",
    registerAs: "Register as",
    student: "Student",
    teacher: "Teacher",
    parent: "Parent",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    signUpHere: "Sign up here",
    alreadyHaveAccount: "Already have an account?",
    signInHere: "Sign in here",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    close: "Close",
    submit: "Submit",
    back: "Back",
    next: "Next",
    previous: "Previous",
  },

  ar: {
    // Sections Headings
    whoWeAre: "من نحن",
    ourServices: "خدماتنا",
    pricingPlans: "خطط الأسعار",
    pricingSubtitle:
      "خطط ميسورة مصممة لتلبية احتياجات كل مدرسة. اختر الخطة المثالية لمؤسستك التعليمية.",
    aboutIntro:
      "مدرستي منصة حديثة مصممة لربط المدارس والمعلمين وأولياء الأمور في مكان واحد. نُبسّط التواصل والدرجات والجداول لجعل التعليم أكثر وضوحًا وسهولة للجميع.",
    service_parent_title: "لوحة ولي الأمر",
    service_parent_text: "تتبّع الدرجات والجداول والإعلانات في الوقت الفعلي.",
    service_teacher_title: "أدوات المعلم",
    service_teacher_text:
      "إدارة الفصول، ومشاركة الدرجات، والتواصل مع أولياء الأمور بسهولة.",
    service_school_title: "إدارة المدرسة",
    service_school_text: "تنظيم الجداول، والحضور، والتقارير بسلاسة.",
    service_secure_title: "منصة آمنة",
    service_secure_text: "البيانات محمية ومتاحة فقط للمستخدمين المصرّح لهم.",
    contactUs: "اتصل بنا",
    contactSubtitle: "نحن هنا للمساعدة والإجابة عن أسئلتك",
    getInTouch: "تواصل معنا",
    sendUsMessage: "أرسل لنا رسالة",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    callUs: "اتصل بنا",
    emailUs: "راسلنا عبر البريد",
    planStarterTitle: "البداية",
    planStarterDesc:
      "مثالية للمدارس الصغيرة أو المؤسسات التي تبدأ رحلتها الرقمية. 200 طالب.",
    planGrowthTitle: "النمو",
    planGrowthDesc:
      "مناسبة للمدارس المتوسطة التي تبحث عن أدوات تواصل وإدارة متقدمة. 500 طالب.",
    planPremiumTitle: "المميزة",
    planPremiumDesc:
      "مصممة للمؤسسات التعليمية الكبيرة التي تحتاج إلى منصة قوية قابلة للتطوير. 1000 طالب.",
    // Navigation
    home: "الرئيسية",
    about: "حول",
    pricing: "الأسعار",
    testimonials: "الشهادات",
    contact: "اتصل بنا",
    login: "تسجيل الدخول",

    // Hero Section
    heroTitle: "مدرستي",
    heroSubtitle:
      "ابق على تواصل مع حياة طفلك المدرسية في أي وقت وفي أي مكان. اختبر مستقبل إدارة التعليم.",
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد",

    // Testimonials
    testimonialsTitle: "ماذا يقول مستخدمونا",
    testimonialsSubtitle:
      "موثوق من قبل الآباء والمعلمين والطلاب في جميع أنحاء العالم",

    // Login/Register
    welcomeBack: "مرحباً بعودتك!",
    signInSubtitle: "سجل الدخول لمتابعة رحلتك التعليمية مع مدرستي",
    createAccount: "إنشاء حساب",
    joinMadrassati: "انضم إلى مدرستي!",
    registerSubtitle:
      "ابدأ رحلتك التعليمية مع منصة إدارة المدرسة الشاملة لدينا",
    signIn: "تسجيل الدخول",
    enterCredentials: "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك",
    fullName: "الاسم الكامل",
    emailAddress: "عنوان البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    phoneNumber: "رقم الهاتف",
    selectGender: "اختر الجنس",
    male: "ذكر",
    female: "أنثى",
    registerAs: "التسجيل كـ",
    student: "طالب",
    teacher: "معلم",
    parent: "ولي أمر",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    dontHaveAccount: "ليس لديك حساب؟",
    signUpHere: "سجل هنا",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    signInHere: "سجل الدخول هنا",

    // Common
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    add: "إضافة",
    close: "إغلاق",
    submit: "إرسال",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
  },

  fr: {
    // Sections Headings
    whoWeAre: "Qui sommes-nous",
    ourServices: "Nos services",
    pricingPlans: "Plans tarifaires",
    pricingSubtitle:
      "Des plans abordables conçus pour les besoins de chaque école. Choisissez le plan idéal pour votre établissement.",
    aboutIntro:
      "Madrassati est une plateforme moderne conçue pour connecter écoles, enseignants et parents en un seul endroit. Nous simplifions la communication, les notes et les emplois du temps pour rendre l'éducation plus transparente et accessible à tous.",
    service_parent_title: "Tableau de bord parent",
    service_parent_text:
      "Suivez les notes, emplois du temps et annonces en temps réel.",
    service_teacher_title: "Outils pour enseignants",
    service_teacher_text:
      "Gérez les classes, partagez les notes et communiquez facilement avec les parents.",
    service_school_title: "Gestion de l'école",
    service_school_text:
      "Organisez les emplois du temps, la présence et les rapports sans effort.",
    service_secure_title: "Plateforme sécurisée",
    service_secure_text:
      "Les données sont protégées et accessibles uniquement aux utilisateurs autorisés.",
    contactUs: "Contactez-nous",
    contactSubtitle:
      "Nous sommes là pour vous aider et répondre à vos questions",
    getInTouch: "Entrer en contact",
    sendUsMessage: "Envoyez-nous un message",
    quickLinks: "Liens rapides",
    contactInfo: "Informations de contact",
    callUs: "Appelez-nous",
    emailUs: "Envoyez-nous un email",
    planStarterTitle: "Début",
    planStarterDesc:
      "Parfait pour les petites écoles privées ou les institutions qui débutent leur transformation numérique. 200 élèves.",
    planGrowthTitle: "Croissance",
    planGrowthDesc:
      "Idéal pour les écoles moyennes recherchant une communication et une gestion avancées. 500 élèves.",
    planPremiumTitle: "Premium",
    planPremiumDesc:
      "Conçue pour les grands établissements ayant besoin d'une plateforme robuste et évolutive. 1000 élèves.",
    // Navigation
    home: "Accueil",
    about: "À propos",
    pricing: "Tarifs",
    testimonials: "Témoignages",
    contact: "Contact",
    login: "Connexion",

    // Hero Section
    heroTitle: "Madrassati",
    heroSubtitle:
      "Restez connecté à la vie scolaire de votre enfant à tout moment, n'importe où. Découvrez l'avenir de la gestion éducative.",
    getStarted: "Commencer",
    learnMore: "En savoir plus",

    // Testimonials
    testimonialsTitle: "Ce que disent nos utilisateurs",
    testimonialsSubtitle:
      "Fait confiance par les Parents, Enseignants et Étudiants du monde entier",

    // Login/Register
    welcomeBack: "Bon retour!",
    signInSubtitle:
      "Connectez-vous pour continuer votre parcours éducatif avec Madrassati",
    createAccount: "Créer un compte",
    joinMadrassati: "Rejoignez Madrassati!",
    registerSubtitle:
      "Commencez votre parcours éducatif avec notre plateforme complète de gestion scolaire",
    signIn: "Se connecter",
    enterCredentials: "Entrez vos identifiants pour accéder à votre compte",
    fullName: "Nom complet",
    emailAddress: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    phoneNumber: "Numéro de téléphone",
    selectGender: "Sélectionner le sexe",
    male: "Homme",
    female: "Femme",
    registerAs: "S'inscrire en tant que",
    student: "Étudiant",
    teacher: "Enseignant",
    parent: "Parent",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié?",
    dontHaveAccount: "Vous n'avez pas de compte?",
    signUpHere: "Inscrivez-vous ici",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    signInHere: "Connectez-vous ici",

    // Common
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    close: "Fermer",
    submit: "Soumettre",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Store language preference in localStorage
    localStorage.setItem("preferred-language", newLanguage);
  };

  // Load language preference from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update document direction and language
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
