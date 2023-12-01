//브라우저
	var agent = navigator.userAgent.toLowerCase();
	var cmmBrowser = ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf('msie') != -1)) ? 'IE' : 'CROME';
	//cmmBrowser = IE:explore, CROME:기타 크롬,파이어폭스 등등
	var hpFrstCdList = new Array();
	var telFrstCdList = new Array();
	var nationAreNumCdList = new Array();


	var fnGoUrl = function(url, mngrMenuId){//메뉴이동
		//console.log('url: '+ url);
		//console.log('mngrMenuId: '+ mngrMenuId);
		$("#menuUrl").val(url);
		if(typeof mngrMenuId != 'undefined'){
			$("#mngrMenuId").val(mngrMenuId);
		}
		$("#defualtNavForm").attr("action",$("#menuUrl").val()).submit();
	}
	

	//공통 스크립트 함수
	var fnSetDate= function(date, format){ 
		var y = date.substr(0,4);
		var m = date.substr(4,2);
		var d = date.substr(6,2);
		var date = new Date(y, m-1, d);
		return fnSetDateFormat(date, format);
	}

	var fnGetToDay = function(format){//오늘 날짜 format ex) 20200101,2020-10-10
		var toDate = new Date();

		return fnSetDateFormat(toDate, format);
	}

	//더하거나 뺀 날짜 구하기
	//parameter data(증가또는 감소될 날 ex:-1),  format(날자 format  ex:-)
	var fnGetDate = function(data, format){
		var setDate = new Date();
		setDate.setDate(setDate.getDate()+parseInt(data));

		return fnSetDateFormat(setDate, format);
	}

	//더하거나 뺀 월 구하기
	//parameter data(증가또는 감소될 월 ex:-1),  format(날자 format  ex:-)
	var fnGetMonth = function(data, format){
		var setDate = new Date();
		setDate.setMonth(setDate.getMonth()+parseInt(data));

		return fnSetDateFormat(setDate, format);
	}

	//더하거나 뺀 년 구하기
	//parameter data(증가또는 감소될 월 ex:-1),  format(날자 format  ex:-)
	var fnGetYear = function(data, format){
		var setDate = new Date();
		setDate.setYear(setDate.getFullYear()+parseInt(data));

		return fnSetDateFormat(setDate, format);
	}


	//한달전 날짜 구하기
	//parameter data(증가또는 감소될 월 ex:-1),  format(날자 format  ex:-)
	var fnGetLastMonth = function(format){

		return fnGetMonth(-1, format);
	}


	//더하거나 뺀 날짜 구하기
	//parameter data(증가또는 감소될 날 ex:-1),  format(날자 format  ex:-)
	var fnGetDate = function(data, format){
		var setDate = new Date();
		setDate.setDate(setDate.getDate()+parseInt(data));

		return fnSetDateFormat(setDate, format);
	}

	var fnSetDateFormat = function(setDate, format){
		var fnSetDateString = function(date){
			if(String(date).length <2){
				date = '0'+date;
			}
			return date;
		}
		var year = setDate.getFullYear();
		var month = setDate.getMonth()+1;
		var date = setDate.getDate();

		month = fnSetDateString(month);
		date = fnSetDateString(date);

		var returnDate = String(year)+String(month)+String(date);
		if(typeof format != 'undefined'){
			returnDate = String(year)+format+String(month)+format+String(date);
		}
		return returnDate;
	}


	var fnComma = function (str) {// 숫자 콤마 처리 ex(111222333  >  111,222,333)
		str = String(str);
		var minus = str.substring(0, 1);
		str = str.replace(/[^\d^\.]+/g, '');

		var parts = str.toString().split(".");
		var result = parts[0].replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		if(str.indexOf(".") != -1) {
			if(parts[1]) {
				result = result + "." + parts[1];
			} else {
				result = result + ".";
			}
		}
		if(minus == "-") result = "-" + result;
	    return result;
	}

	var fnUncomma = function (str) {//콤마삭제처리  ex(111,222,333 	>  111222333)
		str = String(str);
		str = str.replace(/\,/g,"");
		return str;
	}

	var fnIsNull = function (value) {//null, empty check
		function isEmpty(str) {
		    return (!str || 0 === str.length);
		}

		function isBlank(str) {
		    return (!str || /^\s*$/.test(str));
		}

		if(isEmpty(value)) {
			return true;
		}
		if(isBlank(value)) {
			return true;
		}
		return false;
	}

	/**
	 * 왼쪽 또는 오른쪽에 문자 채움
	 * @param str		: 원본 문자
	 * @param charactor	: 채워질 문자
	 * @param isLeft		: Y:왼쪽, N:오른쪽
	 * @param padLength	: 총 문자수
	 */
	var fnLrPad = function (str, charactor, isLeft, padLength){
		str += "";
		while( str != "" && str.length<padLength){
			if(isLeft){
				str = charactor + str;
			}else{
				str = str + charactor;
			}
		}
		return str;
	}

	/**
	 * 왼쪽 채움
	 * @param str		: 원본 문자
	 * @param charactor	: 채워질 문자
	 * @param padLength	: 총 문자수
	 */
	var fnLPad = function (str, charactor, padLength){
		str += "";
		while( str != "" && str.length<padLength){
			str = charactor + str;
		}
		return str;
	}

	/**
	 * 오른쪽 채움
	 * @param str		: 원본 문자
	 * @param charactor	: 채워질 문자
	 * @param padLength	: 총 문자수
	 */
	var fnRPad = function (str, charactor, padLength){
		str += "";
		while( str != "" && str.length<padLength){
			str = str + charactor;
		}
		return str;
	}

	/**
	 * 앞뒤 공백 제거
	 */
	var fnTrim = function(){
		return this.replace(/(^\s*|\s*$|\n)/g,"");
	}

	/**
	 * 숫자 체크
	 */
	var fnIsNumber = function() {
		var expUrl	= /^[0-9]+$/;
		return expUrl.test(this);
	}

	/**
	 * URL 체크
	 */
	var fnIsUrl	= function() {
	 	var expUrl = /^(https?):\/\/[^\;\\\?\=\:\&]+(\.[\w\~\-]+)+/g;
		return expUrl.test(this);
	}

	/**
	 * 몇째자리 소수점 반올림
	 * @param val		: 값
	 * @param precision	: 몇째자리
	 */
	var fnRoundPrecision= function(val, precision){
		var p = this.pow(10, precision);
		return this.round(val*p)/p;
	}

	/**
	 * 문자열 바꾸기
	 * @param str	: 문자열
	 * @param orgStr	: 바꿀 문자열
	 * @param chgStr	: 바뀔 문자열
	 */
	var fnReplaceAll = function (str, orgStr, chgStr){
		 return str.replace(new RegExp(orgStr,"g"),chgStr);
	}

	/**
	 * NVL
	 * @param str	: 문자열
	 * @param chgStr	: 문자열 값이 없을 경우 바뀔 값
	 */
	var fnNvl = function (str,chgStr){
		if(str=="" || str==undefined){
			return chgStr;
		}else{
			return str;
		}
	}

	/**
	 * URL 인코딩
	 * @param url : URL
	 */
	var fnUrlEscape = function ( url ){
		if( ( typeof url ) == "undefined" || url== "" ) return;

		var str, ch;
		var bEncURI = "N";
		eval( "try{bEncURI=encodeURI('O');}catch(_e){ }" );
		if( bEncURI == "O" ) str=encodeURI(url);
		else str = escape(url);

		str=str.split("+").join("%2B");
		str=str.split("/").join("%2F");
		str=str.split("&").join("%26");
		str=str.split("?").join("%3F");
		str=str.split(":").join("%3A");
		str=str.split("#").join("%23");

		return str;
	}

	/**
	 * URL 파라미터 인코딩
	 * @param url : URL
	 */
	 var fnChangeParamEncodeURI = function (url){
		var arr1=url.split('&');
		for(var i=0;i<arr1.length;i++)
		{
			arrStr = arr1[i].split('=');
			if (i== 0){
				returnValue = arr1[i];
			}else{
				if(arrStr.length<2) {
			 		returnValue = returnValue +'&' + arr1[i];
				}else{
			  	  	returnValue = returnValue + '&' + arrStr[0] + '='+ encodeURI(arrStr[1]);
	     	  	}
		    }
	  	}
		return returnValue;
	}

	/**
	 * 왼쪽 공백 제거
	 * @param str : 문자열
	 */
	var fnLTrim = function (str){
	   	var whitespace = new String(" \t\n\r");
	  	var s = new String(str);
	   	if (whitespace.indexOf(s.charAt(0)) != -1) {
	      	var j=0, i = s.length;
	      	while (j < i && whitespace.indexOf(s.charAt(j)) != -1)
	         	j++;
	      	s = s.substring(j, i);
	   	}
	   	return s;
	}

	/**
	 * 오른쪽 공백 제거
	 * @param str : 문자열
	 */
	var fnRTrim = function (str){
	   	var whitespace = new String(" \t\n\r");
	   	var s = new String(str);
	   	if (whitespace.indexOf(s.charAt(s.length-1)) != -1) {
	      	var i = s.length - 1;       // Get length of string
	      	while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)
	         	i--;
	      	s = s.substring(0, i+1);
	   	}
	   	return s;
	}

	/**
	 * 공백 제거
	 * @param str : 문자열
	 */
	 var fnAllTrim = function (str) {
		return rTrim(lTrim(str));
	}

	var fnCurReturn = function (id, tp)
	{
		var str =  $("#"+id).val();
		var retVal = fnCheckStr(str, tp);
		$("#"+id).val(retVal);
	}

	/*
	알파벳+숫자만 반환(웹표준)
	tp : 0:숫자만, 1:숫자+영문, 2:숫자+'-'(전화번호), ....
	*/
	var fnCheckStr = function (str, tp)	
	{
		var check;
		var temp;
		var retVal = '';

		if (tp == 0){
			check = '1234567890';	//Num 	: onkeyup='fnCurReturn("111111", 0)'
		}else if (tp == 1){
			check = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';	//Eng
		}else if (tp == 2){
			check = '1234567890-'; //Tel, SSN, Zip 	: onkeyup='fnCurReturn("111111", 2)'
		}else if (tp == 3){
			check = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@:/-_.';	//Email 	: onkeyup='fnCurReturn("111111", 3)'
		}else if (tp == 4){
			check = '1234567890,';	//화폐단위 : onkeyup='fnCurReturn("111111", 4)'
		}else if (tp == 5){
			check = '1234567890.-';	//소수포함
		}else if (tp == 6){
			check = 'abcdefghijklmnopqrstuvwxyz0123456789';	//영문 소문자 & 숫자 id
		}else if (tp == 7){
			check = '1234567890.';	//숫자+소수
		}else if (tp == 8){
			check = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';	//아이디 체크 : 영문(대,소) + 숫자 + _, - : onkeyup='fnCurReturn("111111", 8)'
		}

		for (var i = 0; i < str.length; i++){
			temp = '' + str.substring(i, i+1);
			if (check.indexOf(temp) >= 0){
				retVal += temp;
			}
		}
		return retVal;
	}

	//이미지 파일 체크
	var fnChkImgFormat = function (imgPath){
	  var pattern;
	  pattern = /\.(gif|jpe?g|bmp|png)$/i;		//gif, jpg, jpeg 이미지 파일만 등록
	                                    // 이미지 추가 (gif|jpe?g|bmp|png)
	  if(!pattern.test(imgPath)){
	   return true;	//이미지 파일이 아닌경우
	  }

	  return false; //이미지 파일인 경우
	}


	//popup open
	//parameter array{url : 'url', width : '가로길이', height : '세로길이', scrollbars:'yes or no 필요시', parameters : {필요시:'값지정'}}
	//ex)	var param = {name : '김', a : '1' , b : '2', c : '3'};
	//	 	var popParam = {url : '/user/cmmn/popup/srch/selectNationPop.do' , width : '700' , height : '800' , scrollbars:'yes', parameters : param};
	//		openPop(popParam);
	var openPop = function(data){
		var popData = {width : (typeof data.width == 'undefined' ? '700' : data.width)
			    , height : (typeof data.height == 'undefined' ? '800' : data.height)
			    , scrollbars : (typeof data.scrollbars == 'undefined' ? 'yes' : data.scrollbars)
			    , url : data.url
			    , target : ((typeof data.target == 'undefined' || data.target == '' ) ? 'popUpForm' : data.target)
			    , parameters : (typeof data.parameters == 'undefined' ? {} : data.parameters)
			    };

		var offsetWidth = parseInt(document.body.offsetWidth)/2;
		var width = parseInt(popData.width) / 2;
		var popupX = offsetWidth - width;
		popupX += window.screenLeft;

		var offsetHeight = parseInt(document.body.offsetHeight) /2;
		var height = parseInt(popData.height) / 2;
		var popupY = offsetHeight - height;

		$("#popUpForm").remove();
		var popupForm = '<form action="'+popData.url+'" method="POST" id="popUpForm" target = "'+popData.target+'">'

		for(var paramKey in popData.parameters){
			if(typeof popData.parameters[paramKey] != 'undefined'){
				popupForm += '<input type="hidden" name="'+paramKey+'" value="'+popData.parameters[paramKey]+'"/>';
			}
		}

		popupForm += '</form>'
		$("body").append(popupForm);
		window.open('',popData.target,'width='+popData.width+', height='+popData.height+', left='+popupX+' top='+popupY+', scrollbars='+popData.scrollbars);
		$("#popUpForm").submit();
	}

	//국가검색 팝업
	//parameter {multiYn(다중선택여부) : 'N'(단일 선택) OR 'Y'(다중 선택) , natnChc(국내외선택) : 'N'(국내외선택 없음) OR 'Y'(국내외선택)}
	//=> natnChc(국내외선택) 은 사용안함.
	var openNationPop = function(data){
		/*
		var natnChc = typeof data != 'undefined' && typeof data.natnChc != 'undefined' ? data.natnChc.toLocaleUpperCase() : 'N';//기본 국내외선택없음
		var multiYn = typeof data != 'undefined' && typeof data.multiYn != 'undefined' ? data.multiYn.toLocaleUpperCase() : 'N';//기본 단일선택
		if(natnChc == 'Y'){
			multiYn = 'Y';
		}
		var param = {multiYn : multiYn, natnChc : natnChc};
	 	var popParam = {url : '/admin/cmmn/popup/srch/selectNationPop.do' , width : '1400' , height : '780' , scrollbars:'yes', parameters : param};
	 	*/
		var multiYn = typeof data != 'undefined' && typeof data.multiYn != 'undefined' ? data.multiYn.toLocaleUpperCase() : 'N';//기본 단일선택
		var param = {multiYn : multiYn};
		var popParam = {url : '/user/cmmn/popup/srch/selectNationPop.do' , width : '536' , height : '480' , scrollbars:'no', parameters : param};	
		
		openPop(popParam);
	}

	//국가검색 팝업 for RMS (※디펄트 유저 팝업 레이아웃을 사용할수 없다. 읽어들이는 css 및 js가 상이하다.)
	var openNationPopRms = function(data){
		var multiYn = typeof data != 'undefined' && typeof data.multiYn != 'undefined' ? data.multiYn.toLocaleUpperCase() : 'N';//기본 단일선택
		var param = {multiYn : multiYn};
		var popParam = {url : '/user/cmmn/popup/srch/selectNationRmsPop.do' , width : '536' , height : '480' , scrollbars:'no', parameters : param};	
		openPop(popParam);
	}	
	
	/**
	* 바이트 제한
	* @param obj     : all object
	* @param size   : 제한할 byte
	* @return
	*/
	var fnByteCheck= function(obj, size){
		if(getBytes(obj.val()) > size){
			//alert( " "+size+"byte 이상 입력할 수 없습니다.")
			size = Math.floor(size/3);
			alert( " "+size+"자 이상 입력할 수 없습니다.");
			return false
		}
		return true
	}

	/**
	* 스트링의 바이트 수를 센다(length를 하면 한글도 길이1로 나오는데 바이트 수는 2가 된다)
	* @param obj   : textfield ,textarea objec
	* @return 바이트 수
	*/
	var  getBytes = function( str ){
		var str = new String(str);
		var len = str.length;
		var count = 0;

		for (k=0 ; k<len ; k++){
			temp = str.charAt(k);

			if (escape(temp).length > 4) {
				count += 3;
			}
			else if (temp == '\r' && str.charAt(k+1) == '\n') { // \r\n일 경우
				count += 3;
			}
			else if (temp == '\r') { // \r일 경우
				count++;
			}
			else if (temp != '\n') {
				count++;
			} else {
				count++;
			}
		}
		return count;
	}


	/**
	* 첨부파일의 용량 체크
	* @param obj   : 첨부파일 객체
	* @return boolean
	*/
	var chkFileSize = function( obj ){
		// 최대 파일 용량
		var maxSize = 20 * 1024 * 1024; // 20메가
		// 파일 사이즈
		var fileSize = obj[0].files[0].size;

		if(maxSize < fileSize)
		{
			return false; // 용량 초과
		}
		else
		{
			return true
		}
	}

	/**
	* 첨부파일의 확장자 체크(일반파일)
	* @param obj   : 첨부파일 객체
	* @return boolean
	*/
	var chkFileExtNormal = function( obj ){
		var ext = obj.val().split('.').pop().toLowerCase();
		var chkArr = ['doc','docx','xls','xlsx','hwp','pdf','zip'];
		if($.inArray(ext, chkArr) == -1)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	* 첨부파일의 확장자 체크(이미지)
	* @param obj   : 첨부파일 객체
	* @return boolean
	*/
	var chkFileExtImg = function( obj ){
		var ext = obj.val().split('.').pop().toLowerCase();
		var chkArr = ['gif','png','jpg','jpeg','bmp'];
		if($.inArray(ext, chkArr) == -1)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	/**
	* 숫자제외한 나머지 문자 삭제
	* @param String : 객체 id
	* ex)
	*  $("#modDetailNm").on('keyup',function(){
	    	fnOnlyNumber('modDetailNm');
	   });
	*
	*/
	var fnOnlyNumber = function(id){
	    $("#"+id).val($("#"+id).val().replace(/[^0-9]/g,''));
	}
	
	/**
	* 숫자 및 알파벳 대문자 제외한 나머지 문자 삭제
	* @param String : 객체 id
	*/	
	var fnOnlyNumberAlphabetUpper = function(id){
	    $("#"+id).val($("#"+id).val().replace(/[^A-Z0-9]/g,''));
	}	

	//form영역 validation
	//input 또는 select의 required속성이 있는것 중 값이 없는것을 alert처리
	//param String : form Id
	var fnCheckValidationByFormId = function(id){
	    var title = '';
	    var name = '';
	    var emailTitle = '';
	    var emailName = '';
	    var minLength = '';

	    $("#"+id).find('input, select').each(function(){
	        if($(this).attr('required') == 'required' && $(this).is(':visible')){ //필수값 체크

	            if(($(this).attr('type') == 'text' || $(this).attr('type') == 'password' ) && $(this).val().trim().length == 0){
	                name = $(this).attr('name');
	                title = $(this).attr('titles');
	                if(title =='' || title == undefined){ title = $(this).attr('title');}
		            return false;
	            }else if(typeof $(this).attr('type') == 'undefined' && ($(this).val() == 'ALL' || $(this).val() == '') ){
	                name = $(this).attr('name');
	                title = $(this).attr('titles');
	                if(title =='' || title == undefined){ title = $(this).attr('title');}
		            return false;
	            }
	        }

	        if(typeof $(this).attr('email') != 'undefined'){  //이메일형식체크
	        	var reg_email= /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	        	if(!reg_email.test($(this).val()) && $(this).val().length > 0){
	        		emailName = $(this).attr('name');
	        		emailTitle = $(this).attr('titles');
	                if(emailTitle =='' || emailTitle == undefined){ emailTitle = $(this).attr('title');}
	        		return false;
	        	}
	        }

	        if($(this).attr("minlength") != undefined){
	        	if($("#" + $(this).attr("id")).val() != ''){
		        	if($("#" + $(this).attr("id")).val().length < $(this).attr("minlength")){
		        		minLength = $(this).attr('title') + "(은/는) " + $(this).attr("minlength") + "자리 이상 입력해 주세요.";
		        		emailTitle = $(this).attr('name');
		        		return false;
		        	}
	        	}
	        }

			if($(this).attr("submitsumvaluname") != undefined){
				var tagName = $(this).attr("id").substr(0, $(this).attr("id").length - 2);
				if($(this).is(':visible') && !$(this).is(':disabled')){
					var telNum = "";
					$("input").each(function(i){
	                	if($(this).attr('name') != 'undefined' && $(this).attr('name') != undefined){
							if($(this).attr("name").indexOf(tagName) >= 0){
								telNum += $(this).val();
							}
	                	}
					});

					$("input[name='" + $(this).attr("submitsumvaluname") + "']").val(telNum);
				}
			}
		});

	    if(name != ''){  //필수값 체크
	        alert(title + ' (을/를) 입력해주세요.');
	        $("[name='"+name+"']").focus();
	        return false;
	    }

	    if(emailName != ''){  //이메일형식체크
			alert(emailTitle+ " 형식이 잘못 되었습니다.");
			$("[name='"+emailName+"']").focus();
			return false;
		}

		if(minLength != ''){
			alert(minLength);
			$("[name='"+emailTitle+"']").focus();
			return false;
		}

	    return true;
	}

	//생성된 파일아이디 적용 (IE호환)
	var fnFileId = function(){
		var fileId = document.getElementById("atfiId").value;
		return fileId
	}

	var fnSearchAreaInit = function(){//검색영역 초기화 함수
		$(".sch_box, .sch_one").find('select,input').each(function(){
		    if(typeof $(this).attr('type') == 'undefined'){//selectbox
		        $("[name='"+$(this).attr('name')+"']").val($("[name='"+$(this).attr('name')+"'] option:eq(0)").val());
		    }else{//input
		        if($(this).attr('type') == 'text' || $(this).attr('type') == 'hidden'){
		        	if($(this).attr('class') == 'hasDatepicker'){		        		
		        		$(this).val(fnGetToDay("-"));
	                }else{
	                	$(this).val('');
	                }
		        }else if($(this).attr('type') == 'radio'){
		        	var tmpName = $(this).attr('name');
		        	$($("[name='"+tmpName+"']")[0]).prop('checked',true);
		        }
		    }
		});
	}


	var fnCreateHh = function(){//0~23 시각 가져오기
	    var array = new Array();
	    for(var i =0; i<24; i++){
	        array.push(i < 10 ? '0'+i : String(i));
	    }
	    return array;
	}

	var fnCreateMi = function(){//0~59 분 가져오기
	    var array = new Array();
	    for(var i =0; i<60; i++){
	        array.push(i < 10 ? '0'+i : String(i));
	    }

	    return array;
	}

	//스마트에디터 생성
	//fucntion (스마트에디터배열(oAppRef) ,TextArea(elPlaceHolder) , mode(true=edit, false=readonly))
	var fnEditor = function(oAppRef, elPlaceHolder, mode){

		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oAppRef, 				//oEditors명
			elPlaceHolder: elPlaceHolder, //"textArea명,
			sSkinURI: "/js/se2/SmartEditor2Skin.html",
			htParams : {
				bUseToolbar : mode,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : mode,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : mode,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
				fOnBeforeUnload : function(){
					//alert("완료!");
				}
			}, //boolean
			fOnAppLoad : function(){
				var editor = oAppRef.getById[elPlaceHolder];
				 if(mode == false){
					 editor.exec("DISABLE_WYSIWYG");
					 editor.exec("DISABLE_ALL_UI");
				 }
			},
			fCreator: "createSEditor2"
		});

	}

	//도로명주소 팝업호출
	var goJusoPopup = function(){
		// 주소검색을 수행할 팝업 페이지를 호출합니다.
		// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
		//var pop = window.open("/juso/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
		var pop = window.open("/juso/jusoPopupApi.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes"); 
		// 모바일 웹인 경우, 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(https://www.juso.go.kr/addrlink/addrMobileLinkUrl.do)를 호출하게 됩니다.
	    //var pop = window.open("/popup/jusoPopup.jsp","pop","scrollbars=yes, resizable=yes");
	}

	//도로명주소 팝업콜백
	var  jusoCallBack = function(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo){
		// 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
		document.form.roadFullAddr.value = roadFullAddr;
		document.form.roadAddrPart1.value = roadAddrPart1;
		document.form.roadAddrPart2.value = roadAddrPart2;
		document.form.addrDetail.value = addrDetail;
		document.form.engAddr.value = engAddr;
		document.form.jibunAddr.value = jibunAddr;
		document.form.zipNo.value = zipNo;
		document.form.admCd.value = admCd;
		document.form.rnMgtSn.value = rnMgtSn;
		document.form.bdMgtSn.value = bdMgtSn;
		document.form.detBdNmList.value = detBdNmList;
		/** 2017년 2월 추가제공 **/
		document.form.bdNm.value = bdNm;
		document.form.bdKdcd.value = bdKdcd;
		document.form.siNm.value = siNm;
		document.form.sggNm.value = sggNm;
		document.form.emdNm.value = emdNm;
		document.form.liNm.value = liNm;
		document.form.rn.value = rn;
		document.form.udrtYn.value = udrtYn;
		document.form.buldMnnm.value = buldMnnm;
		document.form.buldSlno.value = buldSlno;
		document.form.mtYn.value = mtYn;
		document.form.lnbrMnnm.value = lnbrMnnm;
		document.form.lnbrSlno.value = lnbrSlno;
		/** 2017년 3월 추가제공 **/
		document.form.emdNo.value = emdNo;

	}

	//업종검색 팝업
	var openTyindPop = function(data){
		var popParam = {url : '/user/cmmn/popup/srch/selectTyindPop.do' , width : '1400' , height : '730' , scrollbars:'yes', parameters : data};
		openPop(popParam);
	}

	/**
	 * 사업자번호 체크
	 * @param toCheck : 체크 할 사업자번호
	 */
	function checkSaupJa(toCheck) {
	    var isSaupJa = true;
	    if (toCheck.length < 10 || toCheck.length > 10) {
	        return false;
	    }
	    for (var j = 0; isSaupJa && (j < toCheck.length); j++) {
	        if (((toCheck.substring(j, j + 1) < "0") || (toCheck.substring(j, j + 1) > "9"))) {
	            isSaupJa = false;
	        }
	    }
	    return isSaupJa;
	}

	//사업자등록번호 포맷 입히기
	function fnBsnmRegNoFormat(bsnmRegNo) {
		bsnmRegNo = bsnmRegNo.trim().replace(/-/gi, "");
		var regNo = bsnmRegNo.substr(0, 3) + "-" + bsnmRegNo.substr(3, 2) + "-" + bsnmRegNo.substr(5, 5);
		return regNo;
	}

	//전화번호 및 팩스번호 포맷 입히기
	function fnTelNoFormat(obj, telNo) {
		telNo = telNo.trim().replace(/-/gi, "");
		var rtnTelNo = telNo.substr(0, 3) + "-" + telNo.substr(3, 4) + "-" + telNo.substr(7, 4);
		$('#' + obj).val(rtnTelNo);
	}

	//select box 생성
	var fnCmmCreateSelectBoxOpt = function(result, param){
		var codeHtml = typeof param.allText != 'undefined' ? '<option value="ALL">'+param.allText+'</option>' : '';
		for(var i in result){
			
			// 전화번호일 경우 code 값 예외 처리.
			// [20210216] 해외번호일 경우 처리가 필요할 수 있음.
			if(param.grpCd =='016' || param.grpCd =='017'){
				result[i].SCLAS_CODE = result[i].SCLAS_CODE.substr(4,3);
				if( result[i].SCLAS_CODE=='002' && param.grpCd =='017'){
					result[i].SCLAS_CODE = '02'
				}
				CODE = result[i].SCLAS_CODE;
			} else {
				CODE = result[i].CODE;
			}
			//console.log(param.id+' : param.data['+param.data+']=CODE['+CODE+']');
			if(typeof param.data != 'undefined' && param.data.split(' ').join('') == CODE.split(' ').join('')){
				if(param.resultType == "CODE"){
					codeHtml += '<option value="'+ CODE +'" selected="selected">'+result[i].SCLAS_CODE+ '</option>';
				}else{
					codeHtml += '<option value="'+ CODE +'" selected="selected">'+result[i].CODE_NM+ '</option>';
				}
			}else{
				if(param.resultType == "CODE"){
					codeHtml += '<option value="'+ CODE +'">'+result[i].SCLAS_CODE+ '</option>';
				}else{
					codeHtml += '<option value="'+ CODE +'">'+result[i].CODE_NM+ '</option>';
				}
			}

		}
		$('[name="'+param.id+'"]').html(codeHtml);
	}

	// 코드명 TEXT 셋팅
	var fnCmmSetCodeNmText = function(result, param){
		//console.log('==== fnCmmSetCodeNmText: ' + param.id + '['+ param.data +']');
		var codeHtml = '';
		for(var i in result){
			
			// 전화번호일 경우 code 값 예외 처리.
			// [20210216] 해외번호일 경우 처리가 필요할 수 있음.
			if(param.grpCd =='016' || param.grpCd =='017'){
				if( result[i].SCLAS_CODE=='02' && param.grpCd =='017'){
					CODE = result[i].SCLAS_CODE;					
				}else{
					CODE = '0' + result[i].SCLAS_CODE;
				}
			} else {
				CODE = result[i].CODE;
			}
			//console.log('!=== CODE: ' + CODE);
			if(typeof param.data != 'undefined' && param.data.split(' ').join('') == CODE.split(' ').join('')){
				//console.log('!=== NM: ' + result[i].CODE_NM);
				codeHtml += result[i].CODE_NM;
			}

		}
		$('#'+param.id).html(codeHtml);
	}
	
	
	

	//공통코드 리스트 조회 select box setting
	//param = String grpCd(그룹코드), String lclsCd(중분류코드), String id(selectbox name),String allText(전체 명), function custFuc(함수)
	var fnCmmNatnAreaList = function(param, custFuc){
/*		사용안함 : SELECT에서 INPUT TEXT로 변경함
		$.ajax({
			url:"/user/sys/code/selectNationAreaListAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				var result = data.result;
				var codeHtml = typeof param.allText != 'undefined' ? '<option value="ALL">'+param.allText+'</option>' : '';
				for(var i in result){
					if(typeof param.data != 'undefined' && param.data == result[i].code){
						codeHtml += '<option value="'+result[i].code+'" selected="selected">'+result[i].codeNm+'</option>';
					}else{
						codeHtml += '<option value="'+result[i].code+'">'+result[i].codeNm+'</option>';
					}

				}
				$('[name="'+param.id+'"]').html(codeHtml);
			}
		});
*/
	}

	//select box 초기화
	var fnCmmInitSelectBoxOpt = function(param){
			var divName = param.id;
			var allText = param.allText;
		$('[name="'+divName+'"]').children().remove();

		if(typeof allText != 'undefined' ){
			$('[name="'+divName+'"]').html('<option value="ALL">'+allText+'</option>');
		}
	}

	//공통코드 리스트 조회 select box setting
	//param = String grpCd(그룹코드), String lclsCd(중분류코드), String id(selectbox name),String allText(전체 명), function custFuc(함수)
	var fnCmmCodeList = function(param, custFuc){
		//console.log('fnCmmCodeList: code = '+ param.grpCd);
		$.ajax({
			url:"/user/sys/cmmnCode/selectCmmnCodeListAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				fnCmmCreateSelectBoxOpt(data.result, param);
			}
		});
	}

	//공통코드 텍스트 셋팅
	var fnCmmCodeNm = function(param, custFuc){
		//console.log('fnCmmCodeList: code = '+ param.grpCd);
		$.ajax({
			url:"/user/sys/cmmnCode/selectCmmnCodeListAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				fnCmmSetCodeNmText(data.result, param);
			}
		});
	}

	//공통코드 대분류 리스트 조회 select box setting
	//param = String grplist(그룹코드), String id(selectbox name),String allText(전체 명), function custFuc(함수), data(선택값)
	var fnCmmGrpCodeList = function(param, custFuc){
		var grplist = param.grplist;

		$.ajax({
			url:"/user/sys/cmmnCode/selectGrpCodeListAjax.do",
			type: "POST",
			async:true,
			data:{list : typeof grplist == 'string' ? grplist : grplist.valueOf().join()},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				fnCmmCreateSelectBoxOpt(data.result, param)
			}
		});
	}

	//공통코드 대분류 리스트 조회 select box setting
	//param = String grpCd(그룹코드), String divName(selectbox name),String allText(전체 명), function custFuc(함수)
	var fnCmmLcslCodeList = function(param, custFuc){
		//console.log('custFuc['+custFuc+']');
		var lclslist = param.lclslist;

		$.ajax({
			url:"/user/sys/cmmnCode/selectLclsCodeListAjax.do",
			type: "POST",
			async:true,
			data:{grpCd : lclslist},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				fnCmmCreateSelectBoxOpt(data.result, param);
			}
		});
	}

	//공통코드 대분류 명 조회 TEXT setting
	//param = String grpCd(그룹코드), String divName(selectbox name),String allText(전체 명), function custFuc(함수)
	var fnCmmLcslCodeNm = function(param, custFuc){
		//console.log('custFuc['+custFuc+']');
		var lclslist = param.lclslist;

		$.ajax({
			url:"/user/sys/cmmnCode/selectLclsCodeListAjax.do",
			type: "POST",
			async:true,
			data:{grpCd : lclslist},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(typeof custFuc != 'undefined' && typeof custFuc == 'function'){
					(custFuc(data));
				}

				fnCmmSetCodeNmText(data.result, param);
			}
		});
	}

	//코드 대, 중 ,소  구분 substr
	//clsDepth 0 == 대, 1 == 중, 2 == 소
	var fnCmmClsCodeSubStr = function(code, clsDepth){
		var depth =   Number(clsDepth) * 2;
		return code.substr(depth,2);
	}


	var fnCmmCntCodeList = function(param, cutFunct){
		$.ajax({
			url:"/user/sys/cmmnCode/selectCmmCntCodeListAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				var result = data.result;
				if(typeof cutFunct != 'undefined' && typeof cutFunct == 'function'){
					(cutFunct(result));
				}

			}
		});
	}

	var fnIdInit = function(id){//검색영역 초기화 함수
		$("#"+id).find('select,input').each(function(){
		    if(typeof $(this).attr('type') == 'undefined'){//selectbox
		        $("[name='"+$(this).attr('name')+"']").val($("[name='"+$(this).attr('name')+"'] option:eq(0)").val());
		    }else{//input
		        if($(this).attr('type') == 'text'){
		        	if($(this).attr('class') == 'hasDatepicker'){
		        		$(this).val(fnGetToDay("-"));
	                }else{
	                	$(this).val('');
	                }
		        }else if($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox'){
		        	var tmpName = $(this).attr('name');
		        	$($("[name='"+tmpName+"']")[0]).prop('checked',true);
		        }
		    }
		});
	}

	var fnSetCdNumList = function(){
		var param = {};
		$.ajax({
			url:"/user/sys/cmmnCode/selectCmmNumCodeListAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){

				if(data.result.hpList.length > 0){
					hpFrstCdList = new Array();
					$.each(data.result.hpList,function(){
						hpFrstCdList.push({code: this.code, codeNm : this.codeNm});
					});
				}

				if(data.result.telList.length > 0){
					telFrstCdList = new Array();
					$.each(data.result.telList,function(){
						telFrstCdList.push({code: this.code, codeNm : this.sclasCode});
					});
				}

				if(data.result.nationAreaList.length > 0){
					nationAreNumCdList = new Array();
					$.each(data.result.nationAreaList,function(){
						nationAreNumCdList.push({code: this.code, codeNm : this.areaCode});
					});
				}
			}
		});
	}

	var fnCustFormData = function(param){
		var form = param.form;
		var array = param.array;
		var data = param.data;
		if(array.length > 0){
			$.each(array, function(){
				var val = data;
				var code = this.code;
				var codeNm = this.codeNm;
				if(code.substr(0,4) =='0160' || code.substr(0,4) =='0170'){
					code = code.replace(code.substr(0,4),'');
					if(code =='002'){
						code = '02';
					}
					codeNm = code;
				}				
				if(val == code){//'hp'
					form.set(data, codeNm);
				}
			});
		}
	}

	var fnLogOut = function(){
		if(confirm('로그아웃 하시겠습니까?')){
			fnGoUrl('/user/cmmn/logout.do');
		}
	}

	var fnLogInTimeOut = function(){
		alert('정해진 시간동안 활동이 없어서 자동 로그아웃됩니다.');
		fnGoUrl('/user/cmmn/logout.do');
	}

	var fnCertProc = function(param){
		var rtnStr = false;
		$.ajax({
			url:"/user/cmmn/compn/sms/smsProcAjax.do",
			type: "POST",
			tranditional : true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			async:false,
			success : function(res) {
				if(typeof res.data == 'undefined'){
					return false;
				}else{
					if(res.data.result == "S"){
						alert(res.data.msg);
						rtnStr = true;
					}else{
						alert(res.data.msg);
						rtnStr = false;
					}
				}
			}
		});
		return rtnStr;
	}

	//인증번호 확인하기
	var fnCertCheckProc = function(param, custFunc){
		$.ajax({
			url:"/user/cmmn/compn/sms/smsCheckProcAjax.do",
			type: "POST",
			tranditional : true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			success : function(res) {
				if(res.data.result == "S"){
					if(typeof custFunc != 'undefined' && typeof custFunc == 'function'){
						(custFunc(res));
					}else{
						return true;
					}
				}else{
					if(typeof custFunc != 'undefined' && typeof custFunc == 'function'){
						(custFunc(res));
					}else{
						return false;
					}
				}
			}
		});
	}

	//숫자 포맷,추가
	var fnSetNumberComma = function(str){
	    str = String(str);
	    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
	}

	var fnAddBookMark = function(){//즐겨찾기 추가
		var pathname = window.location.href;
		if(fnGet_formParameter != ''){
			if(pathname.indexOf('?') < 0 ){
				pathname += '?' +  fnGet_formParameter;
			}
		}
		//alert("fnGet_formParameter["+fnGet_formParameter+"]"); // default-footer.jsp 에서 파라미터값 조절할 수 있음.
		
		var selectMenuNm = $($('input[name="selectMenuNm"]')[0]).val();
		if(selectMenuNm == undefined){// 등록메뉴가 아닌경우 타이틀가져오기
			selectMenuNm = $('.tit_area').find('h3').html();
		}		
		if(typeof $("#cntnsSn").val() != 'undefined' && $("#cntnsSn").val() != ''){
			selectMenuNm += ($("#cntnsSn").val().trim().length > 0 ? ' 상세' : ' 목록');
		}

		//게시글의 제목 추가 (전상현 20220114)
		var bkmkSjNm = $('h3.view-title').eq(0).html();

		var param = {bkmkNm : selectMenuNm
				   , bkmkPathNm : pathname
				   , bkmkSjNm : bkmkSjNm
				    };

		$.ajax({
			url:"/user/cmmn/compn/sms/addUserBookMarkAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(data.data.result == 'S'){

					var tmpHtml = '<li id="bookLi'+data.data.bkmkSn+'" ><span onclick="javascript:fnGoUrl(\''+pathname+'\');">'+selectMenuNm+'</span>';
				    tmpHtml += '<a href="javascript:void(0)" onclick="javascript:fnDellBookMark(this'+(typeof data.data.bkmkSn == 'undefined' ? '' : ',\''+data.data.bkmkSn+'\'')+');">삭제</a></li>';
					$(".book_con").append(tmpHtml);

					var tmpMobHtml = '<dd id="mBookLi'+$("#cntnsId").val()+'"><a href="javascript:void(0);" onclick="javascript:fnGoUrl(\''+pathname+'\');">'+selectMenuNm+'</a>';
					tmpMobHtml += '<a href="javascript:void(0);" class="book_del" onclick="javascript:fnDellBookMark(this'+(typeof data.data.bkmkSn == 'undefined' ? '' : ',\''+data.data.bkmkSn+'\'')+');">삭제</a>';
					tmpMobHtml += '</dd>';
				    $("#mBookConDt").append(tmpMobHtml);

					if(!$(".book_btn").hasClass('on')){
						$(".book_btn").addClass("on");
						$(".book_con").addClass("on");
						bookMarkStates = false;
					}
				}else if(data.data.result == 'L'){
					if(confirm(data.data.msg)){
						fnGoUrl('/user/cmmn/login.do');
					}
				}else{
					alert(data.data.msg);
				}
			}
		});
	};

	var fnDellBookMark = function(obj, seq){//즐겨찾기 삭제
		var param = {bkmkSn : seq};

		$.ajax({
			url:"/user/cmmn/compn/sms/delUserBookMarkAjax.do",
			type: "POST",
			async:true,
			data: param,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(data.data.result == 'S'){

					var bookLiId = "bookLi"+seq;
					var mBookLiId = "mBookLi"+seq;
					$("#"+bookLiId).remove();
					$("#"+mBookLiId).remove();

					if($(".book_con").children().length > 0){
						if(!$(".book_btn").hasClass('on')){
							$(".book_btn").addClass("on");
							$(".book_con").addClass("on");
							bookMarkStates = false;
						}
					}else{
						$(".book_btn").removeClass("on");
						$(".book_con").removeClass("on");
						bookMarkStates = true;
					}

				}else if(data.data.result == 'L'){
					if(confirm(data.data.msg)){
						fnGoUrl('/user/cmmn/login.do');
					}
				}else{
					alert(data.data.msg);
				}
			}
		});

	}

	//첨부파일 단건다운로드
	//fid = fileId *필수
	//vName = 파일명
	function fnDown(fId, odNum, vName) {

		//if(confirm("첨부된 파일을 다운로드 하시겠습니까?")){
			$("#fileZipDownForm").remove();
			// 새로운 form 생성
			var form = $('<form id="fileZipDownForm" target="downloadIframe"><iframe name="downloadIframe" id="downloadIframe" style="width:0px;height:0px;display:none;"></iframe></form>');
			form.attr('action', '/user/cmmn/compn/file/fileDownAjax.do');
			form.attr('method', 'post');
			form.appendTo('body');

			// 파라미터 셋팅
			var fileIndex = $("<input type='hidden' value='" + fId +   "' name='fileId'  />");
			var viewName  = $("<input type='hidden' value='" + vName + "' name='viewName'/>");
			var fileSn    = $("<input type='hidden' value='" + odNum + "' name='fileSn'  />");

			form.append(fileIndex);
			form.append(viewName);
			form.append(fileSn);

			form.submit();
		//}
	}
	
	// ZIP 파일 다운로드
	function fnDowns(fId) {

		//if(confirm("첨부된 파일을 ZIP 파일로 다운로드 하시겠습니까?")){
			$("#fileZipDownForm").remove();
			// 새로운 form 생성
			var form = $('<form id="fileZipDownForm"></form>');
			form.attr('action', '/user/cmmn/compn/file/zipFileDownAjax.do');
			form.attr('method', 'post');
			form.appendTo('body');

			// 파라미터 셋팅
			var fileIndex = $("<input type='hidden' value=" + fId + " name='fileId' />");

			form.append(fileIndex);

			form.submit();
		//}
	}

	//dataParam = {formId : '폼아이디'};
	var fnFile2FormData = function(param){
		var formId = param.formId;

		var form = $('#'+formId)[0];
		var formData = new FormData(form);

		if(!fnIsNull(imgFileList) || imgFileList.length == 0) {

			fnInitImgFile();

			var uploadImgFileList = Object.keys(imgFileList);

			// 등록할 파일리스트를 formData 로 입력
			for(var i = 0; i < uploadImgFileList.length; i++) {
				formData.append('imgFile_' + i, imgFileList[uploadImgFileList[i]], imgFileList[uploadImgFileList[i]].name);
			}
		}

		if(!fnIsNull(fileList) || fileList.length == 0) {

			fnInitAttFile();

			var uploadFileList = Object.keys(fileList);

			// 등록할 파일리스트를 formData 로 입력
			for(var i = 0; i < uploadFileList.length; i++) {
				formData.append('file_' + i, fileList[uploadFileList[i]], fileList[uploadFileList[i]].name);
			}
		}

		return formData;
	}

	var fnSnsView = function(){
		$("#snsPopup").is(':visible') ? $("#snsPopup").hide() : $("#snsPopup").show();
	}

	var fnSns = function(val, params){
		//var pathName = fnCopyUrl();		
		var pathName = window.location.href;

		if(pathName.indexOf("?") > 0 ){
			tmp = nowUrl.split("?");
			pathName = tmp[0];
		}

		if(params){
			pathName += '?'+ params;
		}
		//console.log('pathName: '+ pathName);

		var strTitle = $('.view-title').text();
		if(strTitle == '' || strTitle == undefined || strTitle == 'undefined'){
			strTitle = $('.tit_area h3').text();
		}
		var strURL = pathName;

		$.ajax({
			url:"/user/cmmn/snsShareAjax.do",
			type: "POST",
			data: {
				params	: params,
				snsTy 	: val,
				title 	: strTitle,
				cnrsUrl : strURL
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			tranditional : true,
			success:function(data){
				if(data.resultType == "S"){
					if(data.snsTy == 'kakao'){
						sendKakaoTalk(strTitle, strURL);
					}else if(val =='link'){
						copy_clip(data.params);
					}else{
						window.open(data.linkUrl);
					}
				}else{
					alert("공유처리에 실패 하였습니다.");
				}
			}
		});
/*
		if(val == 'twit'){
			snsLink = "http://twitter.com/share?text="+ encodeURIComponent(strTitle) + "&url=" + encodeURIComponent(strURL);
			window.open(snsLink);
		}else if(val == 'face'){
			snsLink = "http://www.facebook.com/share.php?u=" + encodeURIComponent(strURL) + "&t="+ encodeURIComponent(strTitle);
			window.open(snsLink);
		}else if(val == 'kakao'){
			sendKakaoTalk(strTitle, strURL);
		}else if(val == 'blog'){
			snsLink = "http://blog.naver.com/openapi/share?url=" + encodeURIComponent(strURL) + "&title=" + encodeURIComponent(strTitle);
			window.open(snsLink);
		}else if(val == 'band'){
			snsLink = "http://band.us/plugin/share?body=" + encodeURIComponent(strTitle) + "&route=" + encodeURIComponent(strURL);
			window.open(snsLink);
		}else if(val =='link'){
			copy_clip(params);
		}
*/
		$('.btn_sns').trigger('click');
	}
	
//	// 사용할 앱의 JavaScript 키를 설정해 주세요.
//    Kakao.init('158f27a85891939fb0d8c04d80319925');
    function sendKakaoTalk(strTitle, strURL) {
    	alert("방화벽문제로 카카오링크는 오픈 후 사용 가능합니다.")
//    Kakao.Link.sendDefault({
//      objectType: 'feed',
//      content: {
//        title: strTitle,
//        description: '', //strTitle,
//        imageUrl: '',    // 이미지 비율 마춰야 함. 가로세로 1:1  ,max 2:1 ,   800px:800px;
//        link: {
//          mobileWebUrl: strURL,
//          webUrl: strURL,
//        },
//      },
//    })
    }

    var copy_clip = function(params) {
        var strURL = window.location.href;

		if(strURL.indexOf("?") > 0 ){
		    tmp = nowUrl.split("?");
		    strURL = tmp[0];
		}        
        if(params){
        	strURL += '?'+ params;
        }
        var IE = (document.all) ? true : false;
        if (IE) {
            window.clipboardData.setData("Text", strURL);
            alert("이 글의 URL이 클립보드에 복사되었습니다.");
        } else {
            temp = prompt("이 글의 URL입니다. Ctrl+C를 눌러 클립보드로 복사하세요", strURL);
        }
    }    
    
	
/*	
	var fnCopyUrl = function(){

		var pathname = $(location).attr('href');
		console.log('pathname='+ pathname);
		if($("#cntnsId").val() != 'undefined'){
			pathname += (pathname.indexOf('cntnsId') < 0 ?  '?cntnsId='+$("#cntnsId").val() : '');
		}
		if(typeof $("#cntnsSn").val() != 'undefined'){
			pathname += ($("#cntnsSn").val().trim().length > 0 ? '&cntnsSn='+$("#cntnsSn").val() : '');
		}

		
		$("body").append('<input type="text" id="dummyDivDontRemove" style="position:absolute;top:0;left0;width:10x;heigth:1px;margin:0;padding:0;border:0;" value="'+pathname+'">');

		$("#dummyDivDontRemove").select();
		document.execCommand('copy');
		$("#dummyDivDontRemove").remove();
		return pathname;
	}
*/	
	
	
	//dataParam = {formId : '폼아이디', fileId : [{fileId:'파일아이디'},{fileId:'파일아이디'}]};
	var fnFileMultiFormData = function(param){
		var formId = param.formId;
		var fileId_list = param.fileId;
		var form = $('#'+formId)[0];
		var formData = new FormData(form);
		
		// Max 5개 파일 업로드 영역 설정함.
		if(fileId_list.length >= 1){
			if(!fnIsNull(fileList1) || fileList1.length == 0) {
				fnInitAttFile1();
				var uploadFileList1 = Object.keys(fileList1);
				var headTitle = "";
				if(fileListType1 == "imgFileId"){headTitle = "imgFile"}else{headTitle = "multiFile"}
				for(var i = 0; i < uploadFileList1.length; i++) {
					formData.append(headTitle + '1_' + i, fileList1[uploadFileList1[i]], fileList1[uploadFileList1[i]].name);
					//console.log('headTitle: '+ headTitle + '1_' + i + ' ----- ' + fileList1[uploadFileList1[i]].name);
				}
			}
		}
		if(fileId_list.length >= 2){	
			if(!fnIsNull(fileList2) || fileList2.length == 0) {
				fnInitAttFile2();
				var uploadFileList2 = Object.keys(fileList2);
				if(fileListType2 == "imgFileId"){headTitle = "imgFile"}else{headTitle = "multiFile"}
				for(var i = 0; i < uploadFileList2.length; i++) {
					//console.log('headTitle: '+ headTitle);
					formData.append(headTitle + '2_' + i, fileList2[uploadFileList2[i]], fileList2[uploadFileList2[i]].name);
					//console.log('headTitle: '+ headTitle + '2_' + i + ' ----- ' + fileList2[uploadFileList2[i]].name);
				}
			}
		}
		if(fileId_list.length >= 3){
			if(!fnIsNull(fileList3) || fileList3.length == 0) {
				fnInitAttFile3();
				var uploadFileList3 = Object.keys(fileList3);
				if(fileListType3 == "imgFileId"){headTitle = "imgFile"}else{headTitle = "multiFile"}
				for(var i = 0; i < uploadFileList3.length; i++) {
					//console.log('headTitle: '+ headTitle);
					formData.append(headTitle + '3_' + i, fileList3[uploadFileList3[i]], fileList3[uploadFileList3[i]].name);
					//console.log('headTitle: '+ headTitle + '3_' + i + ' ----- ' + fileList3[uploadFileList3[i]].name);
				}
			}
		}
		if(fileId_list.length >= 4){	
			if(!fnIsNull(fileList4) || fileList4.length == 0) {
				fnInitAttFile4();
				var uploadFileList4 = Object.keys(fileList4);
				if(fileListType4 == "imgFileId"){headTitle = "imgFile"}else{headTitle = "multiFile"}
				for(var i = 0; i < uploadFileList4.length; i++) {
					formData.append(headTitle + '4_' + i, fileList4[uploadFileList4[i]], fileList4[uploadFileList4[i]].name);
				}
			}
		}
		if(fileId_list.length >= 5){	
			if(!fnIsNull(fileList5) || fileList5.length == 0) {
				fnInitAttFile5();
				var uploadFileList5 = Object.keys(fileList5);
				if(fileListType5 == "imgFileId"){headTitle = "imgFile"}else{headTitle = "multiFile"}
				for(var i = 0; i < uploadFileList5.length; i++) {
					formData.append(headTitle + '5_' + i, fileList5[uploadFileList5[i]], fileList5[uploadFileList5[i]].name);
				}
			}
		}
		
		return formData;
	}

	var openRmsPage = function(){
		window.open('/user/R/RM/RMS000_L01.do','RMS_CONTENTS','');
	}

//금지어 체크
var checkPrhbWord = function(textareaId){
	
	var checkFlag = false;
	var contents = $.trim($('#'+textareaId).val());
	if (contents != '') {
		$.ajax({
			url:"/user/prhbWord/checkPrhbWord_Ajax.do",
			type: "POST",
			async: false,	//동기식으로 처리해야 한다. 비동기가 아닌 순차적으로 유효성 체크를 해야 함으로...
			tranditional : true,
			data: { "contents" : contents },
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			error : function(request, status, error) {
				//alert("조회중 에러가 발생하였습니다.");
			},
			success : function(data) {
				if(data.result == 'E'){
					//alert("조회중 오류가 발생하였습니다.");
				}else{
					if (data.result == null || data.result == '') {
						//console.log('금지어 없음');
					} else {
						for (let i=0 ; i<data.result.length ; i++) {
							//console.log('금지어['+i+'] : '+data.result[i]);
						}
						alert('입력하신 내용에 금지어 [' + data.result + '](이)가 포함되어 있습니다.');
						checkFlag = true;
					}
				}
			}
		});
	}
	return checkFlag;
}

var fnChangeStatus = function(code, type){
	if($("[name='contentsCheck']:checked").length == 0){
		alert('적용할 목록을 선택해 주세요.');
		return;
	}else{
		var codeMsg = '';
		switch(code){
			case '0450002' : codeMsg = '등록'; break;
			case '0450001' : codeMsg = '접수완료'; break;
			case '0450003' : codeMsg = '반려'; break;
			case 'Y' : codeMsg = '공개'; break;
			case 'N' : codeMsg = '비공개'; break;
		}

		var cfnMsg = '선택 게시물을 상태를 ['+codeMsg+']로\r\n변경 하시겠습니까?';
		if(type != 'status'){
			cfnMsg = code == 'Y' ? '선택 게시물을 상태를 ['+codeMsg+']로\r\n변경 하시겠습니까?\r\n[승인]된 게시물만 [공개]로 변경 됩니다.' : '선택 게시물을 상태를 ['+codeMsg+']로\r\n변경 하시겠습니까?'
		} else {
			cfnMsg += "\r\n공개여부가 [공개]인 게시물은 [비공개]로 변경됩니다.";
		}

		if(confirm(cfnMsg)){
			var cmmnContentArray = new Array();
			$("[name='contentsCheck']:checked").each(function(){
				cmmnContentArray.push({cntnsId : $("#cntnsId").val(),	seq : $(this).val(), type : type, val : code });
			});

			var tmpSeq = '';
			$.each(cmmnContentArray,function(i){
				tmpSeq += (i == 0 ? '' : ',') +this.seq;
			});

			var hiddenInputHtml = '';
			if($("[id='searchStatus']").length == 0){
				hiddenInputHtml += '<input type="hidden" id="searchStatus" name="searchStatus" value="">';
			}
			if($("[id='searchStatusVal']").length == 0){
				hiddenInputHtml += '<input type="hidden" id="searchStatusVal" name="searchStatusVal" value="">';
			}

			if(hiddenInputHtml != ''){
				$("#paramForm").append(hiddenInputHtml);
			}

			$("#searchStatus").val(cmmnContentArray[0].type);
			$("#searchStatusVal").val(cmmnContentArray[0].val);
			$("#cntnsSn").val(tmpSeq);

			$.ajax({
				url:"/user/univ/bbs/bbsStatusUpdateAjax.do",
				type: "POST",
				tranditional : true,
				data: $("#paramForm").serialize(),
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				dataType: "JSON",
				success : function(data) {
					if(data.result == 'S'){
						alert("수정 되었습니다.");
						fnGoPage($("#pgNo").val());
					}else{
						alert("처리중 오류가 발생하였습니다.");
					}

				}
			});
		}
	}
}

var fnDelete = function(formId, url){
	if(url == "" || url == undefined){
		url = "/user/univ/bbs/deleteBbsAjax.do";
	}
	
	if($("#rmsCntnsId").val().trim().length > 0){
		$("#cntnsId").val($("#rmsCntnsId").val().trim());
	}
	//console.log("formId="+formId);
	//console.log("url="+url);
	//console.log("cntnsId="+$("#cntnsId").val());
	
	if(confirm('해당 게시물을 삭제 하시겠습니까?')){
		$.ajax({
			url:url, //"/user/univ/bbs/bbsStatusUpdateAjax.do",
			type: "POST",
			tranditional : true,
			data: $("#"+formId).serialize(),
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "JSON",
			success : function(data) {
				if(data > 0){
					alert("삭제되었습니다.");
					fnGoList();
				}else{
					alert("처리중 오류가 발생하였습니다.");
				}

			}
		});
	}
}
	var getLoadingTimes = function() {
		var ntime = performance.timing;
		
		//var total = ntime.loadEventEnd - ntime.navigationStart; //전체 소요시간
		//var redirect = ntime.redirectEnd - ntime.redirectStart; // 동일 origin에서의 redirect 시간
		//var cache = ntime.domainLookupStart - ntime.fetchStart; // cache 시간
		//var dnslookup = ntime.domainLookupEnd - ntime.domainLookupStart; //DNS Lookup 시간
		//var connect = ntime.connectEnd - ntime.connectStart; // 웹서버 연결 시간
		var request = ntime.responseStart - ntime.requestStart; // 요청 소요 시간
		//var response = ntime.responseEnd - ntime.responseStart; // 응답 데이터를 모두 받은 시간
		//var dom = ntime.domComplete - ntime.domLoading; // DOM객체 생성 시간 *******************
		//var load = ntime.loadEventEnd - ntime.loadEventStart; // 브라우저의 Load 이벤트 실행시간
		//var pageEnd = ntime.loadEventEnd - ntime.responseEnd; // 서버에서 페이지를 받고 페이지를 로드하는데 걸린 시간
		//var networkDelay = ntime.responseEnd - ntime.fetchStart; // 네트워크 지연 시간
		
		//console.log("전체 소요시간 : " + total + "ms");
		//console.log("웹서버 연결 시간 : " + connect + "ms");
		console.log("로딩타임 : " + fnComma(request) + " ms");
		//console.log("response : " + response + "ms");
		//console.log("DOM 완료 : " + dom + "ms");
		//console.log("이벤트 실행시간 : " + load + "ms");
		//console.log("페이지를 로드 : " + pageEnd + "ms");
	}