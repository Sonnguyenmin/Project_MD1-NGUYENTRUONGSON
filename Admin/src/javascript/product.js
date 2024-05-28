const modal = document.querySelector('#jsModal');
const formModal = document.querySelector('#formModal');
const btnAdd = document.querySelector('#btnAdd');
const btnCancel = document.querySelector('#btnCancel');
const btnSubmit = document.querySelector('#btnSubmit');

const imageProductHTML = document.querySelector('#imgProduct');
const imageColorHTML = document.querySelector('#imgColor');
const tbodyProduct = document.querySelector('#productBody');

const category = document.querySelector('#category');

const productName = document.querySelector('#name');
const productList = document.querySelector('#productList');
const size = document.querySelector('#size');
const price = document.querySelector('#price');
const quantity = document.querySelector('#quantity');
const description = document.querySelector('#description');
const material = document.querySelector('#material');
const manual = document.querySelector('#manual');

const productTitle = document.querySelector('#productTitle');
const LOCAL_PRODUCT = 'Products';
const LOCAL_PRODUCT_LIST = 'ProductLists';
const LOCAL_CATEGORY = 'categories';


const pageList = document.querySelector('#page-list');
let idUpdate = null;
let pageSize = 10;
let totalPage = 1;
let currentPage = 1;
let textSearch = "";
let productFilter = "All";
let imageBase64 = null;

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
    productName.value = "";
    productList.value = "";
    size.value = "";
    price.value = "";
    quantity.value = "";
    description.value = "";
    material.value = "";
    manual.value = "";
    errorName.innerHTML = "";
    modal.classList.add('hidden');
    productTitle.innerHTML = "Thêm sản phẩm";
    idUpdate = null;
    btnSubmit.innerHTML = "Thêm sản phẩm";

})

function renderCategory() {
    const categories = JSON.parse(localStorage.getItem(LOCAL_CATEGORY)) || [];
    let stringHTML = ``;
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].status) {
            stringHTML += `
            <option value="${categories[i].id}">${categories[i].name}
            </option>
            `
        }
    }
    category.innerHTML = stringHTML;
}
renderCategory();




function changeNameCategory(e) {
    let categoryId = e.target.value;
    const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LIST)) || [];
    let stringHTML = ``;
    for (let i = 0; i < productLists.length; i++) {
        if (productLists[i].category == categoryId) {
            stringHTML += `
            <option value="${productLists[i].id}">${productLists[i].name}
            </option>
            `
        }
    }
    productList.innerHTML = stringHTML;
}


formModal.addEventListener('submit', (e) => {
    e.preventDefault();

    if (idUpdate) {
        const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));
        const productEdit = {
            name: productName.value,
            productList: productList.value,
            size: size.value,
            color: imageColorHTML.src,
            price: +price.value,
            quantity: +quantity.value,
            description: description.value,
            image: imageProductHTML.src,
            material: material.value,
            manual: manual.value,
            status: true,
        };
        const productCheck = checkErrors(productEdit);
        if (!productCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công sản phẩm",
                showConfirmButton: false,
                timer: 1500,
            })
            const indexUpdate = products.findIndex(index => index.id === idUpdate);
            products[indexUpdate].name = productName.value;
            products[indexUpdate].productList = productList.value;
            products[indexUpdate].category = category.value;
            products[indexUpdate].size = size.value;
            products[indexUpdate].price = +price.value;
            products[indexUpdate].quantity = +quantity.value;
            products[indexUpdate].material = material.value;
            products[indexUpdate].manual = manual.value;
            products[indexUpdate].description = description.value;
            products[indexUpdate].color = imageColorHTML.src;
            products[indexUpdate].image = imageProductHTML.src;

            localStorage.setItem(LOCAL_PRODUCT, JSON.stringify(products));
            imageColorHTML.src = "";
            imageProductHTML.src = "";
            imageBase64 = null;
            btnCancel.click();
            modal.classList.add('hidden');
            idUpdate = null;
        }
        render();
        return;
    }



    let id = 1;
    const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT)) || [];
    if (products.length > 0) {
        id = products[products.length - 1].id + 1;
    }
    const product = {
        id,
        name: productName.value,
        productList: productList.value,
        category: category.value,
        size: size.value,
        color: imageColorHTML.src,
        price: +price.value,
        quantity: +quantity.value,
        description: description.value,
        image: imageProductHTML.src,
        material: material.value,
        manual: manual.value,
        status: true,
    }
    const productCheck = checkErrors(product);
    if (!productCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    products.push(product);
    localStorage.setItem(LOCAL_PRODUCT, JSON.stringify(products));
    e.target.reset();
    imageColorHTML.src = "";
    imageProductHTML.src = "";
    imageBase64 = null;
    modal.classList.add('hidden');
    render();
});


