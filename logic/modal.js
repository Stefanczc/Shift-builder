import { Shift } from './addShift.js'
import { LocalStorage } from './localStorage.js';

const modal = document.getElementById('shiftModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');
const shiftForm = document.getElementById('shiftForm');

openModalBtn.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


shiftForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const shiftName = document.getElementById('shiftName').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const workplace = document.getElementById('workplace').value;

    const users = LocalStorage.getLocalStorage();

    const newShift = new Shift(shiftName, date, startTime, endTime, hourlyWage, workplace);
    
    const user = users.find((elem) => elem.isLogged === true);
    user.shifts.push(newShift);
   
    LocalStorage.setLocalStorage(users);

    const table = document.getElementById('table');
    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    nameCell.textContent = shiftName;
    nameCell.style.color = '#fff';
    const dateCell = row.insertCell(1);
    dateCell.textContent = date;
    const startTimeCell = row.insertCell(2);
    startTimeCell.textContent = startTime;
    const endTimeCell = row.insertCell(3);
    endTimeCell.textContent = endTime;
    const hourlyWageCell = row.insertCell(4);
    hourlyWageCell.textContent = hourlyWage;
    const workplaceCell = row.insertCell(5);
    workplaceCell.textContent = workplace;

    modal.style.display = 'none';
});

window.addEventListener('load', () => {
    loadAndDisplayShifts();
});

function loadAndDisplayShifts() {
    const users = LocalStorage.getLocalStorage();

    // Is there a logged in user ?
    const user = users.find((elem) => elem.isLogged === true);
    const shifts = user.shifts;

    const table = document.getElementById('table');

    shifts.forEach((shift) => {
        const row = table.insertRow(-1);
        const nameCell = row.insertCell(0);
        nameCell.textContent = shift.shiftName;
        const dateCell = row.insertCell(1);
        dateCell.textContent = shift.date;
        const startTimeCell = row.insertCell(2);
        startTimeCell.textContent = shift.startTime;
        const endTimeCell = row.insertCell(3);
        endTimeCell.textContent = shift.endTime;
        const hourlyWageCell = row.insertCell(4);
        hourlyWageCell.textContent = shift.hourlyWage;
        const workplaceCell = row.insertCell(5);
        workplaceCell.textContent = shift.workplace;
    });
}
