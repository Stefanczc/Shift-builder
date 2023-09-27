const form = document.getElementById('form'),
username = document.getElementById('username'),
email = document.getElementById('email'),
password = document.getElementById('password'),
passwordConfirm = document.getElementById('passwordConfirm'),
firstName = document.getElementById('firstName'),
lastName = document.getElementById('lastName'),
age = document.getElementById('age');

let isValid = true;

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
    isValid = false;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    isValid = true;
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    return re.test(String(email).toLowerCase());
}

function validateUsername() {
    const usernameValue = username.value.trim();

    if (usernameValue.length < 6) {
        setError(username, 'A minimum of 6 characters is required');
    } else {
        setSuccess(username);
    }
}

function validateEmail() {
    const emailValue = email.value.trim();

    if (!isValidEmail(emailValue)) {
        setError(email, 'The provided e-mail address is incorrect');
    } else {
        setSuccess(email);
    }
}

function validatePassword() {
    const passwordValue = password.value.trim();

    if (passwordValue.length < 6) {
        setError(password, 'A minimum of 6 characters is required');
    } else {
        setSuccess(password);
    }
}

function validatePasswordConfirm() {
    const passwordConfirmValue = passwordConfirm.value.trim();
    const passwordValue = password.value.trim();

    if (passwordConfirmValue === '') {
        setError(passwordConfirm, 'Please confirm your password');
    } else if (passwordConfirmValue.length < 6) {
        setError(passwordConfirm, 'A minimum of 6 characters is required');
    } else if (passwordConfirmValue !== passwordValue) {
        setError(passwordConfirm, 'Your passwords do not match');
    } else {
        setSuccess(passwordConfirm);
    }
}

function validateFirstName() {
    const firstNameValue = firstName.value.trim();

    if (firstNameValue.length < 2) {
    setError(firstName, 'A minimum of 2 characters is required');
    } else {
    setSuccess(firstName);
    }
}

function validateLastName() {
    const lastNameValue = lastName.value.trim();

    if (lastNameValue.length < 2) {
    setError(lastName, 'A minimum of 2 characters is required');
    } else {
    setSuccess(lastName);
    }
}

function validateAge() {
    const ageValue = age.value.trim();

    if (ageValue === '') {
    setError(age, 'Your age is required');
    } else if (ageValue < 18) {
    setError(age, 'You have to be at least 18 years old');
    } else if (ageValue > 65) {
    setError(age, 'You have to be at most 65 years old');
    } else {
    setSuccess(age);
    }
}

// dynamic call
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', validatePassword);
passwordConfirm.addEventListener('input', validatePasswordConfirm);
firstName.addEventListener('input', validateFirstName);
lastName.addEventListener('input', validateLastName);
age.addEventListener('input', validateAge);

// on submit call
form.addEventListener('submit', e => {
    e.preventDefault();
    validateUsername();
    validateEmail();
    validatePassword();
    validatePasswordConfirm();
    validateFirstName();
    validateLastName();
    validateAge();
    if (isValid) {
        window.location.href = './homepage.html'
    }
})



