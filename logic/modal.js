import { Shift } from './shift.js';
import { LocalStorage } from './localStorage.js';

// [------------------------------------DOM Elements------------------------------------]

const modal = document.getElementById('shiftModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');
const shiftForm = document.getElementById('shiftForm');
const table = document.getElementById('table');

// [------------------------------------Event Listeners------------------------------------]

closeModalBtn.addEventListener('click', closeModal);
shiftForm.addEventListener('submit', addShift);
openModalBtn.addEventListener('click', (event) => {
    event.preventDefault()
    modal.style.display = 'block';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
window.addEventListener('load', () => {
    loadAndDisplayShifts();
});

function closeModal() {
    modal.style.display = 'none';
}

// [------------------------------------Add new shift------------------------------------]

function addShift(event) {
    event.preventDefault();

    const shiftName = document.getElementById('shiftName').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const workplace = document.getElementById('workplace').value;

    const users = LocalStorage.getLocalStorage();
    const user = users.find((elem) => elem.isLogged === true);
    const newShift = new Shift(shiftName, date, startTime, endTime, hourlyWage, workplace);
    user.shifts.push(newShift);
    LocalStorage.setLocalStorage(users);
    updateTable(newShift);
    closeModal();
};

// [------------------------------------Update the UI table------------------------------------]

function updateTable(shift) {
    const row = table.insertRow(-1);
    row.insertCell(0).textContent = shift.shiftName;
    row.insertCell(1).textContent = shift.date;
    row.insertCell(2).textContent = shift.startTime;
    row.insertCell(3).textContent = shift.endTime;
    row.insertCell(4).textContent = shift.hourlyWage;
    row.insertCell(5).textContent = shift.workplace;
}


// [------------------------------------Load and display from LS------------------------------------]

function loadAndDisplayShifts() {
    const activeUser = LocalStorage.getActiveUser();
    const shifts = activeUser.shifts;
    shifts.forEach((shift) => {
        updateTable(shift);
    });
}
