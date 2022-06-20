# 事件循环、任务队列

    Javascript是一门单线程语言 ( Javascript设计之初是用来处理网页的交互的 )、为了解决单线程造成的问题、引入了事件循环的概念.
    将任务分为了同步任务和异步任务。

    ( Javascript的运行顺序是完全单线程的异步机制；同步在前、异步在后 )

## 运行( 浏览器 )

    简单介绍下浏览器中一个Tab页面涉及到的线程组成
    -- GUI 渲染线程
    -- Javascript引擎线程
    -- 事件触发线程
    -- 定时器触发线程
    -- http请求线程
    -- 其他线程

    事件循环机制和任务队列的维护是由事件触发线程控制的.

    JS引擎线程遇到异步( DOM事件监听、网络请求、setTimeout计时器等... )、会交给相应的线程单独去维护异步任务、等待某个时机( 计时器结束、网络请求成功、用户点击DOM )、然后由事件触发线程将异步对应的回调函数加入到任务队列中、任务队列中的回调函数等待被执行

### 1. 执行栈 CallStack

    JS引擎线程会维护一个执行栈、同步代码会依次加入执行栈然后执行、结束会退出执行栈；如果执行栈里的任务执行完成，即执行栈为空时、事件触发线程会从任务队列取出一个任务(即异步的回调函数) 放入执行栈中执行；执行完之后、执行栈再次为空、事件触发线程会重复上一步操作、在取出一个任务队列中的任务，这种机制就是事件循环机制.
    
    ( 当浏览器第一次加载脚本时，默认情况下会进入全局上下文，如果在全局代码中调用了函数，则代码的执行就会就会进入函数，此时会创建一个新的执行上下文，并把它推到执行上下文栈中 )

```javascript
    console.log('begin lele');

    setTimeout(() => {
    console.log('timer over');
    }, 1000)

    console.log('end lele');

    /**
     * 执行过程如下
     * 
     * 1. 主代码块依次加入执行栈，依次执行，主代码块为:
     *      * console.log('begin lele');
     *      * setTimeout()
     *      * console.log('end lele');
     * 
     * 2. console.log 为同步代码，JS引擎线程处理，打印 'begin lele' 出栈
     * 
     * 3. 遇到异步函数 setTimeout, 交给定时器触发线程 ( 异步触发函数为 setTimeout 回调函数为 () => {} )，JS引擎线程继续、出栈
     * 
     * 4. console.log 为同步代码，JS引擎线程处理，打印 'end lele' 出栈
     * 
     * 5. 执行栈为空，也就是JS引擎线程空闲，这时从任务队列中取出一条任务加入到执行栈，并执行
     * 
     * 6. 1000ms后，定时器触发线程通知事件触发线程，事件触发线程将回调函数加入到任务队列队尾，等待 JS引擎线程执行
     * **/
```

#### 尾递归优化

    函数的最后一步是调用另一个函数

    ( 尾调用由于是函数的最后一步操作，内部变量等信息不会被用到，那么就并不用声明一个新的执行上下文，而是复用 / restart 原本的执行上下文，传入对应的参数 )

## 宏任务 、微任务

    所有的任务根据种类可以分为 宏任务、微任务；

    -- 宏任务 - 主代码块、setTimeout、setInterval、UI交互事件等 (耗时任务)
    -- 微任务 - Promise.then()

### 执行流程

    每次执行栈执行的代码就是一个宏任务，在执行宏任务时遇到Promise等、会创建微任务(.then() 中的回调)并加入微任务队列队尾

    ( 微任务必然是在某个宏任务执行的时候创建的、而在下一个宏任务开始之前，浏览器会对页面重新渲染；同时，再上一个宏任务执行完成后，渲染也买你之前，会执行当前微任务队列中的所有微任务 )

    ( 一次Event Loop 会处理一个宏任务和所有这次循环中产生的微任务 )

### 练习

```javascript
    function main() {
        console.log(`Main 1.`);
        setTimeout( () => {
            console.log(`SetTimeout 1.`);
            Promise.resolve().then( data => {
                console.log(`Promise 1.`)
                setTimeout( () => {
                    console.log(`SetTimeout 3.`);
                }, 100 );
            } );
        }, 100 );
        console.log(`Main 2.`);
        setTimeout( () => {
            console.log(`SetTimeout 2.`);
            Promise.resolve().then( data => {
                console.log(`Promise 2.`)
                setTimeout( () => {
                    console.log(`SetTimeout 4.`);
                }, 0 );
            } );
        }, 0);
        console.log(`Main 3.`);
    }

    main();

    /**

    * Main 1.
    * Main 2.
    * Main 3.
    * SetTimeout 2.
    * Promise 2.
    * SetTimeout 4.
    * SetTimeout 1.
    * Promise 1.
    * SetTimeout 3.
    */
```
