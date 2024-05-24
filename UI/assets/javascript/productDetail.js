
const imgs = document.querySelectorAll('.img-select a');
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



/*list product */