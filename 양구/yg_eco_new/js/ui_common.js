//메인 풀페이지
$(function(){

    // var ww = $(window).width();
    // var mySwiper = undefined;

    // function initSwiper() {

    // if (/*ww >= 640 && */mySwiper == undefined) {
    //     mySwiper = new Swiper(".main_section.main_section", {
    //         speed: 500,
    //         direction: 'vertical',
    //         slidesPerView: 1,
    //         freeMode: true,
    //         mousewheel: true,
    //         touchRatio: 1,
    //         pagination: {
    //             el: '.main_sec_navi.swiper-pagination',
    //             clickable: true,
    //         },
    //         watchOverflow : true,
    //             on: {
    //                 slideChange: function() {
    //                     setTimeout(function () {
    //                     mySwiper.params.touchReleaseOnEdges = false;  
    //                     mySwiper.params.mousewheel.releaseOnEdges = false;
    //                     });
    //                 },
    //                 reachEnd: function() {
    //                     setTimeout(function () {
    //                         mySwiper.params.touchReleaseOnEdges = true;
    //                         mySwiper.params.mousewheel.releaseOnEdges = true;
    //                     }, 500);
    //                 },
    //                 reachBeginning: function() {
    //                     setTimeout(function () {
    //                         mySwiper.params.touchReleaseOnEdges = true;
    //                         mySwiper.params.mousewheel.releaseOnEdges = true;
    //                     }, 500);
    //                 }
    //         },
    //         breakpoints: {
    //             1200: {
    //                 freeMode: false,
    //                 // mousewheel: true,
    //                 touchRatio: 0,
    //             }
    //         }
    //     });
    //     // $("#footer").addClass("footer");
    //     }
    // }

    // initSwiper();

    // $(window).on('resize', function () {
    //     setTimeout(function(){
    //         ww = $(window).width();
    //         initSwiper();
    //     },15);
    // });

    var ww = $(window).width();
    var sw = 1400;
    var courseSwiper = undefined;
    var newsSwiper = undefined;
    var gallerySwiper = undefined;

    function initSwiper() {
        if (ww < sw && courseSwiper == undefined) {
            courseSwiper = new Swiper(".course_list.swiper", {
                loop: true,
                loopedSlides: 1,
                spaceBetween: 20,
                centeredSlides: true,
            });
            newsSwiper = new Swiper(".news_list.swiper", {
                loop: true,
                loopedSlides: 1,
                spaceBetween: 20,
                centeredSlides: true,
            });
            // gallery_list
            gallerySwiper = new Swiper(".gallery_list.swiper", {
                loop: true,
                loopedSlides: 1,
                spaceBetween: 20,
                centeredSlides: true,
                pagination: {
                    el: '.swiper-progress-custom',
                    type: 'progressbar'
                }
            });
        } else if (ww >= sw && courseSwiper != undefined) {
            courseSwiper.destroy();
            newsSwiper.destroy();
            gallerySwiper.destroy();
            courseSwiper = undefined;
            newsSwiper = undefined;
            gallerySwiper = undefined;
        }
    }
    initSwiper();
    $(window).on('resize', function () {
        ww = $(window).width();
        initSwiper();
    });
    
});


$(function() {
    let dH;
    if (document.querySelector('#header').classList.contains('m_on')) {
        dH = 70;
    } else {
        dH = document.body.offsetHeight - 150;
        window.addEventListener('resize', () => {
            dH = document.body.offsetHeight - 150;
        });
    }
    document.addEventListener('scroll', () => {
        if (window.scrollY > dH) {
            document.querySelector('header').classList.add('type_bg2');
        } else {
            document.querySelector('header').classList.remove('type_bg2');
        }
    });
    
    // aside close open
    document.querySelectorAll('.menu_trigger').forEach(($el) => {
        $el.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#side').classList.toggle('on');
        })
    });

    // aside menu event
    document.querySelectorAll('#side .gnbside > li > a').forEach((dep1) => {
        dep1.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#side .gnbside > li').forEach((dep1) => {
                dep1.classList.remove('on');
            });
            e.target.closest('li').classList.add('on');
        });
    });
    document.querySelectorAll('#side .depth1 > li > a.has_child').forEach((dep2) => {
        dep2.addEventListener('click', (e) => {
            e.preventDefault();
            e.target.closest('ul').querySelectorAll('li').forEach((dep2O) => {
                dep2O.classList.remove('on');
            })
            e.target.closest('li').classList.add('on');
        });
    });


    
    let i = 0;
    document.querySelectorAll('.focus_box').forEach(($el) => {
        $el.querySelectorAll('.focus_li').forEach(($el2) => {
            function eventAdd() {
                document.querySelectorAll('.focus_box').forEach(($el3) => {
                    $el3.classList.remove('on');
                });
                $el.classList.add('on');
                document.querySelector('#header').classList.remove('type_bg');
            }
            $el2.addEventListener('focus', () => {
                eventAdd();
            });
            $el2.addEventListener('mouseover', () => {
                eventAdd();
            });
            $el2.addEventListener('mouseout', () => {
                $el.classList.remove('on');
            });
        });
    });

    document.querySelectorAll('#header a').forEach(($el) => {
        $el.addEventListener('focus', () => {
            document.querySelector('#header').classList.add('type_bg');
        });
        $el.addEventListener('mouseout', () => {
            document.querySelector('#header').classList.remove('type_bg');
        });
    });

    document.querySelectorAll('#header .gnb a').forEach(($el) => {
        $el.addEventListener('focus', () => {
            document.querySelectorAll('#header .focus_bg').forEach(($el2) => {
                $el2.classList.remove('on');
            });
            $el.closest('.focus_bg').classList.add('on');
        });
        $el.addEventListener('mouseover', () => {
            document.querySelectorAll('#header .focus_bg').forEach(($el2) => {
                $el2.classList.remove('on');
            });
            $el.closest('.focus_bg').classList.add('on');
        });                         
    });

    document.querySelectorAll('#header .focus_bg').forEach(($el) => {
        $el.addEventListener('mouseover', () => {
            document.querySelectorAll('#header .focus_bg').forEach(($el2) => {
                $el2.classList.remove('on');
            });
            $el.closest('.focus_bg').classList.add('on');
        });                         
    });

    // 검색 레이어
    document.querySelectorAll('.sch_open').forEach(($el) => {
        $el.addEventListener('click', () => {
            document.querySelector('#sch_layer').classList.add('on');
            document.querySelector('#sch_layer .sch_close').focus();
        });
    });
    document.querySelectorAll('.sch_close').forEach(($el) => {
        $el.addEventListener('click', () => {
            document.querySelector('#sch_layer').classList.remove('on');
        });
    });

    document.querySelectorAll('.share_open').forEach(($el) => {
        $el.addEventListener('click', () => {
            document.querySelector('.share_layer').classList.add('show');
            document.querySelector('.share_layer .share_close').focus();
        });
    });
    document.querySelectorAll('.share_close').forEach(($el) => {
        $el.addEventListener('click', () => {
            document.querySelector('.share_layer').classList.remove('show');
            document.querySelector('.share_open').focus();
        });
    });

    // $('.gnb > li > a').on('mouseenter focus', function () {
	// 	$(this).parent().addClass('on').siblings().removeClass('on');
	// 	$('.gnb .depth1').show();
	// 	$('.gnb_mask').show();
	// });

	// $('#header').on('mouseleave', function () {
	// 	$('.gnb > li.on').removeClass('on');
	// 	$('.gnb .depth1').hide();
	// 	$('.gnb_mask').hide();
	// });
})