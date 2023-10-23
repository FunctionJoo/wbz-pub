$(document).ready(function(){
	// img on_off
	var imgBtn = $('a.btn');
	var src = imgBtn.find('img').attr('src');

	imgBtn.on('mouseenter', function(){
		$(this).find('img').attr('src', src.replace('_off', '_on'));
	});

	imgBtn.on('mouseleave', function(){
		$(this).find('img').attr('src', src.replace('_on', '_off'));
	});
	
	// mt search
	
	$('.search_m').on('click', function(){
		$('#header').toggleClass('m_header_on');
		$('.hs_wrap').toggleClass('on');
	});

});




// side menu
$(function(){
	// drawer menu show hide
	var movePs = $("#naviMenu").outerWidth();
	$("#naviMenu").css('left', -1000).hide();

	function navClose() {
		$('#naviMenu').removeClass('open').css('top',0).find('>div').andSelf().css('height',$(window).height());
		//$(".headerCom").removeClass("naviOpen");
		$("html, body").css({'overflow':'auto'});
		$(window).css({'overflow':'auto'});
		$(".wrap").css({'height':'auto', 'overflow':'auto'}).stop().animate({"left": 0}, 200);
		$("#naviMenu").css('top',0).stop().animate({'top':0, "left": -1000}, 200,function(){$(this).hide();});
		$(".dmm").remove();

		if($('#container').find('div').hasClass('lnbWrap')){
			//$('.lnbWrap, .prdList').css({'position':'fixed'});
		} else {
			//$('#lnb, .prdList').css({'position':'fixed'});
		}
	}

	function navOpen() {
		$('#naviMenu').css('top',0).find('>div').andSelf().css('height',$(window).height());
		//$(".headerCom").addClass("naviOpen");
		$("html, body").css({'overflow':'hidden'});
		$(window).css({'overflow':'hidden'});
		$("body").append('<div class="dmm"></div>');
		$(".wrap").css({'height':$(window).height(), 'overflow':'hidden'}).stop().animate({"left": movePs}, 200);
		$("#naviMenu").addClass('open').css('top',0).show().stop().animate({'top':0, "left": 0}, 200);

		if($('#container').find('div').hasClass('lnbWrap')){
			//$('.lnbWrap, .prdList').css({'position':'fixed'});
		} else {
			//$('#lnb, .prdList').css({'position':'absolute'});
		}
		$('.dmm').click(function(){
			navClose();
		});

		setTimeout( gnbPostionSet, 200 );
	}

	function gnbPostionSet()
	{
		var arrTop = [56,133,210,287,364,441];
		var arrTopPos = [0,-75,-150,-225,-300,-375];

		$("#naviMenu .gnb").each( function ( i ) {
			var t = arrTop[i];
			$(this).css("top", t );
			$(this).find("a").css("background-position", "0px " + arrTopPos[i] + "px");
		});
	}

	$(window).resize(function(){
		if($('#naviMenu').hasClass('open')){
			$('#naviMenu').css({'top':0, 'left':0}).find('>div').andSelf().css('height',$(window).height());
		} else {
			$('#naviMenu').css({'top':0, 'left':-1000}).find('>div').andSelf().css('height',$(window).height());
		}
	});


	$(".btnCtg").click(function() {
		navOpen();
	});
	$("#naviMenu .close").click(function() {
		navClose();
	});


	// drawer menu click

	$(".menuCtg .gnb").click(function(){
		$("li").has($(this)).siblings("li").removeClass("on");
		$("li").has($(this)).addClass("on");
	});

	$(".menuCtg .mnTit").click(function(){
		$(this).parent().siblings("li").removeClass("on");
		if ($(this).parent().find("ul").css('display') == 'block') {
			$(this).parent().removeClass("on");
		}else {
			$(this).parent().addClass("on");
		}
	});

	$(".menuCtg .subTit").click(function(){
		$(this).parent().siblings("li").removeClass("on");
		if ($(this).parent().find(".sub").css('display') == 'block') {
			$(this).parent().removeClass("on");
		}else {
			$(this).parent().addClass("on");
		}
	});

	$(".menuCtg .subTit").each(function() {
		if ($(this).parent().find(".sub").length < 1) {
			$(this).parent().addClass("subNo");
		}
	});

	$(".sideMn").addClass("mn1");
	$(".menuCtg .gnb").bind("click", function (e) {
		var i = $("li").has($(this)).index();
		$(".sideMn").attr('class', 'sideMn');
		$(".sideMn").addClass("mn" + i);
	});
	
});


function newsConfirm(str){
	if(confirm('뉴스레터를 신청하시겠습니까?')){
		window.open('http://news.ssis.or.kr/news/front/frm_join_fb_new.asp','popnews','width=880,top=0,left=0,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,resizable=no,menubar=no');
	}
}

