var top_menu_swiper;
var image_view_swiper;

function initSwiper() {
    top_menu_swiper = new Swiper(".top_menu_Swiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        // observer: true,
        // observeParents: true,
        // updateOnWindowResize: true
    });

    image_view_swiper = new Swiper(".image_view_Swiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        // observer: true,
        // observeParents: true,
        // updateOnWindowResize: true
    });
}

// function handleResize() {
//     top_menu_swiper = new Swiper(".top_menu_Swiper", {
//         if (top_menu_swiper) {
//         top_menu_swiper.update(); 
//     }
//     });
// }

window.onload = initSwiper;
// window.onresize = handleResize;