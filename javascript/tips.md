# 小知识点

## typeof / instanceof

    typeof用于判断数据类型，返回值为以下字符串之一
    ("number" "string" "boolean" "object" "symbol" "undefined" "function")

```javascript
    console.log(typeof 1);               // number
    console.log(typeof true);            // boolean
    console.log(typeof 'mc');            // string
    console.log(typeof Symbol)           // function
    console.log(typeof function(){});    // function
    console.log(typeof console.log());   // function
    console.log(typeof []);              // object 
    console.log(typeof {});              // object
    console.log(typeof null);            // object
    console.log(typeof undefined);       // undefined
    /**
     * typeof 在判断 null、array、object时，得到的都是object，得不到真实的数据类型
     * **/
```

    instanceof用于判断对象是谁的实例，是根据原型链来寻找的，基础类型不能判断

```javascript
    console.log(1 instanceof Number);                    // false
    console.log(true instanceof Boolean);                // false 
    console.log('str' instanceof String);                // false  
    console.log([] instanceof Array);                    // true
    console.log(function(){} instanceof Function);       // true
    console.log({} instanceof Object);                   // true
```

    Object.prototype.toString.call 可用于精准判断数据类型

```javascript
    var toString = Object.prototype.toString;
    console.log(toString.call(1));                      //[object Number]
    console.log(toString.call(true));                   //[object Boolean]
    console.log(toString.call('mc'));                   //[object String]
    console.log(toString.call([]));                     //[object Array]
    console.log(toString.call({}));                     //[object Object]
    console.log(toString.call(function(){}));           //[object Function]
    console.log(toString.call(undefined));              //[object Undefined]
    console.log(toString.call(null));                   //[object Null]
```

## encodeURI / encodeURIComponent

    都是编码url，唯一区别就是编码的字符范围不一样

    (编码并使用整个url，你应该使用encodeURI)

    (需要编码url中的参数时，你应该使用encodeURIComponent)

```javascript
    /**
     * encodeURI 不会编码 ASCII字母 数字 ~!@#$&*()=:/,;?+'   
     * encodeURIComponent 不会编码 ASCII字母 数字 ~!*()'
     * **/
    var a = "https://www.baidu.com/s?wd=youtube";
    encodeURI(a);
    // 'https://www.baidu.com/s?wd=youtube'
    encodeURIComponent(a)
    // 'https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dyoutube'
```

## callee / caller

    callee是arguments对象的属性，指向拥有这个arguments对象的函数
    (arguments.length是实参长度，arguments.callee.length是形参长度)

```javascript
    function add(a, b) {
        console.log(arguments.callee); // 打印add函数本尊
        return a+b;
    }
    add(1,2);
```

    caller是function的属性，指向调用当前函数的函数
    (如果在全局作用域中调用当前函数，它的值为null)

```javascript
    function outer() {
        inner();
    }
    function inner() {
        console.log(inner.caller); // 打印outer函数本尊
    }
    outer();
```

## Symbol

    Symbol是ES6中新增加的基本数据类型，其每个实例都是独一无二且不可变的
    (一般用于对象的属性使用，确保对象属性独一无二，避免属性冲突)

```javascript
    /**
     * Symbol()不与new操作符搭配
     * 
     * Symbol()传入的字符串只起到描述作用，并不影响symbol的值
     * **/
    let symbol1 = Symbol('lele');
    let symbol2 = Symbol('lele');

    symbol1 === symbol2; // false
```

    Symbol.for()方法在全局symbol注册表中创建并注册symbol, 此时传入的字符串回影响实例的值

```javascript
    /**
     * Symbol.for() 传入的任何值都会被转为字符串
     * **/
    let symbol1 = Symbol.for('lele');
    let symbol2 = Symbol.for('lele');

    symbol1 === symbol2; // true
```

    Symbol可以用于对象的属性名，保证不会出现同名的属性
    (Symbol值作为对象属性名时不能使用点运算符)
    (作为属性名时，该属性不会出现在for...in、for...of、也不会被Object.keys() / Object.getOwnPropertyNames() / JSON.stringify()返回)

```javascript
    const mySymbol = Symbol();
    const mySymbol2 = Symbol();
    const a = {
        [mySymbol2]: 'Lyla' // 写法1
    };
    a[mySymbol] = 'Lele'; // 写法2

    a.mySymbol; // undefined

    const objectSymbols = Object.getOwnPropertySymbols(a);

    objectSymbols; //[Symbol(Lele), Symbol(Lyla)]
```

    Symbol值不能和其他类型的值进行运算，可以显示转为字符串，可以转为布尔值

```javascript
    let sym = Symbol('Lele');

    `My name is ${sym}.`; // TypeError: can't convert symbol to string

    String(sym); // 'Symbol(Lele)'
    sym.toString(); // 'Symbol(Lele)'

    Boolean(sym); // true
    !sym; // false

    Number(sym); // TypeError
    sym + 2; // TypeError
```
