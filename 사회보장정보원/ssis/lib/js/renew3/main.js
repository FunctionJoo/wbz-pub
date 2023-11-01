window.addEventListener("DOMContentLoaded", (event) => {
	// header focus
	$('a, button').focus(function() {
		if ($(this).closest('#header_new')[0] == undefined) {
			$('#header_new').removeClass('in_focus');
		} else {
			$('#header_new').addClass('in_focus');
		}
	});
	$('#header_new').mouseleave(function() {
		$('#header_new').removeClass('in_focus');
	});

	$('#gnb_new a').blur(function() {
		if ($(this).closest('.dep1').hasClass('focus')) {
			return false;
		} else {
			$('.focus').find('.dep2_wrap').height(0);
			$('.focus').removeClass('focus');
			$(this).closest('.dep1').addClass('focus');
			$(this).closest('li').find('.dep2_wrap').height($(this).closest('li').find('.dep2').height());
		}
	});
	$('#gnb_new a').focus(function() {
		if ($(this).closest('.dep1').hasClass('focus')) {
			return false;
		} else {
			$('.focus').find('.dep2_wrap').height(0);
			$('.focus').removeClass('focus');
			$(this).closest('.dep1').addClass('focus');
			$(this).closest('li').find('.dep2_wrap').height($(this).closest('li').find('.dep2').height());
		}
	});
	$('#gnb_new > ul > li').mouseover(function() {
		if ($(this).closest('.dep1').hasClass('focus')) {
			return false;
		} else {
			$('.focus').find('.dep2_wrap').height(0);
			$('.focus').removeClass('focus');
			$(this).closest('.dep1').addClass('focus');
			$(this).closest('li').find('.dep2_wrap').height($(this).closest('li').find('.dep2').height());
		}
	});
	$('.logo, .zoomArea_new').mouseover(function() {
		$('.focus').find('.dep2_wrap').height(0);
		$('.focus').removeClass('focus');
	});
	$('.logo, .zoomArea_new a, .zoomArea_new button').focus(function() {
		$('.focus').find('.dep2_wrap').height(0);
		$('.focus').removeClass('focus');
	});
	$('#header_new').mouseleave(function() {
		$('.focus').find('.dep2_wrap').height(0);
		$('.focus').removeClass('focus');
	});

	// quick
	$('.quick_open').click(function() {
		if ($('#float_menu').hasClass('qto')) {
			$('.qto').removeClass('qto');
		} else {
			$('#float_menu').addClass('qto');
		}
	});

	$('#sitemap-wrap h3').click(function() {
		$('#sitemap-wrap .sitemap-box-inner .area.clearfix').removeClass('on');
		$(this).closest('.area.clearfix').addClass('on');
	});

	// fullpage
	$('#fullpage').fullpage({
		sectionSelector: 'section',
		anchors: ['firstPage', 'secondPage', '3rdPage','footerPage'],
		menu: '#fullmenu',
		responsiveWidth:1400,
		responsiveHeight:900,
		recordHistory: true,
		animateAnchor: false,
		onLeave: function(anchorLink, index) {
			$('#fullmenu li').removeClass('on');
			$('#fullmenu li').eq(index - 1).addClass('on');
			if (index == 1) {
				$('#fullmenu').addClass('is_first');
				$('#header_new').addClass('is_first');
				document.querySelectorAll('video').forEach((el) => {
					el.play();
				});
			} else {
				$('#fullmenu').removeClass('is_first');
				$('#header_new').removeClass('is_first');
			}

			if (index == 4) {
				$('#float_menu').addClass('is_end');
			} else {
				$('#float_menu').removeClass('is_end');
			}
		},
		afterRender: function() {
			mainEventInit();
		},
		afterResponsive: function(isResponsive){
		}
	});
});












