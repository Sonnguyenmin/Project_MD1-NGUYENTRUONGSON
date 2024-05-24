const modal = document.querySelector('#jsModal');
const btnAdd = document.querySelector('#btnAdd');
const formModal = document.querySelector('#formModal');
const colorTitle = document.querySelector('#colorTitle');
const tbodyColors = document.querySelector('#colorsBody');
const errorName = document.querySelector('#errorName');
const btnCancel = document.querySelector('#btnCancel');
const btnSubmit = document.querySelector('#btnSubmit');

const colorName = document.querySelector('#nameColor');
const imageColorHTML = document.querySelector('#imgColor');


let imageBase64 = null;


const pageList = document.getElementById('page-list');

let LOCAL_COLORS = 'colors';
let colorFilter = "All";
let idUpdate = null;
let imagesBase64 = null;
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;
let checkImg = true;

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
    idUpdate = null;
    colorName.value = "";
    imageColorHTML.src = "";
    imageBase64 = null;
    errorName.innerHTML = "";
    modal.classList.add('hidden');
    colorTitle.innerText = "Thêm màu sắc";
    btnSubmit.innerText = "Thêm màu sắc";
});

formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idUpdate) {
        const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS));
        const colorCheck = checkErrors();
        if (!colorCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công màu sắc sản phẩm",
                showConfirmButton: false,
                timer: 1500,
            })
        }
        const indexUpdate = colors.findIndex(index => index.id === idUpdate);
        colors[indexUpdate].name = colorName.value;
        if (checkImg) {
            colors[indexUpdate].image = imageColorHTML.src;
        } else {
            colors[indexUpdate].image = imageBase64;
        }
        localStorage.setItem(LOCAL_COLORS, JSON.stringify(colors));
        btnCancel.click();
        idUpdate = null;
        render();
        return;
    }

    let id = 1;
    const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS)) || [];
    if (colors.length > 0) {
        id = colors[colors.length - 1].id + 1;
    }

    let colorCheck = checkErrors();
    if (!colorCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công màu sắc",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const color = {
        id,
        name: colorName.value,
        image: imageBase64,
        status: true,
    };
    colors.push(color);
    localStorage.setItem(LOCAL_COLORS, JSON.stringify(colors));
    e.target.reset();
    imageColorHTML.src = "";
    imageBase64 = null;
    modal.classList.add('hidden');
    render();
})


function convertToBase64() {
    checkImg = false;
    const fileInput = document.querySelector('#modalImg');
    const file = fileInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh
    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imageColorHTML.src = imageBase64;
    }
    reader.readAsDataURL(file);
}


function render() {
    let realColors = JSON.parse(localStorage.getItem(LOCAL_COLORS)) || [];

    realColors = realColors.filter(color => color.name.toLowerCase().includes(textSearch));
    renderPagination(realColors);
    renderColors(realColors);

}
render();

function renderPagination(colors) {

    totalPage = Math.ceil(colors.length / pageSize);
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

function renderColors(colors) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > colors.length) {
        end = colors.length
    }
    for (let i = start; i < end; i++) {
        stringHTML +=
            `
        <tr>
            <td class="table-td">${i + 1}</td>
            <td class="table-td">${colors[i].name}</td>
            <td class="table-th">
                <img class = "table-imgs" src="${colors[i].image}" alt="img">
            </td>
            <td class="table-th">
            <button class="btn-active" onClick="changeStatus(${i})">${colors[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
            </td>
            <td class="table-td">
                <button class="icon-btn" onclick="updateColor(${colors[i].id})">
                    <i class="icon edit-icon fa-solid fa-file-pen"></i>
                </button>
                
                <button class="icon-btn" onclick="deleteColor(${colors[i].id})">
                    <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                </button>
            </td>
        </tr>
        `
    }
    tbodyColors.innerHTML = stringHTML;
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

function updateColor(id) {
    idUpdate = id;
    const fileImg = document.querySelector('#modalImg');
    const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS));
    const colorIndex = colors.findIndex(item => item.id === id);
    colorName.value = colors[colorIndex].name;
    imageColorHTML.src = colors[colorIndex].image;
    fileImg.src = colors[colorIndex].image;
    modal.classList.remove('hidden');
    colorTitle.innerText = "Sửa kích thước";
    btnSubmit.innerText = "Sửa kích thước";
}


function deleteColor(id) {
    const result = confirm(`Bạn có muốn xóa màu sắc sản phẩm ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công màu sắc sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }


    const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS));
    const colorIndex = colors.findIndex(item => item.id === id);
    colors.splice(colorIndex, 1);
    localStorage.setItem(LOCAL_COLORS, JSON.stringify(colors));
    render();
}

function changeStatus(i) {
    const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS));
    colors[i].status = !colors[i].status;
    localStorage.setItem(LOCAL_COLORS, JSON.stringify(colors));
    render();
}

function checkErrors() {
    resetShowError();
    const fileInput = document.querySelector('#modalImg');
    const colors = JSON.parse(localStorage.getItem(LOCAL_COLORS)) || [];
    let flag = true;
    let index = colors.findIndex(item => item.name === colorName.value);
    if (index !== -1) {
        flag = false;
        showError('errorName', "Tên màu sắc đã tồn tại");
    }
    if (fileInput.value == "") {
        flag = false;
        showError('errorImage', "* Ảnh không được để trống");
    }
    if (colorName.value === "") {
        flag = false;
        showError('errorName', "* Tên màu sắc không được để trống");
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