$(function(){
	//공통 레이아웃 스크립트
	
	//모달 팝업
	function modal () {
		//모달 열기 클릭 이벤트
		$('.open_pop').on('click', function (e) {
			e.preventDefault();
			$('#wrap').addClass('not_scroll');
	
			//모달 닫기를 클릭한 경우 보내질 포커스를 변수에 저장
			var $tg = $(this);
			var $modalCnt = $( $(this).attr('href') );//#modal1 => $('#modal1')
			var $closeBtn = $modalCnt.find('.close_btn , .pop_out, .handler');
	
			//1) 마스크만 동적생성w
			$('#container, #contents, #wrap').after('<div id="mask"></div>');
			
			//2) 열려진 브라우저 가운데 모달이 위치하도록 좌표지정
			$(window).on('resize', function () {
				var topPos = ($(this).height() - $modalCnt.outerHeight())/2;
				var leftPos = ($(this).width() - $modalCnt.outerWidth())/2;
				
				$modalCnt.css({top: topPos, left:leftPos});
			});
			$(window).trigger('resize');
			
				var $mask = $('#mask');
			
				$mask.add($modalCnt).stop().fadeIn('fast');
				$closeBtn.on('click', function () {
					$('#wrap').removeClass('not_scroll');
					$mask.add($modalCnt).stop().fadeOut('fast', function () {
						$mask.remove();
						$tg.focus();
					});
				});
			
				$mask.on('click', function () {
					$closeBtn.click();
					$('#wrap').removeClass('not_scroll');
					$mask.add($modalCnt).stop().fadeOut('fast', function () {
						$mask.remove();
						$tg.focus();
					});
				});
	
			});
		}
	modal ();

	$(document).on('click', '.popup_wrap .pop_out', function(){
		$('.popup_wrap').stop().fadeOut('fast');
	});
	
	//Lnb
	$(document).on('click', '.lnb > li > a', function(){
		if ($(this).parent().hasClass('on')) {
			$(this).parent().removeClass('on');
			$(this).siblings('ul').stop().slideUp();
		} else {
			$(this).parent('li').siblings('li').removeClass('on');
			$(this).parent('li').siblings('li').children('ul').stop().slideUp();
			$(this).parent().addClass('on');
			$(this).siblings('ul').stop().slideDown();
		}
	});

	//메인 헤더 배경 On/Off
	$("#header").bind("mouseover mouseout",function(event){
		if(event.type=="mouseover"){
			$(this).addClass('on');
		}
		else if(event.type=="mouseout"){
			$(this).removeClass('on');
		}
	});

	// Gnb메뉴 드롭다운
	$('.depth1 > li').on('mouseover keyup',function(){
		$('.depth1 > li > a').removeClass('on');
		$('.depth1 > li .sub_menu').removeClass('selected');
		$(this).addClass('active');
		$(this).children('a').addClass('on');
		$(this).children('.sub_menu').addClass('selected');
	}).on('mouseout blur',function(){
		$('.depth1 > li').removeClass('active');
		$('.depth1 > li > a').removeClass('on');
		$('.depth1 > li .sub_menu').removeClass('selected');
	});

	// Quick Menu
	$('.btn_quick').click(function(){
		$(".quick_menu .inner").children('ul').stop().slideToggle();
		if (!$(this).hasClass('on')) {
			$('.btn_quick span').text("펼치기");
			$(".quick_menu .inner").parent().addClass('on');
			$(this).addClass('on');
		}
		else {
			$('.btn_quick span').text("접기");
			$(".quick_menu .inner").parent().removeClass('on');
			$(this).removeClass('on');
		}
		return false;
	});
	
	// 패밀리 사이트
	$('.family_tit01').click(function(){
		$('.family_list01').slideToggle(150);
	});
	$('.family_tit02').click(function(){
		$('.family_list02').slideToggle(150);
	});
});