function mainEventInit () {
	// 메인 슬라이드 이벤트
	const swipermv = new Swiper('.main_visual_bg .swiper', {
		loop: true,
		effect: 'fade',
		allowTouchMove: false,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.main_visual_bg .mv_r',
			prevEl: '.main_visual_bg .mv_l',
		},
	});
	document.querySelector('.mv_control .mv_s').addEventListener('click', (e) => {
		let btn = e.target;
		if (btn.classList.contains('is_stop')) {
			btn.classList.remove('is_stop');
			swipermv.autoplay.start();
		} else {
			btn.classList.add('is_stop');
			swipermv.autoplay.stop();
		}
	});

	// 메인 슬라이드 이벤트 2
	const swiperat = new Swiper('.main_article_slide .swiper', {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.main_article_slide .ma_r',
			prevEl: '.main_article_slide .ma_l',
		},
		pagination: {
			el: '.main_article_slide .ma_pg',
			type: 'fraction'
		},
		breakpoints: {
			// when window width is >= 320px
			700: {
				slidesPerView: 2,
			},
			1000: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 'auto',
			},
		}
	});
	document.querySelector('.ma_control .ma_s').addEventListener('click', (e) => {
		let btn = e.target;
		if (btn.classList.contains('is_stop')) {
			btn.classList.remove('is_stop');
			swiperat.autoplay.start();
		} else {
			btn.classList.add('is_stop');
			swiperat.autoplay.stop();
		}
	});

	const swipermib = new Swiper('.main_image_board.swiper', {
		slidesPerView: 'auto',
		spaceBetween: 16,
	});

	const swipermab = new Swiper('.main_article_board.swiper', {
		slidesPerView: 'auto',
		spaceBetween: 16,
	});

	// 공지사항 영역 이벤트
	function mnEvt(el) {
		document.querySelectorAll('.main_notice_board > ul > li').forEach((li) => {
			li.classList.remove('on');
		});
		el.closest('li').classList.add('on');
	}
	document.querySelectorAll('.main_notice_board .tab_n_more button').forEach((el) => {
		el.addEventListener('click', function() {
			mnEvt(el);
		});
		el.addEventListener('focus', function() {
			mnEvt(el);
		});
	});

	// 3P 포털 링크
	const swipermm = new Swiper('.swipe_menu .swiper', {
		// loop: true,
		slidesPerView: 'auto',
		freeMode: true,
		navigation: {
			nextEl: '.swipe_menu .sm_r',
			prevEl: '.swipe_menu .sm_l',
		},
		breakpoints: {
			1400: {
				slidesPerView: 8,
			},
		}
	});

	// 주요 포털 사이트
	// const swiperps = new Swiper('.main_portal_slide .swiper', {

	// });

	document.querySelectorAll('.mps_li').forEach((el) => {
		el.addEventListener('mouseover', () => {
			if (el.classList.contains('mps_active')) {
				return false;
			} else {
				document.querySelector('.mps_active').classList.remove('mps_active');
				el.classList.add('mps_active');
			}
		})
	});

	// let mpsLen = document.querySelectorAll('.mps_wrap .mps_li').length;
	// let mpsBtnWrap = document.querySelector('.mps_control');
	// let lastidx = 0;
	// for (let i=0;i<mpsLen;i++) {
	// 	mpsBtnWrap.insertAdjacentHTML('beforeend' ,`
	// 		<button type="button" data-idx="${i}" class="mps_bul mpsb_${i}">${i}번째 슬라이드 이동</button>
	// 	`);
	// };
	// document.querySelectorAll('.mps_bul').forEach((el, idx_l) => {
	// 	if (idx_l == 0) {
	// 		el.classList.add('is_act');
	// 	}
	// 	el.addEventListener('click', function() {
	// 		let idx = Number(el.dataset.idx);
	// 		if (lastidx == idx) {
	// 			return false;
	// 		}
	// 		lastidx = idx;
	// 		document.querySelectorAll('.mps_li').forEach((el2, idx2) => {
	// 			if (idx2 == idx) {
	// 				document.querySelectorAll('.mps_bul')[idx2].classList.add('is_act');
	// 				el2.classList.add('mps_active');
	// 			} else {
	// 				document.querySelectorAll('.mps_bul')[idx2].classList.remove('is_act');
	// 				el2.classList.remove('mps_active');
	// 			}
	// 		});
	// 	});
	// });



	// 알림존
	const swipermn = new Swiper('.main_notice_slide .swiper', {
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.mn_control .mn_r',
			prevEl: '.mn_control .mn_l',
		},
	});
	document.querySelector('.mn_control .mn_s').addEventListener('click', (e) => {
		let btn = e.target;
		if (btn.classList.contains('is_stop')) {
			btn.classList.remove('is_stop');
			swipermn.autoplay.start();
		} else {
			btn.classList.add('is_stop');
			swipermn.autoplay.stop();
		}
	});

	// 알림존
	const swiperft = new Swiper('.footer_top .swiper', {
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.ft_control .ft_r',
			prevEl: '.ft_control .ft_l',
		},
		breakpoints: {
			1400: {
				slidesPerView: 5,
			},
		}
	});
	document.querySelector('.ft_control .ft_s').addEventListener('click', (e) => {
		let btn = e.target;
		if (btn.classList.contains('is_stop')) {
			btn.classList.remove('is_stop');
			swiperft.autoplay.start();
		} else {
			btn.classList.add('is_stop');
			swiperft.autoplay.stop();
		}
	});
}