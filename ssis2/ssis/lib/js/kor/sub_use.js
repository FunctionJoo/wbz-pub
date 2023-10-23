( function( $ ) {
	$( document ).ready(function() {
		$('#left_menu > ul > li > a').click(function() {
		  $('#left_menu li').removeClass('active');
		  $(this).closest('li').addClass('active');	
		  var checkElement = $(this).next();
		  console.log(checkElement);
		  /*if((checkElement.is('ul')) && (checkElement.is(':visible'))) {console.log(1);
			$(this).closest('li').removeClass('active');
			checkElement.slideUp('normal');
		  }*/
		  if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {console.log(2);
			$('#left_menu ul ul:visible').slideUp('normal');
			checkElement.slideDown('normal');
		  }
		  if($(this).closest('li').find('ul').children().length == 0) {
			return true;
		  } else {
			  if($(this).attr('href')!=""){ location.href = $(this).attr('href');}
			return false;	
		  }		
		});
	});
} )( jQuery );