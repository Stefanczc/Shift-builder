import { setError, setSuccess, isValidEmail } from '../validationLogic.js';

class User {
    
    constructor(username, email, password, firstName, lastName, age) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.shifts = [];
    }

    validateUsername(username) {
        const usernameValue = username.value.trim();

        if (usernameValue.length < 6) {
            setError(username, 'A minimum of 6 characters is required');
            return false;
        } else {
            setSuccess(username);
            this.username = usernameValue;
            return true;
        }
    }

    validateEmail(email) {
        const emailValue = email.value.trim();

        if (!isValidEmail(emailValue)) {
            setError(email, 'The provided e-mail address is incorrect');
            return false;
        } else {
            setSuccess(email);
            this.email = emailValue;
            return true;
        }
    }

    validatePassword(password) {
        const passwordValue = password.value.trim();

        if (passwordValue.length < 6) {
            setError(password, 'A minimum of 6 characters is required');
            return false;
        } else {
            setSuccess(password);
            this.password = passwordValue;
            return true;
        }
    }

    validatePasswordConfirm(password, passwordConfirm) {
        const passwordConfirmValue = passwordConfirm.value.trim();
        const passwordValue = password.value.trim();

        if (passwordConfirmValue === '') {
            setError(passwordConfirm, 'Please confirm your password');
            return false;
        } else if (passwordConfirmValue.length < 6) {
            setError(passwordConfirm, 'A minimum of 6 characters is required');
            return false;
        } else if (passwordConfirmValue !== passwordValue) {
            setError(passwordConfirm, 'Your passwords do not match');
            return false;
        } else {
            setSuccess(passwordConfirm);
            return true;
        }
    }

    validateFirstName(firstName) {
        const firstNameValue = firstName.value.trim();

        if (firstNameValue.length < 2) {
            setError(firstName, 'A minimum of 2 characters is required');
            return false;
        } else {
            setSuccess(firstName);
            this.firstName = firstNameValue;
            return true;
        }
    }

    validateLastName(lastName) {
        const lastNameValue = lastName.value.trim();

        if (lastNameValue.length < 2) {
            setError(lastName, 'A minimum of 2 characters is required');
            return false;
        } else {
            setSuccess(lastName);
            this.lastName = lastNameValue;
            return true;
        }
    }

    validateAge(age) {
        const ageValue = age.value.trim();

        if (ageValue === '') {
            setError(age, 'Your age is required');
            return false;
        } else if (ageValue < 18) {
            setError(age, 'You have to be at least 18 years old');
            return false;
        } else if (ageValue > 65) {
            setError(age, 'You have to be at most 65 years old');
            return false;
        } else {
            setSuccess(age);
            this.age = ageValue;
            return true;
        }
    }
    
}

export { User };
