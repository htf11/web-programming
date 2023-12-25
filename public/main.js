const form = document.querySelector("#form");
const elem = document.querySelectorAll(".checkout");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const tbody = document.querySelector("tbody");

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
      email: elem[1].value,
      phone: elem[2].value
    }
    CreateUser(data);
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

async function GetUsers() {
  const response = await fetch("/api/users", {
    method: "GET",
    headers: { "Accept": "application/json" }
  });
  if (response.ok === true) {
    const users = await response.json(); 
    users.forEach(user => {
      tbody.append(row(user));
    });
  }
}

async function CreateUser(data) {
  const response = await fetch("api/users", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (response.ok === true) {
      const user = await response.json();
      form.reset();
      tbody.append(row(user));
  }
}

function row(user) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", user._id);

  const idTd = document.createElement("td");
  idTd.append(user._id);
  tr.append(idTd);

  const nameTd = document.createElement("td");
  nameTd.append(user.name);
  tr.append(nameTd);

  const emailTd = document.createElement("td");
  emailTd.append(user.email);
  tr.append(emailTd);
  
  const phoneTd = document.createElement("td");
  phoneTd.append(user.phone);
  tr.append(phoneTd);

  const linkTd = document.createElement("td");
  const removeLink = document.createElement("button");
  removeLink.setAttribute("data-id", user._id);
  removeLink.append("Удалить");
  removeLink.addEventListener("click", e => {
    e.preventDefault();
    DeleteUser(user._id);
  });

  linkTd.append(removeLink);
  tr.appendChild(linkTd);
        
  return tr;
}

async function DeleteUser(id) {
  const response = await fetch("/api/users/" + id, {
      method: "DELETE",
      headers: { "Accept": "application/json" }
  });
  if (response.ok === true) {
      const user = await response.json();
      document.querySelector(`tr[data-id="${user._id}"]`).remove();
  }
}

GetUsers();