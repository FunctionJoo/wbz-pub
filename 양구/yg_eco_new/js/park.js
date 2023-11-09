$(function(){
  var swiper = new Swiper(".info_slide .swiper_area", {
    slidesPerView: 1,
    spaceBetween: 40,
    watchOverflow: false,
    navigation: {
      nextEl: ".info_slide .swiper-button-next",
      prevEl: ".info_slide .swiper-button-prev",
    },
    pagination: {
      el: ".info_slide .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      360: {
        slidesPerView: 1,
      },
      1400: {
        slidesPerView: 2,
      }
    }
  });
  let info = document.querySelector('.swiper-slide');
    let summer_info = $(info).hasClass('summer_info');
    if (summer_info){
      swiper = new Swiper(".info_slide .swiper_area", {
        slidesPerView: 1,
        spaceBetween: 40,
        watchOverflow: false,
        navigation: {
          nextEl: ".info_slide .swiper-button-next",
          prevEl: ".info_slide .swiper-button-prev",
        },
        pagination: {
          el: ".info_slide .swiper-pagination",
          clickable: true,
        }
      });
    }

  swiper = new Swiper(".bg_slide_wrap .swiper_area", {
    slidesPerView: 2,
    spaceBetween: 40,
    watchOverflow: false,
    navigation: {
      nextEl: ".bg_slide_wrap .swiper-button-next",
      prevEl: ".bg_slide_wrap .swiper-button-prev",
    },
    breakpoints: {
      360: {
        spaceBetween: 16
      }
    }
  });
});

