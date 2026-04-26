// Signup JavaScript
class SignupManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupForm();
        this.setupValidation();
    }

    setupForm() {
        const form = document.getElementById('signupForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setupValidation() {
        const aadhaarInput = document.getElementById('aadhaar');
        const phoneInput = document.getElementById('phone');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        // Aadhaar validation
        if (aadhaarInput) {
            aadhaarInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').substring(0, 12);
            });
        }

        // Phone validation
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d+\s-]/g, '');
            });
        }

        // Password confirmation
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                this.validatePasswordMatch();
            });
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                this.validatePasswordMatch();
                this.validatePasswordStrength();
            });
        }
    }

    validatePasswordMatch() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmInput = document.getElementById('confirmPassword');

        if (confirmPassword && password !== confirmPassword) {
            confirmInput.classList.add('error');
            return false;
        } else {
            confirmInput.classList.remove('error');
            return true;
        }
    }

    validatePasswordStrength() {
        const password = document.getElementById('password').value;
        const passwordInput = document.getElementById('password');
        
        // Check password strength
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough].filter(Boolean).length;

        if (password && strength < 3) {
            passwordInput.classList.add('error');
        } else {
            passwordInput.classList.remove('error');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        try {
            this.setLoadingState(true);

            const formData = new FormData(e.target);
            const userData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                aadhaar: formData.get('aadhaar'),
                password: formData.get('password'),
                address: formData.get('address'),
                timestamp: new Date().toISOString()
            };

            const result = await this.createAccount(userData);

            if (result.success) {
                utils.showNotification('Account created successfully! Please check your email for verification.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                utils.showNotification(result.message || 'Failed to create account. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Signup error:', error);
            utils.showNotification('An error occurred. Please try again.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'aadhaar', 'password', 'confirmPassword', 'address'];
        let isValid = true;

        // Check required fields
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field && !field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else if (field) {
                field.classList.remove('error');
            }
        });

        // Validate email
        const email = document.getElementById('email').value;
        if (email && !this.validateEmail(email)) {
            document.getElementById('email').classList.add('error');
            isValid = false;
        }

        // Validate Aadhaar
        const aadhaar = document.getElementById('aadhaar').value;
        if (aadhaar && !utils.validateAadhaar(aadhaar)) {
            document.getElementById('aadhaar').classList.add('error');
            isValid = false;
        }

        // Validate phone
        const phone = document.getElementById('phone').value;
        if (phone && !this.validatePhone(phone)) {
            document.getElementById('phone').classList.add('error');
            isValid = false;
        }

        // Validate password match
        if (!this.validatePasswordMatch()) {
            isValid = false;
        }

        // Check terms acceptance
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            utils.showNotification('Please accept the Terms of Service and Privacy Policy', 'error');
            isValid = false;
        }

        if (!isValid) {
            utils.showNotification('Please fill in all fields correctly', 'error');
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    async createAccount(userData) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock validation
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = existingUsers.find(user => 
            user.email === userData.email || user.aadhaar === userData.aadhaar
        );

        if (existingUser) {
            if (existingUser.email === userData.email) {
                return {
                    success: false,
                    message: 'An account with this email already exists'
                };
            } else {
                return {
                    success: false,
                    message: 'An account with this Aadhaar number already exists'
                };
            }
        }

        // Create new user
        const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            ...userData,
            password: btoa(userData.password), // Simple encoding (use proper hashing in production)
            createdAt: new Date().toISOString(),
            isVerified: false
        };

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        return {
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: `${newUser.firstName} ${newUser.lastName}`
            }
        };
    }

    setLoadingState(loading) {
        const submitBtn = document.querySelector('#signupForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = loading;
            if (loading) {
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Creating Account...
                `;
            } else {
                submitBtn.innerHTML = 'Create Account';
            }
        }
    }
}

// Initialize signup manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.signupManager = new SignupManager();
});

