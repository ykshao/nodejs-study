
/*
 * 此模块功能为统计点击次数
 * author： liudenghui@51talk.com
 * date： 2016-9-27
 */
define("clickCount",[],function(require,exports,module){

    var src = $('#linkpv_51talk').attr('src');

    $('._wapdim_').each(function(index,item){
        var t = $(this).data('t');
        var str = '?t='+t+'&';
        this.addEventListener('touchstart',function(){
            var newSrc = src.replace(/\?t=.+?&/, str);
            $('#linkpv_51talk').attr('src',newSrc);
        })
    })
})