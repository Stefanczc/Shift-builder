// import { setError, setSuccess, isValidEmail } from "./validationLogic.js";

// class UserValidation {

//     isValid = true;

    

//     static validateEmail(email, user) {
//         const emailValue = email.value.trim();

//         if (!isValidEmail(emailValue)) {
//             setError(email, 'The provided e-mail address is incorrect');
//             UserValidation.isValid = false;
//         } else {
//             setSuccess(email);
//             user.email = emailValue;
//         }
//     }

//     static validatePassword(password, user) {
//         const passwordValue = password.value.trim();

//         if (passwordValue.length < 6) {
//             setError(password, 'A minimum of 6 characters is required');
//         } else {
//             setSuccess(password);
//             user.password = passwordValue;
//         }
//     }

//     static validatePasswordConfirm(password, passwordConfirm, user) {
//         const passwordConfirmValue = passwordConfirm.value.trim();
//         const passwordValue = password.value.trim();

//         if (passwordConfirmValue === '') {
//             setError(passwordConfirm, 'Please confirm your password');
//         } else if (passwordConfirmValue.length < 6) {
//             setError(passwordConfirm, 'A minimum of 6 characters is required');
//         } else if (passwordConfirmValue !== passwordValue) {
//             setError(passwordConfirm, 'Your passwords do not match');
//         } else {
//             setSuccess(passwordConfirm);
//         }
//     }

//     static validateFirstName(firstName, user) {
//         const firstNameValue = firstName.value.trim();

//         if (firstNameValue.length < 2) {
//             setError(firstName, 'A minimum of 2 characters is required');
//         } else {
//             setSuccess(firstName);
//             user.firstName = firstNameValue;
//         }
//     }

//     static validateLastName(lastName, user) {
//         const lastNameValue = lastName.value.trim();

//         if (lastNameValue.length < 2) {
//             setError(lastName, 'A minimum of 2 characters is required');
//         } else {
//             setSuccess(lastName);
//             user.lastName = lastNameValue;
//         }
//     }

//     static validateAge(age, user) {
//         const ageValue = age.value.trim();

//         if (ageValue === '') {
//             setError(age, 'Your age is required');
//         } else if (ageValue < 18) {
//             setError(age, 'You have to be at least 18 years old');
//         } else if (ageValue > 65) {
//             setError(age, 'You have to be at most 65 years old');
//         } else {
//             setSuccess(age);
//             this.age = ageValue;
//             return true;
//         }
//     }

//     static isValid() {
//         return UserValidation.isValid;
//     }
// }

// export { UserValidation };
