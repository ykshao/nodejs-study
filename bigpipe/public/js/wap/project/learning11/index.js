define(function(e,i,t){function a(){l.times+=1,l.roll();var e=$("#lottery").attr("prize_site"),i=$("#lottery").attr("prize_name");if(l.times>l.cycle+10&&l.index==e)setTimeout(function(){var e=$('<li class="chick"><span>'+$("#lottery").attr("nick_name")+"</span><b>\u62bd\u4e2d"+i+"</b></li>");$(".names li").eq(3).after(e),$(".dialog").addClass("hide"),$("#dialog").removeClass("hide"),$("#dialog .box img").eq($("#lottery").attr("prize_id")).show(),$("#dialog").find(".prizeName").html(i),$("#dialog2 .text1 h3").text(i)},500),clearTimeout(l.timer),l.prize=-1,l.times=0,n=!1;else{if(l.times<l.cycle)l.speed-=10;else if(l.times==l.cycle){var t=Math.random()*l.count|0;l.prize=t}else l.times>l.cycle+10&&(0==l.prize&&7==l.index||l.prize==l.index+1)?l.speed+=110:l.speed+=50;l.speed<40&&(l.speed=40),l.timer=setTimeout(a,l.speed)}return!1}function s(){var e=$(".names li");e.eq(0).fadeOut("slow",function(){$(this).clone().appendTo($(this).parent()).show("slow"),$(this).remove()})}console.log("-----============11111");var l={index:0,count:0,timer:0,speed:20,times:0,cycle:40,prize:0,init:function(e){$("#"+e).find(".l_prize").length>0&&($lottery=$("#"+e),$units=$lottery.find(".l_prize"),this.obj=$lottery,this.count=$units.length,$lottery.find(".l_prize-"+this.index).addClass("l_now"))},roll:function(){var e=this.index,i=this.count,t=this.obj;return $(t).find(".l_prize-"+e).removeClass("l_now"),e+=1,e>i-1&&(e=0),$(t).find(".l_prize-"+e).addClass("l_now"),this.index=e,!1},stop:function(e){return this.prize=e,!1}},n=!1;$(function(){l.init("lottery"),$("#lottery .pointer").click(function(){var e=$(this),i=$("#login").val(),t=$("#active").val(),s=$("#j_tip");if("1"==i&&"0"==t){if("1"==e.attr("send"))return!1;l.speed=100,$.ajax({type:"post",dataType:"json",url:"/Landing/dofestival",data:{},beforeSend:function(){e.attr("send","1")},success:function(i){1==i.status?($("#active").val("1"),$("#lottery").attr("prize_site",i.data.angle-1),$("#lottery").attr("prize_id",i.data.id-1),$("#lottery").attr("nick_name",i.data.nick_name),$("#lottery").attr("prize_name",i.data.prize),a()):($(".dialog").addClass("hide"),alert(i.info)),e.removeAttr("send")}})}else"1"==i&&"1"==t?(s.find(".text").html("\u60a8\u672c\u6b21\u7684\u62bd\u5956\u673a\u4f1a\u7528\u5b8c\u4e86\uff0c\u611f\u8c22\u60a8\u7684\u53c2\u4e0e\u54e6\u3002"),s.removeClass("hide")):(s.find(".text").html("\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u5feb\u53bb\u767b\u5f55\u5f00\u59cb\u62bd\u5956\u5427\uff01"),s.removeClass("hide"))})}),setInterval(s,2e3),$("#dialog .close").click(function(){$("#dialog").addClass("hide").find("img").hide()}),$("#dialog2 .close").click(function(){$("#dialog2").addClass("hide").find(".tip").addClass("hide")}),$("#j_tip .close").click(function(){$("#j_tip").addClass("hide")}),$("#prize_log").click(function(){var e=($(this),$("#login").val()),i=$("#active").val();"1"==e&&"1"==i?($("#dialog2").removeClass("hide").find(".tip-1").addClass("hide"),$("#dialog2").removeClass("hide").find(".tip-2").removeClass("hide")):($("#dialog2").removeClass("hide").find(".tip-2").addClass("hide"),$("#dialog2").removeClass("hide").find(".tip-1").removeClass("hide"))}),$("#course .btn_buy").click(function(e){var i=$(this),t=$("#j_tip");"1"==i.attr("data-status")&&(t.find(".text").html("\u60a8\u5df2\u7ecf\u8d2d\u4e70\u8fc7\u8be5\u5957\u9910\u4e86\uff0c\u6d3b\u52a8\u671f\u95f4<br/>\u53ea\u80fd\u8d2d\u4e70\u4e00\u6b21\u54e6~"),t.removeClass("hide"),e.preventDefault())})});