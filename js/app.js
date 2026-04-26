// Main App JavaScript
class CitymitraApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || this.getSystemTheme();
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupLanguage();
        this.setupNavigation();
        this.setupEventListeners();
    }

    getSystemTheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setupTheme() {
        const root = document.documentElement;
        if (this.currentTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        this.updateThemeToggle();
    }

    updateThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-icon');
            const text = themeToggle.querySelector('span');
            
            if (this.currentTheme === 'dark') {
                icon.innerHTML = `
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                `;
                text.textContent = 'Light';
            } else {
                icon.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                `;
                text.textContent = 'Dark';
            }
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.currentTheme);
        this.setupTheme();
    }

    setupLanguage() {
        this.updateLanguageToggle();
        this.translatePage();
    }

    updateLanguageToggle() {
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            const text = languageToggle.querySelector('span');
            text.textContent = this.currentLanguage === 'en' ? 'ગુ' : 'EN';
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'gu' : 'en';
        localStorage.setItem('language', this.currentLanguage);
        this.updateLanguageToggle();
        this.translatePage();
    }

    translatePage() {
        const translations = {
            en: {
                home: 'Home',
                about: 'About',
                services: 'Services',
                complaintProgress: 'Progress',
                contact: 'Contact',
                login: 'Login',
                signup: 'Signup',
                reportIssue: 'Report Issue',
                learnMore: 'Learn More',
                complaintsResolved: 'Complaints Resolved',
                activeUsers: 'Active Users',
                avgResponseTime: 'Avg Response Time',
                successRate: 'Success Rate',
                easyReporting: 'Easy Reporting',
                easyReportingDesc: 'Simple, intuitive interface for reporting civic issues with photo upload and GPS location.',
                aiPowered: 'AI-Powered',
                aiPoweredDesc: 'Smart categorization and routing of complaints using artificial intelligence.',
                realTimeTracking: 'Real-Time Tracking',
                realTimeTrackingDesc: 'Track your complaint status in real-time with updates and notifications.',
                bilingualSupport: 'Bilingual Support',
                bilingualSupportDesc: 'Available in English and Gujarati to serve diverse communities effectively.',
                viewServices: 'View Services'
            },
            gu: {
                home: 'ઘર',
                about: 'વિશે',
                services: 'સેવાઓ',
                complaintProgress: 'પ્રગતિ',
                contact: 'સંપર્ક',
                login: 'લોગિન',
                signup: 'સાઇન અપ',
                reportIssue: 'સમસ્યા રિપોર્ટ કરો',
                learnMore: 'વધુ જાણો',
                complaintsResolved: 'ફરિયાદો હલ',
                activeUsers: 'સક્રિય વપરાશકર્તાઓ',
                avgResponseTime: 'સરેરાશ પ્રતિભાવ સમય',
                successRate: 'સફળતા દર',
                easyReporting: 'સરળ રિપોર્ટિંગ',
                easyReportingDesc: 'ફોટો અપલોડ અને GPS સ્થાન સાથે નાગરિક સમસ્યાઓની રિપોર્ટિંગ માટે સરળ, સહજ ઇન્ટરફેસ.',
                aiPowered: 'AI-સંચાલિત',
                aiPoweredDesc: 'કૃત્રિમ બુદ્ધિનો ઉપયોગ કરીને ફરિયાદોનું સ્માર્ટ વર્ગીકરણ અને રૂટિંગ.',
                realTimeTracking: 'રીઅલ-ટાઇમ ટ્રેકિંગ',
                realTimeTrackingDesc: 'અપડેટ્સ અને સૂચનાઓ સાથે તમારી ફરિયાદની સ્થિતિને રીઅલ-ટાઇમમાં ટ્રેક કરો.',
                bilingualSupport: 'દ્વિભાષી સપોર્ટ',
                bilingualSupportDesc: 'વિવિધ સમુદાયોને અસરકારક રીતે સેવા આપવા માટે અંગ્રેજી અને ગુજરાતીમાં ઉપલબ્ધ.',
                viewServices: 'સેવાઓ જુઓ'
            }
        };

        const currentTranslations = translations[this.currentLanguage];
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === 'index.html' && currentTranslations.home) {
                link.textContent = currentTranslations.home;
            } else if (href === 'about.html' && currentTranslations.about) {
                link.textContent = currentTranslations.about;
            } else if (href === 'services.html' && currentTranslations.services) {
                link.textContent = currentTranslations.services;
            } else if (href === 'complaint-progress.html' && currentTranslations.complaintProgress) {
                link.textContent = currentTranslations.complaintProgress;
            } else if (href === 'contact.html' && currentTranslations.contact) {
                link.textContent = currentTranslations.contact;
            }
        });

        // Update buttons
        const loginBtns = document.querySelectorAll('.nav-auth .btn-outline');
        const signupBtns = document.querySelectorAll('.nav-auth .btn-primary');
        
        loginBtns.forEach(btn => {
            if (currentTranslations.login) btn.textContent = currentTranslations.login;
        });
        
        signupBtns.forEach(btn => {
            if (currentTranslations.signup) btn.textContent = currentTranslations.signup;
        });

        // Update page-specific content
        this.updatePageContent(currentTranslations);
    }

    updatePageContent(translations) {
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const reportBtn = document.querySelector('.hero-actions .btn-hero');
        const learnMoreBtn = document.querySelector('.hero-actions .btn-outline');
        
        if (heroTitle && translations.reportIssue) {
            heroTitle.innerHTML = `
                Make Your Voice Heard, 
                <span class="hero-title-gradient">Build Better Cities</span>
            `;
        }
        
        if (reportBtn && translations.reportIssue) {
            reportBtn.textContent = translations.reportIssue;
        }
        
        if (learnMoreBtn && translations.learnMore) {
            learnMoreBtn.textContent = translations.learnMore;
        }

        // Update stats
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels.length >= 4 && translations.complaintsResolved) {
            statLabels[0].textContent = translations.complaintsResolved;
            statLabels[1].textContent = translations.activeUsers;
            statLabels[2].textContent = translations.avgResponseTime;
            statLabels[3].textContent = translations.successRate;
        }

        // Update features
        const featureTitles = document.querySelectorAll('.feature-title');
        const featureDescs = document.querySelectorAll('.feature-description');
        
        if (featureTitles.length >= 4 && translations.easyReporting) {
            featureTitles[0].textContent = translations.easyReporting;
            featureTitles[1].textContent = translations.aiPowered;
            featureTitles[2].textContent = translations.realTimeTracking;
            featureTitles[3].textContent = translations.bilingualSupport;
            
            featureDescs[0].textContent = translations.easyReportingDesc;
            featureDescs[1].textContent = translations.aiPoweredDesc;
            featureDescs[2].textContent = translations.realTimeTrackingDesc;
            featureDescs[3].textContent = translations.bilingualSupportDesc;
        }

        // Update CTA section
        const viewServicesBtn = document.querySelector('.cta-actions .btn-outline-light');
        if (viewServicesBtn && translations.viewServices) {
            viewServicesBtn.textContent = translations.viewServices;
        }
    }

    setupNavigation() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });
        }

        // Update active nav link based on current page
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
        });
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language toggle
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.setupTheme();
                }
            });
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.citymitraApp = new CitymitraApp();
});

// Utility functions
const utils = {
    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: hsl(var(--background));
            border: 1px solid hsl(var(--border));
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            padding: 1rem;
            max-width: 20rem;
            animation: slideIn 0.3s ease-out;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    },

    // Generate complaint ID
    generateComplaintId() {
        const prefix = "CMP";
        const state = "GJ";
        const city = "AN";
        const date = new Date();
        const dateStr = date.getFullYear().toString() +
            String(date.getMonth() + 1).padStart(2, '0') +
            String(date.getDate()).padStart(2, '0');
        const serial = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
        return `${prefix}-${state}-${city}-${dateStr}-${serial}`;
    },

    // Validate Aadhaar number
    validateAadhaar(aadhaar) {
        return /^\d{12}$/.test(aadhaar);
    },

    // Get current location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
};

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification-success {
        border-left: 4px solid hsl(var(--success));
    }

    .notification-error {
        border-left: 4px solid hsl(var(--error));
    }

    .notification-warning {
        border-left: 4px solid hsl(var(--warning));
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: hsl(var(--muted-foreground));
        margin-left: 1rem;
    }

    .notification-close:hover {
        color: hsl(var(--foreground));
    }
`;

document.head.appendChild(notificationStyles);

