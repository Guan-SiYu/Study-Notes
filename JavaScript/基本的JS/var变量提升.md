https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var

- **声明变量**在任何代码执行前创建，而**没被声明的变量**只有在执行赋值操作的时候才会被创建。

- 当赋值给没被声明的变量的变量, 则执行赋值后, 该变量会被隐式地创建为全局变量（它将成为全局对象的属性）。

```js
var a;
console.log(a);                // 打印"undefined"或""（不同浏览器实现不同）。

console.log(b);                // 抛出ReferenceError。
```

### 变量提升

由于变量声明（以及其他声明）总是在任意代码执行之前处理的，所以在代码中的任意位置声明变量总是等效于在代码开头声明。这意味着变量可以在声明之前使用，这个行为叫做“hoisting”。“hoisting”就像是把所有的变量声明移动到函数或者全局代码的开头位置。

```js
bla = 2
var bla;
// ...

// 可以隐式地（implicitly）将以上代码理解为：

var bla;
bla = 2;
```

因此，建议始终在作用域顶部声明变量（全局代码的顶部和函数代码的顶部），这可以清楚知道哪些变量是函数作用域（本地），哪些变量在作用域链上解决。

⚠️重要的是，提升将影响变量声明，而不会影响其值的初始化。当到达赋值语句时，该值将确实被分配：

```js
function do_something() {
  console.log(bar); // undefined
  var bar = 111;
  console.log(bar); // 111
}

// is implicitly understood as: 
function do_something() {
  var bar;
  console.log(bar); // undefined
  bar = 111;
  console.log(bar); // 111
}
```

## 例子

### 声明并初始化两个变量：

```js
var a = 0, b = 0;
```

### 给两个变量赋值成字符串值：

```js
var a = "A";
var b = a;

// 等效于：

var a, b = a = "A";
```

留意其中的顺序：

```js
var x = y, y = 'A';
console.log(x + y); // undefinedA
```

在这里，`x` 和 `y` 在代码执行前就已经创建了，而赋值操作发生在创建之后。当"`x = y`"执行时，`y` 已经存在，所以不抛出`ReferenceError`，并且它的值是'`undefined`'。所以 `x` 被赋予 undefined 值。然后，`y` 被赋予'A'。于是，在执行完第一行之后，`x === undefined && y === 'A'` 才出现了这样的结果。

### 多个变量的初始化

```js
var x = 0;

function f(){
  var x = y = 1; // x在函数内部声明，y不是！
}
f();

console.log(x, y); // 0, 1
// x 是全局变量。
// y 是隐式声明的全局变量。 
```

### 隐式全局变量和外部函数作用域

看起来像是隐式全局作用域的变量也有可能是其外部函数变量的引用。

```
var x = 0;  // x是全局变量，并且赋值为0。

console.log(typeof z); // undefined，因为z还不存在。

function a() { // 当a被调用时，
  var y = 2;   // y被声明成函数a作用域的变量，然后赋值成2。

  console.log(x, y);   // 0 2 

  function b() {       // 当b被调用时，
    x = 3;  // 全局变量x被赋值为3，不生成全局变量。
    y = 4;  // 已存在的外部函数的y变量被赋值为4，不生成新的全局变量。
    z = 5;  // 创建新的全局变量z，并且给z赋值为5。 
  }         // (在严格模式下（strict mode）抛出ReferenceError)

  b();     // 调用b时创建了全局变量z。
  console.log(x, y, z);  // 3 4 5
}

a();                   // 调用a时同时调用了b。
console.log(x, z);     // 3 5
console.log(typeof y); // undefined，因为y是a函数的本地（local）变量。
```

