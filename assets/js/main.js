function checkform() {
    const elem = document.querySelectorAll('.checkout');
    const validateName = new RegExp('[A-Z]([a-z]){1,}');
    const validateNumber = new RegExp('(\\+7)([0-9]){10}');
    elem.forEach(n => {
        if (n.value == '') {
            n.setCustomValidity("Field is empty");
        } else n.setCustomValidity("");
    });
    if (!validateName.test(elem[0].value)) {
        elem[0].setCustomValidity("Incorrect name format");
    } else elem[0].setCustomValidity("");
    if (!validateNumber.test(elem[7].value)) {
        elem[7].setCustomValidity("Incorrect number format");
    } else elem[7].setCustomValidity("");
    elem[3].addEventListener("input", function (event) {
        if (elem[3].validity.typeMismatch) {
            elem[3].setCustomValidity("It's not e-mail address!");
        } else {
            elem[3].setCustomValidity("");
        }
    });
}