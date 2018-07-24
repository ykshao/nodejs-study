$(function () {

    //添加
    $("#btn_add").click(function () {
        var t = $("#username").val(), a = $("#title").val();
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/users/add",
            data: {username: t, title: a},
            success: function (t) {
                if(t.code == 1) {
                    location.href = '/users/list';
                }
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