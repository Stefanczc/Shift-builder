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







