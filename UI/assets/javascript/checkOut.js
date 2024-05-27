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
    let nameUser = document.querySelector('#name');
    let emailUser = document.querySelector('#email');
    let telephone = document.querySelector('#telephone');
    let address = document.querySelector('#address');

    nameUser.value = userLogin.name;
    emailUser.value = userLogin.email;
    // B1: điền hết thông tin
    const userInfo = {
        telephone: telephone.value,
        city: cities.value,
        district: districts.value,
        wards: wards.value,
        address: address.value,
    };
    console.log(userInfo);

    // B2: validation hết thông tin: cái nào thiếu thì báo thêm cho đủ hết
    // if (!name ||!telephone ||!email ||!city ||!district ||!wrad ||!address) {
    //     Swal.fire({
    //         title: "Error!",
    //         text: "Vui lòng điền đầy đủ thông tin",
    //         icon: "error",
    //         confirmButtonText: "Cancel",
    //     });
    //     return;
    // }
    // B3: sau khi mọi thứ đã có đủ
    // const order = {
    //     // ... toàn bộ thông tin người dùng nhập
    //     ...user,
    //     status: "Đang chờ",
    //     total,
    //     createdAt: "",
    // }
    // orders.push(order)
    // localStorage.setItem("Orders", JSON.stringify(orders))

    // alert("thanh toan thanh cong")

    // xóa hết các object có userId == userLogin.id trong local Addtocart

}

order();
