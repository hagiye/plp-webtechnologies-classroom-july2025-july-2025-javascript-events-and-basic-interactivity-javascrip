
// ==============================================
// Part 1: Event Handling
// ==============================================

// Click Events
const clickMeBtn = document.getElementById('clickMeBtn');
const clickMessage = document.getElementById('clickMessage');

clickMeBtn.addEventListener('click', function() {
    clickMessage.textContent = 'Button clicked! Thanks for interacting with me!';
    clickMessage.style.color = 'var(--secondary-color)';
    
    // Reset message after 3 seconds
    setTimeout(() => {
        clickMessage.textContent = '';
    }, 3000);
});

// Mouse Events
const interactiveBox = document.getElementById('interactiveBox');
const mouseStatus = document.getElementById('mouseStatus');

interactiveBox.addEventListener('mouseenter', function() {
    mouseStatus.textContent = 'Status: Mouse is over the box';
    mouseStatus.style.color = 'var(--secondary-color)';
});

interactiveBox.addEventListener('mouseleave', function() {
    mouseStatus.textContent = 'Status: Mouse left the box';
    mouseStatus.style.color = 'var(--accent-color)';
    
    // Reset status after 2 seconds
    setTimeout(() => {
        mouseStatus.textContent = 'Status: Waiting for interaction';
        mouseStatus.style.color = 'inherit';
    }, 2000);
});

interactiveBox.addEventListener('click', function() {
    mouseStatus.textContent = 'Status: Box was clicked!';
    mouseStatus.style.color = 'var(--primary-color)';
});

// Keyboard Events
const keyboardInput = document.getElementById('keyboardInput');
const keyboardOutput = document.getElementById('keyboardOutput');

keyboardInput.addEventListener('input', function() {
    keyboardOutput.textContent = 'You typed: ' + this.value;
    
    // Change color based on input length
    if (this.value.length > 10) {
        keyboardOutput.style.color = 'var(--secondary-color)';
    } else if (this.value.length > 5) {
        keyboardOutput.style.color = 'var(--primary-color)';
    } else {
        keyboardOutput.style.color = 'inherit';
    }
});

keyboardInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        keyboardOutput.textContent = 'You pressed Enter! Final input: ' + this.value;
        keyboardOutput.style.color = 'var(--accent-color)';
        this.value = '';
    }
});

// ==============================================
// Part 2: Interactive Elements
// ==============================================

// Theme Switcher
const lightThemeBtn = document.getElementById('lightThemeBtn');
const darkThemeBtn = document.getElementById('darkThemeBtn');
const blueThemeBtn = document.getElementById('blueThemeBtn');

lightThemeBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
});

darkThemeBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
});

blueThemeBtn.addEventListener('click', function() {
    document.documentElement.setAttribute('data-theme', 'blue');
    localStorage.setItem('theme', 'blue');
});

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Counter Game
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');
const resetCounterBtn = document.getElementById('resetCounterBtn');
const countValue = document.getElementById('countValue');

let count = 0;

decrementBtn.addEventListener('click', function() {
    if (count > 0) {
        count--;
        updateCounter();
    }
});

incrementBtn.addEventListener('click', function() {
    count++;
    updateCounter();
});

resetCounterBtn.addEventListener('click', function() {
    count = 0;
    updateCounter();
});

function updateCounter() {
    countValue.textContent = count;
    
    // Change color based on count value
    if (count > 10) {
        countValue.style.color = 'var(--secondary-color)';
    } else if (count > 5) {
        countValue.style.color = 'var(--primary-color)';
    } else {
        countValue.style.color = 'inherit';
    }
}

// FAQ Section
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    question.addEventListener('click', function() {
        // Close all other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-answer').classList.remove('active');
                otherItem.querySelector('.faq-toggle').textContent = '+';
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('active');
        toggle.textContent = answer.classList.contains('active') ? '−' : '+';
    });
});

// ==============================================
// Part 3: Form Validation
// ==============================================

const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const ageInput = document.getElementById('age');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const ageError = document.getElementById('ageError');
const formResult = document.getElementById('formResult');

// Real-time validation
nameInput.addEventListener('input', function() {
    validateName();
});

emailInput.addEventListener('input', function() {
    validateEmail();
});

passwordInput.addEventListener('input', function() {
    validatePassword();
});

confirmPasswordInput.addEventListener('input', function() {
    validateConfirmPassword();
});

ageInput.addEventListener('input', function() {
    validateAge();
});

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    
    if (name === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    } else if (name.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError(nameInput, nameError, 'Name can only contain letters and spaces');
        return false;
    } else {
        showSuccess(nameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(emailInput, emailError);
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (password === '') {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    } else if (password.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters');
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        showError(passwordInput, passwordError, 'Password must contain at least one lowercase letter, one uppercase letter, and one number');
        return false;
    } else {
        showSuccess(passwordInput, passwordError);
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        return false;
    } else if (confirmPassword !== password) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPasswordInput, confirmPasswordError);
        return true;
    }
}

function validateAge() {
    const age = ageInput.value;
    
    if (age === '') {
        showError(ageInput, ageError, 'Age is required');
        return false;
    } else if (age < 13) {
        showError(ageInput, ageError, 'You must be at least 13 years old');
        return false;
    } else if (age > 120) {
        showError(ageInput, ageError, 'Please enter a valid age');
        return false;
    } else {
        showSuccess(ageInput, ageError);
        return true;
    }
}

// Helper functions for validation
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('error');
    input.classList.remove('valid');
}

function showSuccess(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error');
    input.classList.add('valid');
}

// Form submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isAgeValid = validateAge();
    
    // If all fields are valid, submit the form
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgeValid) {
        formResult.textContent = 'Form submitted successfully!';
        formResult.style.color = 'var(--secondary-color)';
        formResult.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            registrationForm.reset();
            formResult.textContent = '';
            
            // Remove validation classes
            const inputs = registrationForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('valid');
            });
        }, 3000);
    } else {
        formResult.textContent = 'Please fix the errors above.';
        formResult.style.color = 'var(--accent-color)';
        formResult.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
    }
});
