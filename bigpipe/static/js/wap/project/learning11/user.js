/**
 * Created by Administrator on 2016/10/27.
 */

$(function () {

  $("#btn_add").click(function () {
    var username = $("#username").val();
    var title = $("#title").val();
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/users/add",
      data: {
        username: username,
        title: title
      },
      success: function (res) {
        console.log("add=============" + JSON.stringify(res));
        if (res.code == "1") {
          //location.href = "/users/list";
        }
      }
    });
  });

  $(".delBtn").click(function () {
    var id = $(this).closest("tr").attr("data-id");
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/users/del",
      data: {
        id: id
      },
      success: function (res) {
        console.log("=============" + JSON.stringify(res));
        if (res.code == "1") {
          //location.href = "/users/list";
        }
      }
    });
  });
});
