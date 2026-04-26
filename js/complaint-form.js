// Complaint Form JavaScript
class ComplaintFormManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.otpSent = false;
        this.otpVerified = false;
        this.selectedFile = null;
        this.location = '';
        this.init();
    }

    init() {
        this.setupForm();
        this.setupLanguageToggle();
        this.setupAadhaarVerification();
        this.setupFileUpload();
        this.setupLocationServices();
        this.setupFormSubmission();
    }

    setupForm() {
        const form = document.getElementById('complaintForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setupLanguageToggle() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleLanguage(e));
        });
    }

    toggleLanguage(e) {
        e.preventDefault();
        const lang = e.target.closest('.lang-btn').dataset.lang;
        
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.closest('.lang-btn').classList.add('active');
        
        this.currentLanguage = lang;
        this.translateForm();
    }

    translateForm() {
        const translations = {
            en: {
                complaintDetails: 'Complaint Details',
                complaintDetailsDesc: 'Fill in the details below. Our AI will help categorize your issue automatically.',
                yourName: 'Your Name',
                issueTitle: 'Issue Title',
                category: 'Category',
                aiWillSuggest: 'AI will suggest based on description',
                description: 'Description',
                uploadPhoto: 'Upload Photo',
                aiWillAnalyze: 'AI will analyze for better categorization',
                location: 'Location',
                priorityLevel: 'Priority Level',
                selectPriority: 'Select priority',
                low: 'Low - Minor inconvenience',
                medium: 'Medium - Moderate issue',
                high: 'High - Safety concern',
                urgent: 'Urgent - Immediate action needed',
                aiPoweredProcessing: 'AI-Powered Processing',
                aiProcessingDesc: 'Once submitted, our AI will automatically categorize your complaint and route it to the appropriate department for faster resolution.',
                submitComplaint: 'Submit Complaint',
                saveDraft: 'Save Draft',
                whatHappensNext: 'What happens next?',
                aiAnalysisRouting: 'AI Analysis & Routing',
                aiAnalysisDesc: 'Your complaint is automatically categorized and sent to the relevant department',
                departmentReview: 'Department Review',
                departmentReviewDesc: 'The assigned department reviews your complaint and begins investigation',
                resolutionUpdate: 'Resolution & Update',
                resolutionUpdateDesc: 'You receive updates on progress and notification when the issue is resolved'
            },
            gu: {
                complaintDetails: 'ફરિયાદની વિગતો',
                complaintDetailsDesc: 'નીચે વિગતો ભરો. અમારું AI તમારી સમસ્યાને આપમેળે વર્ગીકૃત કરવામાં મદદ કરશે.',
                yourName: 'તમારું નામ',
                issueTitle: 'સમસ્યાનું શીર્ષક',
                category: 'વર્ગ',
                aiWillSuggest: 'AI વર્ણન આધારિત સૂચન આપશે',
                description: 'વર્ણન',
                uploadPhoto: 'ફોટો અપલોડ કરો',
                aiWillAnalyze: 'AI વધુ સારા વર્ગીકરણ માટે વિશ્લેષણ કરશે',
                location: 'સ્થાન',
                priorityLevel: 'પ્રાથમિકતા સ્તર',
                selectPriority: 'પ્રાથમિકતા પસંદ કરો',
                low: 'નીચું - નાની અસુવિધા',
                medium: 'મધ્યમ - મધ્યમ સમસ્યા',
                high: 'ઊંચું - સુરક્ષાની ચિંતા',
                urgent: 'તાત્કાલિક - તત્કાલ કાર્યવાહીની જરૂર',
                aiPoweredProcessing: 'AI-સંચાલિત પ્રક્રિયા',
                aiProcessingDesc: 'એકવાર સબમિટ થયા પછી, અમારું AI તમારી ફરિયાદને આપમેળે વર્ગીકૃત કરશે અને ઝડપી ઉકેલ માટે યોગ્ય વિભાગને મોકલશે.',
                submitComplaint: 'ફરિયાદ સબમિટ કરો',
                saveDraft: 'ડ્રાફ્ટ સેવ કરો',
                whatHappensNext: 'આગળ શું થશે?',
                aiAnalysisRouting: 'AI વિશ્લેષણ અને રૂટિંગ',
                aiAnalysisDesc: 'તમારી ફરિયાદ આપમેળે વર્ગીકૃત થાય છે અને સંબંધિત વિભાગને મોકલવામાં આવે છે',
                departmentReview: 'વિભાગીય સમીક્ષા',
                departmentReviewDesc: 'સોંપેલ વિભાગ તમારી ફરિયાદની સમીક્ષા કરે છે અને તપાસ શરૂ કરે છે',
                resolutionUpdate: 'ઉકેલ અને અપડેટ',
                resolutionUpdateDesc: 'તમને પ્રગતિ અંગે અપડેટ્સ અને સમસ્યા હલ થયા પર સૂચના મળે છે'
            }
        };

        const t = translations[this.currentLanguage];
        
        // Update form labels and text
        const elements = {
            '.card-title': t.complaintDetails,
            '.card-description': t.complaintDetailsDesc,
            'label[for="reporterName"]': t.yourName,
            'label[for="title"]': t.issueTitle,
            'label[for="category"]': t.category,
            '.label-note': t.aiWillSuggest,
            'label[for="description"]': t.description,
            'label[for="photo"]': t.uploadPhoto,
            'label[for="location"]': t.location,
            'label[for="priority"]': t.priorityLevel,
            '.ai-info-title': t.aiPoweredProcessing,
            '.ai-info-description': t.aiProcessingDesc,
            '.process-card .card-title': t.whatHappensNext,
            '.step-title:first-of-type': t.aiAnalysisRouting,
            '.step-title:nth-of-type(2)': t.departmentReview,
            '.step-title:last-of-type': t.resolutionUpdate
        };

        Object.entries(elements).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element && text) {
                element.textContent = text;
            }
        });

        // Update placeholders
        const placeholders = {
            '#reporterName': this.currentLanguage === 'en' ? 'Dhruvil' : 'ધ્રુવિલ',
            '#title': this.currentLanguage === 'en' ? 'e.g., Pothole on Main Street' : 'ઉદા. મેઇન સ્ટ્રીટ પર ખાડો',
            '#description': this.currentLanguage === 'en' 
                ? 'Describe the issue in detail. Include when you first noticed it, its severity, and any other relevant information...'
                : 'સમસ્યાનું વિગતવાર વર્ણન કરો. તમે તેને પ્રથમ વખત ક્યારે જોયું, તેની ગંભીરતા અને અન્ય સંબંધિત માહિતી સામેલ કરો...',
            '#location': this.currentLanguage === 'en' ? 'Enter address or landmark' : 'સરનામું અથવા મુખ્ય સ્થળ દાખલ કરો'
        };

        Object.entries(placeholders).forEach(([selector, placeholder]) => {
            const element = document.querySelector(selector);
            if (element && placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update buttons
        const buttons = {
            '#sendOtpBtn': this.currentLanguage === 'en' ? 'Send OTP' : 'OTP મોકલો',
            '#verifyOtpBtn': this.currentLanguage === 'en' ? 'Verify OTP' : 'OTP ચકાસો',
            '#useGpsBtn span': this.currentLanguage === 'en' ? 'Use GPS' : 'GPS વાપરો',
            '.btn-hero': t.submitComplaint,
            '.btn-outline:last-of-type': t.saveDraft
        };

        Object.entries(buttons).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element && text) {
                if (element.tagName === 'SPAN') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    setupAadhaarVerification() {
        const aadhaarInput = document.getElementById('aadhaar');
        const sendOtpBtn = document.getElementById('sendOtpBtn');
        const verifyOtpBtn = document.getElementById('verifyOtpBtn');
        const otpSection = document.getElementById('otpSection');
        const otpVerified = document.getElementById('otpVerified');

        if (aadhaarInput) {
            aadhaarInput.addEventListener('input', (e) => {
                // Only allow numbers and limit to 12 digits
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 12);
            });
        }

        if (sendOtpBtn) {
            sendOtpBtn.addEventListener('click', () => this.sendOTP());
        }

        if (verifyOtpBtn) {
            verifyOtpBtn.addEventListener('click', () => this.verifyOTP());
        }
    }

    async sendOTP() {
        const aadhaarInput = document.getElementById('aadhaar');
        const aadhaar = aadhaarInput.value;

        if (!utils.validateAadhaar(aadhaar)) {
            utils.showNotification('Please enter a valid 12-digit Aadhaar number', 'error');
            return;
        }

        try {
            // Show loading state
            this.setOtpLoadingState(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.otpSent = true;
            document.getElementById('otpSection').classList.remove('hidden');
            aadhaarInput.disabled = true;
            
            utils.showNotification('OTP sent to your registered mobile number', 'success');
        } catch (error) {
            utils.showNotification('Failed to send OTP. Please try again.', 'error');
        } finally {
            this.setOtpLoadingState(false);
        }
    }

    async verifyOTP() {
        const otpInput = document.getElementById('otp');
        const otp = otpInput.value;

        if (!/^\d{6}$/.test(otp)) {
            utils.showNotification('Please enter a valid 6-digit OTP', 'error');
            return;
        }

        try {
            // Show loading state
            this.setVerifyLoadingState(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Demo OTP verification (use '123456' for testing)
            if (otp === '123456') {
                this.otpVerified = true;
                document.getElementById('otpVerified').classList.remove('hidden');
                otpInput.disabled = true;
                
                utils.showNotification('Aadhaar verified successfully!', 'success');
            } else {
                utils.showNotification('Invalid OTP. Please try again.', 'error');
            }
        } catch (error) {
            utils.showNotification('Failed to verify OTP. Please try again.', 'error');
        } finally {
            this.setVerifyLoadingState(false);
        }
    }

    setOtpLoadingState(loading) {
        const btn = document.getElementById('sendOtpBtn');
        if (btn) {
            btn.disabled = loading;
            btn.textContent = loading ? 'Sending...' : (this.currentLanguage === 'en' ? 'Send OTP' : 'OTP મોકલો');
        }
    }

    setVerifyLoadingState(loading) {
        const btn = document.getElementById('verifyOtpBtn');
        if (btn) {
            btn.disabled = loading;
            btn.textContent = loading ? 'Verifying...' : (this.currentLanguage === 'en' ? 'Verify OTP' : 'OTP ચકાસો');
        }
    }

    setupFileUpload() {
        const fileInput = document.getElementById('photo');
        const uploadLabel = document.querySelector('.file-upload-label');
        const uploadText = document.querySelector('.upload-text');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.selectedFile = file;
                    uploadText.textContent = file.name;
                    
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                        utils.showNotification('Please select an image file', 'error');
                        fileInput.value = '';
                        uploadText.textContent = this.currentLanguage === 'en' ? 'Click to upload photo' : 'ફોટો અપલોડ કરવા માટે ક્લિક કરો';
                        return;
                    }

                    // Validate file size (max 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                        utils.showNotification('File size should be less than 5MB', 'error');
                        fileInput.value = '';
                        uploadText.textContent = this.currentLanguage === 'en' ? 'Click to upload photo' : 'ફોટો અપલોડ કરવા માટે ક્લિક કરો';
                        return;
                    }

                    utils.showNotification('Photo uploaded successfully', 'success');
                }
            });
        }
    }

    setupLocationServices() {
        const useGpsBtn = document.getElementById('useGpsBtn');
        const locationInput = document.getElementById('location');

        if (useGpsBtn) {
            useGpsBtn.addEventListener('click', () => this.getCurrentLocation());
        }

        if (locationInput) {
            locationInput.addEventListener('input', (e) => {
                this.location = e.target.value;
            });
        }
    }

    async getCurrentLocation() {
        try {
            utils.showNotification('Getting your location...', 'info');
            
            const position = await utils.getCurrentLocation();
            this.location = position;
            document.getElementById('location').value = position;
            
            utils.showNotification('Location updated successfully', 'success');
        } catch (error) {
            console.error('Location error:', error);
            utils.showNotification('Unable to get your location. Please enter manually.', 'error');
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('complaintForm');
        const saveDraftBtn = document.querySelector('.btn-outline:last-of-type');

        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => this.saveDraft());
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate required fields
        if (!this.validateForm()) {
            return;
        }

        try {
            // Show loading state
            this.setSubmitLoadingState(true);

            const formData = new FormData(e.target);
            const complaintData = {
                aadhaar: formData.get('aadhaar'),
                reporterName: formData.get('reporterName'),
                title: formData.get('title'),
                category: formData.get('category'),
                description: formData.get('description'),
                location: this.location,
                priority: formData.get('priority'),
                language: this.currentLanguage,
                timestamp: new Date().toISOString()
            };

            // Submit to backend
            const response = await this.submitComplaint(complaintData);
            
            if (response.success) {
                this.showSuccessModal(response.complaintId);
            } else {
                utils.showNotification(response.message || 'Failed to submit complaint. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            utils.showNotification('An error occurred. Please try again.', 'error');
        } finally {
            this.setSubmitLoadingState(false);
        }
    }

    validateForm() {
        const requiredFields = ['aadhaar', 'reporterName', 'title', 'description', 'location'];
        let isValid = true;

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else if (field) {
                field.classList.remove('error');
            }
        });

        if (!this.otpVerified) {
            utils.showNotification('Please verify your Aadhaar number first', 'error');
            return false;
        }

        if (!isValid) {
            utils.showNotification('Please fill in all required fields', 'error');
        }

        return isValid;
    }

    async submitComplaint(data) {
        // Simulate API call to backend
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock response
        return {
            success: true,
            complaintId: utils.generateComplaintId(),
            message: 'Complaint submitted successfully'
        };
    }

    setSubmitLoadingState(loading) {
        const submitBtn = document.querySelector('.btn-hero');
        if (submitBtn) {
            submitBtn.disabled = loading;
            if (loading) {
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    ${this.currentLanguage === 'en' ? 'Submitting...' : 'સબમિટ કરી રહ્યા છીએ...'}
                `;
            } else {
                submitBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                    </svg>
                    ${this.currentLanguage === 'en' ? 'Submit Complaint' : 'ફરિયાદ સબમિટ કરો'}
                `;
            }
        }
    }

    showSuccessModal(complaintId) {
        const modal = document.getElementById('successModal');
        const complaintIdSpan = document.getElementById('complaintId');
        const trackBtn = document.getElementById('trackComplaintBtn');

        if (modal && complaintIdSpan) {
            complaintIdSpan.textContent = complaintId;
            modal.classList.remove('hidden');

            if (trackBtn) {
                trackBtn.addEventListener('click', () => {
                    window.location.href = `track-complaint.html?id=${complaintId}`;
                });
            }
        }
    }

    saveDraft() {
        const formData = new FormData(document.getElementById('complaintForm'));
        const draftData = Object.fromEntries(formData.entries());
        
        localStorage.setItem('complaintDraft', JSON.stringify({
            ...draftData,
            location: this.location,
            language: this.currentLanguage,
            timestamp: new Date().toISOString()
        }));

        utils.showNotification('Draft saved successfully', 'success');
    }

    loadDraft() {
        const draft = localStorage.getItem('complaintDraft');
        if (draft) {
            try {
                const draftData = JSON.parse(draft);
                
                // Populate form fields
                Object.entries(draftData).forEach(([key, value]) => {
                    const field = document.getElementById(key);
                    if (field && value) {
                        field.value = value;
                    }
                });

                if (draftData.location) {
                    this.location = draftData.location;
                }

                if (draftData.language) {
                    this.currentLanguage = draftData.language;
                    this.translateForm();
                }

                utils.showNotification('Draft loaded successfully', 'info');
            } catch (error) {
                console.error('Error loading draft:', error);
            }
        }
    }
}

// Initialize complaint form manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.complaintFormManager = new ComplaintFormManager();
    
    // Load draft if exists
    if (window.complaintFormManager) {
        window.complaintFormManager.loadDraft();
    }
});

// Add CSS for form errors
const formErrorStyles = document.createElement('style');
formErrorStyles.textContent = `
    .form-input.error,
    .form-select.error,
    .form-textarea.error {
        border-color: hsl(var(--error));
        box-shadow: 0 0 0 2px hsl(var(--error) / 0.2);
    }

    .form-input.error:focus,
    .form-select.error:focus,
    .form-textarea.error:focus {
        border-color: hsl(var(--error));
        box-shadow: 0 0 0 2px hsl(var(--error) / 0.2);
    }
`;

document.head.appendChild(formErrorStyles);

