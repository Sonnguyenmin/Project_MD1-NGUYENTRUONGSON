/*-------------------
    login/ resgiter home page
//     --------------------- */
let USER_LOGIN = 'user-login';
let USER_LOCAL = 'user-data';

const accountScope = document.getElementById('js-account-users');

function login() {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem(USER_LOGIN);
    render()
}



function render() {
    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN)) || {};
    if (userLogin.id) {
        accountScope.innerHTML =
            `
            <div class="span_account-icon" onclick="logout()">     
                <span >Đăng xuất</span>
            </div>
        `
    } else {
        accountScope.innerHTML =
            `
            <div class="span_account-icon" onclick="login()">
                <span>Tài khoản</span>
            </div>
        `
    };
}
render();


function find() {
    let userData = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    let admin = {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        status: true,
    }
    let admins = [];
    admins.push(admin);
    let userIdIndex = userData.findIndex(item => item.email === admin.email);
    if (userIdIndex === -1) {
        localStorage.setItem(USER_LOCAL, JSON.stringify(admins));
    } else {
        return;
    }
}
find();

/*-------------------
    Backup data
--------------------- */
