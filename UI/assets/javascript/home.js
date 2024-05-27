/*-------------------
    login/ resgiter home page
//     --------------------- */
let USER_LOGIN = 'user-login';
let USER_LOCAL = 'user-data';

const accountScope = document.getElementById('js-account-users');

function login() {
    window.location.href = "/UI/login.html";
}

function logout() {
    localStorage.removeItem(USER_LOGIN);
    render()
}

function render() {
    const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN)) || {};
    if (userLogin.id) {
        accountScope.innerHTML =
            `
            <div class="span_account-icon" onclick="logout()">     
                <span >Đăng xuất</span>
            </div>
        `
    } else {
        accountScope.innerHTML =
            `
            <div class="span_account-icon" onclick="login()">
                <span>Tài khoản</span>
            </div>
        `
    };
}
render();


function find() {
    let userData = JSON.parse(localStorage.getItem(USER_LOCAL)) || [];
    let admin = {
        id: 1,
        name: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
        status: true,
    }
    let admins = [];
    admins.push(admin);
    let userIdIndex = userData.findIndex(item => item.email === admin.email);
    if (userIdIndex === -1) {
        localStorage.setItem(USER_LOCAL, JSON.stringify(admins));
    } else {
        return;
    }
}
find();

/*-------------------
    add To Cart
--------------------- */

function addToCart(id) {
    const products = JSON.parse(localStorage.getItem('Products')) || [];
    const userLogin = JSON.parse(localStorage.getItem("user-login")) || []
    let productIndex = products.findIndex(item => item.id == id);
    let proAddToCart = JSON.parse(localStorage.getItem('AddToCart')) || [];
    let value = {
        id: (proAddToCart.length > 0) ? proAddToCart[proAddToCart.length - 1].id + 1 : 1,
        productId: id,
        name: products[productIndex].name,
        image: products[productIndex].image,
        color: products[productIndex].color,
        size: products[productIndex].size,
        price: +products[productIndex].price,
        qty: 1,
        userId: userLogin.id,
    };
    if (proAddToCart.length > 0) {
        let check = true;
        for (let i in proAddToCart) {
            if (proAddToCart[i].productId == id) {
                check = true;
                proAddToCart[i].qty += 1;
                localStorage.setItem('AddToCart', JSON.stringify(proAddToCart));
                break;
            }
            else {
                check = false;
            }

        }
        if (check == false) {
            proAddToCart.push(value);
            localStorage.setItem('AddToCart', JSON.stringify(proAddToCart));
        }
    } else {
        proAddToCart.push(value);
        localStorage.setItem('AddToCart', JSON.stringify(proAddToCart));
    }

    countCart();
    renderCart();
}

function countCart() {
    let count = 0;
    let countCart = document.querySelector('#countCart');
    let productCart = JSON.parse(localStorage.getItem('AddToCart')) || [];
    if (productCart.length > 0) {
        for (let i in productCart) {
            count++;
        }
        countCart.innerHTML = count;
    }
}

countCart();

function renderCart() {
    let noCart = document.querySelector('#noCart');
    let blockCart = document.querySelector('#blockCart');
    let totalCart = document.querySelector('#totalCart');
    // let blockCartBottom = document.querySelector('#blockCartBottom');
    let blockCartList = document.querySelector('#blockCartList');
    let productCart = JSON.parse(localStorage.getItem('AddToCart')) || [];
    let stringHTML = ``;
    let total = 0;
    if (productCart.length > 0) {
        blockCart.classList.remove('hidden');
        noCart.classList.add('hidden');
        for (let i in productCart) {
            stringHTML +=
                `
                <li class="h_blockcart-item">
                    <div class="h_blockcart-inner">
                        <a href="" class="h_blockcart-inner--img">
                            <img src="${productCart[i].image}" alt="">
                        </a>
                        <div class="h_blockcart-inner--content">
                            <div class="h_blockcart-inner--title">
                                <h5 class="h_blockcart-inner-head">
                                    ${productCart[i].name}
                                </h5>
                                <div class="h_blockcart-inner-close" onclick ="deleteCart(${productCart[i].id})">
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                            </div>
                            <div class="h_blockcart-inner--options">
                                <div class="h_blockcart-inner--select">
                                    <div class="h_blockcart-inner--color"
                                        style="background-image: url(${productCart[i].color});">
                                    </div>
                                    
                                </div>
                                <div class="h_blockcart-inner--value">
                                    <span>${productCart[i].size}</span>
                                </div>
                            </div>
                            <div class="h_blockcart-inner--total">
                                <div class="h_blockcart-inner--price">
                                    ${formatMoney(productCart[i].price)}
                                </div>
                                <div class="h_blockcart-inner--qty">
                                    <button onclick="changeCountMinus(${productCart[i].id},${productCart[i].qty - 1})" class="h_blockcart-inner-minus">
                                        <ion-icon name="remove-outline"></ion-icon>
                                    </button>
                                    
                                    <input type="number" min="1" class="h_blockcart-inner--input" value="${productCart[i].qty}">

                                    <button onclick="changeCountPlus(${productCart[i].id},${productCart[i].qty + 1})" class="h_blockcart-inner-plus">
                                        <ion-icon name="add-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `
            blockCartList.innerHTML = stringHTML;
            total += productCart[i].qty * productCart[i].price;
        }
        totalCart.innerText = formatMoney(total);
        return;
    } else {
        noCart.classList.remove('hidden');
        stringHTML += `
            <div class="h_blockcart-no-img">
                <img src="/public/imgs/sale/cart-empty.png" alt="">
            </div>
            <p class="h_blockcart-no-item">
                Hiện chưa có sản phẩm trong giỏ
            </p>
        `
        noCart.innerHTML = stringHTML;
        blockCartList.innerHTML = "";
        return;
    }
}
renderCart();
function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function deleteCart(id) {
    const productCarts = JSON.parse(localStorage.getItem('AddToCart'));
    let indexProCart = productCarts.findIndex(item => item.id == id);
    productCarts.splice(indexProCart, 1);
    localStorage.setItem('AddToCart', JSON.stringify(productCarts));
    renderCart();
    window.location.reload();
}

function changeCountPlus(id, qty) {
    const productCarts = JSON.parse(localStorage.getItem('AddToCart'));
    let index = productCarts.findIndex(item => item.id == id);
    productCarts[index].qty = qty;
    localStorage.setItem('AddToCart', JSON.stringify(productCarts));
    renderCart();
}

function changeCountMinus(id, qty) {
    if (qty >= 1) {
        const productCarts = JSON.parse(localStorage.getItem('AddToCart'));
        let index = productCarts.findIndex(item => item.id == id);
        productCarts[index].qty = qty;
        localStorage.setItem('AddToCart', JSON.stringify(productCarts));
        renderCart();
    }
}