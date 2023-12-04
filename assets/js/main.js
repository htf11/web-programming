const form = document.querySelector("#form");
const elem = document.querySelectorAll(".checkout");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

function checkform() {
  let valid = true;
  removeValidation();
  for (let i = 0; i < elem.length; i++) {
    if (elem[i].value.trim() === "") {
      valid = false;
      elem[i].setCustomValidity("Field is empty");
    }
  }
  if (validateEmail() === false) {
    valid = false;
  }
  if (validatePhone() === false) {
    valid = false;
  }
  if (valid) {
    let data = {
      firstName: elem[0].value,
      lastName: elem[1].value,
      company: elem[2].value,
      email: elem[3].value,
      country: document.getElementById("country").value,
      address: elem[4].value,
      town: elem[5].value,
      zip: elem[6].value,
      phone: elem[7].value,
      review: document.getElementById("review").value
    }
    fetch("/server", { 
      method: "POST", 
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .finally(() => alert("Данные успешно отправлены"))
    .then(response => response.text())
    .then(obj => console.log(obj))
  }
}

function removeValidation() {
  for (let i = 0; i < elem.length; i++) {
    elem[i].setCustomValidity("");
  }
}

function validateEmail() {
  const validateEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let mail = email.value;
  if (validateEmail.test(mail) == false) {
    email.setCustomValidity("Incorrect e-mail address");
    return false;
  }
}

function validatePhone() {
  const validateNumber = new RegExp("(\\+7)([0-9]){10}");
  let number = phone.value;
  if (validateNumber.test(number) == false) {
    phone.setCustomValidity("Incorrect phone format");
    return false;
  }
}
