function check() {
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const sub = document.getElementById('sub');
    const validateName = new RegExp('[A-Z]([a-z]){1,}');
    if (email.value == '') {
        email.setCustomValidity("Field email should not be empty");
    }
    if (username.value == '') {
        username.setCustomValidity("Field name should not be empty");
    }
    if (!validateName.test(username.value)) {
        username.setCustomValidity("Incorrect name format");
    } else username.setCustomValidity("");
    if (sub.value == '') {
        sub.setCustomValidity("Field sub should not be empty");
    } else sub.setCustomValidity("");
}

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("It's not e-mail address!");
    } else {
        email.setCustomValidity("");
    }
});