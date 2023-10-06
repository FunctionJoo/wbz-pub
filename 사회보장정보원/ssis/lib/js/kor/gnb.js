jQuery(function($){
	// LNB
/*
	$('.lnb>ul>li').mouseover(function() {
		var menu_id = $(this).attr('class');
		//alert(menu_id);
		$('.lnb>ul>li').children('ul').hide();
		$('.lnb>ul>li').children('.s'+menu_id).show();
		$('.lnb>ul>li').children('span').removeClass('active');
		$(this).children('span').addClass('active');
	});
	$('.lnb>ul>li>ul>li').mouseover(function() {
		var sub_id = $(this).attr('class');
		//alert(sub_id);
		$('.lnb>ul>li>ul>li').removeClass('active');
		$(this).addClass('active');
	});
	$('.lnb>ul>li').focusin(function() {
		var smenu_id = $(this).attr('class');
		$('.lnb>ul>li').children('ul').hide();
		$('.lnb>ul>li').children('.s'+smenu_id).show();
		$('.lnb>ul>li').children('span').removeClass('active');
		$(this).children('span').addClass('active');
	});

	// NOWLNB
	var tab = $('.tab_face');
	tab.removeClass('js_off');
	function onSelectTab(){
		var t = $(this);
		var myclass = [];
		t.parentsUntil('.tab_face:first').filter('li').each(function(){
			myclass.push( $(this).attr('class') );
		});
		myclass = myclass.join(' ');
		if (!tab.hasClass(myclass)) tab.attr('class','tab_face').addClass(myclass);
	}
	tab.find('li>a').mouseover(onSelectTab).focus(onSelectTab);
*/
	
		
			
/*
		$('.lnb_all>a').focusin(function() {
			lnbHr.find('>ul>li>ul').hide();
			lnbHr.animate({height:'40px'}, 0.0001);
			lnbHr.find('ul').removeClass('active').end();
			lnbHr.find('li').removeClass('active').end();
			$('.lnb_all>a').addClass('active').end();
		});				
*/
		
	});
	
	$(function(){
		var gnbHr = $('.gnb');
		
		gnbHr.find('>ul>li>ul').hide();
		gnbHr.find('>ul>li>a')
			.mouseover(function(){
				gnbHr.animate({height:'364px'}, 0.0001);
				gnbHr.find('>ul>li>div>ul').slideDown(0.0001).end();
				gnbHr.find('>ul>li').removeClass('active').end();
				gnbHr.find('>ul>li>div>ul').removeClass('active').end();
				gnbHr.find('>ul>li>div>ul>li').removeClass('active').end();
				$(this).parent('li').addClass('active');
				$(this).parent('li').find('ul').addClass('active');
				$('.gnb_bg').show();
			})
			.focus(function(){
				$(this).mouseover();
			})
			.end()
			.mouseleave(function(){
				gnbHr.animate({height:'56px'}, 0.0001);
				gnbHr.find('>ul>li').removeClass('active').end();
				gnbHr.find('>ul>li>div>ul').removeClass('active').end();
				gnbHr.find('>ul>li>div>ul>li').removeClass('active').end();
				gnbHr.find('>ul>li>div>ul').slideUp(0.0001);
				$('.gnb_bg').hide();
			});
		gnbHr.find('>ul>li>div>ul>li>a')
			.mouseover(function(){
				gnbHr.find('ul').removeClass('active').end();
				gnbHr.find('li').removeClass('active').end();
				$(this).parent('li').addClass('active').end();
				$(this).parent('li').parent('ul').addClass('active').end();
				$(this).parent('li').parent('ul').parent('div').parent('li').addClass('active').end();
			})
			.focus(function(){
				$(this).mouseover();
			})
			.end()
			.mouseleave(function(){
				gnbHr.animate({height:'56px'}, 0.0001);
				gnbHr.find('ul').removeClass('active').end();
				gnbHr.find('li').removeClass('active').end();
			});
			
			gnbHr.find('>ul>li>div>ul>li:last').addClass('last');
		
			gnbHr.find('>ul>li>div>ul>li.last').on('focusout', function(){
				$(this).mouseleave();
			});
		
	});

	
	/*var fontIndex = jQuery.cookie('webFontSize') ? jQuery.cookie('webFontSize') : 1;

	function setFontSizeClass() {
	$('body').removeClass(function(index,class_list_str){
		var class_list = class_list_str.split(' ');
		for(var i = 0 ; i < class_list.length ; i ++) {
			var cls = class_list[i];
			if(cls.match(/websize\-[0-9]+/)) {
				return cls;
			}
		}
	}).addClass('websize-' + fontIndex);
	jQuery.cookie('webFontSize', fontIndex, { path: '/' });
	}
	function js_font_plus(){
	if(fontIndex >= 5) return;
	fontIndex++;
	setFontSizeClass();
	}
	function js_font_minus(){
	if(fontIndex <= 1) return;
	fontIndex--;
	setFontSizeClass();
	}

	jQuery(function() {
		if(jQuery.cookie('webFontSize'))
			$('body').addClass('websize-' + fontIndex);
	});*/
	
	/* Star Zoom Control */
	var Browser = { a : navigator.userAgent.toLowerCase() };    
    Browser = {
            ie : /*@cc_on true || @*/ false,
            ie6 : Browser.a.indexOf('msie 6') != -1,
            ie7 : Browser.a.indexOf('msie 7') != -1,
            ie8 : Browser.a.indexOf('msie 8') != -1,
            opera : !!window.opera,
            safari : Browser.a.indexOf('safari') != -1,
            safari3 : Browser.a.indexOf('applewebkit/5') != -1,
            mac : Browser.a.indexOf('mac') != -1,
            chrome : Browser.a.indexOf('chrome') != -1,
            firefox : Browser.a.indexOf('firefox') != -1
        };    
    
    // 기본 Zoom
    var nowZoom = 100;
    // 최대 Zoom
    var maxZoom = 120;
    // 최소 Zoom
    var minZoom = 90;
    // 조절 비율
    var setZoom = 5;
    
    // 화면크기 확대
    var jsBrowseSizeUp = function() {
        
        if( Browser.chrome ) {
            if( nowZoom < maxZoom ) {
                nowZoom += setZoom; // 5%씩 증가
                document.body.style.zoom = nowZoom + "%";
            }
            else{
                alert('최대 확대입니다.');
            }
        }
        else if( Browser.opera ) {
            alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else if( Browser.safari || Browser.safari3 || Browser.mac ) {
            alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else if( Browser.firefox ) {
            alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else {
            if( nowZoom < maxZoom ) {
                nowZoom += setZoom; //5%씩 증가
                document.body.style.position = "relative";
                document.body.style.zoom = nowZoom + "%";
            }
            else{
                alert('최대 확대입니다.');
            }
        }
    };
    
    // 화면크기 축소
    var jsBrowseSizeDown = function() {
        
        if( Browser.chrome ) {
            if( nowZoom > minZoom ) {
                nowZoom -= setZoom; //5%씩 증가
                document.body.style.zoom = nowZoom + "%";
            }
            else{
            	alert('최소 축소입니다.');
            }
        }
        else if( Browser.opera ) {
            alert('오페라는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else if( Browser.safari || Browser.safari3 || Browser.mac  ) {
            alert('사파리, 맥은 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else if( Browser.firefox ) {
            alert('파이어폭스는 화면크기 기능을 지원하지 않습니다.\n브라우저 내의 확대/축소 기능을 이용하시기 바랍니다.');
        }
        else {
            if( nowZoom > minZoom ) {
                nowZoom -= setZoom; //5%씩 증가
                document.body.style.position = "relative";
                document.body.style.zoom = nowZoom + "%";
            }
            else{
                alert('최소 축소입니다.');
            }
        }
    };

    // 화면크기 원래대로(100%)
    var jsBrowseSizeDefault = function() {        
        nowZoom = 100;
        document.body.style.zoom = nowZoom + "%";
    };
    /* End Zoom Control */
