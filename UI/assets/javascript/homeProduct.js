/*-------------------
    render collectionProduct
--------------------- */
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

const collectionProduct = document.querySelector('#collectionProduct');

function renderCollectionPro() {
    let products = JSON.parse(localStorage.getItem('Products'));
    products = products.filter(item => item.category == 1);
    let stringHTML = ``;
    for (let i in products) {
        stringHTML +=
            `
            <div class="item">
                <div class="product_item ">
                    <div class="product_free">
                        <img src="/public/imgs/sale/newproduct.webp" alt=""
                            class="product_free-img">
                    </div>
                    <a onclick = "productDetails(${products[i].id})" class="product_item-img"
                        style="background-image: url(${products[i].image});"></a>
                    <div class="product_item-tocart">
                        <button onclick ="addToCart(${products[i].id})">Thêm nhanh vào giỏ</button>
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
    collectionProduct.innerHTML = stringHTML;
}

renderCollectionPro();

/*-------------------
    render sun Protection Shirt
--------------------- */

const sunProtectionShirt = document.querySelector('#sunProtectionShirt');

function renderSunProtectionShirt() {
    let products = JSON.parse(localStorage.getItem('Products'));
    products = products.filter(item => item.category == 2);
    let stringHTML = ``;
    for (let i = 0; i < products.length; i++) {
        stringHTML +=
            `
        <div class="col l-3 m-6 c-6">
        <div class="product_item ">
            <div class="product_free">
                <img src="/public/imgs/sale/newproduct.webp" alt=""
                    class="product_free-img">
            </div>
            <a onclick = "productDetails(${products[i].id})" class="product_item-img"
                style="background-image: url(${products[i].image});"></a>
            <div class="product_item-tocart">
                <button onclick ="addToCart(${products[i].id})">Thêm nhanh vào giỏ</button>
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
    sunProtectionShirt.innerHTML = stringHTML;
}

renderSunProtectionShirt();
/*-------------------
    render sun Protection Shirt
--------------------- */
const tShirtProduct = document.querySelector('#tShirtProduct');

function renderTShirtProducts() {
    let products = JSON.parse(localStorage.getItem('Products'));
    products = products.filter(item => item.category == 3);
    let stringHTML = ``;
    for (let i = 0; i < products.length - 3; i++) {
        stringHTML +=
            `
        <div class="col l-3 m-6 c-6">
        <div class="product_item ">
            <div class="product_free">
                <img src="/public/imgs/sale/newproduct.webp" alt=""
                    class="product_free-img">
            </div>
            <a productDetails(${products[i].id}) class="product_item-img"
                style="background-image: url(${products[i].image});"></a>
            <div class="product_item-tocart">
                <button onclick ="addToCart(${i})">Thêm nhanh vào giỏ</button>
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
    tShirtProduct.innerHTML = stringHTML;
}

renderTShirtProducts();


/*-------------------
    render clothes To Wear At Home
--------------------- */

const clothesToWearAtHome = document.querySelector('#clothesToWearAtHome');

function renderClothesToWearAtHome() {
    let products = JSON.parse(localStorage.getItem('Products'));
    products = products.filter(item => item.category == 4);
    let stringHTML = ``;
    for (let i = 0; i < products.length - 4; i++) {
        stringHTML +=
            `
        <div class="col l-3 m-6 c-6">
        <div class="product_item ">
            <div class="product_free">
                <img src="/public/imgs/sale/newproduct.webp" alt=""
                    class="product_free-img">
            </div>
            <a productDetails(${products[i].id}) class="product_item-img"
                style="background-image: url(${products[i].image});"></a>
            <div class="product_item-tocart">
                <button onclick ="addToCart(${products[i].id})">Thêm nhanh vào giỏ</button>
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
    clothesToWearAtHome.innerHTML = stringHTML;
}

renderClothesToWearAtHome();

/*-------------------
    link products Details
--------------------- */
function productDetails(id) {
    JSON.parse(localStorage.getItem('ProductDetails')) || {};
    let values = {
        productId: id,
    };
    localStorage.setItem('ProductDetails', JSON.stringify(values));
    window.location.href = "/UI/assets/pages/productDetails.html";
}
