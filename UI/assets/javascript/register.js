const modal = document.querySelector('#modalContent');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnClose = document.querySelector('#modalClose');
const cfPassword = document.querySelector('#confirmPass');

const showPass = document.querySelector('#show-pass');
const showCfPass = document.querySelector('#show-cfPass');

let USER_LOCAL = 'user-data';

showPass.addEventListener('click', () => {
    if (showPass.classList.contains("fa-eye")) {
        showPass.classList.remove("fa-eye");
        showPass.classList.add("fa-eye-slash");
        password.setAttribute("type", "text");
    } else {
        showPass.classList.remove("fa-eye-slash");
        showPass.classList.add("fa-eye");
        password.setAttribute("type", "password");
    }
});

showCfPass.addEventListener('click', () => {
    if (showCfPass.classList.contains("fa-eye")) {
        showCfPass.classList.remove("fa-eye");
        showCfPass.classList.add("fa-eye-slash");
        cfPassword.setAttribute("type", "text");
    } else {
        showCfPass.classList.remove("fa-eye-slash");
        showCfPass.classList.add("fa-eye");
        cfPassword.setAttribute("type", "password");
    }
});

btnClose.addEventListener('click', function (e) {
    window.location.href = "home.html";
});

function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add("error");
    small.textContent = message;
};

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.remove("error");

    small.textContent = '';
};

function checkEmptyError(listInput) {
    let checkEmpty = false;
    for (let i = 0; i < listInput.length; i++) {
        let input = listInput[i];
        input.value = input.value.trim(); //check ko dc để khoảng trống
        if (!input.value) {
            checkEmpty = true;
            showError(input, "* Không được để trống");
        }
        else {
            showSuccess(input);
        }
    }
    return checkEmpty;
};


function checkEmailError(email) {
    let regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    email.value = email.value.trim();
    let checkEmail = regexEmail.test(email.value);
    let users = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    if (users.length > 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email.value) {
                showError(email, "* Email đã tồn tại");
                return true;
            }
        }
    }
    if (checkEmail) {
        showSuccess(email);
        return false;

    } else if (email.value == "") {
        showError(email, "* Không được để trống");
        return true;
    }
    else {
        showError(email, "* Email sai định dạng");
        return true;
    }
};

function checkPassError(input, name, min, max) {
    input.value = input.value.trim();
    if (input.value.length == 0) {
        showError(input, "* Không được để trống");
        return true;
    } else if (input.value.length < min) {
        showError(input, `* ${name} không được nhỏ hơn ${min} ký tự`);
        return true;
    } else if (input.value.length > max) {
        showError(input, `* ${name} không được lớn hơn ${max} ký tự`);
        return true;
    } else {
        showSuccess(input);
        return false;
    }
};

function checkCfPass(password, cfPassword) {
    if (cfPassword.value == "") {
        showError(cfPassword, "* Không được để trống");
    } else if (password.value !== cfPassword.value) {
        showError(cfPassword, "* Mật khẩu không trùng khớp");
        return true;
    } else {
        showSuccess(cfPassword);
        return false;
    }
};

modal.addEventListener('submit', (event) => {
    event.preventDefault();

    let checkEmpty = checkEmptyError([fullName, email, password, cfPassword]);
    let checkEmail = checkEmailError(email);
    let checkUser = checkPassError(fullName, "Họ và tên", 6, 20);
    let checkPass = checkPassError(password, "Mật khẩu", 8, 20);
    let checkCf = checkCfPass(password, cfPassword);

    if (!checkEmpty && !checkEmail && !checkUser && !checkPass && !checkCf) {
        let id = 1;
        let status = true;
        let role = "user";
        let arrayUser = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
        if (arrayUser.length > 0) {
            id = arrayUser[arrayUser.length - 1].id + 1;
        };
        const objUsers = {
            id,
            name: fullName.value,
            email: email.value,
            password: password.value,
            status: status,
            role: role,

        };
        arrayUser.push(objUsers);
        localStorage.setItem(USER_LOCAL, JSON.stringify(arrayUser));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng ký thành công",
            text: "Chúc mừng bạn đã trở thành thành viên của chúng tôi",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "login.html"));
    } else {
        Swal.fire({
            title: "Error!",
            text: "Đăng ký thất bại !!!",
            icon: "error",
            confirmButtonText: "Cancel",
        });
    }
});




