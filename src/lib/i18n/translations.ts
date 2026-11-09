// =============================================================================
// EstateHub Internationalization (i18n) - Arabic / Tunisian & English
// =============================================================================

export type Locale = 'ar' | 'en';
export type Currency = 'TND' | 'USD' | 'EUR';

export const TRANSLATIONS = {
  ar: {
    brand: 'إيستيت هاب',
    tagline: 'منصة إدارة وتسويق العقارات الفاخرة والاستثمار',
    currencyDefault: 'د.ت',
    currencys: {
      TND: 'د.ت',
      USD: '$',
      EUR: '€',
    },
    
    // Navigation
    nav: {
      home: 'الرئيسية',
      properties: 'المعطف العقاري',
      floorplans: 'المخططات الهندسية',
      calculator: 'حاسبة التمويل',
      crm: 'بوابة الوسطاء',
    },
    navMarketplace: 'معرض العقارات الفاخرة',
    navFloorplans: 'المخططات المعمارية التفاعلية',
    navMortgage: 'حاسبة التمويل والقروض البنكية',
    navCrm: 'بوابة الوسطاء وإدارة الصفقات',
    navContracts: 'العقود والتوثيق القانوني',

    // Top Bar & Controls
    agencyStation: 'مكتب تونس الفاخر • ضفاف البحيرة',
    activeMarket: 'السوق العقاري نشط',
    scheduleTour: 'حجز زيارة ميدانية',
    listProperty: 'عرض عقار جديد',
    searchPlaceholder: 'ابحث عن فيلا، بنتهاوس، قرطاج، المرسى، قمرت...',
    dayMode: 'الوضع النهاري',
    nightMode: 'الوضع الليلي',

    // Dashboard Hero & KPIs
    heroTitle: 'الوجهة الأولى للاستثمار العقاري الفاخر في تونس',
    heroSubtitle: 'استكشف أرقى الفلل والقصور والبنتهاوس على السواحل التونسية والمتوسطية مع جولات افتراضية ومخططات تفاعلية.',
    featuredProperties: 'عقارات مختارة من محفظة النخبة',
    kpiPortfolio: 'القيمة الجملية للعقارات المعروضة',
    kpiListings: 'عقارات حصرية متاحة',
    kpiLeads: 'طلبات الشراء والزيارات هذا الشهر',
    kpiDeals: 'صفقات تم إغلاقها بنجاح',
    kpiAvgPrice: 'متوسط سعر المتر المربع',
    kpiTotalEstates: 'إجمالي العقارات الفاخرة',
    kpiAvgDays: 'متوسط أيام الطرح في السوق',
    kpiYield: 'متوسط العائد التأجيري السنوي',

    // Filters
    filterAll: 'جميع العقارات',
    filterVillas: 'فلل وقصور',
    filterPenthouses: 'بنتهاوس فاخر',
    filterDuplex: 'دوبلكس عصري',
    filterSale: 'للبيع (تمليك)',
    filterRent: 'للكراء الفاخر',

    // Property Card & Details
    beds: 'غرف نوم',
    baths: 'حمامات',
    sqm: 'م²',
    exploreFloorplan: 'مخطط الطابق التفاعلي',
    calculateLoan: 'محاكاة القرض البنكي',
    contactBroker: 'تواصل مع الوسيط العقاري',
    viewProperty: 'تفاصيل العقار كاملة',

    // Floorplan Explorer
    fpTitle: 'المخطط الهندسي والمعماري التفاعلي (2D Blueprint)',
    fpSubtitle: 'انقر على أي جناح أو غرفة لعرض المساحة الدقيقة والأبعاد والمواصفات',
    selectedRoom: 'الغرفة المحددة حالياً:',
    roomDimensions: 'الأبعاد المعمارية:',
    roomArea: 'المساحة الصافية:',
    keyFeatures: 'المواصفات والتجهيزات:',

    // Mortgage Calculator
    calcTitle: 'حاسبة التمويل العقاري وجدول الاستهلاك البنكي',
    calcSubtitle: 'حساب دقيق للأقساط الشهرية ونسب الفائدة بالدينار التونسي والعملات الدولية',
    propPrice: 'سعر العقار الجملي:',
    downPayment: 'الدفعة الأولى الذاتية (نسبة مئوية):',
    loanTerm: 'مدة سداد القرض (سنوات):',
    interestRate: 'نسبة الفائدة البنكية السنوية (TMM + Marge):',
    monthlyInstalment: 'القسط الشهري التقديري:',
    totalInterest: 'مجموع الفوائض البنكية:',
    totalLoanCost: 'الكلفة الجملية لاقتناء العقار:',
    bankPartners: 'البنوك التونسية والشريكة: BIAT • BNA • Attijari • BT',

    // CRM Deals Pipeline
    crmTitle: 'بوابة الوسطاء وإدارة دورة حياة الصفقات (Deal Pipeline)',
    crmSubtitle: 'متابعة طلبات المشترين، جدولة المعاينات الميدانية، وتفاوض العروض',
    statusNew: 'طلبات جديدة',
    statusContacted: 'تم التواصل',
    statusTour: 'معاينة مجدولة',
    statusOffer: 'تقديم عرض رسمي',
    statusClosed: 'صفقة مكتملة',

    // Footer
    footer: {
      rights: 'كافة الحقوق محفوظة',
      privacy: 'سياسة الخصوصية وسرية المستثمر',
      terms: 'الشروط والأحكام القانونية',
    },
  },
  en: {
    brand: 'EstateHub',
    tagline: 'Luxury Real Estate CRM & Property Marketplace OS',
    currencyDefault: '$',
    currencys: {
      TND: 'TND',
      USD: '$',
      EUR: '€',
    },

    // Navigation
    nav: {
      home: 'Home',
      properties: 'Portfolio',
      floorplans: 'CAD Floorplans',
      calculator: 'Mortgage Amortization',
      crm: 'Broker Pipeline',
    },
    navMarketplace: 'Prime Marketplace',
    navFloorplans: 'Interactive Floorplans',
    navMortgage: 'Mortgage & Loan Simulator',
    navCrm: 'Broker Pipeline & Deals CRM',
    navContracts: 'Legal Contracts & Leases',

    agencyStation: 'Tunis Prime Office • Lakefront',
    activeMarket: 'Market Active',
    scheduleTour: 'Schedule Private Tour',
    listProperty: 'List Luxury Property',
    searchPlaceholder: 'Search villas, penthouses, Carthage, La Marsa...',
    dayMode: 'Day Mode',
    nightMode: 'Night Mode',

    heroTitle: 'The Premier Destination for Luxury Real Estate Assets',
    heroSubtitle: 'Discover bespoke villas, sky penthouses, and private estates across Mediterranean horizons with interactive architectural floorplans and mortgage engineering.',
    featuredProperties: 'Featured Signature Residences',
    kpiPortfolio: 'Total Active Portfolio Value',
    kpiListings: 'Exclusive Properties Available',
    kpiLeads: 'Investor Inquiries This Month',
    kpiDeals: 'Acquisitions Successfully Closed',
    kpiAvgPrice: 'Average Price per Sq Meter',
    kpiTotalEstates: 'Total Curated Estates',
    kpiAvgDays: 'Average Days on Market',
    kpiYield: 'Annual Rental Yield',

    filterAll: 'All Properties',
    filterVillas: 'Villas & Mansions',
    filterPenthouses: 'Sky Penthouses',
    filterDuplex: 'Modern Duplexes',
    filterSale: 'For Sale',
    filterRent: 'For Lease',

    beds: 'Beds',
    baths: 'Baths',
    sqm: 'sqm',
    exploreFloorplan: 'Explore Floorplan',
    calculateLoan: 'Mortgage Calculator',
    contactBroker: 'Inquire with Advisor',
    viewProperty: 'View Full Dossier',

    fpTitle: 'Architectural Blueprint & Interactive Floorplan',
    fpSubtitle: 'Select any zone to inspect exact dimensions, square meters, and fixtures',
    selectedRoom: 'Currently Selected Zone:',
    roomDimensions: 'Architectural Dimensions:',
    roomArea: 'Net Usable Area:',
    keyFeatures: 'Specifications & Finishes:',

    calcTitle: 'Mortgage Financing & Amortization Simulator',
    calcSubtitle: 'Simulate monthly payments, down payment equity, and total interest cost',
    propPrice: 'Target Property Price:',
    downPayment: 'Cash Down Payment (%):',
    loanTerm: 'Amortization Term (Years):',
    interestRate: 'Annual Mortgage Interest Rate (%):',
    monthlyInstalment: 'Estimated Monthly Payment:',
    totalInterest: 'Total Interest Payable:',
    totalLoanCost: 'Total Investment Acquisition Cost:',
    bankPartners: 'Financing Partners: BIAT • BNA • Attijari • Private Banking',

    crmTitle: 'Brokerage Deal Pipeline & Client CRM',
    crmSubtitle: 'Track high-net-worth inquiries, schedule private viewings, and negotiate offers',
    statusNew: 'Inbound Inquiries',
    statusContacted: 'Contacted',
    statusTour: 'Viewing Scheduled',
    statusOffer: 'Offer Under Review',
    statusClosed: 'Acquisition Closed',

    // Footer
    footer: {
      rights: 'All rights reserved',
      privacy: 'Investor Privacy & Confidentiality',
      terms: 'Legal Terms of Brokerage',
    },
  },
};
