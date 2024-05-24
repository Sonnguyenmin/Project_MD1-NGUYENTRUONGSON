const modal = document.querySelector('#jsModal');
const btnAdd = document.querySelector('#btnAdd');
const formModal = document.querySelector('#formModal');
const sizeName = document.querySelector('#nameSize');
const sizeTitle = document.querySelector('#sizeTitle');
const tbodySizes = document.querySelector('#sizesBody');
const errorName = document.querySelector('#errorName');
const btnCancel = document.querySelector('#btnCancel');
const btnSubmit = document.querySelector('#btnSubmit');
const pageList = document.getElementById('page-list');

let LOCAL_SIZE = 'sizes';
let idUpdate = null;
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
    sizeName.value = "";
    errorName.innerHTML = "";
    modal.classList.add('hidden');
    sizeTitle.innerText = "Thêm kích thước";
    idUpdate = null;
    btnSubmit.innerText = "Thêm kích thước";
});

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idUpdate) {
        const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE));
        const cateCheck = checkErrors();
        if (!cateCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công kích thước sản phẩm",
                showConfirmButton: false,
                timer: 1500,
            })
        }
        const indexUpdate = sizes.findIndex(index => index.id === idUpdate);
        sizes[indexUpdate].name = sizeName.value;
        localStorage.setItem(LOCAL_SIZE, JSON.stringify(sizes));
        btnCancel.click();
        idUpdate = null;
        render();
        return;
    }

    let id = 1;
    const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE)) || [];
    if (sizes.length > 0) {
        id = sizes[sizes.length - 1].id + 1;
    }

    let sizeCheck = checkErrors();
    if (!sizeCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công kích thước sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const size = {
        id,
        name: sizeName.value,
        status: true,
    };

    sizes.push(size);
    localStorage.setItem(LOCAL_SIZE, JSON.stringify(sizes));
    sizeName.value = "";
    modal.classList.add('hidden');
    render();
})


function render() {
    let realSizes = JSON.parse(localStorage.getItem(LOCAL_SIZE)) || [];

    realSizes = realSizes.filter(size => size.name.toLowerCase().includes(textSearch));

    renderPagination(realSizes);
    renderSizes(realSizes);

}
render();

function renderPagination(sizes) {

    totalPage = Math.ceil(sizes.length / pageSize);
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

function renderSizes(sizes) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > sizes.length) {
        end = sizes.length
    }
    for (let i = start; i < end; i++) {
        stringHTML +=
        `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${sizes[i].name}</td>
            <td class="table-th">
            <button class="btn-active" onClick="changeStatus(${i})">${sizes[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
            </td>
            <td class="table-td">
                <button class="icon-btn" onclick="updateSizes(${sizes[i].id})">
                    <i class="icon edit-icon fa-solid fa-file-pen"></i>
                </button>
                <button class="icon-btn" onclick="deleteSizes(${sizes[i].id})">
                    <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                </button>
            </td>
        </tr>
        `
    }
    tbodySizes.innerHTML = stringHTML;
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

function updateSizes(id) {
    idUpdate = id;
    const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE));
    const sizeIndex = sizes.findIndex(item => item.id === id);
    sizeName.value = sizes[sizeIndex].name;
    modal.classList.remove('hidden');
    sizeTitle.innerText = "Sửa kích thước";
    btnSubmit.innerText = "Sửa kích thước";
}


function deleteSizes(id) {
    const result = confirm(`Bạn có muốn xóa kích thước sản phẩm ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công kích thước sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE));
    const sizeIndex = sizes.findIndex(item => item.id === id);
    sizes.splice(sizeIndex, 1);
    localStorage.setItem(LOCAL_SIZE, JSON.stringify(sizes));
    render();
}

function changeStatus(i) {
    const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE));
    sizes[i].status = !sizes[i].status;
    localStorage.setItem(LOCAL_SIZE, JSON.stringify(sizes));
    render();
}

function checkErrors() {
    resetShowError();
    const sizes = JSON.parse(localStorage.getItem(LOCAL_SIZE)) || [];
    let flag = true;
    let index = sizes.findIndex(item => item.name === sizeName.value);
    if (index !== -1) {
        flag = false;
        showError('errorName', "Tên kích thước đã tồn tại");
    }
    if (sizeName.value === "") {
        flag = false;
        showError('errorName', "* Tên kích thước không được để trống");
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