# 作用域、上下文、闭包、IIFE

## 作用域

    Javascript函数和变量的可访问范围，分为全局作用域、局部作用域、块级作用域

    -- 全局作用域 - 整个程序都能访问到；web环境下为windo、node环境下为global
    -- 局部作用域 - 函数作用域；在函数内部生成一个独立的作用域，函数执行结束就销毁，函数内部的变量只能在函数内部访问
    -- 块级作用域 - let/const 关键字声明变量之后，会生成块级作用域，声明的变量只在这个块内有效，必须先声明后使用

### 1. 变量提升 / 暂时性死区

```javascript
    /**
     * 函数声明 - function a() {}
     * * 匿名函数声明必须赋值给一个变量
     * 匿名函数表达式 - var a = function() {}
     * 具名函数表达式 - var a = function b() {}
     * 变量声明 var a;
     * 变量声明并赋值初始化 var a = 1;
     * **/
```

#### var / function 声明会被提升到作用域的最顶端

    函数提升的优先级要高于变量提升
    重复的变量提升会被忽略 / 重复的函数声明会被覆盖
    函数提升是为了解决函数相互递归的问题

#### let / const 不存在变量提升，会造成暂时性死区

    在代码块内，使用let / const 申明变量之前，该变量式不可用的
    let / const 不允许重复声明
    * const一旦申明必须立即初始化 ( 引用类型内部值可修改 )

    ( Javascript引擎检测到由块级作用域产生时，系统会生成暂时性死区，存储所有let / const声明的变量名，当访问暂时性死区中保存的变量时，系统会抛出错误，当遇到变量声明语句时，声明变量，并将其从暂时性死区中删除该变量，后面就能正常访问了 )

### 练习

```javascript
    test() 
    /**
     * This is 2 test function.
     * Var a is undefined.
     * Uncaught ReferenceError: b is not defined.
     * **/
    function test() {
        console.log(`This is 1 test function.`);
    }

    function test() {
        console.log(`This is 2 test function.`);
        console.log(`Var a is ${a}.`);
        console.log(`Var b is ${b}.`);
        console.log(`Var c is ${c}.`);
    }

    var a = 13;
    let b = 'Lele';
    const c = 123;
```

## 上下文

    context上下文代表执行中this代表的值，Javascript函数中的this总是指向调用这个函数的对象；使用 call、apply、bind等修改this指向的除外

### 函数执行

    函数执行期上下文是在函数执行的时候产生的

    -- 创建活动对象 AO - 在函数开始执行前，将函数内部定义的变量以及函数参数放入AO中，初始值为undefined / 将函数的实际参数赋值给AO中的变量 / 将函数内部声明的函数放到AO中 初始值为函数本身

```javascript
    function plus(a, b) {
        debugger
        /**
         * a: 1
         * b: 2
         * temp1: undefined
         * isNumber: function...
         * **/

        var temp1 = 'Lele';
        function isNumber(n) {
            return typeof n === 'number';
        }
        var isNumber = 100;
        return a + b;
    }
    plus(1,2)
```

    -- 作用域链 - Javascript中采用的是词法作用域，在函数声明时，它的作用域就已经确定了，不会再改变；函数的作用域保存在[[scopes]]变量中

```javascript
    /**
     * 可以看出，plus函数的作用域[[scopes]]是一个数组，里面包含一个 window对象
     * **/
    function plus(a, b) {
        return a + b;
    }
    debugger
    console.log(plus(1, 2));
```

```javascript
    /**
     * 可以看出 isNumber函数作用域[[scopes]]包含两个对象 一个是全局对象 一个是plus函数内部的值
     * **/
    function plus(a, b) {
        function isNumber(n) {
            console.log(a, b);
            return typeof n === 'number';
        }
        debugger;
        if (!isNumber(a) || !isNumber(b)) throw new Error('type error');
        return a + b;
    }
    console.log(plus(1, 2));
```

    因此函数作用域的生成是基于函数定义环境的，他会保存定义时当前环境的数据

## 闭包

    闭包是一块内存空间始终被系统中某个变量引用着，导致这块内存一直不会被释放，形成一个封闭的内存空间，寻常不可见，只有引用它的变量可访问
    
    ( 内部函数 / 对象被其外部函数之外的变量引用，就形成一个闭包 )

### 函数内部的函数不引用外部变量时不会形成闭包

```javascript
    /**
     * isNumber函数作用域[[scopes]]只包含一个对象 那就是全局对象
     * 
     * **/
    function plus(a, b) {
        function isNumber(n) {
            // console.log(a, b);  ** 可以看出 函数内部声明的函数没有使用到外部AO中的变量，那么函数的[[scopes]]作用域链中就不会包含该AO
            return typeof n === 'number';
        }
        debugger;
        if (!isNumber(a) || !isNumber(b)) throw new Error('type error');
        return a + b;
    }
    console.log(plus(1, 2));
```

### JS引擎会根据引用到的变量做一波优化， 只保存用到的变量 / 函数内部不会被用到的函数不会声明

### 可以读取函数内部的变量 / 能让变量的值始终保存在内存中

### 练习

```javascript
    function test() {
        var a = 10;
        function add() {
            console.log(a++);
        }
        return add;
    }
    var count = test();

    count(); // 10
    count(); // 11
    count(); // 12
```

## IIFE

    在函数声明的同时立即调用这个函数

### 立即执行函数内部形成一个单独的作用域

    可以封装外部无法读取的私有变量

    ( 为调用一次的函数达到 作用域隔离 命名冲突 减少内存占用 )

    ( IIFE 中使用的 任何变量和函数，都会在执行结束时被销毁，可以减少内存占用 )

### 练习

```javascript
    (function(name) {
        console.log(`Name - ${name}.`);
    })('Lele'); // Name - Lele.
```
