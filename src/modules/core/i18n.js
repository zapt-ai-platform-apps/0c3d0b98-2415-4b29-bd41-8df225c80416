import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Arabic translations
const arTranslations = {
  common: {
    welcome: 'مرحبًا بك في المنصة متعددة الأطراف',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    edit: 'تعديل',
    delete: 'حذف',
    back: 'رجوع',
    next: 'التالي',
    confirm: 'تأكيد',
    success: 'تم بنجاح',
    madeOnZapt: 'صنع على منصة ZAPT',
    signInWithZapt: 'تسجيل الدخول مع ZAPT'
  },
  auth: {
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    orContinueWith: 'أو المتابعة باستخدام'
  },
  roles: {
    select: 'اختر نوع الحساب',
    client: 'عميل',
    merchant: 'تاجر',
    investor: 'مستثمر',
    transport: 'محطة نقل',
    service: 'مقدم خدمة'
  },
  profile: {
    title: 'الملف الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    name: 'الاسم',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    role: 'نوع الحساب',
    updateSuccess: 'تم تحديث الملف الشخصي بنجاح'
  },
  dashboard: {
    title: 'لوحة التحكم',
    welcome: 'مرحبًا بك في لوحة التحكم',
    overview: 'نظرة عامة',
    statistics: 'إحصائيات',
    activity: 'النشاط',
    notifications: 'الإشعارات'
  },
  merchant: {
    title: 'صفحة التاجر',
    businessName: 'اسم النشاط التجاري',
    businessType: 'نوع النشاط التجاري',
    businessDescription: 'وصف النشاط التجاري',
    location: 'الموقع',
    logo: 'الشعار',
    products: 'المنتجات',
    orders: 'الطلبات',
    customers: 'العملاء',
    sales: 'المبيعات',
    analytics: 'التحليلات'
  },
  investor: {
    title: 'صفحة المستثمر',
    investmentFocus: 'مجال الاستثمار',
    investmentRange: 'نطاق الاستثمار',
    bio: 'نبذة تعريفية',
    portfolio: 'المحفظة الاستثمارية',
    opportunities: 'فرص الاستثمار',
    performance: 'الأداء',
    returns: 'العوائد'
  },
  transport: {
    title: 'صفحة محطة النقل',
    stationName: 'اسم المحطة',
    stationType: 'نوع المحطة',
    location: 'الموقع',
    capacity: 'السعة',
    operatingHours: 'ساعات العمل',
    vehicles: 'المركبات',
    routes: 'المسارات',
    schedule: 'الجدول الزمني',
    passengers: 'الركاب'
  },
  service: {
    title: 'صفحة مقدم الخدمة',
    serviceName: 'اسم الخدمة',
    serviceType: 'نوع الخدمة',
    serviceDescription: 'وصف الخدمة',
    location: 'الموقع',
    availability: 'الإتاحة',
    clients: 'العملاء',
    appointments: 'المواعيد',
    reviews: 'التقييمات',
    pricing: 'التسعير'
  },
  landing: {
    hero: {
      title: 'منصة متكاملة لجميع الأطراف',
      subtitle: 'ربط العملاء بالتجار والمستثمرين ومحطات النقل ومقدمي الخدمات',
      cta: 'ابدأ الآن',
      learnMore: 'اعرف المزيد'
    },
    features: {
      title: 'المميزات',
      subtitle: 'ما يميز منصتنا',
      feature1: {
        title: 'تواصل سهل',
        description: 'تواصل بسهولة بين جميع الأطراف'
      },
      feature2: {
        title: 'إدارة مبسطة',
        description: 'إدارة سهلة للعمليات والمعاملات'
      },
      feature3: {
        title: 'تحليلات متقدمة',
        description: 'رؤى وتحليلات لتحسين الأداء'
      }
    },
    testimonials: {
      title: 'آراء العملاء',
      subtitle: 'ماذا يقول عملاؤنا عنا'
    },
    cta: {
      title: 'جاهز للبدء؟',
      subtitle: 'انضم إلى منصتنا اليوم',
      button: 'سجل الآن'
    }
  }
};

export const initI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        ar: arTranslations
      },
      lng: 'ar',
      fallbackLng: 'ar',
      interpolation: {
        escapeValue: false
      }
    });
    
  return i18n;
};

export default i18n;