const modal = document.querySelector('#jsModal');
const btnAdd = document.querySelector('#btnAdd');
const formModal = document.querySelector('#formModal');
const productListName = document.querySelector('#name');
const productListTitle = document.querySelector('#productListTitle');
const tbodyProductLists = document.querySelector('#productListBody');
const errorName = document.querySelector('#errorName');
const btnCancel = document.querySelector('#btnCancel');
const btnSubmit = document.querySelector('#btnSubmit');
const pageList = document.querySelector('#page-list');
const category = document.querySelector('#category');


let LOCAL_CATEGORY = 'categories';
let LOCAL_PRODUCT_LISTS = 'ProductLists';
let idUpdate = null;
let textSearch = "";
let pageSize = 5;
let totalPage = 1;
let currentPage = 1;

btnAdd.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

btnCancel.addEventListener('click', () => {
    productListName.value = "";
    errorName.innerHTML = "";
    modal.classList.add('hidden');
    productListTitle.innerText = "Thêm loại sản phẩm";
    idUpdate = null;
    btnSubmit.innerText = "Thêm loại sản phẩm";
});


function renderCategory(id) {
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

formModal.addEventListener('submit', (e) => {
    e.preventDefault();

    if (idUpdate) {
        const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS));
        const productType = {
            name: productListName.value,
            category: category.value,
            status: true,
        };
        const productListCheck = checkErrors(productType);
        if (!productListCheck) {
            return;
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công loại sản phẩm",
                showConfirmButton: false,
                timer: 1500,
            })
            const indexUpdate = productLists.findIndex(index => index.id === idUpdate);
            productLists[indexUpdate].name = productListName.value;
            productLists[indexUpdate].category = category.value;
            localStorage.setItem(LOCAL_PRODUCT_LISTS, JSON.stringify(productLists));
            btnCancel.click();
            idUpdate = null;
        }
        render();
        return;
    }
    //add
    let id = 1;
    const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS)) || [];
    if (productLists.length > 0) {
        id = productLists[productLists.length - 1].id + 1;
    }
    const productList = {
        id,
        name: productListName.value,
        category: category.value,
        status: true,
    };
    const productListCheck = checkErrors(productList);
    if (!productListCheck) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thêm thành công loại sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }

    productLists.push(productList);
    localStorage.setItem(LOCAL_PRODUCT_LISTS, JSON.stringify(productLists));
    productListName.value = "";
    modal.classList.add('hidden');
    render();
})


function render() {
    let realProductLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS)) || [];

    realProductLists = realProductLists.filter(productList => productList.name.toLowerCase().includes(textSearch));

    renderPagination(realProductLists);
    renderProductLists(realProductLists);

}
render();

function renderPagination(productLists) {

    totalPage = Math.ceil(productLists.length / pageSize); //làm trên lên 
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

function renderProductLists(productLists) {
    let stringHTML = ``;
    let start = (currentPage - 1) * pageSize;
    let end = start + pageSize
    if (end > productLists.length) {
        end = productLists.length
    }
    for (let i = start; i < end; i++) {
        let category = JSON.parse(localStorage.getItem(LOCAL_CATEGORY));
        let cateIndex = category.findIndex(item => item.id == productLists[i].category);
        stringHTML +=
            `
            <tr>
                <td class="table-td">${i + 1}</td>
                <td class="table-td">${productLists[i].name}</td>
                <td class="table-td">${category[cateIndex].name}</td>
                <td class="table-td">
                    <button class="btn-active" onClick="changeStatus(${i})">${productLists[i].status ? `<div class="block-active">Active</div>` : `<div class="block-none">Block</div>`}</button>
                </td>
                <td class="table-td">
                <button class="icon-btn" onclick="updateProductList(${productLists[i].id})">
                <i class="icon edit-icon fa-solid fa-file-pen"></i>
                </button>
                
                    <button class="icon-btn" onclick="deleteProductList(${productLists[i].id})">
                        <i class="icon delete-icon fa-solid fa-trash-can"></i>   
                    </button>
                </td>
            </tr>
            `
    }
    tbodyProductLists.innerHTML = stringHTML;
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

function updateProductList(id) {
    idUpdate = id;
    const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS));
    const productListIndex = productLists.findIndex(item => item.id === id);
    productListName.value = productLists[productListIndex].name;
    category.value = productLists[productListIndex].category;
    modal.classList.remove('hidden');
    productListTitle.innerText = "Sửa loại sản phẩm";
    btnSubmit.innerText = "Sửa loại sản phẩm";
}


function deleteProductList(id) {
    const result = confirm(`Bạn có muốn xóa loại sản phẩm ${id} này không ?`);
    if (!result) {
        return;
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Xóa thành công loại sản phẩm",
            showConfirmButton: false,
            timer: 1500,
        })
    }
    const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS));
    const productListIndex = productLists.findIndex(item => item.id === id);
    productLists.splice(productListIndex, 1);
    localStorage.setItem(LOCAL_PRODUCT_LISTS, JSON.stringify(productLists));
    render();
}

function checkErrors(data) {
    resetShowError();
    const productLists = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_LISTS)) || [];
    let flag = true;
    for (let i in productLists) {
        if (productLists[i].category == data.category && productLists[i].name == data.name) {
            showError('errorName', "Tên loại đã tồn tại");
            flag = false;
            break;
        }
    }
    if (data.name == "") {
        flag = false;
        showError('errorName', "* Tên loại không được để trống");
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