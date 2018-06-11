$(function () {
    //获取
    $("#btn_get").click(function () {
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://kefu.easemob.com/v1/webimplugin/targetChannels?tenantId=6437&_v=1512732688060",
            success: function (t) {
                console.log("add=============" + JSON.stringify(t));
            }
        })
    });

    //添加
    $("#btn_add").click(function () {
        var t = $("#username").val(), a = $("#title").val();
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/users/add",
            data: {username: t, title: a},
            success: function (t) {
                console.log("add=============" + JSON.stringify(t)), "1" == t.code
            }
        })
    });

    //删除
    $(".delBtn").click(function () {
        var t = $(this).closest("tr").attr("data-id");
        $.ajax({
            type: "post", dataType: "json", url: "/users/del", data: {id: t}, success: function (t) {
                console.log("=============" + JSON.stringify(t)), "1" == t.code
            }
        })
    });
});