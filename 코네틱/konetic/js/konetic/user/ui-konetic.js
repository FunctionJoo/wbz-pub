/* Mobile & PC GNB */
$(document).ready(function() {	
	
	//웹접근성 관련 본문 이미지 alt 체크 (속성이 아예 없거나 빈값일때 디펄트값 nttNmAlt 추가)
	//var nttNmAlt = "본문 이미지";
	var nttNmAlt = $('.view-title').eq(0).text() + ' 이미지'; 
    var imgObj = $(".view-body").find("img"); 
    for (var i = 0; i < imgObj.length; i++){ 
       var altCheck = imgObj[i].hasAttribute("alt");
       var altValCheck = (altCheck == true && imgObj[i].value == '') ? false : true;
       
       if(altCheck == false || altValCheck == false){
          imgObj.eq(i).attr("alt", nttNmAlt);          
       }
    };    
    
    
    accessibilityFocus();
    tooltipLayer();
    dropdown_keyboard_access('.js-hover');
    Check();
    multiSelect();


    // Tab 2022.03.18 삭제
    // $(".js-tabs").tabs();

    // Left Sub Menu 2022.03.18 삭제
    // $(".c-menu .depth2").accordion({
    //     active: false,
    //     collapsible: true,
    //     heightStyle: "content",
    //     header:'strong',
    // });
    // $(".c-menu .depth3 > li").each(function(){
    //     if($(this).hasClass('current')) {
    //         $(this).parents('.depth3').siblings('strong').addClass('active');
    //     } 
    // })
    // $(".c-menu .depth2 > li > strong").click(function(){
    //     $(".c-menu .depth2 > li > strong").removeClass('active');
    // })

    // Drop Down
    $(".js-dropdown").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content",
        header:'strong',
    });


    // 슬라이드 - Footer 패밀리 사이트
    $(".f-family-slide .slider").slick({
        accessibility: true,
        dots: false,
        infinite: true,
        variableWidth: true
    });  

    // Toggle Class 공통
    $('.js-toggle').on('click', function() { 
        $(this).toggleClass('active');
    });

    // 리스트 타입 2022.04.08 접근성 수정
    $(".type > button").each(function(){
        if ($(this).hasClass("active")){ 
            $(this).attr('title', '선택됨').siblings('button').attr('title', '');
        }
    });
    $('#listTypeCard').on('click', function() { 
        $(this).attr('title', '선택됨').addClass('active').parents('.list-header').siblings('.list-body').find('.section-list').addClass('card');
        $('#listTypeList').removeClass('active').attr('title', '');
        $('.pagination .p-page').hide();
        $('.pagination .p-more').show();
    });
    $('#listTypeList').on('click', function() { 
        $(this).attr('title', '선택됨').addClass('active').parents('.list-header').siblings('.list-body').find('.section-list').removeClass('card');
        $('#listTypeCard').removeClass('active').attr('title', '');
        $('.pagination .p-more').hide();
        $('.pagination .p-page').show();
    });
    
    // Tab 선택됨 2022.04.08 접근성 수정
    $(".ui-tabs > ul > li").each(function(){
        if ($(this).hasClass("current")){ 
            $(this).find('a').attr('title', '선택됨').parent().siblings('li').find('a').attr('title', '');
            $('.js-state-title').text($(this).find('a').text());
        }
    });

    // table header    
    $(".list-table").each(function(){
        addCellHeader(this);
    });

    // 기타 checked 공통
    $('.etc-checked').on('click', function() { 
        if ($(this).is(":checked")){ 
            $(this).parent('div').siblings('.etc-input').removeAttr('readonly').first().focus();
            $(this).parent('div').siblings('.etc-select').removeAttr('disabled');
        } else {
            $(this).parent('div').siblings('.etc-input').attr('readonly','readonly').val('').focusOut();
            $(this).parent('div').siblings('.etc-select').attr('disabled','disabled');
        }
    });
    $('.etc-checked').parent('div').siblings('.ui-radio').find('input[type=radio]').on('click', function() { 
        if ($(this).is(":checked")){ 
            $(this).parent('div').siblings('.etc-input').attr('readonly','readonly').val('').focusOut();
            $(this).parent('div').siblings('.etc-select').attr('disabled','disabled');
        }
    })

    // 라디오 버튼 선택 컨텐츠 노출
    $('.js-radio-tit').on('click', function(e) {
        e.stopPropagation();
        $('.js-radio-cont').hide();        
		var activeLayer = $(this).find('input').attr('id');
		//웹접근성 관련하여 input태그를 빼고 button으로 교체한 케이스도 있어서, 아래 if문을 추가한다.
		if (!!activeLayer == false) {
			activeLayer = $(this).find('button').attr('id');
		}
		$('[data-con="' + activeLayer + '"]').show();
    })

    // Datepicker
    var options = {
        showOn : 'button',	
        buttonImage : '/images/ico/ico-calendar.png',	
        buttonText : '날짜선택',	
        buttonImageOnly : false,	
        showMonthAfterYear : true,	
        changeYear : true,	
        changeMonth : true,	
        dateFormat : 'yy-mm-dd',	
        monthNamesShort : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],	
        dayNamesMin : ['일','월','화','수','목','금','토']
    };

    $(".datepicker").datepicker(options);    

    // Mobile Menu
    if (window.innerWidth < 1440) {
        $(".h-sitemap .depth1.menu").accordion({
            collapsible: false,
            heightStyle: "content",
            header:'h2',
        });
        $(".h-sitemap .depth2").accordion({
            collapsible: true,
            heightStyle: "content",
            header:'strong',
        });
    }
});

