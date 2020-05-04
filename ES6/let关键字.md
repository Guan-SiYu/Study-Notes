let关键字

**`let`**允许你声明一个作用域被限制在块中的变量。一个块就是用{  }包起来的代码。



```javascript
 let a = 3;
    let y = 4;
    console.log("a,x="+a,x);//a=3 x is not defined
    {
        let a = 5;
		let x = 6;
		console.log("a,y="+a,y);//a=5 y=4
    }
里面向外查找,外不可查里。    

```

**`let`**声明的变量只在其声明的块或子块中可用。

没有被任何{ }包裹的let声明的变量 存在于Script中

```js
let h;
{  
		h=66;
    {
        h = 77;
    }
}
debugger //Script => h:77
```



```js
let h;
{ 
    {
        h = 77;
    }

    h=66;
}
debugger//Script => h:66
```

<img src="/Users/mac/Desktop/图.png" style="zoom:80%;" />

**`let`**不会在全局对象里新建一个属性。

![图2](/Users/mac/Desktop/图2.png)

`let`在全局中创建的变量存在于Script中

`var`创建的变量存在于Global中

在控制台中可见Script与Global平级

```
let a = "let";//在控制台的Script下找到a
var b = "var";//在控制台的Global下找到b
debugger
```



```javascript
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
```



###### var关键字

**`let`**声明的变量只能是全局或者整个函数块的。

位于函数或代码顶部的**`var`**声明会给全局对象新增属性。

`var`和 `let` 的不同之处在于`let`是在编译时才初始化

###### 在for循环中

```javascript
var printNumTwo;
for (var i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());// returns 3
console.log(i);//returns 3

printNumTwo()返回全局i值，而不是i在for循环中创建函数时返回的值。


```

###### 

```javascript
'use strict';
let printNumTwo;
for (let i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());
// returns 2
console.log(i);
// returns "i is not defined"

i未在全局范围内声明,它仅在for循环语句中声明。
循环语句中的let关键字创建了三个在不同块内的的不同变量i。
相当于以下过程：

  let printNumTwo;
  //1
  {
  	let i=0；
	}
  //2
	{
  	let i=1；
	}
  //3
  {
    let i=2;
    	printNumTwo = function(){return i}
  }


```



