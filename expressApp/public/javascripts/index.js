/**
 * Created by Administrator on 2016/11/4.
 */

//全局参数配置

$(function () {
    $("#testAjax").bind("click", function () {
        var that = $(this);
        $.ajax({
            url: '/Landing/getUserLottery',
            data: {},
            type: 'POST',
            dataType: 'json',
            beforeSend: function () {
                that.attr("send", "1");
            },
            success: function(rs){
                console.log(JSON.stringify(rs));
                that.removeAttr("send");
            }
        });
    });

});