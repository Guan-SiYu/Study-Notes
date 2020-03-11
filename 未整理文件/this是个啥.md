一、this在函数体外部

无论是否在严格模式下，在全局执行环境中的this 都指向全局对象。

// 在浏览器中, window 对象同时也是全局对象： console.log(this === window); // true a = 37; console.log(window.a); // 37 this.b = "MDN"; console.log(window.b)  // "MDN" console.log(b)         // "MDN"

二、this在函数体内部

在函数内部，this的值取决于函数被调用的方式。

1.函数被简单调用

简单调用函数分为在严格和非严格模式下，严格模式下this为undefined，非严格模式下this为window.

- ​        非严格模式：

function f1(){

return this;

}

f1();		//Window

- 严格模式：

function f2(){

"use strict";

return this;

}

f2();		//undefined

然而，如果f2不是被直接调用的，而是作为对象的方法调用的：

window.f2();

//Window

2.指定this代表某个对象

要想把 this 的值从一个环境传到另一个，就要用 [call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 或者[apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法。

函数运行时，call和apply方法可以将函数里的this指定为某一对象。

call和apply方法在Function .prototype里，所有自定义的function都会继承。

- 用法：

var obj ={	

​       			 a:"A"

   			}

​       var a = "windowA";

​       function whatThis(){

​        	return this.a;

​    	}

​       whatThis();          //"windowA"

​       whatThis.call(obj);  //"A"

​       whatThis.aplly(obj); //"A"

- call和apply的区别:

 call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是**参数列表**，而apply()方法接受的是**一个参数数组**。

var obj = {

​            		a:1,

​            		b:2

​           		}

function addNumber(c,d){

   	 	return this.a + this.b + c + d;

}

addNumber.call(obj,5,7); //15

addNumber.apply(obj,[5,7]); //15

3.函数作为对象的方法被调用

当函数作为对象的方法被调用时，this指向调用该函数的对象。

 var obj ={

​        prop:37,

​        method:function(){

​            return this.prop;

​        }

​    }

​    obj.method();	//37

不受函数定义方式或位置的影响:

​    function func(){

​        return this.prop;

​    }

​    var obj = {prop:37};

​    obj.method = func;

​    obj.method();

4.函数作为原型链上定义的方法被调用

- 如果函数是对象原型链上的方法，this指向的是调用这个方法的对象，就像该方法在对象上一样。

![img](https:////note.youdao.com/src/WEBRESOURCEab4192cba3f96e684a6c52a384894393)

- 当继承的函数被调用时，this 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

![img](https:////note.youdao.com/src/WEBRESOURCE74cdb14b2c5f576666dd117bbcd4f9dd)

5.用bind方法绑定this

Function.prototype.bind。

function.bind(someObject)会创建一个与function具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到bind的第一个  		      

参数，无论这个函数是如何被调用的。

 	function func(){

​        	return this.a;

​    	}

​    	var func1 = func.bind({a:"A"});

   	func1();	//"A"

​    	var func2 = func1.bind({a:"B"});  //相当于 var func2 = func.bind({a:"A"}).bind({a:"B"});

func2();	//"A"  bind只生效一次

​    	var obj ={

​        	a:37,

​        	func:func,

​        	func1:func1,

​        	func2:func2

   	 }

//作为obj的方法来调用：

obj.func();	//37

obj.func1();	//"A"

obj.func2();	//"A"

6.函数作为构造函数

一个函数用作构造函数时，它的this被绑定到正在构造的新对象。

但是，虽然构造器返回的默认值是this所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回this对象）。

  构造函数这样工作:  * function MyConstructor(){ *   // 函数实体写在这里 *   // 根据需要在this上创建属性，然后赋值给它们，比如： *   this.fum = "nom"; *   // 等等... * *   // 如果函数具有return语句返回一个对象，则该对象将是 new 表达式的结果。  *   // 否则，当前this绑定的对象就是new 表达式的结果。 * }

![img](https:////note.youdao.com/src/WEBRESOURCEcb4984306d9c2b6352ba25ca53d46f53)

因为在调用构造函数的过程中，手动的设置了返回对象，与this绑定的默认对象被丢弃了。

![img](https:////note.youdao.com/src/WEBRESOURCEe2d4b34344450d798fa10fcb6927a080)

7.函数作为一个**内联事件处理函数**被调用

- 当代码被内联on-event 处理函数调用时，它的this指向监听器所在的DOM元素：

<button onclick="alert(this.tagName.toLowerCase());">  Show this </button>             // alert 会显示button

- 在这种情况下，没有设置内部函数的this，所以它指向 window 对象（即非严格模式下调用的函数未设置this时指向的默认对象）：

<button onclick="alert((function(){return this})());">  Show inner this </button>	 // alert 会显示window

8.函数作为**一个DOM事件处理函数**被调用

当函数被用作事件处理函数时，它的this指向触发事件的元素。

var elements = document.getElementsByTagName('*');

for(var i=0 ; i<elements.length ; i++){  elements[i].addEventListener('click', bluify, false); }

function bluify(){       this.style.backgroundColor = '#A5D9F3'; }