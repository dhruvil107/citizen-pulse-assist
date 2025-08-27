import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services", 
    complaintProgress: "Complaint Progress",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    
    // Hero section
    heroTitle: "Your Voice, Your City",
    heroSubtitle: "Report civic issues effortlessly with AI-powered categorization, real-time tracking, and bilingual support. Making cities better, one complaint at a time.",
    reportIssue: "Report an Issue",
    learnMore: "Learn More",
    
    // Stats
    complaintsResolved: "Complaints Resolved", 
    activeUsers: "Active Users",
    avgResponseTime: "Avg Response Time",
    successRate: "Success Rate",
    
    // Features
    powerfulFeatures: "Powerful Features for Better Cities",
    featuresSubtitle: "Advanced technology meets civic engagement to create meaningful change in your community.",
    easyReporting: "Easy Reporting",
    easyReportingDesc: "Submit complaints with photo, location, and description in seconds",
    aiPowered: "AI-Powered",
    aiPoweredDesc: "Automatic categorization and department routing using AI",
    realTimeTracking: "Real-time Tracking", 
    realTimeTrackingDesc: "Track your complaint status from submission to resolution",
    bilingualSupport: "Bilingual Support",
    bilingualSupportDesc: "Available in English and Gujarati for better accessibility",
    
    // CTA
    readyToMakeDifference: "Ready to Make a Difference?",
    ctaSubtitle: "Join thousands of citizens who are already making their cities better. Your report could be the solution someone needs.",
    getStartedToday: "Get Started Today",
    viewServices: "View Services",
    
    // Footer
    quickLinks: "Quick Links",
    support: "Support",
    connect: "Connect",
    helpCenter: "Help Center",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    followUs: "Follow us for updates and civic engagement tips.",
    allRightsReserved: "All rights reserved.",
    
    // Services page
    servicesInProgress: "Services in Progress",
    servicesSubtitle: "Track ongoing civic improvement projects across the city. See real-time progress and estimated completion dates for various infrastructure initiatives.",
    activeProjects: "Active Projects",
    completedThisMonth: "Completed This Month", 
    budgetAllocated: "Budget Allocated",
    daysAvgCompletion: "Days Avg Completion",
    progress: "Progress",
    estCompletion: "Est. Completion:",
    category: "Category:",
    
    // Coming soon services
    upcomingProjects: "Upcoming Projects",
    upcomingSubtitle: "Exciting new civic technology initiatives launching soon. Stay tuned for these innovative solutions.",
    comingSoon: "Coming Soon",
    smartRoads: "Smart Road Network",
    smartRoadsDesc: "AI-powered road monitoring and predictive maintenance system",
    smartWaste: "Intelligent Waste Management", 
    smartWasteDesc: "IoT-enabled waste collection optimization and recycling programs",
    trafficAI: "Traffic AI System",
    trafficAIDesc: "Machine learning traffic flow optimization and congestion reduction",
    waterMonitoring: "Water Quality Monitoring",
    waterMonitoringDesc: "Real-time water quality sensors and automated alert system",
    
    // About page
    aboutCitymitra: "About Citymitra",
    empoweringCitizens: "Empowering Citizens, Building Better Cities",
    aboutSubtitle: "Citymitra is a revolutionary civic engagement platform that uses AI technology to streamline the process of reporting and resolving municipal issues, creating stronger connections between citizens and their local government.",
    ourMission: "Our Mission",
    missionText: "To democratize civic engagement by providing every citizen with a powerful, easy-to-use platform that ensures their voice is heard and their community issues are addressed promptly. We believe that technology can bridge the gap between citizens and government, creating more responsive and accountable public services.",
    ourVision: "Our Vision", 
    visionText: "To create smart, connected cities where every citizen feels empowered to contribute to their community's improvement. We envision a future where AI-powered civic platforms make cities more livable, sustainable, and responsive to the needs of all residents.",
    howWereDifferent: "How We're Different",
    differentSubtitle: "Combining cutting-edge AI technology with user-centric design to create the most effective civic engagement platform available today.",
    impactByNumbers: "Impact by Numbers",
    impactSubtitle: "Real results from real communities using Citymitra",
    ourJourney: "Our Journey",
    meetTheTeam: "Meet the Team", 
    teamSubtitle: "Dedicated individuals working to improve civic engagement",
    joinOurMission: "Join Our Mission",
    joinMissionText: "Be part of the change. Help us build better communities through technology and civic engagement. Your voice matters, and we're here to make sure it's heard.",
    
    // Team
    founderTitle: "Founder & Lead Developer",
    founderDesc: "Passionate about civic technology and creating solutions that bridge the gap between citizens and government services.",
    developedBy: "Developed by CodeBlazers",
    
    // Contact
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    
    // Login/Signup
    welcome: "Welcome",
    createAccount: "Create Account"
  },
  gu: {
    // Navigation  
    home: "હોમ",
    about: "વિશે",
    services: "સેવાઓ",
    complaintProgress: "ફરિયાદ પ્રગતિ", 
    contact: "સંપર્ક",
    login: "લોગિન",
    signup: "સાઇન અપ",
    
    // Hero section
    heroTitle: "તમારો અવાજ, તમારું શહેર",
    heroSubtitle: "AI-સંચાલિત વર્ગીકરણ, રીઅલ-ટાઇમ ટ્રેકિંગ અને દ્વિભાષી સહાયતા સાથે નાગરિક સમસ્યાઓની જાણ કરો. એક સમયે એક ફરિયાદ કરીને શહેરોને વધુ સારા બનાવવા.",
    reportIssue: "સમસ્યાની જાણ કરો",
    learnMore: "વધુ જાણો",
    
    // Stats
    complaintsResolved: "ફરિયાદો ઉકેલાઈ",
    activeUsers: "સક્રિય વપરાશકર્તા",
    avgResponseTime: "સરેરાશ પ્રતિસાદ સમય", 
    successRate: "સફળતા દર",
    
    // Features
    powerfulFeatures: "શ્રેષ્ઠ શહેરો માટે શક્તિશાળી સુવિધાઓ",
    featuresSubtitle: "અદ્યતન ટેકનોલોજી નાગરિક સંલગ્નતા સાથે મળીને તમારા સમુદાયમાં અર્થપૂર્ણ પરિવર્તન લાવે છે.",
    easyReporting: "સરળ જાણ",
    easyReportingDesc: "સેકન્ડોમાં ફોટો, સ્થાન અને વર્ણન સાથે ફરિયાદ સબમિટ કરો",
    aiPowered: "AI-સંચાલિત", 
    aiPoweredDesc: "AI નો ઉપયોગ કરીને આપમેળે વર્ગીકરણ અને વિભાગીય રૂટિંગ",
    realTimeTracking: "રીઅલ-ટાઇમ ટ્રેકિંગ",
    realTimeTrackingDesc: "સબમિશનથી ઉકેલ સુધી તમારી ફરિયાદની સ્થિતિને ટ્રેક કરો",
    bilingualSupport: "દ્વિભાષી સહાય",
    bilingualSupportDesc: "વધુ સારી સુલભતા માટે અંગ્રેજી અને ગુજરાતીમાં ઉપલબ્ધ",
    
    // CTA
    readyToMakeDifference: "તફાવત બનાવવા તૈયાર છો?",
    ctaSubtitle: "હજારો નાગરિકો કે જેઓ પહેલેથી જ તેમના શહેરોને વધુ સારા બનાવી રહ્યા છે તેમની સાથે જોડાઓ. તમારી જાણ કોઈની જરૂરિયાતનો ઉકેલ હોઈ શકે.",
    getStartedToday: "આજે શરૂઆત કરો",
    viewServices: "સેવાઓ જુઓ",
    
    // Footer
    quickLinks: "ઝડપી લિંક્સ",
    support: "સહાય", 
    connect: "જોડાવો",
    helpCenter: "મદદ કેન્દ્ર",
    privacyPolicy: "ગોપનીયતા નીતિ",
    termsOfService: "સેવાની શરતો",
    followUs: "અપડેટ્સ અને નાગરિક સંલગ્નતાની ટિપ્સ માટે અમને ફોલો કરો.",
    allRightsReserved: "તમામ અધિકારો આરક્ષિત છે.",
    
    // Services page  
    servicesInProgress: "પ્રગતિમાં સેવાઓ",
    servicesSubtitle: "શહેરભરમાં ચાલુ નાગરિક સુધારણા પ્રોજેક્ટ્સને ટ્રેક કરો. વિવિધ ઇન્ફ્રાસ્ટ્રક્ચર પહેલ માટે રીઅલ-ટાઇમ પ્રગતિ અને અંદાજિત પૂર્ણતાની તારીખો જુઓ.",
    activeProjects: "સક્રિય પ્રોજેક્ટ્સ",
    completedThisMonth: "આ મહિને પૂર્ણ", 
    budgetAllocated: "બજેટ ફાળવ્યું",
    daysAvgCompletion: "દિવસો સરેરાશ પૂર્ણતા",
    progress: "પ્રગતિ",
    estCompletion: "અંદાજિત પૂર્ણતા:",
    category: "શ્રેણી:",
    
    // Coming soon services
    upcomingProjects: "આગામી પ્રોજેક્ટ્સ", 
    upcomingSubtitle: "રોમાંચક નવી નાગરિક ટેકનોલોજી પહેલ જલ્દીથી શરૂ થશે. આ નવીન સમાધાનો માટે જોતા રહો.",
    comingSoon: "જલ્દીથી આવશે",
    smartRoads: "સ્માર્ટ રોડ નેટવર્ક",
    smartRoadsDesc: "AI-સંચાલિત રોડ મોનિટરિંગ અને પૂર્વાનુમાન મેન્ટેનન્સ સિસ્ટમ",
    smartWaste: "બુદ્ધિશાળી કચરો વ્યવસ્થાપન",
    smartWasteDesc: "IoT-સક્ષમ કચરો સંગ્રહ ઓપ્ટિમાઇઝેશન અને રીસાયક્લિંગ પ્રોગ્રામ્સ", 
    trafficAI: "ટ્રાફિક AI સિસ્ટમ",
    trafficAIDesc: "મશીન લર્નિંગ ટ્રાફિક ફ્લો ઓપ્ટિમાઇઝેશન અને ભીડ ઘટાડવું",
    waterMonitoring: "પાણીની ગુણવત્તા મોનિટરિંગ",
    waterMonitoringDesc: "રીઅલ-ટાઇમ પાણીની ગુણવત્તા સેન્સર્સ અને આપમેળે એલર્ટ સિસ્ટમ",
    
    // About page
    aboutCitymitra: "સિટીમિત્ર વિશે",
    empoweringCitizens: "નાગરિકોને સશક્ત બનાવવું, શ્રેષ્ઠ શહેરો બનાવવા",
    aboutSubtitle: "સિટીમિત્ર એક ક્રાંતિકારી નાગરિક સંલગ્નતા પ્લેટફોર્મ છે જે AI ટેકનોલોજીનો ઉપયોગ કરીને મ્યુનિસિપલ સમસ્યાઓની જાણ કરવા અને તેનો ઉકેલ લાવવાની પ્રક્રિયાને સુવ્યવસ્થિત કરે છે, નાગરિકો અને તેમની સ્થાનિક સરકાર વચ્ચે મજબૂત જોડાણ બનાવે છે.",
    ourMission: "અમારું મિશન",
    missionText: "દરેક નાગરિકને એક શક્તિશાળી, સરળ-ઉપયોગી પ્લેટફોર્મ પ્રદાન કરીને નાગરિક સંલગ્નતાને લોકશાહીકરણ કરવું જે ખાતરી કરે કે તેમનો અવાજ સંભળાય અને તેમના સમુદાયની સમસ્યાઓનો તાત્કાલિક સમાધાન થાય. અમે માનીએ છીએ કે ટેકનોલોજી નાગરિકો અને સરકાર વચ્ચેના અંતરને ભરી શકે છે, વધુ પ્રતિસાદશીલ અને જવાબદાર જાહેર સેવાઓ બનાવી શકે છે.",
    ourVision: "અમારું વિઝન",
    visionText: "સ્માર્ટ, જોડાયેલા શહેરો બનાવવા જ્યાં દરેક નાગરિક તેમના સમુદાયના સુધારામાં યોગદાન આપવા માટે સશક્ત અનુભવે. અમે એવા ભવિષ્યની કલ્પના કરીએ છીએ જ્યાં AI-સંચાલિત નાગરિક પ્લેટફોર્મ શહેરોને વધુ જીવંત, ટકાઉ અને તમામ રહેવાસીઓની જરૂરિયાતોને પ્રતિસાદશીલ બનાવે.",
    howWereDifferent: "અમે કેવી રીતે અલગ છીએ", 
    differentSubtitle: "આજે ઉપલબ્ધ સૌથી અસરકારક નાગરિક સંલગ્નતા પ્લેટફોર્મ બનાવવા માટે અત્યાધુનિક AI ટેકનોલોજીને વપરાશકર્તા-કેન્દ્રિત ડિઝાઇન સાથે જોડવું.",
    impactByNumbers: "સંખ્યાઓ દ્વારા પ્રભાવ",
    impactSubtitle: "સિટીમિત્રનો ઉપયોગ કરતા વાસ્તવિક સમુદાયોના વાસ્તવિક પરિણામો",
    ourJourney: "અમારી યાત્રા",
    meetTheTeam: "ટીમને મળો",
    teamSubtitle: "નાગરિક સંલગ્નતા સુધારવા માટે સમર્પિત વ્યક્તિઓ",
    joinOurMission: "અમારા મિશનમાં જોડાવો",
    joinMissionText: "બદલાવનો ભાગ બનો. ટેકનોલોજી અને નાગરિક સંલગ્નતા દ્વારા શ્રેષ્ઠ સમુદાયો બનાવવામાં અમારી મદદ કરો. તમારો અવાજ મહત્વપૂર્ણ છે, અને અમે તે સંભળાવવા માટે અહીં છીએ.",
    
    // Team
    founderTitle: "સ્થાપક અને મુખ્ય વિકાસકર્તા", 
    founderDesc: "નાગરિક ટેકનોલોજી અને નાગરિકો અને સરકારી સેવાઓ વચ્ચેના અંતરને ભરતા સમાધાનો બનાવવા માટે પ્રવૃત્ત.",
    developedBy: "કોડબ્લેઝર્સ દ્વારા વિકસિત",
    
    // Contact
    contactUs: "અમારો સંપર્ક કરો",
    getInTouch: "સંપર્કમાં રહો",
    
    // Login/Signup
    welcome: "સ્વાગત છે",
    createAccount: "એકાઉન્ટ બનાવો"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};