# async&await、generator生成器函数、Iterator迭代器、yield

## generator生成器函数( 符合可迭代规范，具备可迭代性 )

Generator函数是ECMAScript6新增的，拥有在一个函数块内暂停和恢复代码执行的能力、每次暂停恢复都提供了一次双向传递数据的机会

    (生成器函数不允许被 new，直接当作普通函数调用就会创建实例)
    (函数名称前面加一个 * 表示它是一个生成器)

### 1. yield

    yield可以让生成器停止和执行

    ( 生成器函数在遇到 yield关键字之前会正常执行，遇到这个yield关键字后，执行会停止，函数作用域的状态会被保留，可通过调用 next方法来恢复执行 )

```javascript
    function* test() {
        var a = [1,2,3,4,5];
        for(let data of a) yield data;
    }

    var a = test();
    a.next(); // { value:1, done: false }
    a.next(); // { value:2, done: false }
    a.next(); // { value:3, done: false }
    a.next(); // { value:4, done: false }
    a.next(); // { value:5, done: false }
    a.next(); // { value:undefined, done: true }
```

### 2. next

    next()传参 - 将传入的参数赋值给上一次的 yield

```javascript
    function* test() {
        var a = 12;
        var b = yield a;
        var c = yield a + b;
    }

    var a = test()
    a.next(); // { value:12, done: false }
    a.next(2); // { value:14, done: false }
```

## Iterator迭代器

    顺序访问有序结构、不知道数据的结构和长度

### 1. 有序结构

    所有有序结构都支持 for...of
    (字符串、数组、NodeList等DOM集合、Map、Set、arguments)

    所有有序结构都能使用解构、扩展操作符

    所有有序结构都能用来创建Map、Set

### 2. yield*

    yield* 后面跟一个有序结构 - 遍历有序结构

```javascript
    /**
     * 为 Object实现Iterator，进而可以使用for...of进行遍历
     * **/
    let obj = {
        name: 'Lele',
        age: 18,
        job: 'developer',
        *[Symbol.iterator]() {
            const self = this;
            const keys = Object.keys(self);
            yield* keys;
        }
    }
```

## async&await (基于Promise之上的一个语法糖)

### 1. async声明异步函数，返回值为Promise对象

    可以使用then / catch方法添加回调函数

    ( async函数有一个最大的特点 - 第一个await会作为分水岭一般的存在，在第一个await的右侧和上面的代码，全部是同步代码区域，相当于new Promise的回调；第一个await的左侧和下面代码区域，就变成了异步代码，相当于then回调 )

### 2. await 表示紧跟在后面的表达式需要等待结果，只能用在async函数内部

    ( await必须在async 方法内使用 )

    ( await 后跟的不是一个 Promise对象， 则直接返回表达式的运算结果 )
    ( await 后跟的是一个 Promise对象，则它会阻塞后续代码的执行，直到等到Promise对象resolve，然后获取resolve的结果作为await的运算结果 )
    ( 因此如果Promise对象不resolve结果，后面的代码就不会执行 )

    ( await 会将 Promise的reject当作错误抛出 )

### 3. 非await部分

    async内部遇到await会等待结果在继续执行下去

    非await部分依然会以正常的异步 / 同步方式执行

### 4. 解决async/await中Promise返回reject报错

```javascript
    /**
     * async/await 已经将异步代码优化为了同步代码，而同步代码可以通过 try/catch来处理异常
     * **/
    function fn() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject("error")
            }, 1000);
        })
    }

    async function go() {
        try{
            let res = await fn()
        }catch(e){
            console.log(e)
        }
    }

    go()
```

```javascript
    /**
     * 通过返回一个pending状态的结果，中断Promise链的方式处理错误
     * **/
    function fn() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject("error")
                return new Promise(() => {}) //中断promise链
            }, 1000)
        })
    }

    async function go() {
        let res = await fn();
        console.log('test');
        console.log(res);
    }

    go()
```
