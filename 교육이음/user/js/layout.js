function layoutEvent() {

	// 헤더 gnb
	if($(window).width() > 1300) {
		$(document).on('mouseover', '.gnb>li>a', function () {//헤더 영역에 마우스오버하면
			$('#header').addClass('on');
			$('#header .depth2').addClass('on');//2뎁스 열림
			$('#header .gnb').on('mouseleave', function () {//헤더 영역에서 마우스아웃하면		
				$('#header').removeClass('on');
				$('#header .depth2').removeClass('on');//2뎁스 닫힘
			});
		});

		$(document).on('mouseover', '.gnb .depth2', function () {//gnb depth2 메뉴에 마우스오버하면
			$(this).parent("li").addClass("on");
			$('.gnb .depth2').on('mouseleave', function () {//gnb depth2 메뉴에서 마우스아웃하면		
				$(this).parent("li").removeClass("on");
			});
		});
	}

	// aside
	// document.querySelectorAll('.hd_menu_wrap .btn_menu').forEach(($el) => {
	// 	$el.addEventListener('click', function() {
	// 		asideControl(true);
	// 	});
	// });
	
	document.querySelector('.aside_bg').addEventListener('click', function() {
		asideControl(false);
	});
	document.querySelector('.aside_close').addEventListener('click', function() {
		asideControl(false);
	});

	function asideControl(type) {
		if (type) {
			document.querySelector('.aside_bg').classList.add('on');
			document.querySelector('#aside_menu').classList.add('on');
		} else {
			document.querySelector('.aside_bg').classList.remove('on');
			document.querySelector('#aside_menu').classList.remove('on');
		}
	}	

	document.querySelectorAll('.has_child').forEach(($el, index) => {
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

}


let loadSocket = {
	'header': false,
	'aside': false,
	// 'footer': false
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

					if (loadSocket.header && loadSocket.aside /*&& loadSocket.footer*/) {
						layoutEvent();
					}
				});
		});
	}
});