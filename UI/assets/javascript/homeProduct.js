/*-------------------
    render collectionProduct
--------------------- */
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function render() {
    let renderProducts = JSON.parse(localStorage.getItem('Products')) || [];
    renderCollectionPro(renderProducts);
    renderSunProtectionShirt(renderProducts);
    renderTShirtProducts(renderProducts);
    renderClothesToWearAtHome(renderProducts);
}
render();

function renderCollectionPro(products) {
    const collectionProduct = document.querySelector('#collectionProduct');
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

/*-------------------
    render sun Protection Shirt
--------------------- */
function renderSunProtectionShirt(products) {
    let sunProtectionShirt = document.querySelector('#sunProtectionShirt');
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
/*-------------------
    render sun Protection Shirt
--------------------- */

function renderTShirtProducts(products) {
    let tShirtProduct = document.querySelector('#tShirtProduct');
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
    tShirtProduct.innerHTML = stringHTML;
}

/*-------------------
    render clothes To Wear At Home
--------------------- */


function renderClothesToWearAtHome(products) {
    let clothesToWearAtHome = document.querySelector('#clothesToWearAtHome');
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
