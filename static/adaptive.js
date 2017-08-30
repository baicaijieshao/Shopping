	
	//设定页面多适配方案---------------------------------------------
	var dpr,rem,scale;
	var docuE1 = document.documentElement;
	var fontE1 = document.createElement('style');
	var metaE1 = document.querySelector("meta[name='viewport']");
	//获取设备的dpr值
	dpr = window.devicePixelRatio || 1;
	//以clientWidth = 640，font-size = 10px 为基数
	rem = docuE1.clientWidth * dpr / 640 *10;
	scale = 1 / dpr;
	//设置viewport，设置动态缩放属性，达到高清效果
	metaE1.setAttribute('content',
						'width=' + dpr * docuE1.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale +
						',minimum-scale=' + scale + ',user-scalable=no');
	//设置data-dpr，以方便后面的css hack使用
	docuE1.setAttribute('data-dpr',dpr);
	//动态写入rem样式
	docuE1.firstElementChild.appendChild(fontE1);					
	fontE1.innerHTML='html{font-size:' + rem + 'px!important};';
			
	//设置rem和px之间的转换函数，方便计算
	window.px2rem = function(value){
		value = parseFloat(value);
		return value / rem ;
	}
	window.rem2px = function(value){
		value = parseFloat(value);
		return value * rem ;
	}
	window.rem = rem ;
	window.dpr = dpr ;
	
	// H5 plus事件处理---------------------------------------------------------
	function plusReady(){
		// 获取系统状态栏高度
		var lh = plus.navigator.getStatusbarHeight();
		return lh*plus.screen.scale;
		alert().log('Statusbar Height: '+lh*plus.screen.scale);
	}
	if(window.plus){
		plusReady();
	}else{
		document.addEventListener('plusready', plusReady, false);
	}
	//创建XMLHttpRequest对象
	function createXHR(){
		if( window.XMLHttpRequest ){
			return new XMLHttpRequest ;
		}else{
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	//名值对转换为数组
	function params(data){
		var arr= [] ;
		for (var i in data){
			arr.push( encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) );
		}
		return arr.join('&');
	}
	
	//封闭ajax---------------------------------------------------------------------
	function ajax(obj){
		var xhr = createXHR();
		obj.url = obj.url + '?rand='+ Math.random();
		obj.data = params(obj.data);
		if(obj.method === 'get'){
			obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data ;
		}
		
		xhr.onreadystatechange = function(){
			if( xhr.status == 200 && xhr.readyState == 4){
				obj.success(xhr.responseText);
			}
		}
		xhr.open(obj.method,obj.url,obj.async);
		if(obj.method === 'post'){
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(obj.data);
		}else{
			xhr.send();
		}	
	}

	//获取元素样式--------------------------------------------------------------
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	var personInfo =JSON.parse(localStorage.getItem('personInfo'));
	
	//获取标准格式日期时间函数---------------------------------------------------
	function addzero(obj){
		return obj < 10 ? '0'+ obj : obj ;
	}
	function nowtime(){
		var myDate = new Date();
		year = myDate.getFullYear();
		month = addzero(myDate.getMonth()+1);		//月份默认会是上个月，所以要加上1
		day = addzero(myDate.getDate());
		hour = addzero(myDate.getHours());
		minute = addzero(myDate.getMinutes());
		second = addzero(myDate.getSeconds());
		now = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second ;
		return now ;
	}
	//空格重赋值为null
	
	function isNull(obj){
		return obj === '' ? 'null' : obj ;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
