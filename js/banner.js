/*-----
 * 
 * 使用原生JavaScript实现banner部分两组轮播图的效果
 * 
 * -----*/

/*-----封装getByClass-----*/
function getByClass(classname, parent) {
	//var parent = parent ? document.getElementById(parent) : document;
	if(parent.getElementsByClassName) {
		return parent.getElementsByClassName(classname);
	} else {
		var arr = [],
			aEle = parent.getElementsByTagName('*'),
			re = new RegExp('\\b' + classname + '\\b');

		for(var i = 0; i < aEle.length; i++) {
			if(re.test(aEle[i].className)) {
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}

window.onload = function() {
	var slide = document.getElementById("slide"),
		aside_top = document.getElementById("aside-top"),
		aside_bottom = document.getElementById("aside-bottom"),
		liIndex = 0,
		liIndex2 = 0,
		timer = 0,
		slide_image = document.getElementById("slide-image"),
		/*slide_aside = document.getElementsByClassName("slide-aside")[0],
		bg1 = aside_top.getElementsByClassName("bg")[0],
		bg2 = aside_bottom.getElementsByClassName("bg")[0],
		slide_prev = document.getElementsByClassName("slide-prev"),
		slide_next = document.getElementsByClassName("slide-next"),
		slide_box = document.getElementsByClassName("slide-box"),
		aOl = document.getElementsByClassName("change1");*/
		slide_aside = getByClass("slide-aside", slide_image)[0],
		bg1 = getByClass("bg", aside_top)[0],
		bg2 = getByClass("bg", aside_bottom)[0],
		slide_prev = getByClass("slide-prev", slide),
		slide_next = getByClass("slide-next", slide),
		slide_box = getByClass("slide-box", slide),
		aOl = getByClass("change1", slide);
	oLi1 = aOl[0].getElementsByTagName("li"),
		oLi2 = aOl[1].getElementsByTagName("li"),
		aLi1 = slide_box[0].getElementsByTagName("li"),
		aLi2 = slide_box[1].getElementsByTagName("li");

	/*-----控制图片的显示-----*/
	function aLi_show(aLi, oLi, liIndex) {
		for(var i = 0; i < aLi.length; i++) {
			//aLi[i].style.display="none";
			aLi[i].style.opacity = 0;
			aLi[i].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"; /*兼容ie8及以下*/
			oLi[i].className = "";
		}
		//aLi[liIndex].style.display="block";
		aLi[liIndex].style.opacity = 1;
		aLi[liIndex].style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)"; /*兼容ie8及以下*/
		oLi[liIndex].className = "active";
	}

	/*-----封装按钮切换函数-----*/
	function aLi1_prev() {
		liIndex--;
		if(liIndex < 0) {
			liIndex = aLi1.length - 1;
			liIndex2 = aLi2.length - 1;
			slide.style.top = -398 + "px";
			aLi_show(aLi2, oLi2, liIndex2);
		} else {
			aLi_show(aLi1, oLi1, liIndex);
		}
	}

	function aLi1_next() {
		liIndex++;
		if(liIndex == aLi1.length) {
			liIndex = 0;
			liIndex2 = 0;
			slide.style.top = -398 + "px";
			aLi_show(aLi2, oLi2, liIndex2);
		} else {
			aLi_show(aLi1, oLi1, liIndex);
		}
	}

	function aLi2_prev() {
		liIndex2--;
		if(liIndex2 < 0) {
			liIndex2 = aLi2.length - 1;
			liIndex = aLi1.length - 1;
			slide.style.top = 0 + "px";
			aLi_show(aLi1, oLi1, liIndex);
		} else {
			aLi_show(aLi2, oLi2, liIndex2);
		}
	}

	function aLi2_next() {
		liIndex2++;
		if(liIndex2 == aLi2.length) {
			liIndex = 0;
			liIndex2 = 0;
			slide.style.top = 0 + "px";
			aLi_show(aLi1, oLi1, liIndex);
		} else {
			aLi_show(aLi2, oLi2, liIndex2);
		}
	}

	/*-----定时器控制自动切换-----*/
	function auto_slide() {
		if(slide.style.top == "" || slide.style.top == "0px") {
			aLi1_next();
		} else {
			aLi2_next();
		}
	}
	timer = setInterval(auto_slide, 3000);

	/*-----两组轮播图的tab点击切换-----*/
	aside_top.onclick = function() {
		slide.style.top = 0 + "px";
		bg2.className = "bg";
		bg1.className = "bg active";
		liIndex = 0;
		aLi_show(aLi1, oLi1, liIndex)
	}
	aside_bottom.onclick = function() {
		slide.style.top = -398 + "px";
		bg1.className = "bg";
		bg2.className = "bg active";
		liIndex2 = 0;
		aLi_show(aLi2, oLi2, liIndex2)
	}

	/*-----控制切换按钮的显示-----*/
	slide.onmouseover = slide_aside.onmouseover = function() {
		slide_prev[0].style.display = "block";
		slide_next[0].style.display = "block";
		slide_prev[1].style.display = "block";
		slide_next[1].style.display = "block";
	}
	slide.onmouseout = slide_aside.onmouseout = function() {
		slide_prev[0].style.display = "none";
		slide_next[0].style.display = "none";
		slide_prev[1].style.display = "none";
		slide_next[1].style.display = "none";
	}

	/*-----分页器切换图片-----*/
	for(var i = 0; i < oLi1.length; i++) {
		oLi1[i].index = i;
		oLi1[i].onmouseover = function() {
			clearInterval(timer);
			liIndex = this.index;
			aLi_show(aLi1, oLi1, liIndex);
			timer = setInterval(auto_slide, 3000);
		}
	}
	for(var i = 0; i < oLi2.length; i++) {
		oLi2[i].index = i;
		oLi2[i].onmouseover = function() {
			clearInterval(timer);
			liIndex2 = this.index;
			aLi_show(aLi2, oLi2, liIndex2);
			timer = setInterval(auto_slide, 3000);
		}
	}

	/*function preventDefault(event) {
		event = event || window.event;
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}*/
	/*-----绑定按钮点击切换事件-----*/
	slide_prev[0].onclick = function(event) {
		clearInterval(timer);
		aLi1_prev();
		timer = setInterval(auto_slide, 3000);
	}
	slide_prev[1].onclick = function(event) {
		clearInterval(timer);
		aLi2_prev();
		timer = setInterval(auto_slide, 3000);
	}
	slide_next[0].onclick = function(event) {
		clearInterval(timer);
		aLi1_next();
		timer = setInterval(auto_slide, 3000);
	}
	slide_next[1].onclick = function(event) {
		clearInterval(timer);
		aLi2_next();
		timer = setInterval(auto_slide, 3000);
	}
}