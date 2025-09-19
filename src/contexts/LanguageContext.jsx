import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    contact: 'Contact',
    login: 'Login',
    
    // Hero Section
    heroTitle: 'Madrassati',
    heroSubtitle: 'Stay connected to your child\'s school life anytime, anywhere. Experience the future of education management.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Testimonials
    testimonialsTitle: 'What Our Users Say',
    testimonialsSubtitle: 'Trusted by Parents, Teachers, and Students worldwide',
    
    // Login/Register
    welcomeBack: 'Welcome Back!',
    signInSubtitle: 'Sign in to continue your educational journey with Madrassati',
    createAccount: 'Create Account',
    joinMadrassati: 'Join Madrassati!',
    registerSubtitle: 'Start your educational journey with our comprehensive school management platform',
    signIn: 'Sign In',
    enterCredentials: 'Enter your credentials to access your account',
    fullName: 'Full name',
    emailAddress: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phoneNumber: 'Phone number',
    selectGender: 'Select Gender',
    male: 'Male',
    female: 'Female',
    registerAs: 'Register as',
    student: 'Student',
    teacher: 'Teacher',
    parent: 'Parent',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    dontHaveAccount: 'Don\'t have an account?',
    signUpHere: 'Sign up here',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    close: 'Close',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'حول',
    pricing: 'الأسعار',
    testimonials: 'الشهادات',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    
    // Hero Section
    heroTitle: 'مدرستي',
    heroSubtitle: 'ابق على تواصل مع حياة طفلك المدرسية في أي وقت وفي أي مكان. اختبر مستقبل إدارة التعليم.',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    
    // Testimonials
    testimonialsTitle: 'ماذا يقول مستخدمونا',
    testimonialsSubtitle: 'موثوق من قبل الآباء والمعلمين والطلاب في جميع أنحاء العالم',
    
    // Login/Register
    welcomeBack: 'مرحباً بعودتك!',
    signInSubtitle: 'سجل الدخول لمتابعة رحلتك التعليمية مع مدرستي',
    createAccount: 'إنشاء حساب',
    joinMadrassati: 'انضم إلى مدرستي!',
    registerSubtitle: 'ابدأ رحلتك التعليمية مع منصة إدارة المدرسة الشاملة لدينا',
    signIn: 'تسجيل الدخول',
    enterCredentials: 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك',
    fullName: 'الاسم الكامل',
    emailAddress: 'عنوان البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    phoneNumber: 'رقم الهاتف',
    selectGender: 'اختر الجنس',
    male: 'ذكر',
    female: 'أنثى',
    registerAs: 'التسجيل كـ',
    student: 'طالب',
    teacher: 'معلم',
    parent: 'ولي أمر',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    signUpHere: 'سجل هنا',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signInHere: 'سجل الدخول هنا',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    add: 'إضافة',
    close: 'إغلاق',
    submit: 'إرسال',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À propos',
    pricing: 'Tarifs',
    testimonials: 'Témoignages',
    contact: 'Contact',
    login: 'Connexion',
    
    // Hero Section
    heroTitle: 'Madrassati',
    heroSubtitle: 'Restez connecté à la vie scolaire de votre enfant à tout moment, n\'importe où. Découvrez l\'avenir de la gestion éducative.',
    getStarted: 'Commencer',
    learnMore: 'En savoir plus',
    
    // Testimonials
    testimonialsTitle: 'Ce que disent nos utilisateurs',
    testimonialsSubtitle: 'Fait confiance par les Parents, Enseignants et Étudiants du monde entier',
    
    // Login/Register
    welcomeBack: 'Bon retour!',
    signInSubtitle: 'Connectez-vous pour continuer votre parcours éducatif avec Madrassati',
    createAccount: 'Créer un compte',
    joinMadrassati: 'Rejoignez Madrassati!',
    registerSubtitle: 'Commencez votre parcours éducatif avec notre plateforme complète de gestion scolaire',
    signIn: 'Se connecter',
    enterCredentials: 'Entrez vos identifiants pour accéder à votre compte',
    fullName: 'Nom complet',
    emailAddress: 'Adresse e-mail',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    phoneNumber: 'Numéro de téléphone',
    selectGender: 'Sélectionner le sexe',
    male: 'Homme',
    female: 'Femme',
    registerAs: 'S\'inscrire en tant que',
    student: 'Étudiant',
    teacher: 'Enseignant',
    parent: 'Parent',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié?',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    signUpHere: 'Inscrivez-vous ici',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    signInHere: 'Connectez-vous ici',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    add: 'Ajouter',
    close: 'Fermer',
    submit: 'Soumettre',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // Store language preference in localStorage
    localStorage.setItem('preferred-language', newLanguage);
  };
  
  // Load language preference from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update document direction and language
  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
