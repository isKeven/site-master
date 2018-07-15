/*-----
 * 
 * 使用jQuery实现section部分的轮播图以及导航栏的tab页切换效果
 * 
 * -----*/
$(document).ready(function() {
	var timer;
	/*-----导航栏tab页-----*/
	$("ul.menu-list .pop").mouseover(function() {
		if(timer != undefined) {
			clearTimeout(timer);
		}
		// $(this).children(".menu-pop").animate({height:"400px"}).css({"z-index":"2"}).show().children(".context").show();
		// $(this).siblings().children(".menu-pop").animate({height:"400px"}).css({"z-index":"1"});
		$(".menu-pop").animate({
			height: "400px"
		}).css({
			"z-index": "2"
		}).show().children(".context").show();
		$(this).siblings().children(".menu-pop").css({
			"z-index": "1"
		});
	});
	$("ul.menu-list .pop").mouseout(function() {
		timer = setTimeout(function() {
			$(".menu-pop").animate({
				height: '0px'
			}).hide();
		}, 100);
	});

	/*-----轮播图slide-box2-----*/
	var slide_index3 = 0;
	var slide3 = $("#slide3");

	/*-----控制切换按钮的显示-----*/
	slide3.mouseover(function() {
		$(this).children(".slide-prev").show();
		$(this).children(".slide-next").show();
	})
	slide3.mouseout(function() {
		$(this).children(".slide-prev").hide();
		$(this).children(".slide-next").hide();
	})

	/*-----按钮点击切换效果----*/
	$("#slide3 .slide-prev").click(function() {
		var btn = true;
		if(btn) {
			btn = false
			slide_index3--;
			if(slide_index3 < 0) {
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				}).children(":eq(2)").css({
					position: "relative",
					left: -1854 + "px",
				})
				slide_index3 = 2;
			} else if(slide_index3 == 1) {
				slide3.children("ul").css({
					left: "-1236px"
				}).children(":eq(2)").css({
					position: "relative",
					left: "0"
				});
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				})
			} else {
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				})
			}
			slide3.children(".change1").children("li").removeClass("active");
			slide3.children(".change1").children(":eq(" + slide_index3 + ")").addClass("active");
			btn = true;
		}
	})
	$("#slide3 .slide-next").click(function() {
		var btn = true;
		if(btn) {
			btn = false
			slide_index3++;
			if(slide_index3 > 2) {
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				}).children(":eq(0)").css({
					position: "relative",
					left: (slide_index3) * 618 + "px"
				})
				slide_index3 = 0;
			} else if(slide_index3 == 1) {
				slide3.children("ul").css({
					left: "0px"
				}).children(":eq(0)").css({
					position: "relative",
					left: "0px"
				});
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				})
			} else {
				slide3.children("ul").stop().animate({
					left: -slide_index3 * 618 + "px"
				})
			}
			slide3.children(".change1").children("li").removeClass("active");
			slide3.children(".change1").children(":eq(" + slide_index3 + ")").addClass("active");
			btn = true;
		}
	})
	/*-----兼容ie10-的placeholder-----*/
	$(function() {
		function placeholder(target) {
			$(target).val($(target).attr("datavalue")).addClass("inp");
			$(target).focus(function() {
				if($(this).val() == $(this).attr("datavalue")) {
					$(this).val("").removeClass("inp");
				}

			})
			$(target).blur(function() {
				if($(this).val() == "" || $(this).val() == $(this).attr("datavalue")) {
					$(this).val($(target).attr("datavalue")).addClass("inp");
				}
			})
		}
		placeholder(".input-text");
	})
})