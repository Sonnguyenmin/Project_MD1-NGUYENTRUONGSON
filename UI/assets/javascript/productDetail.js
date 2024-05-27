

/*list product */

const productDetailsList = document.querySelector('#productDetailsList');
const relatedProducts = document.querySelector('#relatedProducts');
let LOCAL_PRODUCT_DETAILS = 'ProductDetails';
let LOCAL_PRODUCT = 'Products';

const getProductDetails = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_DETAILS));
const getProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));

const ProductIndex = getProducts.findIndex(item => item.id == getProductDetails.productId);

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

function renderProductDetail() {
    let stringHTML = `
    <div class="col l-7 m-12 c-12">
        <div class="product-imgs">
            <div class="img-display">
                <div class="img-showcase">
                    <img src="${getProducts[ProductIndex].image}">
                    <img src="${getProducts[ProductIndex].image}">
                    <img src="${getProducts[ProductIndex].image}">
                    <img src="${getProducts[ProductIndex].image}">
                    <img src="${getProducts[ProductIndex].image}">

                </div>
            </div>
            <div class="img-select">
                <div class="img-item">
                    <p data-id="1">
                        <img src="${getProducts[ProductIndex].image}">
                    </p>
                </div>
                <div class="img-item">
                    <p  data-id="2">
                        <img src="${getProducts[ProductIndex].image}">
                    </p>
                </div>
                <div class="img-item">
                    <p data-id="3">
                        <img src="${getProducts[ProductIndex].image}">
                    </p>
                </div>
                <div class="img-item">
                    <p  data-id="4">
                        <img src="${getProducts[ProductIndex].image}">
                    </p>
                </div>
                <div class="img-item">
                    <p data-id="5">
                        <img src="${getProducts[ProductIndex].image}">
                    </p>
                </div>
            </div>
        </div>
        </div>
        <div class="col l-5 m-12 c-12">
        <div class="product-details-right">
            <div class="product-details-title">
                <div class="product-details-group">
                    <h2 class="product-details-title-head">
                    ${getProducts[ProductIndex].name}
                    </h2>
                    <div class="product-details-code">
                        Mã sp:
                        <span class="product-code-value">${getProducts[ProductIndex].id}</span>
                    </div>
                </div>
                <button class="product-details-title-heart"></button>
            </div>
            <div class="product-details-price">
                <div class="price-after">
                ${formatMoney(getProducts[ProductIndex].price)}
                </div>
            </div>
            <div class="product-details-freeship">
                <img src="/public/imgs/sale/free.webp" alt="" class="freeship-img">
            </div>
            <div class="product-swatch-options">
                <div class="product-swatch-attribute">
                    <span class="attribute-color">Màu sắc:</span>
                    <div class="swatch-color-inner">
                        <div class="swatch-color-item selected">
                            <div class="swatch-color-img"
                                style="background-image: url(${getProducts[ProductIndex].color});">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-swatch-attribute">
                    <span class="attribute-size">kích cỡ:</span>
                    <div class="swatch-size-inner">
                        <div class="swatch-size-item selected">
                            <div class="swatch-size-text">${getProducts[ProductIndex].size}</div>
                        </div>
                    </div>
                </div>
                <div class="product-swatch-btn">
                    <button class="product-swatch-bottom-check">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <div class="product-details-desc">
                <div class="details-desc-wrap ">
                    <div class="details-desc-list">
                        Mô tả
                    </div>
                    <div class="details-desc-content">
                        ${getProducts[ProductIndex].description}
                    </div>
                </div>
                <div class="details-desc-wrap ">
                    <div class="details-desc-list">
                        Chất liệu
                    </div>
                    <div class="details-desc-content">
                        ${getProducts[ProductIndex].material}
                    </div>
                </div>
                <div class="details-desc-wrap ">
                    <div class="details-desc-list">
                        Hướng dẫn sử dụng
                    </div>
                    <div class="details-desc-content">
                        ${getProducts[ProductIndex].manual}
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
    productDetailsList.innerHTML = stringHTML;

}
renderProductDetail();

/* relatedProducts*/

function renderRelatedProducts() {
    let productDetail = JSON.parse(localStorage.getItem(LOCAL_PRODUCT_DETAILS));
    let products = JSON.parse(localStorage.getItem(LOCAL_PRODUCT));
    let productDetailIndex = products.findIndex(item => item.id == productDetail.productId);
    products = products.filter(item => item.category == products[productDetailIndex].category);
    let stringHTML = ``;
    for (let i in products) {
        stringHTML +=
            `
            <div class="items">
                <div class="product_item ">
                    <div class="product_free">
                        <img src="/public/imgs/sale/newproduct.webp" alt="" class="product_free-img">
                    </div>
                    <a onclick = "productDetails(${products[i].id})" class="product_item-img"
                        style="background-image: url(${products[i].image});"></a>
                    <div class="product_item-tocart">
                        <button>Thêm nhanh vào giỏ</button>
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
    relatedProducts.innerHTML = stringHTML;
}

renderRelatedProducts();





const imgs = document.querySelectorAll('.img-select p');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
/*-------------------
    accordion details
    --------------------- */
$(document).ready(function () {
    $('.details-desc-wrap .details-desc-list').click(function () {
        $(this).next('.details-desc-content').slideToggle();
        $(this).parent().toggleClass('action');
    })
});