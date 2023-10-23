# Shift-builder

The main request is to develop an app that would allow an employee to keep track of his/her work hours and calculate how much money they should receive each month, according to the amount of work hours they worked.

# Extra functionalities

- Included field validations for both 'click' and 'input' listeners for the registration form

- On the 'Login-in form', included pop-ups for:
  $- either e-mail or password has no input
  $- wrong e-mail or password

- included navigation to 'Forgot password' form

- On the 'Forgot password form', included:
  $- pop-up for wrong e-mail
  $- navigation to register form
  $- password field validation on 'input'
  $- 'RESET' button to update the user's password

- Hide/show functionality for the input type 'password' fields

- Spinner with overlay included for:
  $- log-in
  $- add/edit shift
  $- edit profile

- Included dropdown for the user profile on click so that it can be used both desktop and mobile
  $- edit profile
  $- logout

- Updated the profile <Hello, 'username'> to <Hello, 'firstName'> due to the presentation feedback

- Footer contains only a copyright text

- Shifts logic:
  $- considered the 'Date' a key factor in updating the shifts and based on this for the 'Edit Shift' part, I've included a condition based on the 'Date' field of the shift.
  a) shift 'Date' field is updated => a new shift is added to the list
  b) any other shift field is updated => the selected shift is updated

- Shifts table:
  $- included vertical scrollbar at a certain 'vh'
  $- included horizontal scrollbar at a certain screen resolution

- Included 'monthly total amount' for profit due to presentation feedback

- Used a 'desktop to mobile' approach and the min-width is:
  $- 400px;
  $- 300px('My Shifts' page);

- included box-shadows for the authenticate forms to stand out a bit
- included box-shadows for pop-ups to make it clear and obvious for the user
