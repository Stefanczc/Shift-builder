import { LocalStorage } from "./classes/storage.js";
import { User } from "./classes/user.js";
import { setSuccess } from "./validation.js";


// [--------------------------- DOM Elements: user ---------------------------]

const username = document.getElementById('username');
const email = document.getElementById('email');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');

// [--------------------------- DOM Elements: modal ---------------------------]

const modal = document.getElementById('userModal');
const openModalBtn = document.getElementById('editProfile');
const closeModalBtn = document.getElementById('close');

// [--------------------------- DOM Elements: page ---------------------------]

const editProfileLink = document.getElementById('editProfile');
const confirmProfile = document.getElementById('confirmProfile');
const logoutBtn = document.getElementById('logoutBtn');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const usernameHello = document.getElementById('usernameHello');
// const profileItems = document.getElementById('profileList');


// [--------------------------- Event Listeners ---------------------------]

usernameHello.addEventListener('click', (e) => {
    e.preventDefault();
})

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
    window.location.href = '/index.html';
});
searchBtn.addEventListener('click', searchShifts);
clearBtn.addEventListener('click', () => {
    window.location.href = '/pages/my-shifts.html';
});


// [--------------------------- Update user profile logic ---------------------------]

function updateUsernameHello() {
    const activeUser = LocalStorage.getActiveUser();
    const usernameHello = document.getElementById('usernameHello');
    usernameHello.innerText = `Hello, ${activeUser.firstName.trim()}!`;
}
updateUsernameHello();

function populateUserDetails() {
    const users = LocalStorage.getUsers();
    const user = users.find((elem) => elem.isLogged === true);
    username.value = user.username.trim();
    email.value = user.email.trim();
    firstName.value = user.firstName.trim();
    lastName.value = user.lastName.trim();
    age.value = user.age.trim();
}

const updatedUserDetails = {
    username: username.value.trim(),
    email: email.value.trim(),
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    age: age.value.trim(),
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


// [--------------------------- Search shift logic ---------------------------]

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

// [--------------------------- Current page UI logic ---------------------------]

const currentPage = window.location.pathname;

function changeElementColor() {
    const homepageItem = document.getElementById('homepageItem');
    if (currentPage === '/pages/my-shifts.html') {
        homepageItem.style.color = 'var(--lightBlack)';
        homepageItem.style.fontWeight = 'bold';

        homepageItem.onmouseover = function() {
            homepageItem.style.color = 'var(--lightBlue)';
            homepageItem.style.fontWeight = 'normal';
        };
          homepageItem.onmouseout = function() {
            homepageItem.style.color = 'var(--darkBlue)'; 
            homepageItem.style.fontWeight = 'bold';
          };
    } else {
        homepageItem.style.color = 'var(--lightBlue)'; 
    }
  }

window.onload = changeElementColor;
