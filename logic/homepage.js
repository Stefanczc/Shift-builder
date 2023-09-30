const users = JSON.parse(localStorage.getItem('users'));
const user = users.filter((elem) => elem.isLogged === true);
const username = user[0].username;

const logoutBtn = document.getElementById('logoutBtn');

const usernameHello = document.getElementById('usernameHello');
usernameHello.innerText = `Hello, ${username}!`;

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    user[0].isLogged = false;
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = './register.html';
})







