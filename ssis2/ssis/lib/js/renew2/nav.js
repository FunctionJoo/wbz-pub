/* ----------------------------------------
	nav.js (다국어 공통)
---------------------------------------- */
var dep1;
var dep2;

jQuery(function($){
	$gnbList = $("#gnb > ul");
	var menuState = false;
	
	$(window).resize(function  () {
		var win_width = $(window).outerWidth(); 
		if ( menuState  ) {
			if ( win_width > 1200 ) {
				$("body").css({'height':'auto', 'overflow':'auto'});
				$("#gnbBg").hide();
			}
		}
	});
	
	gnb_on();

	/* ======== GNB 하나씩 ========== */ 
	function gnb_on () {
		$gnbList.children("li").children("a").on("mouseenter focus",function  () {
			    //$gnbList.children("li").removeClass("on").children(".gnb-2dep").hide();
			    $gnbList.children("li").removeClass("on").children(".gnb-2dep").show();
			    $(this).parent("li").children(".gnb-2dep").stop().slideDown(200);
				if ( $(this).parent("li").hasClass("gnb1") ) {
					$("#gnb").stop().animate({"height":"403px"},400,'swing');
					$("#gnb").addClass('active');
				}else if ( $(this).parent("li").hasClass("gnb2") ) {
					$("#gnb").stop().animate({"height":"403px"},400,'swing');
					$("#gnb").addClass('active');
				}else if ( $(this).parent("li").hasClass("gnb3") ) {
					$("#gnb").stop().animate({"height":"403px"},400,'swing');
					$("#gnb").addClass('active');
				}else if ( $(this).parent("li").hasClass("gnb4") ) {
					$("#gnb").stop().animate({"height":"403px"},400,'swing');
					$("#gnb").addClass('active');
				}else if ( $(this).parent("li").hasClass("gnb5") ) {
					$("#gnb").stop().animate({"height":"403px"},400,'swing');
					$("#gnb").addClass('active');
				} else {	
					$("#gnb").stop().animate({"height":"0"},400,'swing');
					$("#gnb").removeClass('active');
				}
				$(this).addClass('on');
				$("#gnbBg").stop().fadeIn(100);
			    
		})
		
		$gnbList.on("mouseleave",gnb_return);
		$gnbList.find("a").last().on("focusout",gnb_return);
		function gnb_return () {
			$("#gnb").stop().animate({"height":"0"},400,'swing');
			$("#gnbBg").hide();
			$("#gnb").removeClass('active');
			
			$gnbList.children("li").removeClass("on").children(".gnb-2dep").hide();
			if ( dep1> 0 && dep2> 0 ) {
				$gnbList.children("li").eq(dep1-1).addClass("on");
			}
			
		}
		
	}

	// 오버하거나 포커스가 있을경우 활성화
	$gnbList.children("li").on("mouseenter focusin",function(){
		$(this).find('a').addClass("on");
	}).on("mouseleave focusout", function(){
		$(this).find('a').removeClass("on");
	})

	/* 반응형 gnb 메뉴 오픈 */

	$("#header .nav-open-btn").click(function  () {
		$(this).addClass("on");
		if ( menuState  ) {
			menuClose();
			menuState = false;
			$(this).removeClass("on");
		}else {
			menuOpen();
			menuState = true;
		}
		return false;
	});

	$("#gnbBg, .m-gnb-close").click(function  () {
		menuClose();
		menuState = false;
		$("#header .nav-open-btn > a").removeClass("on");
	});

	function menuOpen () {
			$("#m-gnb").stop().animate({"right":"0"},300);
			$("#header").css('z-index','auto');
			$("#gnbBg").fadeIn();
			$("body").css({'height':$(window).height(), 'overflow':'hidden'});
			$("#header .nav-open-btn").removeAttr("title");
			$("#header .nav-open-btn").attr("title", "메뉴닫기");
	}

	function menuClose () {
			$("#m-gnb").stop().animate({"right":"-100%"},300);
			$("#header").css('z-index','999');
			$("#gnbBg").hide();
			$("body").css({'height':'auto', 'overflow':'auto'});
			$("#header .nav-open-btn").removeAttr("title");
			$("#header .nav-open-btn").attr("title", "메뉴열기");
	}
	$("#m-gnb > ul > li:has('.gnb-2dep')").addClass("has-2dep");
	$("#m-gnb > ul > li:has('.gnb-2dep')").each(function  () {
		$(this).children("a").append("<span class='gnb-icon close-icon'><i class='xi-plus-min xi-x'></i></span><span class='gnb-icon open-icon' style='display:none;'><i class='xi-minus-min xi-x'></i></span>");
	});
	$("#m-gnb > ul > li > ul > li:has('.gnb-3dep')").addClass("has-3dep");
	$("#m-gnb > ul > li > ul > li:has('.gnb-3dep')").each(function  () {
		$(this).children("a").append("<span class='gnb-icon close-icon'><i class='xi-plus-min xi-x'></i></span><span class='gnb-icon open-icon' style='display:none;'><i class='xi-minus-min xi-x'></i></span>");
	});
	/* GNB 2DEPTH 오픈하기 */ 
	$("#m-gnb > ul > li:has('ul')").children("a").click(function(event){
		/* 2dep가 열려있을때 */		
		if ( $(this).parent("li").hasClass("active") ){
			$(this).parent("li").removeClass("active");
			$(this).children(".open-icon").hide();
			$(this).children(".close-icon").show();
			$(this).siblings("ul").slideUp(400);					
		}
		/* 2dep가 닫혀있을때 */ 
		else{	  
			$("#m-gnb > ul > li").has("ul").each(function() {
				if ( $(this).hasClass("active") ){
					$(this).removeClass("active");
					$(this).find(".open-icon").hide();
					$(this).find(".close-icon").show();
					$(this).children("ul").slideUp(400);
				}
			});	
			$(this).parent("li").addClass("active");
			$(this).children(".close-icon").hide();
			$(this).children(".open-icon").show();
			$(this).siblings("ul").slideDown(400);
		}
		return false;
	});
	/* GNB 3DEPTH 오픈하기 */ 
	$("#m-gnb > ul > li > ul > li:has('ul')").children("a").click(function(event){
		/* 2dep가 열려있을때 */		
		if ( $(this).parent("li").hasClass("active") ){
			$(this).parent("li").removeClass("active");
			$(this).children(".open-icon").hide();
			$(this).children(".close-icon").show();
			$(this).siblings("ul").slideUp(400);					
		}
		/* 2dep가 닫혀있을때 */ 
		else{	  
			$("#m-gnb > ul > li > ul > li").has("ul").each(function() {
				if ( $(this).hasClass("active") ){
					$(this).removeClass("active");
					$(this).find(".open-icon").hide();
					$(this).find(".close-icon").show();
					$(this).children("ul").slideUp(400);
				}
			});	
			$(this).parent("li").addClass("active");
			$(this).children(".close-icon").hide();
			$(this).children(".open-icon").show();
			$(this).siblings("ul").slideDown(400);
		}
		return false;
	});
	
	if($(".lnb_menu").hasClass("active")){
		$(".lnb_menu.active").find("+ul").slideDown();
	}			
	$(".lnb_menu").click(function(){
			$(".lnb_menu").removeClass("active");
			$(".lnbmenu_sub").slideUp();
			
			if($(this).find("+ul").is(":hidden")){
				$(this).addClass("active");
				$(this).find("+ul").slideDown();
			}
		});
});

