const modal = document.querySelector('#modalContent');
const btnRegister = document.querySelector('#btnRegister');
const btnClose = document.querySelector('#modalClose');
const showPass = document.querySelector('#show-pass');

const email = document.querySelector('#email');
const password = document.querySelector('#password');

let USER_LOCAL = 'user-data';
let USER_LOGIN = 'user-login';

btnRegister.addEventListener('click', function (e) {
    window.location.href = "register.html";
});

btnClose.addEventListener('click', function (e) {
    window.location.href = "home.html";
});

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


function showError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    parent.classList.add("error");
    small.textContent = message;
};

modal.addEventListener('submit', (e) => {
    e.preventDefault();

    const objUser = {
        email: email.value,
        password: password.value,
        status :true,
    };
    const listUser = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    const findUser = listUser.find(item =>
        item.email === objUser.email && item.password === objUser.password && item.status === objUser.status
    );

    if (objUser.email === "admin@gmail.com" && objUser.password === "admin") {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            text: "Chào mừng bạn đến với Trang quản trị Canifa",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "/Admin/Admin.html"));
        return;
    }

    if (!findUser) {
        showError(email, "Email hoặc mật khẩu không đúng");
        showError(password, "Email hoặc mật khẩu không đúng");
        Swal.fire({
            title: "Error!",
            text: "Đăng Nhập thất bại !!!",
            icon: "error",
            confirmButtonText: "Cancel",
        });
        return;
    } else {
        localStorage.setItem(USER_LOGIN, JSON.stringify(findUser));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng nhập thành công",
            text: "Chào mừng bạn đến với Canifa",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "home.html"));
    }
});




