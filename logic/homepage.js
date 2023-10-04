import { LocalStorage } from "./localStorage.js";

const activeUser = LocalStorage.getActiveUser();
const logoutBtn = document.getElementById('logoutBtn');

const usernameHello = document.getElementById('usernameHello');
usernameHello.innerText = `Hello, ${activeUser.username}!`;

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    LocalStorage.setInactiveUser();
    window.location.href = './register.html';
})

// const editProfile = document.getElementById('editProfile');
// editProfile.addEventListener('click', openProfile);
// function openProfile(event) {
//     event.preventDefault();
// }

// [------------------------------------DOM Elements------------------------------------]

const signUpForm = document.getElementById('signUpForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');

const modal = document.getElementById('userModal');
const openModalBtn = document.getElementById('editProfile');
const closeModalBtn = document.getElementById('close');
const editProfileLink = document.getElementById('editProfile');
const confirmProfile = document.getElementById('confirmProfile');

// [------------------------------------Event Listeners------------------------------------]
function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', (event) => {
    event.preventDefault()
    openModal();
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


// [------------------------------------Logic------------------------------------]

function populateUserDetails() {
    const users = LocalStorage.getLocalStorage();
    const user = users.find((elem) => elem.isLogged === true);
    username.value = user.username;
    email.value = user.email;
    password.value = user.password;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    age.value = user.age;
}

const updatedUserDetails = {
    username: username.value,
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
};


function updateUserDetails(updatedUser) {
    const users = LocalStorage.getLocalStorage();
    const index = users.findIndex((elem) => elem.isLogged === true);
    users[index] = { ...users[index], ...updatedUser };
    LocalStorage.setLocalStorage(users);

    // if (index !== -1) {
    //     users[index] = { ...users[index], ...updatedUser };
    //     LocalStorage.setLocalStorage(users);
    // } else {
    //     console.error("User not found in local storage.");
    // }
}
// console.log(updateUserDetails(updatedUserDetails));


// updateUserDetails(updatedUserDetails);

editProfileLink.addEventListener('click', populateUserDetails);
confirmProfile.addEventListener('click', () => {
    // Assuming updatedUserDetails is updated based on user input
    updatedUserDetails.username = username.value;
    updatedUserDetails.email = email.value;
    updatedUserDetails.password = password.value;
    updatedUserDetails.firstName = firstName.value;
    updatedUserDetails.lastName = lastName.value;
    updatedUserDetails.age = age.value;

    updateUserDetails(updatedUserDetails);
});

