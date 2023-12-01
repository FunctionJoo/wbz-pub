$(function(){
	//공통 레이아웃 스크립트	

	//메인 헤더 배경 On/Off
	// 202311 웹접근성
	$(".wrap-header").on("mouseover focusin",function(){		
		$(this).addClass('on');
	}).on("mouseout focusout",function(){
		$(this).removeClass('on');
	})

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
	// 202311 웹접근성
	$('.depth2 li:last').focusout(function(){
		$('.depth1 > li > a').removeClass('on');
		$('.depth1 > li .sub_menu').removeClass('selected');		
	});
});