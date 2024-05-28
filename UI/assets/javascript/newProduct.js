const productItem = document.querySelector('#productItem');
const pageList = document.querySelector('#page-list');
let LOCAL_PRODUCT = "Products";
let textSearch = "";
let pageSize = 12;
let totalPage = 1;
let currentPage = 1;
let value = "";


function render() {
    let realProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCT)) || [];

    realProducts = realProducts.filter(product => product.name.toLowerCase().includes(textSearch));

    if (value == "min") {
        realProducts = realProducts.filter(item => item.price < 200000);
    } else if (value == "between") {
        realProducts = realProducts.filter(item => item.price > 200000 && item.price < 500000);
    } else if (value == "max") {
        realProducts = realProducts.filter(item => item.price > 500000);
    } else if (value == "new") {
        realProducts = realProducts.reverse();
    }
    renderPagination(realProducts);
    renderProducts(realProducts);
}
render();

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

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
    let end = start + pageSize;
    if (end > products.length) {
        end = products.length
    }

    for (let i = start; i < end; i++) {
        stringHTML +=
            `
        <div class="col l-3 m-6 c-6">
            <div class="product_item ">
                <a onclick = "productDetails(${products[i].id})"class="product_item-img"
                    style="background-image: url(${products[i].image});">
                    </a>
                <div class="product_item-tocart">
                    <button onclick ="addToCart(${products[i].id})" >Thêm nhanh vào giỏ</button>
                </div>
                <div class="product_opsions">
                    <div class="product_select">
                        <div class="product_select-img"
                            style="background-image: url(${products[i].color});">
                        </div>
                    </div>
                    <div class="product_select-size">
                        Size: <span>${products[i].size}</span>
                    </div>
                    <a onclick = "productDetails(${products[i].id})" class="product_item-head">
                        ${products[i].name}
                    </a>
                    <div class="product_item-price">
                        ${formatMoney(products[i].price)}
                    </div>
                </div>
            </div>
        </div>
        `
    }
    productItem.innerHTML = stringHTML;
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

function productDetails(id) {
    JSON.parse(localStorage.getItem('ProductDetails')) || {};
    let values = {
        productId: id,
    };
    localStorage.setItem('ProductDetails', JSON.stringify(values));
    window.location.href = "/UI/assets/pages/productDetails.html";
}


// Lọc sản phẩm 

const formArrange = document.querySelector('#formArrange');

formArrange.addEventListener('change', (e) => {
    e.preventDefault();
    value = e.target.value;
    render();
})