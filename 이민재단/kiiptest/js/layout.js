function layoutEvent() {

	// header gnb
	if($(window).width() > 1300) {
		$(document).on('mouseover focusin', '.gnb>li>a', function () {//헤더 영역에 마우스오버하면
			$(this).parent('li').addClass('on');
			$('#header').addClass('on');
			$('#header .depth2').addClass('on');//2뎁스 열림
			$(this).on('mouseleave', function () {
				$(this).parent('li').removeClass('on');
			});
			$('#header .gnb').on('mouseleave', function () {//헤더 영역에서 마우스아웃하면		
				$('#header').removeClass('on');
				$('#header .depth2').removeClass('on');//2뎁스 닫힘
			});	
		});
		$(document).on('mouseover focusin', '.gnb .depth2', function () {//gnb depth2 메뉴에 마우스오버하면
			$(this).parent("li").addClass("on");
			$('.gnb .depth2').on('mouseleave focusout', function () {//gnb depth2 메뉴에서 마우스아웃하면		
				$(this).parent("li").removeClass("on");
			});
		});
		$(document).on('mouseover focusin', '.gnb .depth2 li a', function () {//gnb depth2 항목에 마우스오버하면
			$(this).addClass("on");
			$(this).on('mouseleave focusout', function () {//gnb depth2 항목에서 마우스아웃하면		
				$(this).removeClass("on");
			});
		});
	}

	$('.depth2 li:last').focusout(function(){
		$('#header').removeClass('on');
		$('#header .depth2').removeClass('on');		
	});	

	// 언어 선택
	$(".btn_dropdown").on("click", function () {
		$(this).parent().find(".pop_dropdown").stop().fadeToggle(200);
	});

	// aside
	document.querySelectorAll('.hd-menu .btn-menu').forEach(($el) => {
		$el.addEventListener('click', function() {
			asideControl(true);
		});
	});
	
	document.querySelector('.aside-bg').addEventListener('click', function() {
		asideControl(false);
	});
	document.querySelector('.aside-close').addEventListener('click', function() {
		asideControl(false);
	});

	function asideControl(type) {
		var body = document.body;

		if (type) {
			document.querySelector('.aside-bg').classList.add('on');
			document.querySelector('#aside-menu').classList.add('on');
			body.style.overflow = 'hidden'; // body 스크롤 잠금
		} else {
			document.querySelector('.aside-bg').classList.remove('on');
			document.querySelector('#aside-menu').classList.remove('on');
			body.style.overflow = ''; // body 스크롤 해제
		}
	}	

	document.querySelectorAll('.has-child').forEach(($el, index) => {
		$el.querySelector('.dep2').style.height = '0';
		$el.querySelector('.dep1a').addEventListener('click', function($e) {
			$e.preventDefault();
			$e.target.closest('.dep1').classList.toggle('on');
			const collapseContent = $e.target.closest('.dep1').querySelector('.dep2');
			if ( $e.target.closest('.dep1').classList.contains('on')) {
				collapseContent.style.height = collapseContent.scrollHeight + 'px';
			} else {
				collapseContent.style.height = '0';
			}
		});
	});

	// footer
	var familySite = false;
	$('.ft-family').each(function(){
		$(this).find('.select').click(function () {
			if(familySite = true && $(this).hasClass('over')){
				$(this).removeClass('over');
				$(this).next('.list-wrap').slideUp();
				familySite = false;
			}else{
					$(this).addClass('over');
					$(this).next('.list-wrap').slideDown();
					familySite = true;				
			}
     	});		
   });

   // go top 버튼
	document.querySelector('.go-top').addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	var goTop;
	window.addEventListener('scroll', () => {
		if (window.scrollY > 100) {
			document.querySelector('.go-top').classList.add('show');
			clearTimeout(goTop);
			navT1 = setTimeout(function() {document.querySelector('.go-top').classList.add('show2');}, 10);
		} else {
			document.querySelector('.go-top').classList.remove('show2');
			clearTimeout(goTop);
			goTop = setTimeout(function() {document.querySelector('.go-top').classList.add('show');}, 300);
		}
	});

}


let loadSocket = {
	'header': false,
	'aside': false,
	'footer': false
}

window.addEventListener('DOMContentLoaded', () => {
	const includeTag = document.querySelectorAll('.js-include');
	if (includeTag.length === 0) {
		layoutEvent();
	} else {
		includeTag.forEach((divBox, idx) => {
			fetch(divBox.dataset.include)
				.then(res => res.text())
				.then(function (data) {
					divBox.innerHTML = data;
					loadSocket[divBox.dataset.event] = true;

					if (loadSocket.header && loadSocket.aside && loadSocket.footer) {
						layoutEvent();
					}
				});
		});
	}
});

$(document).on('mouseover focusin', '.location .has-select', function () {
	$(this).next('ul').addClass('on');
	$(this).parent('li').on('mouseleave', function () {
		$(this).find('ul').removeClass('on');
	});
	$(this).next('ul').find('li:last').on('focusout', function () {
		$(this).parent('ul').removeClass('on');
	});
});