import { LocalStorage } from "./localStorage.js";
import { UserValidation } from "./userValidation.js";
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

const users = LocalStorage.getLocalStorage();
const user = new User(username, email, password.value, firstName.value, lastName.value, age.value);


// [------------------------------------Dynamic Event Listeners------------------------------------]

username.addEventListener('input', () => UserValidation.validateUsername(username, user));
email.addEventListener('input', () => UserValidation.validateEmail(email, user));
password.addEventListener('input', () => UserValidation.validatePassword(password, user));
passwordConfirm.addEventListener('input', () => UserValidation.validatePasswordConfirm(password, passwordConfirm, user));
firstName.addEventListener('input', () => UserValidation.validateFirstName(firstName, user));
lastName.addEventListener('input', () => UserValidation.validateLastName(lastName, user));
age.addEventListener('input', () => UserValidation.validateAge(age, user));


// [------------------------------------Navigation Listeners------------------------------------]

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInForm.classList.toggle('signInForm');
    signUpForm.classList.add('signUpFormHide');
});
signInBtn.addEventListener('click', signInUser);
showPassword.addEventListener('click', (e) => {
    e.preventDefault();
    const signInPassword = document.getElementById('signInPassword');
    const tooltipPassword = document.getElementById('tooltipPassword');
    
    if (signInPassword.type === 'password') {
        signInPassword.type = 'text'
        tooltipPassword.innerText = 'Hide password';
    }
    else {
        signInPassword.type = 'password';
        tooltipPassword.innerText = 'Show password';
    }
    
})

// [------------------------------------Register process------------------------------------]
registerBtn.addEventListener('click', e => {
    e.preventDefault();

    // Validate on submit
    UserValidation.validateUsername(username, user);
    UserValidation.validateEmail(email, user);
    UserValidation.validatePassword(password, user);
    UserValidation.validatePasswordConfirm(password, passwordConfirm, user);
    UserValidation.validateFirstName(firstName, user);
    UserValidation.validateLastName(lastName, user);
    UserValidation.validateAge(age, user);

    if (UserValidation.isValid) {
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




