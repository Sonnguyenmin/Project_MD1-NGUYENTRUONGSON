const tbodyUsers = document.querySelector('#usersBody');
const pageList = document.querySelector('#page-list');
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let userFilter = 'All';
let USER_LOCAL = 'user-data';

function render() {
    let realUsers = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    if (userFilter == "aToZ") {
        realUsers = realUsers.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        })
    }
    else if (userFilter == "zToA") {
        realUsers = realUsers.sort(function (a, b) {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x > y ? -1 : x < y ? 0 : 1;
        })
    }
    else if (userFilter == "STTAscending") {
        realUsers = realUsers.sort();
    }
    else if (userFilter == "STTDescending") {
        realUsers = realUsers.reverse();
    }
    else if (userFilter !== "All") {
        realUsers = realUsers.filter(
            (users) => users.name === userFilter
        );
    }
    realUsers = realUsers.filter(user => user.name.toLowerCase().includes(textSearch));
    renderPagination(realUsers);
    renderUsers(realUsers);
}

render();

function renderPagination(users) {
    totalPage = Math.ceil(users.length / pageSize);
    let stringHTML = ``;
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML += `
            <p class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</p>
            `
        }
        else {
            stringHTML += `
            <p class="pagination-p "onclick="clickPage(${i})">${i}</p>
            `
        }
    }
    pageList.innerHTML = stringHTML;
}

function renderUsers(users) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize;
    if (end > users.length) {
        end = users.length;
    }
    for (let i = start; i < end; i++) {
        if (users[i].email === "admin@gmail.com") {
            stringHTML += `
                        <tr>
                            <td class="table-td">${i + 1}</td>
                            <td class="table-td">${users[i].name}</td>
                            <td class="table-td">${users[i].email}</td>
                            <td class="table-td">${users[i].role}</td>
                            <td class="table-td"></td>
                        </tr>
                    `;
        } else {
            let index = getIndexById(users[i].id);
            stringHTML +=
                `
        <tr>
        <td class="table-td">${i + 1}</td>
        <td class="table-td">${users[i].name}</td>
        <td class="table-td">${users[i].email}</td>
        <td class="table-td">${users[i].role}</td>
        <td class="table-th">
        <button class="btn-active" onClick="changeStatus(${index})">${users[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
        </td>
    </tr>
        `;
        }
    }
    tbodyUsers.innerHTML = stringHTML;

}

function clickPage(i) {
    currentPage = i;
    render();
}

function changePage(status) {
    if (status === -1 && currentPage > 1) {
        currentPage -= 1;
    }
    if (status === 1 && currentPage < totalPage) {
        currentPage += 1;
    }
    render();
}

function changeUser(e) {
    userFilter = e.target.value;
    currentPage = 1;
    render();
}

function changePageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    render();
}

function changeNameSearch(e) {
    textSearch = e.target.value.toLowerCase();
    currentPage = 1;
}
function getIndexById(id) {
    let users = JSON.parse(localStorage.getItem(USER_LOCAL));
    return users.findIndex(item => item.id == id);
}

function changeStatus(i) {
    const users = JSON.parse(localStorage.getItem(USER_LOCAL));
    users[i].status = !users[i].status;
    localStorage.setItem(USER_LOCAL, JSON.stringify(users));
    render();
}
