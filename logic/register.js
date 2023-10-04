import { LocalStorage } from "./localStorage.js";
import { User } from "./user.js";
import { setError } from "./validationLogic.js";


// [------------------------------------DOM Elements------------------------------------]

const signUpForm = document.getElementById('signUpForm'),
    username = document.getElementById('username'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    passwordConfirm = document.getElementById('passwordConfirm'),
    firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    age = document.getElementById('age'),
    registerBtn = document.getElementById('registerBtn'),
    loginLink = document.getElementById('loginLink');

const signInForm = document.getElementById('signInForm');
const signInBtn = document.getElementById('signInBtn');    

const showPassword = document.getElementById('showPassword');
const signInPassword = document.getElementById('signInPassword');
const tooltipPassword = document.getElementById('tooltipPassword');
const tooltipRegisterPassword = document.getElementById('tooltipRegisterPassword');
const tooltipRegisterConfirmPassword = document.getElementById('tooltipRegisterConfirmPassword');
const showRegisterPassword = document.getElementById('showRegisterPassword');
const showRegisterConfirmPassword = document.getElementById('showRegisterConfirmPassword');

const users = LocalStorage.getLocalStorage();
const user = new User(username.value, email.value, password.value, firstName.value, lastName.value, age.value);


// [------------------------------------Dynamic Event Listeners------------------------------------]

username.addEventListener('input', () => user.validateUsername(username));
email.addEventListener('input', () => user.validateEmail(email));
password.addEventListener('input', () => user.validatePassword(password));
passwordConfirm.addEventListener('input', () => user.validatePasswordConfirm(password, passwordConfirm));
firstName.addEventListener('input', () => user.validateFirstName(firstName));
lastName.addEventListener('input', () => user.validateLastName(lastName));
age.addEventListener('input', () => user.validateAge(age));


// [------------------------------------Navigation Listeners------------------------------------]

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInForm.classList.toggle('signInForm');
    signUpForm.classList.add('signUpFormHide');
});
signInBtn.addEventListener('click', signInUser);


// [------------------------------------Password UI Logic------------------------------------]
showPassword.addEventListener('click', (e) => {
    e.preventDefault();
    togglePassword(signInPassword, tooltipPassword);
});
showRegisterPassword.addEventListener('click', (e) => {
    e.preventDefault();
    togglePassword(password, tooltipRegisterPassword);
});
showRegisterConfirmPassword.addEventListener('click', (e) => {
    e.preventDefault();
    togglePassword(passwordConfirm, tooltipRegisterConfirmPassword);
});

function togglePassword(field, tooltip) {
    if (field.type === 'password') {
        field.type = 'text';
        tooltip.innerText = 'Hide password';
    } else {
        field.type = 'password';
        tooltip.innerText = 'Show password';
    }
}
// [------------------------------------Register process------------------------------------]

registerBtn.addEventListener('click', e => {
    e.preventDefault();

    // Validate on submit
    const usernameValid = user.validateUsername(username);
    const emailValid = user.validateEmail(email);
    const passwordValid = user.validatePassword(password);
    const passwordConfirmValid = user.validatePasswordConfirm(password, passwordConfirm);
    const firstNameValid = user.validateFirstName(firstName);
    const lastNameValid = user.validateLastName(lastName);
    const ageValid = user.validateAge(age);


    //all above variables true
    if (usernameValid, emailValid, passwordValid, passwordConfirmValid, firstNameValid, lastNameValid, ageValid) {
        let emailExists = false;
        const allFields = document.querySelectorAll('input');

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === user.email) {
                emailExists = true;
                setError(email, 'E-mail is already in use');
                break;
            }
        }

        if (!emailExists) {
            users.push(user);
            LocalStorage.setLocalStorage(users);
            alert('Registration Successful');
            allFields.forEach(elem => {
                elem.value = '';
                elem.parentElement.classList.remove('success');
            });
            signInForm.classList.toggle('signInForm');
            signUpForm.classList.add('signUpFormHide');
            let signInEmail = document.getElementById('signInEmail');
            signInEmail.value = user.email;
        }
    }
});

// [------------------------------------Log-in process------------------------------------]

function signInUser(e) {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            users[i].isLogged = true;
            alert('LogIn successful!');
            e.preventDefault();
            LocalStorage.setLocalStorage(users);
            return window.location.href = './homepage.html';
        }
    }
    e.preventDefault();
    return alert('Incorrect Credentials');
}




