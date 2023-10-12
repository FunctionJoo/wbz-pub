/* ----------
js
---------- */
jQuery(function($){
	/* ------ HEADER FIXED------ */
	w_width = $(window).innerWidth();
	if ( $("#header").css("display") == "block" ) {
		var startTop = $("#headerInner").height();
		
		$(window).scroll(function  () {
			var s_top = $(window).scrollTop();
			if ( s_top < startTop ) {
				$("#header").removeClass("fixed");
				$("#sitemap-wrap").removeClass("fixed");
				$("#gnbBg").removeClass("fixed");
			}else {
				$("#header").addClass("fixed");
				$("#sitemap-wrap").addClass("fixed");
				$("#gnbBg").addClass("fixed");
			}
		});
	}
	
	/* search box */
	$(".search_btn").click(function  () {
		$("#search-wrap").show();
		$(".searchTitle").focus();
		return false;
	});
	$("#search-wrap .search-close-btn").click(function  () {
		$("#search-wrap").hide();
		$(".search_btn").focus()
		return false;
	});
	$("#search-wrap .searchBg").click(function  () {
		$("#search-wrap").hide();
		$(".search_btn").focus()
		return false;
	});
    
	$(".search-open-btn").click(function  () {
		$("#search-wrap").show();
		return false;
	});
	
	/* ------  사이트 바로가기 ------ */
	$("a.family-open-btn").click(function  () {
		$(this).siblings("ul").stop().slideToggle(200);
		return false;
	});
	$(".familysite-box").mouseleave(function  () {
		$(this).find("ul").stop().slideUp(200);
		return false;
	});

	/* sitemap box */
	$(".sitemap-open-btn").click(function  () {
		$("#sitemap-wrap").show();
		$(".sitemap-close-btn").focus();
		return false;
	});
	$("#sitemap-wrap .sitemap-close-btn").click(function  () {
		$("#sitemap-wrap").hide();
		$(".sitemap-open-btn").focus();
		return false;
	});

	$(".to-top-btn").each(function  () {
		if ( $(this).length > 0 ) {
			$(window).scroll(function  () {
				if ( $(window).scrollTop() > 0 ) {
					$(".to-top-btn").addClass("fixed");
				}else {
					$(".to-top-btn").removeClass("fixed");
				}
			});
		}
		
		$(this).on("click",function  () {
			$("html, body").animate({scrollTop:0},600,"easeInOutExpo");	
			return false;
		});
	});
	
	/*scrool*/
	 $(function(){
        $(".sitemap-box-inner").mCustomScrollbar({
            theme:"minimal-dark"
        });
    });
	
	$("#bannerList").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: false,
		fade: false,
		dots:false,
		autoplay: true,
		speed:2000,
		infinite:true,
		easing: 'easeInOutQuint',
		pauseOnFocus: true,
		pauseOnHover:true,
		responsive: [
			{
			  breakpoint: 1025,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			  }
			}
		]
	});

	$(".section01 .slide-pause").toggle( function () { 
		$("#bannerList").slick('slickPause'); 
		$(this).children(".pause").html('<button type="button"><span>재생</span><i class="xi-play xi-x"></i></button>');
		}, function () { 
			$("#bannerList").slick('slickPlay');
			$(this).children(".pause").html('<button type="button"><span>정지</span><i class="xi-pause xi-x"></i></button>');
		} 
	);
	$(".section01 .slide-prev").on('click', function(e) {
		$('#bannerList').slick('slickPrev');
	});
	$(".section01 .slide-next").on('click', function(e) {
		$('#bannerList').slick('slickNext');
	});
});

$(document).ready(function(){
	$(".introduceBtn > a").click(function(){
		if($(this).parent().next().is(":visible")){
			$(this).parent().removeClass("on");
			$(this).parent().next().slideUp();
			$("introduceBtn > a").css("background:url(/images/kor/sub/org_open_arr.png) right 3px no-repeat;");
			sessionStroage.removeItem("pkgdtl_search");
		}else{
			$(this).parent().addClass("on");
			$(this).parent().next().slideDown();
			$("introduceBtn > a").css("background:url(/images/kor/sub/org_close_arr.png) right 3px no-repeat;");
			sessionStroage.removeItem("pkgdtl_search","open");
		}
	});
	
	$(".question").click(function(){
		//$(this).next().slideToggle().siblings(".answer:visible").slideUp();
		$(this).next().show().siblings(".answer:visible").hide();
	})
	
	$(".question").keydown(function(key){
		if(key.keyCode == 13 ){
		     //$(this).next().slideToggle().siblings(".answer:visible").slideUp();
			$(this).next().show().siblings(".answer:visible").hide();
		}
	})
});

// print
function printArea(){
	var divToPrint=document.getElementById('cont');
	var newWin=window.open('','Print-Window', 'width=950,height=650');
	newWin.document.open();
	newWin.document.write('<html>');
	newWin.document.write('<meta http-equiv="X-UA-Compatible" content="IE=Edge">');
	newWin.document.write('<meta charset="UTF-8">');
	newWin.document.write('<meta name="format-detection" content="telephone=no">');
	//newWin.document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
	newWin.document.write('<style>');
	newWin.document.write('@font-face {');
	newWin.document.write('font-family: "Noto Sans KR";');
	newWin.document.write('font-style: normal;');
	newWin.document.write('font-weight: 300;');
	newWin.document.write('url("/lib/css/renew2/font/NotoSansKR-Light.woff2") format("woff2",');
	newWin.document.write('url("/lib/css/renew2/font/NotoSansKR-Light.woff") format("woff"),');
	newWin.document.write('url("/lib/css/renew2/font/NotoSansKR-Light.otf") format("opentype");');
	newWin.document.write('}');
	newWin.document.write('</style>');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/kor/article-renew.css">');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/renew2/reset.css">');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/renew2/common.css">');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/renew2/layout.css">');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/renew2/content.css">');
	newWin.document.write('<link rel="stylesheet" href="/lib/css/renew2/print.css">');
	newWin.document.write('<body onload="window.print()">');
	newWin.document.write('<div class="logo-center"><img src="/images/renew2/common/logo.png"></div><div class="contentWrap">'+divToPrint.innerHTML+'</div></body></html>');
	newWin.document.close();
}