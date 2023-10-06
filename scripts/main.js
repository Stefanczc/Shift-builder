import { LocalStorage } from "./classes/storage.js";
import { User } from "./classes/user.js";
import { setSuccess } from "./validationLogic.js";


// [------------------------------------ DOM Elements: user ------------------------------------]

const username = document.getElementById('username');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');


// [------------------------------------ DOM Elements: modal ------------------------------------]

const modal = document.getElementById('userModal');
const openModalBtn = document.getElementById('editProfile');
const closeModalBtn = document.getElementById('close');
const editProfileLink = document.getElementById('editProfile');
const confirmProfile = document.getElementById('confirmProfile');
const logoutBtn = document.getElementById('logoutBtn');
const searchBtn = document.getElementById('searchBtn');


// [------------------------------------ Event Listeners ------------------------------------]
function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    setSuccess(username);
    setSuccess(email);
    setSuccess(firstName);
    setSuccess(lastName);
    setSuccess(age);
    modal.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', (event) => {
    event.preventDefault()
    openModal();
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        setSuccess(username);
        setSuccess(email);
        setSuccess(firstName);
        setSuccess(lastName);
        setSuccess(age);
        closeModal();
    }
});
editProfileLink.addEventListener('click', populateUserDetails);
confirmProfile.addEventListener('click', (e) => {
    e.preventDefault();

    if (fieldValidations()) {
      updatedUserDetails.username = username.value;
      updatedUserDetails.email = email.value;
      updatedUserDetails.firstName = firstName.value;
      updatedUserDetails.lastName = lastName.value;
      updatedUserDetails.age = age.value;
      updateUserDetails(updatedUserDetails);
    } 
  });
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    LocalStorage.setInactiveUser();
    window.location.href = './index.html';
});
searchBtn.addEventListener('click', searchShifts);


// [------------------------------------ Update User Profile Logic ------------------------------------]

function updateUsernameHello() {
    const activeUser = LocalStorage.getActiveUser();
    const usernameHello = document.getElementById('usernameHello');
    usernameHello.innerText = `Hello, ${activeUser.username}!`;
}
updateUsernameHello();

function populateUserDetails() {
    const users = LocalStorage.getUsers();
    const user = users.find((elem) => elem.isLogged === true);
    username.value = user.username;
    email.value = user.email;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    age.value = user.age;
}

const updatedUserDetails = {
    username: username.value,
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    age: age.value,
};

function updateUserDetails(updatedUser) {
    const users = LocalStorage.getUsers();
    const index = users.findIndex((elem) => elem.isLogged === true);
    users[index] = { ...users[index], ...updatedUser };
    LocalStorage.setUsers(users);
    const spinner = document.getElementById('spinner');
    spinner.classList.add('spinnerDisplay');
    setTimeout(() => {
        spinner.classList.remove('spinnerDisplay');
        updateUsernameHello();
        closeModal();
    }, 2000);
    
}

const user = new User(username.value, email.value, firstName.value, lastName.value, age.value);
username.addEventListener('input', () => user.validateUsername(username));
email.addEventListener('input', () => user.validateEmail(email));
firstName.addEventListener('input', () => user.validateFirstName(firstName));
lastName.addEventListener('input', () => user.validateLastName(lastName));
age.addEventListener('input', () => user.validateAge(age));

function fieldValidations() {
    return (
      user.validateUsername(username) &&
      user.validateEmail(email) &&
      user.validateFirstName(firstName) &&
      user.validateLastName(lastName) &&
      user.validateAge(age)
    );
}


// [------------------------------------ Search Shift Logic ------------------------------------]

function searchShifts() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase();
    const tableRows = document.querySelectorAll('tr:not(:first-child)');
    const startDateInput = document.getElementById('startDate');
    const startDateText = startDateInput.value.toLowerCase();
    const endDateInput = document.getElementById('endDate');
    const endDateText = endDateInput.value.toLowerCase();

    tableRows.forEach((row) => {
        const shiftName = row.cells[0].textContent.toLowerCase();
        const date = row.cells[1].textContent;

        const matchesSearch = searchText.length === 0 || shiftName.includes(searchText);
        const matchesStartDate = startDateText.length === 0 || date >= startDateText;
        const isWithinRange = endDateText.length === 0 || (date >= startDateText && date <= endDateText);

        if (matchesSearch && matchesStartDate && isWithinRange) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}


// [------------------------------------ Current Page Logic ------------------------------------]

const currentPage = window.location.pathname;

function changeElementColor() {
    const homepageItem = document.getElementById('homepageItem');
    if (currentPage === '/pages/homepage.html') {
        homepageItem.style.color = 'var(--lightBlack)';
        homepageItem.style.textDecoration = 'underline';

        homepageItem.onmouseover = function() {
            homepageItem.style.color = 'var(--lightBlue)';
            homepageItem.style.textDecoration = 'none';
        };
          homepageItem.onmouseout = function() {
            homepageItem.style.color = 'var(--darkBlue)'; 
            homepageItem.style.textDecoration = 'underline';
          };
    } else {
        homepageItem.style.color = 'var(--lightBlue)'; 
    }
  }

 window.onload = changeElementColor;