// Mobile Menu
$(window).on('resize', function() {
    if (window.innerWidth < 1440) {
        $(".h-sitemap .depth1.menu").accordion({
            collapsible: false,
            heightStyle: "content",
            header:'h2',
        });
        $(".h-sitemap .depth2").accordion({
            collapsible: true,
            heightStyle: "content",
            header:'strong',
        });
    } else {
        //$(".h-sitemap .depth1.menu, .h-sitemap .depth2").accordion('destroy');
    }
}).resize();  

// Pc Menu
function dropdown_keyboard_access(nav) {
    $(document).on("mouseenter", nav, function() {
        var isHovered = $(this).is(":hover");
        if (isHovered) {
          $(this).addClass('js-hover-visible');
          $('body').addClass('dim back');
        } else {
          $(this).removeClass('js-hover-visible');
          if(!$('.js-fixed-layer').hasClass('active')) {
            $('body').removeClass('dim back');
          } 
        }
    });
    $(document).on("mouseleave", nav, function() {
        var isHovered = $(this).is(":hover");
        if (isHovered) {
          $(this).addClass('js-hover-visible');
          $('body').addClass('dim back');
        } else {
          $(this).removeClass('js-hover-visible');
          if(!$('.js-fixed-layer').hasClass('active')) {
            $('body').removeClass('dim back');
          } 
        }
    });
    $(nav + ' .depth1 > li > a').each(function () {
        $(this).focus(function () {
            var menuParent = $(this).parents(nav);
            $(menuParent).addClass('js-hover-visible');
            $('body').addClass('dim back');
            $('.depth2').removeClass('current');
            $(this).siblings('.depth2').addClass('current');
        });
        $(nav + ' .depth1 li:last-child .depth2 li:last-child a').blur(function () {
            var menuParent = $(this).parents(nav);
            $(menuParent).removeClass('js-hover-visible');
            $('.depth2').removeClass('current');
            if(!$('.js-fixed-layer').hasClass('active')) {
                $('body').removeClass('dim back');
              } 
        });
    });
}
    
// Back To Top
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn(300);
	} else {
		$('.back-to-top').fadeOut(300);
	}
});
$(window).on('load',function(){
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 200);
        return false;
    });
});


// Custom Select 추가
function multiSelect() {
    $(document).on('click','.s-title', function(e) {
        e.stopPropagation();
        if($(this).hasClass('selected')) { 
            $(this).removeClass('selected'); 
            $(this).next('.s-options').hide();
        } else {
            $('.s-title').removeClass('selected');
            $('.s-options').hide();
            $(this).addClass('selected');
            $(this).next('.s-options').show();
        }
    }).on('click', '.ui-checkbox', function(e) {
        e.stopPropagation();
        $(this).parent('ul.s-options').show();
    }).on('click','body', function(e) {
        if(!$(e.target).hasClass('ui-select')) {    
            $('.s-options').hide(); 
            $('.s-title').removeClass('selected')
        }
    })
}


