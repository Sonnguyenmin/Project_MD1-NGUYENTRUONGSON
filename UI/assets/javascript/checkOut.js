function renderCart() {
    let cartBody = document.querySelector('#cartBody');
    let cartLists = JSON.parse(localStorage.getItem('AddToCart')) || [];
    let stringHTML = ``;
    for (let i in cartLists) {
        stringHTML +=
            `
            <tr class="checkout-tr">
                <td class="checkout-col">
                    <div class="checkout-info">
                        <div class="checkout-photo">
                            <a href="" class="checkout-photo-link">
                                <img src="${cartLists[i].image}" alt=""
                                    class="checkout-photo-img">
                            </a>
                        </div>
                        <div class="checkout-details">
                            <strong class="checkout-details-name">
                                ${cartLists[i].name}
                            </strong>
                            <div class="checkout-options">
                                <div class="checkout-options-group">
                                    <span class="checkout-options-color" style="background-image: url(${cartLists[i].color});">
                                    </span>
                                </div>
                                <div class="checkout-options-group">
                                    <span class="checkout-options-size">
                                        ${cartLists[i].size}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="checkout-col checkout-price">
                    <span class="checkout-price-span">
                        ${formatMoney(cartLists[i].price)}
                    </span>
                </td>
                <td class="checkout-col checkout-qty">
                    <span>
                        Số lượng : ${cartLists[i].qty}
                    </span>
                </td>
            </tr>
        </tr>
        `
    }
    cartBody.innerHTML = stringHTML;
}
renderCart();

function formatMoney(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
}

var cities = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
};
var promise = axios(Parameter);
promise.then(function (result) {
    renderCity(result.data);
});

function renderCity(data) {
    for (const x of data) {
        cities.options[cities.options.length] = new Option(x.Name, x.Id);
    }
    cities.onchange = function () {
        district.length = 1;
        ward.length = 1;
        if (this.value != "") {
            const result = data.filter(n => n.Id === this.value);

            for (const k of result[0].Districts) {
                district.options[district.options.length] = new Option(k.Name, k.Id);
            }
        }
    };
    district.onchange = function () {
        ward.length = 1;
        const dataCity = data.filter((n) => n.Id === cities.value);
        if (this.value != "") {
            const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

            for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, w.Id);
            }
        }
    };
}


function totalCountCart() {
    let total = 0;
    let count = 0;
    let totalPrice = document.querySelector('#totalPrice');
    let billCart = document.querySelector('#billCart');
    let totalCartProduct = document.querySelector('#totalCartProduct');
    let productCart = JSON.parse(localStorage.getItem('AddToCart')) || [];
    if (productCart.length > 0) {
        for (let i in productCart) {
            count++;
            total += productCart[i].qty * productCart[i].price;
        }
        totalPrice.innerHTML = formatMoney(total);
        billCart.innerHTML = formatMoney(total);
        totalCartProduct.innerHTML = count;
    }
}
totalCountCart();

function order() {
    const userLogin = JSON.parse(localStorage.getItem("user-login")) || [];
    const orders = JSON.parse(localStorage.getItem("Orders")) || [];
    if (!userLogin.id) {
        Swal.fire({
            title: "Error!",
            text: "Bạn chưa đăng nhập vui lòng đăng nhập !!!",
            icon: "error",
            confirmButtonText: "Cancel",
        }).then(() => (window.location.href = "../../login.html"));
        return;
    }
    let cities = document.querySelector("#city");
    let districts = document.querySelector("#district");
    let wards = document.querySelector("#ward");
    let telephone = document.querySelector('#telephone');
    let address = document.querySelector('#address');
    let nameUser = document.querySelector('#name');
    let emailUser = document.querySelector('#email');

    let indexCity = Array.from(cities.options).findIndex((e) => e.value === cities.value);
    let indexDistrict = Array.from(districts.options).findIndex((e) => e.value === districts.value);
    let indexWard = Array.from(wards.options).findIndex((e) => e.value === wards.value);


    nameUser.value = userLogin.name;
    emailUser.value = userLogin.email;

    const userInfo = {
        name: nameUser.value,
        email: emailUser.value,
        telephone: telephone.value,
        city: cities.options[indexCity].innerHTML,
        district: districts.options[indexDistrict].innerHTML,
        wards: wards.options[indexWard].innerHTML,
        address: address.value,
    };
    let isFormValid = true;

    if (!userInfo.name || !userInfo.email || !userInfo.telephone || !userInfo.city || !userInfo.district || !userInfo.wards || !userInfo.address) {
        isFormValid = false;
        Swal.fire({
            title: "Error!",
            text: "Vui lòng điền hết thông tin cá nhân",
            icon: "error",
            confirmButtonText: "Cancel",
        });
    }

    if (isFormValid) {
        let productCart = JSON.parse(localStorage.getItem('AddToCart'));
        const order = {
            ...userInfo,
            status: "Đang chờ Xác nhận",
            createdAt: orderDate(),
            products: productCart,
            total: totalCountCart(),
            userId: userLogin.id,
            id: orders.length + 1
        }
        orders.push(order)
        localStorage.setItem("Orders", JSON.stringify(orders));

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Bạn đã mua hàng thành công",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => (window.location.href = "/UI/assets/pages/FinishCart.html"));
        localStorage.removeItem('AddToCart');
    }
}


function orderDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedTime = dd + '/' + mm + '/' + yyyy;
    return formattedTime;
}
