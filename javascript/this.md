# this、箭头函数

    当JavaScript执行一段可执行代码时，会创建对应的执行上下文

    对于每个执行上下文，都有三个重要属性 - 变量对象，作用域链，this

## this

### 1. this 指向

    判断this指向，一定不要看在哪里定义，要看将来在哪里以及如何被调用

1. obj.fun()，this指向 . 前面的obj对象
2. new构造函数，this指向new正在创建的新对象
3. 构造函数.prototype.fun = function(){}
    
    this指向将来调用这个fun函数的 . 的前面的某个子对象

4. fun()普通函数调用、匿名函数自调用、回调函数中的this指向window；严格模式下thi指向undefined
5. DOM事件处理函数this指向当前正在触发事件的 . 前的DOM元素对象
6. 箭头函数无自身this，通过作用域链获取上层this

### 2. this绑定规则

1. 默认绑定

    没有带任何修饰符，非严格模式下指向window，严格模式下指向undefined

```javascript
    /**
     * 默认绑定最常出现在独立函数的调用
     * **/
    function foo() {
        console.log(this.a); // 2
    }
    var a = 2；
    foo();
```

2. 隐式绑定

    调用位置是否有上下文对象，是否被某个对象包含，隐式绑定规则会将函数调用中的this绑定到上下文对象
    (如果有多层上下文对象，坚持就近原则)

```javascript
    function foo() {
        console.log(this.a);
    }

    var obj = {
        a: 2,
        foo: foo,
        foo1: function() {
            return foo();
        },
        foo2: {
            a: 4，
            foo: foo
        }
    };

    var a = 3;
    obj.foo(); // 2
    obj.foo1(); // 3
    obj.foo2.foo(); // 4

    let bar = obj.foo; // 会造成隐式丢失
    bar(); // 3
```

3. 显式绑定

    通过在函数上运行call、apply来显示的绑定this，在调用时将第一个参数绑定到this
    (如果第一个参数为字符串、数字、布尔来作为this绑定的对象，这个值就会被转换为它的对象类型 - 装箱)

```javascript
    function foo() {
        console.log(this.a);
    }

    var obj = {
        a: 2,
    };

    foo.call(obj); // 2
```

4. new绑定

    new调用函数会创建一个全新的对象，并将这个对象绑定到函数调用的this

```javascript
    function foo(a) {
        this.a = a;
    }
    var bar = new foo(2);
    console.log(bar.a); // 2
```

5. 箭头函数不适用上述的四条规则，而是根据外层作用域来决定this，继承外层函数调用的this绑定

    箭头函数没有this，箭头函数里面的this只取决于包裹箭头函数的第一个普通函数的this

## 箭头函数



