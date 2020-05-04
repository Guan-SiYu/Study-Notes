![截屏2020-04-30 下午10.40.52](https://tva1.sinaimg.cn/large/007S8ZIlly1gec69p16a6j30d70hh40c.jpg)

ECMAScript 2015 中引入的 JavaScript 类实质上是 JavaScript 现有的基于原型的继承的**语法糖**。类语法**不会**为JavaScript引入新的面向对象的继承模型。

## 定义类

类实际上是个“特殊的函数”，就像你能够定义的"函数表达式"和"函数声明""一样，类语法有两个组成部分：[类表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/class)和[类声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)。

### 类声明

定义一个类的一种方法是使用一个**类声明**。要声明一个类，你可以使用带有`class`关键字的类名（这里是“Rectangle”）。

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

#### 提升

**函数声明**和**类声明**之间的一个重要区别是函数声明会[提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)，类声明不会。你首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个`ReferenceError`：

```js
let p = new Rectangle(); // ReferenceError

class Rectangle {}
```

### 类表达式

一个**类表达式**是定义一个类的另一种方式。类表达式可以是具名的或匿名的。

一个具名类表达式的名称是类内的一个局部属性，它可以通过类本身（而不是类实例）的[`name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)属性来获取。

```js
// 匿名类
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// 具名类
let r = class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(r.name);
// 输出: "Rectangle"
```

## 类体和方法定义

一个类的**类体**是一对花括号 `{}` 中的部分。这是你定义类成员的位置，如方法或构造函数。

#### 严格模式

类声明和类表达式的主体都执行在严格模式。比如，构造函数，静态方法，原型方法，getter和setter都在严格模式下执行。

### 构造函数

`constructor()`方法是一个特殊的方法，这种方法用于创建和初始化一个由`class`创建的对象。一个类只能拥有一个名为 “constructor”的特殊方法。如果类包含多个`constructor`的方法，则将抛出 一个`SyntaxError` 。

### 👉🏻原型方法

参见【ES6概览11-15.11】

```js
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
				this.sayHi = function(){ //🙋🏻‍sayHi方法不在原型链上 直接拷在每一个实例里
            console.log("Hi");
        }
    }
    // 🙋🏻‍calcArea方法建在Rectangle.prototype上，其实例或子类可通过上溯原型链找到
    calcArea() {
        return this.height * this.width;
    }
}
const square = new Rectangle(10, 10);

console.log(square.area); // 100
square.calcArea===Rectangle.prototype.calcArea;//👀True
square.sayHi === Rectangle.prototype.sayHi;//❌False
Rectangle.prototype.sayHi;//undefined
```

### 👉🏻实例属性

实例的属性必须定义在类的方法里：

```js
class Rectangle {
  constructor(height, width) {    
    this.height = height;
    this.width = width;
  }
}
```

静态的或原型的数据属性必须定义在类定义的外面。

```js
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```



## 使用 `extends` 创建子类

`extends` 关键字在类声明或类表达式中用于创建一个类作为另一个类的一个子类。

```js
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();// 'Mitzie barks.'
```

如果子类中存在构造函数(constructor)，则需要在使用“this”之前首先调用 super()。

也可以继承传统的基于函数的“类”：

```js
function Animal (name) {
  this.name = name;  
}
Animal.prototype.speak = function () {
  console.log(this.name + ' 第一条');
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' 第二条');
  }
}

var d = new Dog('旺财');
d.speak();//控制台会打印出两条："旺财 第一条"和 "旺财 第二条"
```

请注意，类不能继承常规对象(不是构造函数的)。

如果要继承常规对象，可以改用[`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)：

```js
var Animal = { //这是一个普通的常规对象
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal);// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```

## super是个啥？

**super**关键字用于访问和调用一个对象的父对象上的函数。

在构造函数中(constructor函数中)使用时，`super`关键字将单独出现，并且必须在使用`this`关键字之前使用。`super`关键字也可以用来调用父对象上的函数。

```
super([arguments]); 
// 调用 父对象/父类 的构造函数 🙋就是调用父类函数的constructor函数

super.functionOnParent([arguments]); 
// 调用 父对象/父类 上的方法
```

```js
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length, length);//⚠️必须在this前使用
    this.name = 'Square'; //🙋覆盖上面的name 上面调用了父类的constructor name需要被覆盖
}
```

