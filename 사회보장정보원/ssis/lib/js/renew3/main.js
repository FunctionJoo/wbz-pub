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

	// footer
	if (document.querySelector('.footer_top .swiper-wrapper')) {
		let ftWrap = document.querySelector('.footer_top .swiper-wrapper');
		let ftSlides = ftWrap.querySelectorAll('.swiper-slide');
		let ftMinCount = 24;
		function ftCopyEl() {
			ftSlides.forEach((el) => {
				const el2 = el.cloneNode(true);
				el2.querySelector('a').tabIndex = -1;
				ftWrap.append(el2);
			});
		}
		if (ftSlides.length < ftMinCount) {
			ftCopyEl();
			ftCopyEl();
		}
	
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

	// 硫붿씤 �섏씠吏��� 寃쎌슦
	if ($('#fullpage').length >= 1) {
		mainEventInit();

		/* // wbz20231127 */
		document.querySelectorAll('video').forEach((el) => {
			el.setAttribute("playsinline", true);
			el.play();
		});

		window.addEventListener('scroll', (e) => {
			let anchorTarget = []
			if (window.scrollY > 50) {
				$('#header_new').removeClass('is_first');
				$('#fullmenu').removeClass('is_first');
				$('#float_menu').addClass('visible');
				$('#float_menu').addClass('visible-z');
			} else {
				$('#header_new').addClass('is_first');
				$('#fullmenu').addClass('is_first');
				$('#float_menu').removeClass('visible');
				setTimeout(function() {$('#float_menu').removeClass('visible-z');}, 300);
			}

			let floatSpace;
			if (window.innerWidth > 1400) {
				floatSpace = $('#footer_new').height() - 50;
			} else {
				floatSpace = $('#footer_new').height();
			}
			let bodyHeight = $('body').height() - floatSpace - window.innerHeight;
			if (window.scrollY > bodyHeight) {
				$('#float_menu').addClass('footer-close');
				$('#float_menu').css({'bottom': floatSpace+'px'})
			} else {
				$('#float_menu').removeClass('footer-close');
				$('#float_menu').attr('style', '');
			}

			if (document.querySelector('#fullmenu')) {
				document.querySelectorAll('#fullmenu a').forEach((el, idx) => {
					anchorTarget[idx] = document.querySelector(el.dataset.href).offsetTop;
				});
				let minusHeight = 100;
				if (window.scrollY < anchorTarget[1]) {
					document.querySelector('#fullmenu li.on').classList.remove('on');
					document.querySelectorAll('#fullmenu li')[0].classList.add('on');
				} else if (window.scrollY > anchorTarget[2] - minusHeight) {
					document.querySelector('#fullmenu li.on').classList.remove('on');
					document.querySelectorAll('#fullmenu li')[2].classList.add('on');
				} else if (window.scrollY > anchorTarget[1] - minusHeight) {
					document.querySelector('#fullmenu li.on').classList.remove('on');
					document.querySelectorAll('#fullmenu li')[1].classList.add('on');
				} else {
					console.log('scroll error');
				}
			}
		});

		document.querySelectorAll('#fullmenu a').forEach((el) => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				// console.log(document.querySelector(el.dataset.href).getBoundingClientRect().top + window.pageYOffset);
				window.scrollTo({
					top: document.querySelector(el.dataset.href).offsetTop,
					behavior: "smooth",
				});
			});
		});
	}

	// $('#sitemap-wrap h3').click(function() {
	// 	$('#sitemap-wrap .sitemap-box-inner .area.clearfix').removeClass('on');
	// 	$(this).closest('.area.clearfix').addClass('on');
	// });

	// fullpage
// 	$('#fullpage').fullpage({
// 		sectionSelector: 'section',
// 		anchors: ['firstPage', 'secondPage', '3rdPage','footerPage'],
// 		menu: '#fullmenu',
// 		responsiveWidth:1400,
// 		responsiveHeight:900,
// 		recordHistory: true,
// 		animateAnchor: false,
// 		onLeave: function(anchorLink, index) {
// 			$('#fullmenu li').removeClass('on');
// 			$('#fullmenu li').eq(index - 1).addClass('on');
// 			if (index == 1) {
// 				$('#fullmenu').addClass('is_first');
// 				$('#header_new').addClass('is_first');
// 				document.querySelectorAll('video').forEach((el) => {
// 					el.play();
// 				});
// 			} else {
// 				$('#fullmenu').removeClass('is_first');
// 				$('#header_new').removeClass('is_first');
// 			}