//전체선택
function Check() {
    // 전체 선택
    $(document).on('click', '.js-chk-all', function() {
        if ($(this).is(':checked')) {
            $(this).parents('.js-chk-wrap').find('.js-chk-item').prop('checked', true);
        } else {
            $(this).parents('.js-chk-wrap').find('.js-chk-item').prop('checked', false);
        }
    }).on('click', '.js-chk-item', function() {
        // 갯수 체크
        count = $(this).parents('.js-chk-wrap').find('.js-chk-item').filter(':checked').length,
        ChkLength = $(this).parents('.js-chk-wrap').find('.js-chk-item').length;
        if (count === ChkLength) {
            $(this).parents('.js-chk-wrap').find('.js-chk-all').prop('checked', true);
        } else {
            $(this).parents('.js-chk-wrap').find('.js-chk-all').prop('checked', false);
        }
    })
}

// 말줄임 title
$(document).on('mouseover', '.ellipsis > *', function(){
    $(this).attr('title', $(this).text());
}).on('mouseover', '.section-list > ul > li .l-cont a', function(){
    $(this).attr('title', $(this).text());
})//.on('mouseleave', '.table.st_list table tbody tr td', function(){
//    $(this).attr('title', $(this).text());
//})

// URL 복사 
function clip(){
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}

// table header
function addCellHeader(table) {
    if (!table) {
        return false;
    }
    var trs = table.getElementsByTagName('tr');
    var trsChild;
    var grid = {};
    var cells;
    for (var i = 0, cntI = trs.length; i < cntI; i++) {
        if (!grid[i]) {
           grid[i] = {};
        }
        trsChild = trs.item(i).childNodes;
        cells = 0
        for (var j = 0, cntJ = trsChild.length; j < cntJ; j++) {
            if (trsChild[j].nodeType == 1) {
                grid[i][cells++] = trsChild[j];
            } 
        }
    }
    var cellHeader = '';
    for (row in grid) {
        if (row == 0) {
            continue;
        }
        var _colSpan = 1;
        var spanCell = 0;
        var loopB = false;
        for (cell in grid[row]) {
            // 최초실행
            if( _colSpan == 0 ) {
                _colSpan = grid[0][cell].colSpan; 
                spanCell = cell; 
                cellHeader = grid[0][cell].innerHTML;
            }else if( _colSpan == 1 ) {  
                if ( loopB ) {
                    spanCell++;
                    _colSpan = grid[0][spanCell].colSpan; 
                    cellHeader = grid[0][spanCell].innerHTML;
                    
                }else{
                    _colSpan = grid[0][cell].colSpan; 
                    spanCell = cell; 
                    cellHeader = grid[0][cell].innerHTML;
                } 
            }else{ 
                --_colSpan;
                cellHeader = grid[0][spanCell].innerHTML;
                loopB = true;
            } 
            grid[row][cell].setAttribute('data-cell-header', cellHeader);
        }
    }
}

// 접근성 관련 포커스 강제 이동 
function accessibilityFocus() { 
    $(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){ 
        var next = $(e.target).attr('data-focus-next'), 
        prev = $(e.target).attr('data-focus-prev'), 
        target = next || prev || false; if(!target || e.keyCode != 9) { 
            return; 
        }               
        if((!e.shiftKey && !!next) || (e.shiftKey && !!prev)) { 
            setTimeout(function(){ 
                $('[data-focus="' + target + '"]').focus(); 
            }, 1); 
        } 
    }); 
}

