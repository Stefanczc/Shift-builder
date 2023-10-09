import { LocalStorage } from "./classes/storage.js";
import { User } from "./classes/user.js";
import { setError } from "./validation.js";


// [--------------------------- DOM Elements ---------------------------]

const signUpForm = document.getElementById('signUpForm'),
    username = document.getElementById('username'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    passwordConfirm = document.getElementById('passwordConfirm'),
    firstName = document.getElementById('firstName'),
    lastName = document.getElementById('lastName'),
    age = document.getElementById('age'),
    registerBtn = document.getElementById('registerBtn');

const navToRegisterBtn = document.getElementById('navToRegister');
const loginLink = document.getElementById('loginLink');
const signInForm = document.getElementById('signInForm');
const signInBtn = document.getElementById('signInBtn');    

const showPassword = document.getElementById('showPassword');
const showRegisterPassword = document.getElementById('showRegisterPassword');
const showRegisterConfirmPassword = document.getElementById('showRegisterConfirmPassword');
const navBackToLoginBtn = document.getElementById('navBackToLogin');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const navToResetPasswordBtn = document.getElementById('navToResetPassword');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');
const forgotRegisterPassword = document.getElementById('forgotRegisterPassword');

const users = LocalStorage.getUsers();
const user = new User(username.value, email.value, password.value, firstName.value, lastName.value, age.value);


// [--------------------------- Dynamic Event Listeners ---------------------------]

username.addEventListener('input', () => user.validateUsername(username));
email.addEventListener('input', () => user.validateEmail(email));
password.addEventListener('input', () => user.validatePassword(password));
passwordConfirm.addEventListener('input', () => user.validatePasswordConfirm(password, passwordConfirm));
firstName.addEventListener('input', () => user.validateFirstName(firstName));
lastName.addEventListener('input', () => user.validateLastName(lastName));
age.addEventListener('input', () => user.validateAge(age));


// [--------------------------- Navigation Listeners ---------------------------]

navToRegisterBtn.addEventListener('click', e => {
    e.preventDefault();
    signUpForm.classList.remove('formHidden');
    signInForm.classList.add('formHidden');
});
loginLink.addEventListener('click', e => {
    e.preventDefault();
    signUpForm.classList.add('formHidden');
    signInForm.classList.remove('formHidden');
});
navToResetPasswordBtn.addEventListener('click', e => {
    e.preventDefault();
    signInForm.classList.add('formHidden');
    forgotPasswordForm.classList.remove('formHidden');
});
navBackToLoginBtn.addEventListener('click', e => {
    e.preventDefault();
    forgotPasswordForm.classList.add('formHidden');
    signInForm.classList.remove('formHidden');
});
signInBtn.addEventListener('click', signInUser);


// [--------------------------- Password Listeners ---------------------------]

showPassword.addEventListener('click', function () {
    togglePassword.call(this);
});
showRegisterPassword.addEventListener('click', function () {
    togglePassword.call(this);
});
showRegisterConfirmPassword.addEventListener('click', function () {
    togglePassword.call(this);
});

forgotRegisterPassword.addEventListener('click', function () {
    togglePassword.call(this);
});
resetPasswordBtn.addEventListener('click', e => {
    e.preventDefault();
    passwordReset();
})


// [--------------------------- Password UI Logic ---------------------------]

function togglePassword() {
    const inputField = this.previousElementSibling;
    const tooltip = this.nextElementSibling;

    if (inputField.type === 'password') {
        inputField.type = 'text';
        tooltip.innerText = 'Hide password';
    } else {
        inputField.type = 'password';
        tooltip.innerText = 'Show password';
    }
}

function openPopUpModal(message) {
    const popUpModal = document.getElementById('popupMessage');
    const messageText = document.getElementById('messageText');
    const okButton = document.getElementById('okButton'); 

    messageText.innerText = message;
    popUpModal.classList.remove('formHidden');

    okButton.addEventListener('click', () => {
        popUpModal.classList.add('formHidden');
    });
}


// [--------------------------- Registration process ---------------------------]

registerBtn.addEventListener('click', e => {
    e.preventDefault();

    const usernameValid = user.validateUsername(username);
    const emailValid = user.validateEmail(email);
    const passwordValid = user.validatePassword(password);
    const passwordConfirmValid = user.validatePasswordConfirm(password, passwordConfirm);
    const firstNameValid = user.validateFirstName(firstName);
    const lastNameValid = user.validateLastName(lastName);
    const ageValid = user.validateAge(age);

    if (usernameValid, emailValid, passwordValid, passwordConfirmValid, firstNameValid, lastNameValid, ageValid) {
        let emailExists = false;
        const allFields = document.querySelectorAll('input');

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === user.email) {
                emailExists = true;
                setError(email, 'E-mail is already in use!');
                break;
            }
        }

        if (!emailExists) {
            users.push(user);
            LocalStorage.setUsers(users);
            openPopUpModal('Registration Successful!');
            allFields.forEach(elem => {
                elem.value = '';
                elem.parentElement.classList.remove('success');
            });
            signInForm.classList.toggle('formHidden');
            signUpForm.classList.add('formHidden');
            const signInEmail = document.getElementById('signInEmail');
            signInEmail.value = user.email;
        }
    }
});


// [--------------------------- Log-in process ---------------------------]

function signInUser(e) {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const spinner = document.getElementById('spinner');

    if (email.length === 0 || password.length === 0) {
        openPopUpModal('Please insert your email and password!');
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            users[i].isLogged = true;
            spinner.classList.add('spinnerDisplay');
            setTimeout(() => {
                LocalStorage.setUsers(users);
                window.location.href = 'pages/my-shifts.html';
                spinner.classList.remove('spinnerDisplay');
            }, 2000);
            return; 
        }
    }
    openPopUpModal('Incorrect e-mail or password!');
}


// [--------------------------- Password reset process ---------------------------]

function passwordReset() {
    const resetEmail = document.getElementById('resetEmail').value;
    const newPasswordInput = document.getElementById('passwordNew');
    const newPasswordValue = newPasswordInput.value;

    const tempUser = new User('', '', newPasswordValue, '', '', '');

    if (!resetEmail) {
        return;
    }

    let existingUser = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === resetEmail) {
            existingUser = true;
            if (existingUser && newPasswordValue.length !== 0) {
                if (!tempUser.validatePassword(newPasswordInput)) {
                    return; 
                }
                users[i].password = newPasswordValue;
                LocalStorage.setUsers(users);
                openPopUpModal('Your password has been reset');
                const okButton = document.getElementById('okButton');
                function handleOkButtonClick() {
                    forgotPasswordForm.classList.add('formHidden');
                    signInForm.classList.remove('formHidden');
                    okButton.removeEventListener('click', handleOkButtonClick);
                }
                okButton.addEventListener('click', handleOkButtonClick);
            }
        }
    }
    if (!existingUser) {
        openPopUpModal('Hello You, your e-mail is not in our database, care to join our app ?');
        const okButton = document.getElementById('okButton');
        
        function handleOkButtonClick() {
            forgotPasswordForm.classList.add('formHidden');
            signUpForm.classList.remove('formHidden');
            okButton.removeEventListener('click', handleOkButtonClick);
        }

        okButton.addEventListener('click', handleOkButtonClick);
    }
}