// 			if (index == 4) {
// 				$('#float_menu').addClass('is_end');
// 			} else {
// 				$('#float_menu').removeClass('is_end');
// 			}
// 		},
// 		afterRender: function() {
// 			mainEventInit();
// 		},
// 		afterResponsive: function(isResponsive){
// 		}
// 	});
});












function mainEventInit () {
	document.querySelector('.main_scroll_down').addEventListener('click', function() {
		window.scroll({
			top: document.querySelector('#firstPage').clientHeight,
			behavior: 'smooth'
		})
	});

	// 硫붿씤 �щ씪�대뱶 �대깽��
	const swipermv = new Swiper('.main_visual_bg .swiper', {
		loop: true,
		effect: 'fade',
		allowTouchMove: false,
		autoplay: {
			delay: 5000,	/* 20231213 怨좉컼 �붿껌�쇰줈 硫붿씤而⑦뀗痢� 9.2珥덉뿉�� 5珥덈줈 蹂�寃� */
			disableOnInteraction: false,
		},
		// Navigation arrows
		navigation: {
			nextEl: '.main_visual_bg .mv_r',
			prevEl: '.main_visual_bg .mv_l',
		},
		/* // wbz20231127 */
		on: {
			init : function(swiper) {
				if (document.querySelector('.main_article_slide')) {
					var videoChk = $(swiper.visibleSlides).find('video');
					if (videoChk.length == 0) {
						//硫붿씤 諛곌꼍�� 鍮꾨뵒�ㅽ��낆씠 �꾨땺 寃쎌슦 �덉냼�� �쒖떆
						document.querySelector('.main_article_slide').classList.add('visible-z');
						document.querySelector('.main_article_slide').classList.add('visible');
					} else {
						//硫붿씤 諛곌꼍�� 鍮꾨뵒�ㅽ��낆씪 寃쎌슦 �덉냼�� �④린湲�
						document.querySelector('.main_article_slide').classList.remove('visible');
					}
				}
			},
			slideChangeTransitionStart: function(swiper) {
				if (document.querySelector('.main_article_slide')) {
					var videoChk = $(swiper.visibleSlides).find('video');
					if (videoChk.length == 0) {
						//硫붿씤 諛곌꼍�� 鍮꾨뵒�ㅽ��낆씠 �꾨땺 寃쎌슦 �덉냼�� �쒖떆
						document.querySelector('.main_article_slide').classList.add('visible-z');
						document.querySelector('.main_article_slide').classList.add('visible');
					} else {
						//硫붿씤 諛곌꼍�� 鍮꾨뵒�ㅽ��낆씪 寃쎌슦 �덉냼�� �④린湲�
						document.querySelector('.main_article_slide').classList.remove('visible');
					}
				}
			},
			slideChangeTransitionEnd: function(swiper) {
				// wbz20231206
				if (swiper.realIndex != 0) {
					swiper.autoplay.stop();
				}
				if (document.querySelector('.main_article_slide')) {
					var videoChk = $(swiper.visibleSlides).find('video');
					
					if (videoChk.length != 0) {
						document.querySelector('.main_article_slide').classList.remove('visible-z');
					}
				}
			}
		}
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

	// 硫붿씤 �щ씪�대뱶 �대깽�� 2
	if (document.querySelector('.main_article_slide')) {
		let smWrapMas = document.querySelector('.main_article_slide .swiper-wrapper');
		let smSlidesMas = smWrapMas.querySelectorAll('.swiper-slide');
		let smMinCountMas = 20;
		let copyWork = false;
		function smCopyElMas() {
			smSlidesMas.forEach((el) => {
				const el2 = el.cloneNode(true);
				el2.querySelector('a').tabIndex = -1;
				// wbz20231127
				smWrapMas.append(el2);
			});
		}
		if (smSlidesMas.length < smMinCountMas) {
			copyWork = true;
			smCopyElMas();
			smCopyElMas();
			smCopyElMas();
		}
		
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
				//type: 'fraction',
				type: 'custom',
				renderCustom: function(swiper, current, total) {
					if (copyWork) {
						let currentCalc = current;
						if (current > (total / 4)) {
							currentCalc = current % (total / 4);
							if (currentCalc == 0) {
								currentCalc = total / 4;
							}
						}
						return `<span class="swiper-pagination-current">${currentCalc}</span> / <span class="swiper-pagination-total">${total / 4}</span>`;
					} else {
						return `<span class="swiper-pagination-current">${current}</span> / <span class="swiper-pagination-total">${total}</span>`;
					}
				}
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
	}

	if (document.querySelector('.main_image_board.swiper')) {
		const swipermib = new Swiper('.main_image_board.swiper', {
			slidesPerView: 'auto',
			spaceBetween: 16,
		});
	}

	if (document.querySelector('.main_article_board.swiper')) {
		const swipermab = new Swiper('.main_article_board.swiper', {
			slidesPerView: 'auto',
			spaceBetween: 16,
		});
	}

	// wbz20231121
	// 怨듭��ы빆 �곸뿭 �대깽��
	// 怨듭��ы빆 �곸뿭 �먮룞 濡ㅻ쭅
	if (document.querySelector('.main_notice_board > ul > li')) {
		if (document.querySelectorAll('.main_notice_board > ul > li')) {
			let intCount = 0;
			let intCount2 = 0;
			let intCs = 100;
			let intCm = 5000;
			let intActive = true;
			let mnbLength = document.querySelectorAll('.main_notice_board > ul > li').length;
			setInterval(function() {
				if (!intActive) {
					return false;
				}
				if (intCount2 >= intCm) {
					intCount2 = 0;
					intCount++;
					mnEvt(intCount);
				} else {
					intCount2 += intCs;
				}
			}, intCs);
			function mnEvt(idx) {
				intCount2 = 0;
				if (idx >= mnbLength) {
					intCount = 0;
					idx = intCount;
				} else if (idx < 0) {
					intCount = mnbLength - 1;
					idx = intCount;
				} else {
					intCount = idx;
				}
				document.querySelectorAll('.main_notice_board > ul > li').forEach((li) => {
					li.classList.remove('on');
				});
				document.querySelectorAll('.main_notice_board > ul > li')[idx].classList.add('on');
			}
			document.querySelectorAll('.main_notice_board .tab_n_more button').forEach((el, idx) => {
				el.addEventListener('click', function() {
					mnEvt(idx);
				});
				el.addEventListener('focus', function() {
					mnEvt(idx);
				});
			});
			document.querySelector('.mnb_control .mnb_l').addEventListener('click', function() {
				intCount--;
				mnEvt(intCount);
			});
			document.querySelector('.mnb_control .mnb_r').addEventListener('click', function() {
				intCount++;
				mnEvt(intCount);
			});
			document.querySelector('.mnb_control .mnb_s').addEventListener('click', function() {
				intActive = !intActive;
				document.querySelector('.mnb_control .mnb_s').classList.toggle('is_stop');
			});
		}
	}

	// 3P �ы꽭 留곹겕
	if (document.querySelector('.swipe_menu .swiper-wrapper')) {
		let smWrap = document.querySelector('.swipe_menu .swiper-wrapper');
		let smSlides = smWrap.querySelectorAll('.swiper-slide');
		let smMinCount = 24;
		function smCopyEl() {
			smSlides.forEach((el) => {
				const el2 = el.cloneNode(true);
				el2.querySelector('a').tabIndex = -1;
				// wbz20231127
				smWrap.append(el2);
			});
		}
		if (smSlides.length < smMinCount) {
			smCopyEl();
			smCopyEl();
		}
		const swipermm = new Swiper('.swipe_menu .swiper', {
			// loop: true,
			slidesPerView: 'auto',
			loop: true,
			// freeMode: true,
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
	}

	// 二쇱슂 �ы꽭 �ъ씠��
	// const swiperps = new Swiper('.main_portal_slide .swiper', {

	// });

	if (document.querySelector('.mps_li')) {
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
	}

	// let mpsLen = document.querySelectorAll('.mps_wrap .mps_li').length;
	// let mpsBtnWrap = document.querySelector('.mps_control');
	// let lastidx = 0;
	// for (let i=0;i<mpsLen;i++) {
	// 	mpsBtnWrap.insertAdjacentHTML('beforeend' ,`
	// 		<button type="button" data-idx="${i}" class="mps_bul mpsb_${i}">${i}踰덉㎏ �щ씪�대뱶 �대룞</button>
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



	// �뚮┝議�
	if (document.querySelector('.main_notice_slide .swiper')) {
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
	}
}