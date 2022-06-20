# 原型 、原型链、继承

## **原型**

### 1. 每个构造函数都拥有一个 **prototype** 属性用来指向原型对象

### 2. 原型对象默认拥有一个 **constructor** 属性用来指向它的构造函数

### 3. 每个实例都拥有一个 **[[prototype]]** 属性指向它的原型对象

    这个属性可以通过 Object.getPrototypeOf(obj) 或 obj.__proto__来访问

#### * 总结

```javascript
    // obj 实例
    // func 构造函数
    let obj = new func();
    obj.__proto__ === func.prototype;
    
    // 一切函数都是由 Function创建而来
    func.__proto__ === Function.prototype

    // 一切函数的原型对象 都是由 Object函数创建的
    func.prototype.__proto__ === Object.prototype
```

### 4. 原型对象是用来存放实例中共有的那部分属性

    将实例中共有的属性放到原型对象中，让所有实例共享这一部分属性。每个实例可以通过重写来覆盖原型中已经存在的属性

#### * 总结

```javascript
    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }

    Animal.prototype.bark = () => {
        console.log('mie mie ~~');
    }

    const dog = new Animal('dog', 10);
    dog.bark(); // mie mie ~~
    const cat = new Animal('cat', 5);
    cat.bark(); // mie mie ~~

    cat.bark = () => {
        console.log('miao miao ~~')
    }
    dog.bark(); // mie mie ~~
    cat.bark(); // miao miao ~~
```

### 5. 访问实例的属性时, Javascript会优先从实例自身的属性中查找, 若没有找到, 则会跳转到实例的原型对象中查找

## **原型链**

### 1. Javascript中的所有对象都是由它的原型对象继承而来, 而原型对象也有自己的原型对象,这样层层上溯,就形成了类似链表的结构,这就是原型链

### 2. 通过原型链就可以在JavaScript中实现继承

## **继承**

JavaScript中继承相当灵活,有多种继承实现方法。下面一一介绍

### 1. 对象冒充

通过临时变量来调用父类的构造方法

```javascript
    function Parent(name) {
        this.name = name;
        this.say = function() {
            console.log(`Hello - ${this.name}.`);
        }
    }
    Parent.prototype.eat = function() { 
        console.log(`${this.name} - eat.`)
    }

    function Child(name) {
        this.method = Parent;
        this.method(name);
        delete this.method;
    }
    var child1 = new Child('Lele');
    child1.say(); // Hello - Lele.
    child1.eat(); // Uncaught TypeError
    
    /**
     * 缺点 - 无法继承 父类 原型链上的方法
     * **/
```

### 2. call / apply 方式 修改this 指针

```javascript
    function Parent(name) {
        this.name = name;
        this.say = function() {
            console.log(`Hello - ${this.name}.`);
        }
    }
    Parent.prototype.eat = function() { 
        console.log(`${this.name} - eat.`)
    }

    function Child(name) {
        // 构造继承
        Parent.call(this, name);
        // Parent.apply(this, [name]);
    }
    var child2 = new Child('lyla');
    child2.say(); // Hello - Lyla.
    child2.eat(); // Uncaught TypeError
    
    /**
     * 缺点 - 无法继承 父类 原型链上的方法
     * **/
```

### 3. 原型链方法

将子类构造函数的原型对象设置为父类的实例

```javascript
    function Parent(name) {
        this.name = name;
        this.say = function() {
            console.log(`Hello - ${this.name}.`);
        }
    }
    Parent.prototype.eat = function() { 
        console.log(`${this.name} - eat.`)
    }

    function Child(name) {}
    Child.prototype = new Parent('Test');
    var child3 = new Child('lele');
    child3.say(); // Hello - Test.
    child3.eat(); // Test - eat.

    /**
     * 缺点 - 子类的实例共享引用类型 & 在创建子类实例的时候, 无法向继承的父类传递参数
     * **/
```

### 4. 混合继承 ( call/apply + 原型链 )

```javascript
    function Parent(name) {
        this.name = name;
        this.say = function() {
            console.log(`Hello - ${this.name}.`);
        }
    }
    Parent.prototype.eat = function() { 
        console.log(`${this.name} - eat.`)
    }

    function Child(name, age) {
        Parent.call(this, name);
        this.age = age;
    }
    Child.prototype = new Parent();

    var child = new Child('Lele', '18');
    child.say(); // Hello - Lele.
    child.eat(); // Lele - eat.

    /**
     * 通过 call / apply 继承父类属性
     * 通过设置 子类的 prototype 为 父类的实例，以继承方法 
     * **/
```

## 练习

```javascript
    var F = function() {};
    Object.prototype.a = function() { console.log('Object') };
    Function.prototype.b = function() { console.log('Function') };

    var f = new F();
    console.log(f.a, f.b, F.a, F.b);

    // f.__proto ---> F.prototype ---> Object.prototype
    // F.__proto__ ---> Function.prototype ---> Object.prototype 
```
