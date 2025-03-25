document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const newFormBtn = document.getElementById('newFormBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

            const formData = new FormData(form);
            console.log('Form submitted with the following data:');
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
        }
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
        clearErrors();
        form.reset();
    });

    newFormBtn.addEventListener('click', function() {
        form.reset();
        clearErrors();
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
    });

    document.getElementById('email').addEventListener('blur', function() {
        validateEmail();
    });

    document.getElementById('phone').addEventListener('blur', function() {
        validatePhone();
    });

    document.getElementById('studentId').addEventListener('blur', function() {
        validateStudentId();
    });

    function validateForm() {
        clearErrors();
        let isValid = true;

        const requiredFields = [
            { id: 'firstName', errorId: 'firstNameError', message: 'First name is required' },
            { id: 'lastName', errorId: 'lastNameError', message: 'Last name is required' },
            { id: 'address', errorId: 'addressError', message: 'Address is required' },
            { id: 'city', errorId: 'cityError', message: 'City is required' },
            { id: 'state', errorId: 'stateError', message: 'State is required' },
            { id: 'zipCode', errorId: 'zipCodeError', message: 'Zip code is required' },
            { id: 'country', errorId: 'countryError', message: 'Country is required' },
            { id: 'dob', errorId: 'dobError', message: 'Date of birth is required' }
        ];

        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!input.value.trim()) {
                showError(field.errorId, field.message);
                isValid = false;
            }
        });

        const requiredSelects = [
            { id: 'course', errorId: 'courseError', message: 'Please select a course' },
            { id: 'year', errorId: 'yearError', message: 'Please select a year of study' }
        ];

        requiredSelects.forEach(field => {
            const select = document.getElementById(field.id);
            if (!select.value) {
                showError(field.errorId, field.message);
                isValid = false;
            }
        });

        if (!validateEmail()) isValid = false;
        if (!validatePhone()) isValid = false;
        if (!validateStudentId()) isValid = false;

        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            showError('termsError', 'You must agree to the terms and conditions');
            isValid = false;
        }

        const dobInput = document.getElementById('dob');
        if (dobInput.value) {
            const dob = new Date(dobInput.value);
            const today = new Date();
            const minAge = 16;

            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (age < minAge) {
                showError('dobError', `Student must be at least ${minAge} years old`);
                isValid = false;
            }
        }

        return isValid;
    }

    function validateEmail() {
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        if (!email.value.trim()) {
            showError('emailError', 'Email is required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            return false;
        }

        emailError.textContent = '';
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');

        if (!phone.value.trim()) {
            showError('phoneError', 'Phone number is required');
            return false;
        }

        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
        if (!phoneRegex.test(phone.value)) {
            showError('phoneError', 'Please enter a valid phone number');
            return false;
        }

        phoneError.textContent = '';
        return true;
    }

    function validateStudentId() {
        const studentId = document.getElementById('studentId');
        const studentIdError = document.getElementById('studentIdError');

        if (!studentId.value.trim()) {
            showError('studentIdError', 'Student ID is required');
            return false;
        }

        const studentIdRegex = /^[a-zA-Z0-9]{5,}$/;
        if (!studentIdRegex.test(studentId.value)) {
            showError('studentIdError', 'Student ID must be at least 5 alphanumeric characters');
            return false;
        }

        studentIdError.textContent = '';
        return true;
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;

        const firstError = document.querySelector('.error:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }
});