const body = document.querySelector("body"),
    sideBar = body.querySelector(".sidebar"),
    iconMenu = body.querySelector(".menu-icon"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".menu_content-mode"),
    modeText = body.querySelector(".menu_content-span");

iconMenu.addEventListener("click", () => {
    sideBar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("black");

    if (body.classList.contains("black")) {
        modeText.innerText = "Chế độ tối";
    } else {
        modeText.innerText = "Chế độ sáng";
    }
});
