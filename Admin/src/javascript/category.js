const modal = document.querySelector('#jsModal');
const btnAdd = document.querySelector('#btnAdd');
const formModal = document.querySelector('#formModal');
const cateName = document.querySelector('#name');
const cateTitle = document.querySelector('#cateTitle');
const tbodyCategories = document.querySelector('#categoryBody');
const errorName = document.querySelector('#errorName');
const btnCancel = document.querySelector('#btnCancel');
const btnSubmit = document.querySelector('#btnSubmit');
const pageList = document.getElementById('page-list');

let LOCAL_CATEGORY = 'categories';
let idUpdate = null;
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
    cateName.value = "";
    errorName.innerHTML = "";
    modal.classList.add('hidden');
    cateTitle.innerText = "Thêm danh mục sản phẩm";
    idUpdate = null;
    btnSubmit.innerText = "Thêm danh mục";
});

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idUpdate) {
        const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
        const cateCheck = checkErrors();
        if (!cateCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công danh mục sản phẩm",
                showConfirmButton: false,
                timer: 1500,
            })
        }
        const indexUpdate = categories.findIndex(index => index.id === idUpdate);
        categories[indexUpdate].name = cateName.value;
        localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(categories));
        btnCancel.click();
        idUpdate = null;
        render();
        return;
    }

    let id = 1;
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY)) || [];
    if (categories.length > 0) {
        id = categories[categories.length - 1].id + 1;
    }

    const cateCheck = checkErrors();
    if (!cateCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công danh mục sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const category = {
        id,
        name: cateName.value,
        status: true,
    };

    categories.push(category);
    localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(categories));
    cateName.value = "";
    modal.classList.add('hidden');
    render();
})


function render() {
    let realCategories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY)) || [];

    realCategories = realCategories.filter(category => category.name.toLowerCase().includes(textSearch));

    renderPagination(realCategories);
    renderCategories(realCategories);

}
render();

function renderPagination(categories) {

    totalPage = Math.ceil(categories.length / pageSize); //làm trên lên 
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

function renderCategories(categories) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > categories.length) {
        end = categories.length
    }
    for (let i = start; i < end; i++) {
        stringHTML +=
            `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${categories[i].name}</td>
            <td class="table-td">
                <button class="btn-active" onClick="changeStatus(${i})">${categories[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
            </td>
            <td class="table-td">
            <button class="icon-btn" onclick="updateCategory(${categories[i].id})">
            <i class="icon edit-icon fa-solid fa-file-pen"></i>
            </button>
            
                <button class="icon-btn" onclick="deleteCategory(${categories[i].id})">
                    <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                </button>
            </td>
        </tr>
        `
    }
    tbodyCategories.innerHTML = stringHTML;
};


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

function updateCategory(id) {
    idUpdate = id;
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
    const cateIndex = categories.findIndex(item => item.id === id);
    cateName.value = categories[cateIndex].name;
    modal.classList.remove('hidden');
    cateTitle.innerText = "Sửa danh mục sản phẩm";
    btnSubmit.innerText = "Sửa danh mục";
}


function deleteCategory(id) {
    const result = confirm(`Bạn có muốn xóa danh mục sản phẩm ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công danh mục sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
    const cateIndex = categories.findIndex(item => item.id === id);
    categories.splice(cateIndex, 1);
    localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(categories));
    render();
}

function changeStatus(i) {
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
    categories[i].status = !categories[i].status;
    localStorage.setItem(LOCAL_CATEGORY, JSON.stringify(categories));
    render();
}

function checkErrors() {
    resetShowError();
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY)) || [];
    let flag = true;
    let index = categories.findIndex(item => item.name === cateName.value);
    if (index !== -1) {
        flag = false;
        showError('errorName', "Tên danh mục đã tồn tại");
    }
    if (cateName.value === "") {
        flag = false;
        showError('errorName', "* Tên danh mục không được để trống");
    }
    return flag;
}

function showError(id, message) {
    let showMessage = document.getElementById(id);
    showMessage.innerText = message;
}

function resetShowError() {
    let resetError = document.querySelectorAll('.error-name');
    for (let i = 0; i < resetError.length; i++) {
        resetError[i].innerText = '';
    }
}