/* ----------------------------------------
	zoomIn/zoomOut 효과
---------------------------------------- */

var nowZoom = 100; // 현재비율
var maxZoom = 130; // 최대비율(500으로하면 5배 커진다)
var minZoom = 70;  // 최소비율

$(document).ready(function() {
	/* 화면 크기 조정 */
    var agent = navigator.userAgent.toLowerCase();

    /* 익스와 크롬만 화면 크기 조정이 보이게 */
    if((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("chrome") != -1)) {
        $(".zoomArea").css("display", "block");
    } else {
        //$(".zoomArea").css("display", "none");
    } 

	/* 화면 크기 확대 */
	$(".zoom-plus").on('click',function  () {
		if (nowZoom < maxZoom) {
			nowZoom += 10; 
		} else {
			alert("화면크기는 130%까지만 커질 수 있습니다.");
			return;
		}

		$('body').css("zoom", nowZoom + "%");
	})

	/* 화면 크기 축소 */
	$(".zoom-minus").on('click',function  () {
		if (nowZoom > minZoom) {
			nowZoom -= 10; 
		} else {
			alert("화면크기는 70%까지만 작아질 수 있습니다.");
			return;
		}

		$('body').css("zoom", nowZoom + "%");
	})
	/* 화면 크기 기본 */
	$(".zoom-default").on('click',function  () {
		nowZoom = 100;
        document.body.style.zoom = nowZoom + "%";
	})

});