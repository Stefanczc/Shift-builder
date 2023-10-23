import { Shift } from './classes/shift.js';
import { LocalStorage } from './classes/storage.js';


// [--------------------------- DOM Elements ---------------------------]

const modal = document.getElementById('shiftModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');
const shiftForm = document.getElementById('shiftForm');
const table = document.getElementById('table');


// [--------------------------- Event Listeners ---------------------------]

function openModal(shift) {
    document.getElementById('shiftName').value = shift.shiftName;
    document.getElementById('date').value = shift.date;
    document.getElementById('startTime').value = shift.startTime;
    document.getElementById('endTime').value = shift.endTime;
    document.getElementById('hourlyWage').value = shift.hourlyWage;
    document.getElementById('workplace').value = shift.workplace;
    modal.style.display = 'block';
}
function closeModal() {
    document.getElementById('shiftName').value = '';
    document.getElementById('date').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('hourlyWage').value = '';
    document.getElementById('workplace').value ='';
    modal.style.display = 'none';
}
openModalBtn.addEventListener('click', (event) => {
    event.preventDefault()
    modal.style.display = 'block';
});
closeModalBtn.addEventListener('click', closeModal);
shiftForm.addEventListener('submit', addShift);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});
window.addEventListener('load', () => {
    loadAndDisplayShifts();
});


// [--------------------------- Add/Update shift ---------------------------]

function addShift(event) {
    event.preventDefault();
    const shiftName = document.getElementById('shiftName').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const workplace = document.getElementById('workplace').value;
    const spinner = document.getElementById('spinner');
    const users = LocalStorage.getUsers();
    const user = users.find((elem) => elem.isLogged === true);
    const existingShiftIndex = user.shifts.findIndex(shift => shift.date === date);

    if (existingShiftIndex !== -1) {
        const existingShift = user.shifts[existingShiftIndex];
        const updatedShift = new Shift(
            shiftName,
            date,
            startTime,
            endTime,
            hourlyWage,
            workplace
        );
        Object.assign(updatedShift, existingShift);
        updatedShift.shiftName = shiftName;
        updatedShift.date = date;
        updatedShift.startTime = startTime;
        updatedShift.endTime = endTime;
        updatedShift.hourlyWage = hourlyWage;
        updatedShift.workplace = workplace;
        updatedShift.profit = updatedShift.calculateProfit();
        user.shifts.splice(existingShiftIndex, 1, updatedShift);
        spinner.classList.add('spinnerDisplay');
        updateShift(updatedShift, 2000);
        
    } else {
        const newShift = new Shift(shiftName, date, startTime, endTime, hourlyWage, workplace);
        user.shifts.push(newShift);
        spinner.classList.add('spinnerDisplay');
        updateShift(newShift, 2000);
    }

    function updateShift(shift, timeout) {
        setTimeout(() => {
            LocalStorage.setUsers(users);
            displayBestMonth();
            spinner.classList.remove('spinnerDisplay');
            closeModal();
            updateTable(shift);
        }, timeout);
    }
    return; 
}


// [--------------------------- Update the UI table ---------------------------]

function updateTable(shift) {
    const existingRow = findRowByDate(shift.date);
    if (existingRow) {
        updateRow(existingRow, shift);
    } else {
        const row = table.insertRow(-1);
        const newIndex = table.rows.length - 1; 
        fillRow(row, shift, newIndex);
    }
    displayBestMonth();
}

function updateRow(row, shift) {
    row.cells[0].textContent = shift.shiftName;
    row.cells[1].textContent = shift.date;
    row.cells[2].textContent = shift.startTime;
    row.cells[3].textContent = shift.endTime;
    row.cells[4].textContent = shift.hourlyWage;
    row.cells[5].textContent = shift.workplace;
    shift.profit = shift.calculateProfit(); 
    row.cells[6].textContent = shift.profit;

    const users = LocalStorage.getUsers();
    const user = users.find((elem) => elem.isLogged === true);
    const existingShiftIndex = user.shifts.findIndex(s => s.date === shift.date);

    if (existingShiftIndex !== -1) {
        user.shifts.splice(existingShiftIndex, 1, shift);
        LocalStorage.setUsers(users);
    }

    row.addEventListener('click', () => {
        openModal(shift);
    });
}

function fillRow(row, shift, index) {
    row.id = `row_${index}`;
    row.dataset.shiftId = index;
    row.insertCell(0).textContent = shift.shiftName;
    row.insertCell(1).textContent = shift.date;
    row.insertCell(2).textContent = shift.startTime;
    row.insertCell(3).textContent = shift.endTime;
    row.insertCell(4).textContent = shift.hourlyWage;
    row.insertCell(5).textContent = shift.workplace;
    shift.profit = shift.calculateProfit();
    row.insertCell(6).textContent = shift.profit;

    row.addEventListener('click', () => {
        openModal(shift);
    });
}

function findRowByDate(date) {
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        const rowDate = rows[i].cells[1].textContent; 
        if (rowDate === date) {
            return rows[i];
        }
    }
    return null;
}


// [--------------------------- Load and display from LS ---------------------------]

function loadAndDisplayShifts() {
    const activeUser = LocalStorage.getActiveUser();
    const shifts = activeUser.shifts;

    if (shifts) {
        shifts.forEach((shiftData) => {
            const shift = new Shift(
                shiftData.shiftName,
                shiftData.date,
                shiftData.startTime,
                shiftData.endTime,
                shiftData.hourlyWage,
                shiftData.workplace
            );
            updateTable(shift);
        });
    }
}

function displayBestMonth() {
    const activeUser = LocalStorage.getActiveUser();
    const shifts = activeUser.shifts;

    if (shifts.length === 0) {
        const bestMonthField = document.getElementById('bestMonth');
        bestMonthField.innerText = "No shifts available";
        return;
    }

    const monthsAndYears = [];
    const profits = [];

    shifts.forEach((shift) => {
        let myDate = new Date(shift.date);
        let monthAndYear = `${myDate.getFullYear()}-${myDate.getMonth()}`;

        const index = monthsAndYears.indexOf(monthAndYear);
        if (index === -1) {
            monthsAndYears.push(monthAndYear);
            profits.push(shift.profit);
        } else {
            profits[index] += shift.profit;
        }
    });

    const bestIndex = profits.indexOf(Math.max(...profits));
    const bestProfit = profits[bestIndex];
    const bestMonthAndYear = monthsAndYears[bestIndex];
    const [bestYear, bestMonth] = bestMonthAndYear.split('-');
    const bestMonthField = document.getElementById('bestMonth');
    const spanElement = document.createElement('span');
    spanElement.classList.add('spanBestMonth');
    spanElement.innerText = `${getMonthName(parseInt(bestMonth))} ${bestYear} -> ${bestProfit} LEI`
    bestMonthField.innerText = `Most profitable month was: ` 
    bestMonthField.appendChild(spanElement);

}

function getMonthName(monthIndex) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
}
