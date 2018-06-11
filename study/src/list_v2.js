/**
 * 日期：2017-11-11
 * 版本：1.0.0.4
 *     -----------使用说明----------
 * 1、把所有函数【包含异步执行的函数】按照顺序依次 使用lk.push存入
 * 2、带有参数的函数，一定要注意{最一个参数如果是callback}会被认为是 异步执行函数
 * 3、异步执行的函数，需要把最一个参数设置为callback。并在函数执行完毕执行callback();函数保证按照顺序执行
 *
 * */
;!function () {
    var list = [], //存储函数的列表
        isFun = Object.prototype.toString; //用于验证是否是函数
    /**
     * 添加到列表中
     * @fn {Function} 函数体
     * */
    function push(fn) {
        isFun.call(fn) === "[object Function]" && list.push(fn);
    }

    /**
     * 开始执行列表中的所有函数，
     * 按照先进先出原则
     *
     * */
    function runQueue() {
        if (list.length) {
            var fn = list.shift(),//截取第一个函数
                argsArr = getFuncArg(fn),//获取这个函数的参数列表
                _length = argsArr.length;//参数列表的长度
            if (_length && argsArr[_length - 1] === 'callback') {
                if (_length === 1) {
                    fn(runQueue);
                } else {
                    argsArr.pop();//删除最后一个参数
                    argsArr.push(runQueue);//把回调函数存入数组
                    fn.apply(this, argsArr);
                }
            } else {
                fn.apply(this, argsArr);
                runQueue();
            }
        }
    }

    /**
     * 查找函数参数名
     * @fn {Function } 要查找的函数
     * @return []返回参数数组
     * */
    function getFuncArg(fn) {
        var f = /^[\s\(]*function[^(]*\(\s*([^)]*?)\s*\)/.exec(fn.toString());
        return f && f[1] ? f[1].split(/,\s*/) : [];
    }

    //挂在到Windows上。
    window.lk = {
        push: push,
        start: runQueue
    }
}();


//使用测试
/**--------一条华丽的分割线--------**/

//定义函数 a2  ，此函数带有一个参数，被认为是异步函数
function a2(a, b, callback) {
    setTimeout(function () {
        console.log('函数a2');
        callback();

    }, 1000);
}

//把函数函数 a2 放入数组
lk.push(a2);

//定义函数 a3
function a3() {
    console.log('函数a3');
}

//把函数函数 a3 放入数组
lk.push(a3);

//定义函数 a4 此函数带有一个参数，被认为是异步函数
function a4(callback) {
    setTimeout(function () {
        console.log('函数a4');
        callback();
    }, 2000);
}

//把函数函数 a4 放入数组
lk.push(a4);

//最后开始执行
lk.start();