$(function(){

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
	$('.depth2 li:last').focusout(function(){
		$('.depth1 > li > a').removeClass('on');
		$('.depth1 > li .sub_menu').removeClass('selected');		
	});

});