// Tooltip Layer
function tooltipLayer() { 
    var openBtn = '[data-tooltip]', 
    closeBtn = '.js-tooltip-close'; 
    function getTarget(t) { 
        return $(t).attr('data-tooltip'); 
    } 
    function open(t) { 
        var showTarget = $('[data-tooltip-con="' + t + '"]'); 
        showTarget.show().focus(); 
        showTarget.find('.js-tooltip-close').data('activeTarget', t); 
    } 
    function close(t) { 
        var activeTarget = $('[data-tooltip-con="' + t + '"]'); 
        activeTarget.hide(); 
        $('[data-tooltip="' + t + '"]').focus(); 
    } 
    $(document) 
        .on('click', openBtn, function(e){ 
            e.preventDefault(); 
            open(getTarget(e.target)); 
            $(openBtn).addClass('active');
            if($(this).hasClass('js-fixed-layer')){
                $('body').addClass('fixed');
                if($(this).hasClass('js-dim')){
                    var hsearch = $(this).attr('data-tooltip');
                    $('body').addClass('dim');
                    if(hsearch == 'headerSearch'){
                        $('body').addClass('back');
                    }
                    if ($(this).parents('.layer-popup')) {
                        $(this).parents('.layer-popup').addClass('visibility');
                    }
                }
            }
        }) 
        .on('click', closeBtn, function(e) { 
            e.preventDefault(); 
            close($(this).data('activeTarget')); 
            $(openBtn).removeClass('active');
            $('body').removeClass('fixed dim back');
            
            if ($('.layer-popup').hasClass('visibility')) {
                $('body').addClass('fixed dim back');
                $('.layer-popup').removeClass('visibility');
            }
        }) 
}

// window popup
function windowPopup(url, name, size){
    var options = 'top=10, left=10, status=no, menubar=no, toolbar=no, resizable=no';
    window.open(url, name, size, options);
}

// Tab 2022.04.08 접근성 수정
$(document).ready(function() {
    /* 1) 초기값 */
	$('.js-tabs > ul > li a').removeAttr('tabindex').attr('title', '');
    $('.js-tabs > ul > li:first-of-type').addClass('active');
    $('.js-tabs > ul > li:first-of-type a').attr('title', '선택됨').parent().siblings().find().attr('title', '');
    $('.js-tabs > div').removeAttr('tabindex');
    $('.js-tabs > div:first-of-type').addClass('active').attr('title', '선택됨');
 

    //3) 탭 클릭 이벤트
    $('.js-tabs > ul > li a').on('click', function (e) {
        e.preventDefault();
        var $tg = $(this);
        activeOn($tg);
    });

    function activeOn($target) {
        $target.parent().addClass('active').find('a').attr('title', '선택됨').parent().siblings().removeClass('active').find('a').attr('title', '');
        $($target.attr('href')).addClass('active').attr('title', '선택됨').siblings('div').removeClass('active').attr('title', '');
    }
});

// Accodian 2022.03.18 추가
$(document).ready(function () {

    $(".c-menu .depth3 > li").each(function(){
        if($(this).hasClass('current')) {
            $(this).parents('.depth3').closest('li').addClass('active');
        } 
    })
    $('.c-menu .depth2 > li > button').on('keydown', function (e) {
        var key = e.keyCode;
        console.log(key);
        switch (key) {
            case 40: //아래 방향키 
                if($(this).hasClass('last')){ 
                    $(this).closest('.depth2').find('.first').focus();
                }else{
                    $(this).parent().next().next().children().focus();
                }
                break;
            case 38: //위 방향키
                if($(this).hasClass('first')){
                    $(this).closest('.depth2').find('.last').focus();
                }else{
                    $(this).parent().prev().prev().children().focus();
                }
                break;
            case 36: //HOME키
                e.preventDefault();
                $(this).closest('.depth2').find('.depth2 > li .first').focus();
                break;
            case 35: //END키   
                e.preventDefault(); 
                $(this).closest('.depth2').find('.depth2 > li .last').focus();
                break;
            case 13: //Enter키  
                var $tg = $(this);    
                $tg.trigger('click');
                accdOn($tg);
                break;
            case 32: //Spacebar키             
                $tg.trigger('click');
                accdOn($tg);
                break;
        }
    });

    $('.c-menu .depth2 > li > button').on('click',function(e) {
        e.preventDefault();
        var $tg = $(this);
        accdOn($tg);
    });
    function accdOn($target) {
        if(!$target.parent().hasClass('active')){
            //$target.attr({'aria-expanded':true, 'aria-disabled':true}).parent().addClass('active').siblings('li').removeClass('active').children().attr('aria-expanded',false).removeAttr('aria-disabled');
        	$target.attr({'aria-expanded':true}).parent().addClass('active').siblings('li').removeClass('active').children().attr('aria-expanded',false);
            $target.next().stop().slideDown('fast').parent().siblings('li').find('ul').stop().slideUp('fast');
        } else {
            //$target.parent().removeClass('active').children().attr('aria-expanded',false).removeAttr('aria-disabled');
        	$target.parent().removeClass('active').children().attr('aria-expanded',false);
            $target.next().stop().slideUp('fast');
        }
    }
    
    // border 추가
    /*
    $('#chkBookmark').next().on('click',function(e) {
    	$(this).is(':checked');
    	$(this).parents().toggleClass('active');
    });  */
    $('#chkBookmark').on('click',function(e) {
    	$(this).is(':checked');
    	$(this).parents().toggleClass('active');
    });
    
    // 동영상 재생 stop
	 $('.video-tabs > ul > li a').on('click', function(e){
		 var video = $('video');
		 video.each(function(){
			 this.pause();
		 });
         
	 });
    
     
    
    
});



