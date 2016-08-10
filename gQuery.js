function _g(){
	this.userDev = navigator.userAgent;
};
_g.prototype = {

	// 是否为数组
	// @param aObj
	isArray: function(aObj) {
		if(typeof Array.isArray === "function") {  
			return Array.isArray(aObj);      
		}
		else {
			return Object.prototype.toString.call(aObj) === "[object Array]";      
		}
	},

	// 深度克隆
	deepClone: function(aObj) {
		var o = aObj instanceof Array ? [] : {};
		for(var k in aObj) {
			o[k] = typeof aObj[k] === Object ? deepClone(aObj[k]) : aObj[k];
		}
		return o;
	},

	// 文件下载
	// @param fileName
	// @param fileUrl 文件路径
	fileDownLoad: function(fileName, fileUrl) {
		var aLink = document.createElement("a"),
			evt = document.createEvent("HTMLEvents");
            
		evt.initEvent("click");
		aLink.download = fileName;
		aLink.href = fileUrl;
		
		aLink.dispatchEvent(evt);
	},

	// 字符串中出现最多的元素及其出现次数
	// @param {stirng} str
	// 返回obj
	maxInString: function(str) {
		var sObj = {},
			sMax = {
				chars:[],
				num: 0
			};
		for(i in str) {
			if(!sObj[str.charAt(i)]) {
				sObj[str.charAt(i)] = 1;
			}
			else {
				sObj[str.charAt(i)]++;
			}
		}
		for(j in sObj) {
			if(sObj[j] > sMax.num) {
				sMax.chars.length = 0;
				sMax.num = sObj[j];
				sMax.chars.push(j);
			}
			else if(sObj[j] == sMax.num) {
				sMax.chars.push(j);
			}
		}
		return sMax;
	},

	// 数组中不重复的元素（不同于去重,只适用于数值和字符串元素）
	// 返回一个新的数组
	singleInArr: function(arr) {
		var self = this;
		if(!self.isArray(arr)) {
			return arr;
		}
		var aObj = {},
			arrNew = [];
		for(var i=0,iLen=arr.length; i<iLen; i++) {
			if(typeof arr[i] == 'string') {
				arr[i] = arr[i] + '_str';
			}
			if(!aObj[arr[i]]) {
				aObj[arr[i]]  = 1;
			}
			else {
				aObj[arr[i]]++;
			}
		}
		for(j in aObj) {
			if(aObj[j] == 1) {
				if(j.indexOf('_str') != -1) {
					arrNew.push(j.substr(0,j.length-4));
				}
				else {
					arrNew.push(parseInt(j));
				}
			}
		}
		return arrNew;
	},

	// 数组去重
	// 返回一个新的数组
	uniqArr: function(arr) {
		var self = this;
		if(!self.isArray(arr)) {
			return arr;
		}
		var aObj = {},
			arrNew = [];
		for(var i=0,iLen=arr.length; i<iLen; i++) {
			if(typeof arr[i] == 'string') {
				if(!aObj[arr[i]+'s']) {
					aObj[arr[i]+'s']  = 1;
					arrNew.push(arr[i]);
				}
			}
			else {
				if(!aObj[arr[i]]) {
					aObj[arr[i]]  = 1;
					arrNew.push(arr[i]);
				}
			}
		}
		return arrNew;
	},

	// 取两个数之间的随机数
	randomBetween: function(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	},

	// 随机生成一串数字或字母
	// @param len 长度
	// Math.random()生成0到1之间的随机数，number.toString(36)是将这个数字转换成36进制（0-9，a-z），最后substr去掉前面的“0.”字符串
	randomStr: function(len) {
		var rdmstring = "";
		while(rdmstring.length<len) {
			rdmstring  += Math.random().toString(36).substr(2);
		}
		return rdmstring.substr(0, len);
	},

	// 打乱一个数组
	// 返回新的数组
	upsetArr: function(arr) {
		return arr.sort(function() { return Math.random() - 0.5});
	},

	// 数字每三位','号分隔，若小数位多于两位则只保留两位有效数字
	commaNum: function(num) {
		if( num == undefined || num == null ) {
			return '';
		}
		if( Math.abs(num) <= 0.000005) {
			return "0.00";
		}
		var flag = false;  // 正负标识true-负数，false-正数
		if( num < 0 ) {
			num = Math.abs( num );
			flag = true;
		}

		// 处理小数(位数和后面保持一致)，防止toFixed四舍五入时将X999.99X进位成X,1000
		var _num = Number( num.toFixed(2) );
		var _str = '';
		while( _num > 1000 ) {
			var last = _num%1000;
			_num = parseInt(_num/1000);
			if( _str == '' ) {
				last = Number(last.toFixed(2));
			}
			var _last = last>=100 ? last : ( last>=10 ? '0'+last : '00'+last);
			_str = ',' + _last + _str;
		}
		var getNUm = _num + '' + _str;
		if( flag == true ) {
			getNUm = '-' + getNUm;
		}
		return getNUm;
	},

	// 取一个字符串中第一个出现的整数
	// eg: dasd454ads22dsd -> 454
	getIntInStr: function(str) {
		for(var i=0, len=str.length; i<len; i++) {
			if(/[0-9]/.test(str.charAt(i))) {
				return parseInt(str.substr(i));
			}
		}
	},

	// 手机号验证
	// 表示以1开头，第二位可能是3/4/5/7/8中的任意一个，\d表示数字[0-9]，{9}表示9位。
	isPhone: function(phone) {
		return /^1[3|4|5|7|8]\d{9}$/.test(phone);
	},

	// 固话验证
	isTelPhone: function(tel) {
		return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel);
	},

	// 身份验证
	isIdentityCard: function(card) {
		return /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(card);
	},

	// 判断是否是安卓 return true/false
	isAndroid: function() {
		var self = this, isAndroid;
		isAndroid = self.userDev.indexOf('Android') > -1 || self.userDev.indexOf('Adr') > -1; //android终端
		return isAndroid;
	},

	// 判断是否是IOS return true/false
	isIOS: function() {
		var self = this, isIOS;
		isIOS = !!self.userDev.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isIOS;
	},

	//判断访问终端 return obj
	versions: function() {
		var self = this;
		return {
			trident: self.userDev.indexOf('Trident') > -1, //IE内核
			presto: self.userDev.indexOf('Presto') > -1, //opera内核
			webKit: self.userDev.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: self.userDev.indexOf('Gecko') > -1 && self.userDev.indexOf('KHTML') == -1,//火狐内核
			mobile: !!self.userDev.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!self.userDev.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: self.userDev.indexOf('Android') > -1 || self.userDev.indexOf('Adr') > -1, //android终端
			iPhone: self.userDev.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
			iPad: self.userDev.indexOf('iPad') > -1, //是否iPad
			webApp: self.userDev.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: self.userDev.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: self.userDev.match(/\sQQ/i) == "qq" //是否QQ
		};
	},

	//判断浏览器使用语言 return string
	itLanguage: function() {
		return (navigator.browserLanguage || navigator.language).toLowerCase();
	},

	//判断是否是小屏(小于768px)  return true/false
	isSmallScreen: function(width) {
		if(!width) {
			width: 768;
		}
		var isSmallScreen = false;
		if( window && window.matchMedia ) {
			isSmallScreen = window.matchMedia("screen and (max-width: " + width + "px)").matches;
		}
		return isSmallScreen;
	}

}
