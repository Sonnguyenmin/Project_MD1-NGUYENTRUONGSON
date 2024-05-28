let LOCAL_ORDER = "Orders";
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
const tbodyOrders = document.querySelector('#orderBody');
const pageList = document.querySelector('#page-list');


function render() {
    let orders = JSON.parse(localStorage.getItem(LOCAL_ORDER)) || [];
    orders = orders.filter(order => order.name.toLowerCase().includes(textSearch));

    renderPagination(orders);
    renderOrder(orders);
}

render();


function renderPagination(orders) {

    totalPage = Math.ceil(orders.length / pageSize); //làm trên lên 
    let stringHTML = ""
    for (let i = 1; i <= totalPage; i++) {
        if (currentPage === i) {
            stringHTML += `
            <p class="pagination-p pagination-active" onclick="clickPage(${i})">${i}</p>
            `
        }
        else {
            stringHTML += `
            <p class="pagination-p " onclick="clickPage(${i})">${i}</p>
            `
        }
    }
    pageList.innerHTML = stringHTML;
}

function renderOrder(orders) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > orders.length) {
        end = orders.length
    }
    for (let i = start; i < end; i++) {
        stringHTML +=
            `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${orders[i].name}</td>
            <td class="table-td">${orders[i].telephone}</td>
            <td class="table-td">${orders[i].email}</td>
            <td class="table-td">${orders[i].address}</td>
            <td class="table-td">${orders[i].city}</td>
            <td class="table-td">${orders[i].district}</td>
            <td class="table-td">${orders[i].wards}</td>
            <td class="table-td">${orders[i].createdAt}</td>
            <td class="table-td">
                <button class="btn-active">${orders[i].status}</button>
            </td>
            <td class="table-td">
            <button class="icon-btn">
                 <i class="icon edit-icon fa-regular fa-eye"></i>
            </button>
            </td>
        </tr>
        `
    }
    tbodyOrders.innerHTML = stringHTML;
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

function changePageSize(e) {
    pageSize = e.target.value;
    currentPage = 1;
    render();
}

function changeNameSearch(e) {
    textSearch = e.target.value.toLowerCase();
    currentPage = 1;
}