/* 본문내용에 사업자등록번호 패턴이 있을경우 동적으로 링크를 생성한다 */
	//사업자등록번호 패턴 체크 (※'-'가 들어간 문자열도 함수 안에서 알아서 뺴고 체크한다)
	function checkCorporateRegiNumber(number){
		var numberMap = number.replace(/-/gi, '').split('').map(function (d){
			return parseInt(d, 10);
		});
		if(numberMap.length == 10){
			if (numberMap[0] == 0) {
				return false;
			}
			var keyArr = [1, 3, 7, 1, 3, 7, 1, 3, 5];
			var chk = 0;
			keyArr.forEach(function(d, i){
				chk += d * numberMap[i];
			});
			chk += parseInt((keyArr[8] * numberMap[8])/ 10, 10);
			return Math.floor(numberMap[9]) === ( (10 - (chk % 10) ) % 10);
		}
		return false;
	}
	function replaceBrno() {
		if ($(".view-body").length == 1) {
			var contents = $(".view-body").eq(0).html();

			//step1 : 1112233333 패턴 처리
			contents = contents.replace(/\b(\d{3})(\d{2})(\d{5})\b/g, ($0, $1, $2, $3) => '<span class="brnoHighlight" title="사업자등록번호 확장검색 팝업" brno="'+$1+$2+$3+'">'+$1+$2+$3+'</span>');

			//step2 : 111-22-33333 패턴 처리
			contents = contents.replace(/\b(\d{3})-(\d{2})-(\d{5})\b/g, ($0, $1, $2, $3) => '<span class="brnoHighlight" title="사업자등록번호 확장검색 팝업" brno="'+$1+$2+$3+'">'+$1+'-'+$2+'-'+$3+'</span>');

			//step3 : 원래 html에 replace한 html로 바꿔치기
			$(".view-body").eq(0).html(contents);
		}
	}
	function checkBrno() {
		var brnoObj = $(".brnoHighlight");
		for (i=0 ; i<brnoObj.length ; i++) {
			//console.log(brnoObj.eq(i).text() + ' : ' + checkCorporateRegiNumber(brnoObj.eq(i).text()));
			if (checkCorporateRegiNumber(brnoObj.eq(i).text()) == false) {
				brnoObj.eq(i).removeClass("brnoHighlight").removeAttr("title");
			}
		}
	}
	$(document).ready(function () {
		replaceBrno();	//사업자등록번호 패턴 일괄 변환
		checkBrno();	//실제 사업자등록번호인지 검증 (※본사전화번호 0432140799 같은 패턴을 사업자등록번호로 인식하는걸 방지)
		$('.brnoHighlight').on('click',function(e) {
			var popOption = 'top=100, left=100, width=900, height=700, status=no, menubar=no, toolbar=no, resizable=no';
			var popUrl = '/user/cmmn/popup/brno/selectBrnoPop.do?brno=' + $(this).attr('brno');
			window.open(popUrl, 'brnoPop', popOption);
		});
	});
/* //본문내용에 사업자등록번호 패턴이 있을경우 동적으로 링크를 생성한다 */