$(document).ready(function(){
	/*if($(".iframe_style>iframe").length){
		iframeAutoHeight();
	}*/
	var loc = location.pathname;
	var loc_init = ["/","/index.do","/index.jsp"];
	var mobile_menu = $("#naviMenu > div > ul > .on > ul > li").find("a");
	var now_href = "";
	var href_start = -1;
	for(i=0;i < loc_init.size;i++){
		if(loc_init.get(i) == loc){
			href_start = 0;
		}
	}
	if(href_start > -1){		
		$.cookie("mobile_menu_location", null, {path:"/", domain:document.domain, expires: -1});
	}else{
		var now_href = $.cookie("mobile_menu_location");
	}
	$.each(mobile_menu,function(){
		if(now_href != ""){
			if($(this).attr("href") == now_href){
				$(this).addClass("active");
			}
		}
		$(this).click(function(){
			var date = new Date();
			date.setTime(date.getTime() + (10 * 60 * 1000));
			$.cookie("mobile_menu_location", $(this).attr("href"), {path:"/", domain:document.domain, expires: date});
		});
	})
	var mobile_menu_active = $("#naviMenu > div > ul > .on > ul > li").find("a.active");

	if(mobile_menu_active.parent().find("ul").size() > 0 ){
		var pattern1 = "/lay(\\d+)/S(\\d+)T(\\d+)C(\\d+)/contents";
		var matchResult1 = now_href.match(pattern1);
		if(matchResult1){
			mobile_menu_active.addClass("active");
			//mobile_menu_active.removeClass("active");
		}else{
			mobile_menu_active.parent().find("ul>li").eq(0).find("a").addClass("active");
			mobile_menu_active.removeClass("active");
		}
		//mobile_menu_active.parent().find("ul>li").eq(0).find("a").addClass("active");
		//mobile_menu_active.removeClass("active");
	}
	$('.gnb > ul > li').eq(6).addClass("last");
	$('.gnb > ul > li').eq(8).remove();
	$('.gnb > ul > li').eq(7).remove();
});

function iframeAutoHeight(){
	setTimeout(iframeAutoHeight,1000);
	$(".iframe_style>iframe").css("height",$(".iframe_style>iframe").contents().find("body").css("height"));
}

function checkHttps(){
	if(MatchResult() == 1){
		setSSL("ON");
	}else{
		setSSL("OFF");
	}	
}

function setSSL(onoff){
	// 20231018 리다이렉트 해제 오류 많음...
	return false;
	var href = location.href;
	//if(href.indexOf("http://dav.") == -1 && href.indexOf("http://127.") == -1){
		if(onoff == "ON"){
			if(href.indexOf("https://") == -1){
				href = href.replace("http://","https://");
				//href = href.replace("ssis.or.kr","ssis.or.kr");
				location.href = href;
			}
		}else{
			if(href.indexOf("http://") == -1){
				href = href.replace("https://","http://");
				href = href.replace("ssis.or.kr","ssis.or.kr");
				location.href = href;
			}
		}
	//}
}

function MatchResult(){
	var href = location.href;
	var pattern1 = "/lay(\\d+)/bbs/S(\\d+)T(\\d+)C(\\d+)/T";
	var pattern2 = "/lay(\\d+)/bbs/S(\\d+)T(\\d+)C(\\d+)/Q";
	var pattern3 = "/lay(\\d+)/bbs/S(\\d+)T(\\d+)C(\\d+)/U";
	var pattern7 = "/lay(\\d+)/program/S1T72C1046/";
	var pattern4 = "/directors";
	var pattern5 = "/directors/lay(\\d+)/S566T576C578/";
	var pattern6 = "/directors/lay(\\d+)/bbs/S566T573C574/A/323";
	var pattern8 = "/lay(\\d+)/program/S1T804C1227/"; //new 정보공개청구
	var pattern9 = "/lay(\\d+)/program/S1T72C1226/"; //new신기술 제안
	var matchResult1 = href.match(pattern1);
	var matchResult2 = href.match(pattern2);
	var matchResult3 = href.match(pattern3);
	var matchResult4 = href.match(pattern4);
	var matchResult5 = href.match(pattern5);
	var matchResult6 = href.match(pattern6);
	var matchResult7 = href.match(pattern7);
	var matchResult8 = href.match(pattern8);
	var matchResult9 = href.match(pattern9);
	if(matchResult1 || matchResult2 || matchResult3 || matchResult4 || matchResult7 || matchResult8 || matchResult9){
		if(matchResult5 || matchResult6){
			return 0;
		}else{
			return 1;
		}
	}else{
		return 0;
	}
}

checkHttps();