function convertToBase64() {
    const fileInput = document.getElementById('modalImg');
    const file = fileInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh
    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imageProductHTML.src = imageBase64;
    }
    reader.readAsDataURL(file);
};

function colorToBase64() {
    const colorInput = document.getElementById('colorImg');
    const file = colorInput.files[0];
    const reader = new FileReader(); //đọc data của 1 hình ảnh
    reader.onload = function (e) {
        const base64 = e.target.result;
        imageBase64 = base64;
        imageColorHTML.src = imageBase64;
    }
    reader.readAsDataURL(file);
}


function render() {
    let realProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCT)) || [];
    realProducts = realProducts.filter(product => product.name.toLowerCase().includes(textSearch));

    renderPagination(realProducts);
    renderProducts(realProducts);
}
render();

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

//B9 xem số page của trang quá page == 5
function renderPagination(products) {

    totalPage = Math.ceil(products.length / pageSize); //làm trên lên 
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

function renderProducts(products) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > products.length) {
        end = products.length
    }
    for (let i = start; i < end; i++) {
        let productList = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LIST));
        let indexProList = productList.findIndex(item => item.id == products[i].productList);

        let categoryList = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
        let indexCategory = categoryList.findIndex(item => item.id == products[i].category);
        stringHTML +=
            `
            <tr>
                <td class="table-td">${i + 1}</td>
                <td class="table-td" >${trimString(products[i].name, 18)}</td>
                <td class="table-td">${productList[indexProList].name}</td>
                <td class="table-td">${categoryList[indexCategory].name}</td>
                <td class="table-td">
                <img class = "color-imgs" src="${products[i].color}" alt="img">
                </td>
                <td class="table-td">${products[i].size}</td>
                <td class="table-td">${formatMoney(products[i].price)}</td>
                <td class="table-td">${products[i].quantity}</td>
                <td class="table-td">
                    <img class = "table-imgs" src="${products[i].image}" alt="img">
                </td>
                <td class="table-td">
                    <button class="btn-active" onClick="changeStatus(${i})">${products[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
                </td>
                <td class="table-td">
                    <button class= "icon-btn" onclick="updateProduct(${products[i].id})">
                        <i class="icon edit-icon fa-solid fa-file-pen"></i>
                    </button>
                    <button class="icon-btn" onclick="deleteProduct(${products[i].id})">
                        <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                    </button>
                </td>
            </tr>
        `
    }
    tbodyProduct.innerHTML = stringHTML;
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


function updateProduct(id) {
    idUpdate = id;
    const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));
    const productIndex = products.findIndex(item => item.id === id);
    productName.value = products[productIndex].name;
    productList.value = products[productIndex].productList;
    category.value = products[productIndex].category;
    size.value = products[productIndex].size;
    imageColorHTML.src = products[productIndex].color;
    price.value = products[productIndex].price;
    quantity.value = products[productIndex].quantity;
    description.value = products[productIndex].description;
    imageProductHTML.src = products[productIndex].image;
    material.value = products[productIndex].material;
    manual.value = products[productIndex].manual;
    modal.classList.remove('hidden');
    productTitle.innerText = "Sửa sản phẩm";
    btnSubmit.innerText = "Sửa sản phẩm";
}


function deleteProduct(id) {
    const result = confirm(`Bạn có muốn xóa sản phẩm ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }


    const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));
    const productIndex = products.findIndex(item => item.id === id);
    products.splice(productIndex, 1);
    localStorage.setItem(LOCAL_PRODUCT, JSON.stringify(products));
    render();
}

function changeStatus(i) {
    const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));
    products[i].status = !products[i].status;
    localStorage.setItem(LOCAL_PRODUCT, JSON.stringify(products));
    render();
}


function checkErrors(data) {
    resetShowError();
    const products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT)) || [];
    let flag = true;
    for (let i in products) {
        if (products[i].productList == data.productList && products[i].name == data.name) {
            showError('errorName', "Tên sản phẩm đã tồn tại");
            flag = false;
            break;
        }
    }
    if (data.name == "") {
        flag = false;
        showError('errorName', "* Tên sản phẩm không được để trống");
    }
    if (data.size == "") {
        flag = false;
        showError('errorSize', "* kích thước không được để trống");
    }
    if (data.price == "") {
        flag = false;
        showError('errorPrice', "* Giá không được để trống");
    }
    if (data.quantity == "") {
        flag = false;
        showError('errorQty', "* Số lượng không được để trống");
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

function trimString(string, length) {
    return string.length > length ?
        string.substring(0, length) + '...' :
        string;
};