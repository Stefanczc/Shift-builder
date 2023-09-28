// Get the modal and buttons
const modal = document.getElementById('shiftModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');
const shiftForm = document.getElementById('shiftForm');

// Open the modal when the button is clicked
openModalBtn.addEventListener('click', (e) => {
    e.preventDefault()
    modal.style.display = 'block';
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when the user clicks anywhere outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Handle form submission
shiftForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Add your code to handle form submission (e.g., saving data)
    // You can access the form fields like this:
    const shiftName = document.getElementById('shiftName').value;
    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const workplace = document.getElementById('workplace').value;

    // You can then use these values to perform further actions
    console.log('Shift Name:', shiftName);
    console.log('Date:', date);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Hourly Wage:', hourlyWage);
    console.log('Workplace:', workplace);

    // Close the modal after submitting the form (you can modify this behavior)
    modal.style.display = 'none';
});
