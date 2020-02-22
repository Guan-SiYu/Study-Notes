常量是块级作用域，很像使用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 语句定义的变量。常量的值不能通过重新赋值来改变，并且不能重新声明。

一个常量不能和它所在作用域内的其他变量或函数拥有相同的名称。

常量在声明的时候可以使用大小写，但通常情况下全部用大写字母。

```js
// 定义常量MY_FAV并赋值7
const MY_FAV = 7;
MY_FAV = 20;// 报错
console.log("my favorite number is: " + MY_FAV);// 输出 7
const MY_FAV = 20;// 尝试重新声明会报错 
var MY_FAV = 20; // 报错,因为MY_FAV标识符已被定义为常量
let MY_FAV = 20;//报错

if (MY_FAV === 7) { 
  	// 注意块范围的性质很重要
    let MY_FAV = 20; // 没问题，并且创建了一个块作用域'变量' MY_FAV
    console.log('my favorite number is ' + MY_FAV);//20
    var MY_FAV = 20;// 这被提升到全局上下文并引发错误
}
console.log("my favorite number is " + MY_FAV);// MY_FAV 依旧为7

const FOO; //Error 常量要求一个初始值

// 常量可以定义成对象
const MY_OBJECT = {"key": "value"};
MY_OBJECT = {"OTHER_KEY": "value"};// 重写对象和上面一样会失败
MY_OBJECT.key = "otherValue";//成功改变属性值,对象属性并不在保护的范围内
MY_OBJECT.otherKey = "someValue"//可以向它添加新键值对
MY_OBJECT = {...}//但是，将一个新对象赋给常量会引发错误
             
// 也可以用来定义数组
const MY_ARRAY = [];
MY_ARRAY.push('A'); // ["A"]  可以向数组填充数据
MY_ARRAY = ['B']// 但是，将一个新数组赋给常量会引发错误
```



`const`声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容

```js
const obj = { a:12,b:13};
obj.c=4;//{a: 12, b: 13, c: 4}
obj.a=17;//{a: 17, b: 13, c: 4}
obj = {d:16,e:24,h:8}//Error

const arr = [1,2,3,4,5];
arr.reverse();//[5,4,3,2,1]
```

