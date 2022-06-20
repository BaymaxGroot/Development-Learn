# 工具函数

## 函数防抖

    限定时间内多次触发事件，只会触发最后一次

    -- 输入框事件

```javascript
    /**
     * 通过维护一个计时器，规定时间后触发函数；若在规定时间内再次触发，则清楚当前计时器，然后重新设置计时器
     * **/
    var debounce = function( func, idle ) {
        var timer;
        return function() {
            var that = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout( function() {
                func.apply(that, args);
            }, idle );
        }
    }
```

## 函数节流( 稀释函数的执行频率 )

    限定时间内频繁触发事件，只会触发一次

    -- 滚动条事件

```javascript
    /**
     * 记录时间戳 判断时间差
     * **/
    var throttle = function(func, interval) {
        var timer = 0;
        return function() {
            var that = this,
                args = arguments,
                curr = +new Date();
            if(curr - timer >= interval) {
                func.apply(that,args);
                timer = curr;
            }
        }
    }

    /**
     * 通过节流锁
     * **/
    var throttle = function(func, interval) {
        var that = this,
            args = arguments,
            clock = false;
        return function() {
            if(clock) return;
            clock = true;
            func.apply(that, args);
            setTimeout(function() {
                clock = false;
            }, interval)
        }
    }
```

## 惰性加载(能一次搞定的绝不做第二次)

    if分支只会执行一次，之后调用函数时，直接进入所支持的分支代码

    -- 嗅探工作

    后续调用避免重复检测

```javascript
    /**
     * 通过函数重写
     * **/
    var flag = 1;
    function test1() {
        if(typeof flag === 'undefined') {
            test1 =  function() {
                return 0;
            }
        } else if(flag === 1) {
            test1 = function() {
                return 1;
            }
        } else {
            test1 = function() {
                return -1;
            }
        }
        return test1();
    }
```

```javascript
    /**
     * 在声明函数时，通过IIFE来指定适当的函数
     * **/
    var flag = 1;
    var test2 = ( function() {
        if(typeof flag === 'undefined') {
            return function() {
                return 0;
            }
        } else if(flag === 1) {
            return function() {
                return 1;
            }
        } else {
            return function() {
                return -1;
            }
        }
    } )();
```

## 分时函数

    批处理，将性能影响降到最低

    -- 一次性向页面创建成百上千节点 转化为 分批次创建

```javascript
    /**
     * 分时分批 对元素进行操作
     * **/
    var timeChunk = function(arr, fn, count) {
        var obj,
            t;
        var start = function() {
            var len = Math.min(count || 1, arr.length);
            for(var i = 0; i < len; i++) {
                obj = arr.shift();
                fn(obj);
            }
        };
        return function(interval) {
            t = setInterval(function() {
                if(arr.length == 0) return clearInterval(t);
                start();
            }, interval || 200);
        }
    }
```

## 函数柯里化

    currying又称为部分求值，一个currying函数首先会接收一些参数，接收参数之后并不会立即求职，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中被保存起来；待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值

```javascript
    var currying = function(fn) {
        var args = [];
        return function() {
            if(arguments.length === 0) {
                return fn.apply(this, args);
            }
            Array.push.apply(args, arguments);
            return arguments.callee;
        }
    };
```