const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//checking if input field has white space or is empty
function IsEmptyOrWhiteSpace(str) {
  return (str.match(/^\s*$/) || []).length > 0;
}

//checking if email is valid
function validateEmail(input) {
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (validEmail.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid!");
  }
}
//checking if passwords match
function matchPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match!");
  }
}
//show input error message
function showError(input, message) {
  //selects the input element
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
//checking username input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Selects the first letter of input and capitalizes it
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//checks if all inputs are not blank
function validateInput(inputArray) {
  inputArray.forEach((input) => {
    //checking for white space
    if (IsEmptyOrWhiteSpace(input.value)) {
      //displays error message
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//submits the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //validates all inputs that are being passed
  validateInput([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  validateEmail(email);
  matchPassword(password, password2);
  storeFormData();
});

//stores form data
function storeFormData() {
  userInfo = {
    name: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
  };
  console.log(userInfo);
}
