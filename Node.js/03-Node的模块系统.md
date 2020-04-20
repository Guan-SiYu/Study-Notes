## Node Module System

在这一章里你会知道什么是模块、为啥要用模块、以及他们是怎么工作的

我们要探索一些用node内建的核心模块 比如操作系统`of`、文件系统`fs`、事件`events `  和 HTTP `http`

你也会学到如何创建自己的模块

## Global Object 全局对象

console对象就是我们说的全局对象，它的作用域是全局，也就是说可以在任何地方任何文件调用它

#### 全局函数

在node中也有很多其他的全局函数 比方说setTimeout 我们用这个函数设置延迟时间去调用函数，还有clearTimeout、setInnerVal(给定延迟后重复调用函数)、clearInnerVal(清空正在反复调用的函数)等等。这些函数在浏览器里都属于window对象。这些也是是你既可以在浏览器也可以在node中运行的的全局函数。

#### global

在浏览器中window对象代表的是全局对象，所有被定义为全局函数的对象都可以通过window访问，比如我们可以写成window.console.log或直接略去window，写成console.log，JavaScript引擎会自动前置window关键字，因为这时这个函数定义的地方

写js的时候，我们var一个对象，`var message`; 这个对象同样属于window对象。但是，我们说过，node没有window对象，我们有个类似的对象叫`global`  以上提到的所有函数都可以通过global对象调用。比如我们可以写成global.console.log、global.setTimeout等等，同样也可以省去global直接写。

⚠️但是有一点要强调的是，这里定义的变量没有添加到global对象中，换句话说

```js
//first-nodeApp/app.js
var message = "MSG"; //这里定义的对象并没加入到global对象中
console.log(global.messate);//❌ undefined 
```

message这个变量的作用域只在app.js这个文件中，在文件外它是不可见的，这就是node的模块化系统所致

下一节，就讲node的模块化系统

## Modules 模块

在客户端，js运行在浏览器中，当我们定义一个函数或变量，它的作用域都是全局的，可以通过window对象访问。这种行为逻辑有个问题，在真实的编程中，我们经常将不同的代码放到不同的文件中，也许你在两个文件中定义了同名的sayHello函数，因为函数被添加到全局变量window，当我们在另一个文件中定义这个名字的函数的时候，新的定义将会覆盖掉旧的定义，这就是全局作用域的带来的问题。

所以为了建立可信和可维护的应用我们应该避免定义全局变量和函数，我们应该模块化。我们需要创建小型拼装块也叫模块来存放变量和函数，这样不同模块之间的同名变量和函数不会相互覆盖，因为它们被封装在模块中了。node的核心概念就是模块，每个node中的文件都被看做模块，每个模块中定义的变量和函数的作用域就仅在模块内，以面向对象的观点我们叫它们私有成员，它们在容器外也就是模块外是不可见的。如果你要在模块外使用一个定义在模块中的变量或函数，需要明确的导出这些变量或函数成为公开成员 (下节学到）

每个node工程至少要包含一个文件或者说模块，这里的app.js就是这个项目的主模块。

```js
//first-nodeApp/app.js
console.log(module);//这个module像是全局对象实际上不是，不能写成global.moudule
```

```bash
#bash
Module { #这是一个JSON对象
  id: '.',#每个模块都有独一无二的id
  exports: {},#🔍观察Module对象，这里有个exports属性，现在这个属性是一个空的对象，所有添加到这个对象的属性将可以在外部访问
  parent: null,
  filename: '/Users/mac/first-nodeApp/app.js',#这个模块的物理位置
  loaded: false,#这个模块是否被加载
  children: [],
  paths:
   [ '/Users/mac/first-nodeApp/node_modules',
     '/Users/mac/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
```

下一节将学习如何创建并加载模块

## 创建一个模块

```js
//first-nodeApp/logger.js

/*在这个模块中我们要使用远程日志服务来记录我们的日志 
  有个其他的网站可以提供日志服务，它提供了一个URL，
  可以通过给它发送HTTP请求来记录日志
*/
var url = 'http://mylogger.io/log';//会向这个地址发送请求
//发送HTTP请求的函数
function log(message){
    //send a http request...
    console.log(message);
}
/*现在url变量和log函数的作用域都是这个文件，它们是私有的，在外部不可见。
  但是我们想在app.js也就是工程主模块中用到日志模块，
  怎样在app.js中访问到log函数？     
*/
//需要将它变为公共的可在外部访问的
module.exports.log = log;
//在module的exports对象中 添加了log属性，值为log函数
module.exports.URLstr = url;//在外部我们叫url为URLstr

console.log(module);
```

```bash
#bash
$ node logger.js
Module {
  id: '.',
  exports: { log: [Function: log], URLstr: 'http://mylogger.io/log' }, # 🔍
  parent: null,
  filename: '/Users/mac/first-nodeApp/logger.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/mac/first-nodeApp/node_modules',
     '/Users/mac/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }

```

## 加载模块

加载模块需要用到`require`函数，这是node才有的函数，浏览器没有。这个函数需要一个参数，也就是我们想加载的模块名称。`require`函数返回参数模块所导出的对象，上面标上🔍那些东西就是`require`函数得到的东西。

```js
//first-nodeApp/app.js
const getWhat = requestAnimationFrame('./logger')
/*app.js和logger.js在同一文件目录下，使用./来代表当前文件夹,
 如果模块在在父文件夹，用../来代表相对路径
 node知道这是一个js文件会自动扩展名，可以省略logger.js的.js
*/
console.log(getWhat);
```

```bash
#bash
$ node app.js
{ log: [Function: log], URLstr: 'http://mylogger.io/log' } # 🔍

```

现在我们可以在app.js中调用log函数了

```js
//first-nodeApp/app.js
getWhat.log('A-message');

```

```bash
#bash
$ node app.js
A-message
```

作为最佳实践，导入的模块应该保存在常量中。node有个专门检查这类错误的工具，使用可以避免在运行时出现问题，一个很有名的就是jshint。

还有一点就是，当我们只需要导出单个函数或变量时，我们可以只单独导出，而不是导出一个 exports对象。

```js
//logger.js
module.exports = log; 
//app.js
var getWhat = require('./logger');
console.log(getWhat);
getWhat('A-message');
```

```bash
% node app.js
[Function: log] # 🔍
A-message
```

## Node是如何实现封装模块的？

node不直接执行代码，而是将你写的所有代码包裹在这样一个''大函数''中：

```js
(function(exports,require,module,__filename,__dirname){
		//你写的代码...
})
```

看看这个函数的参数`require` ，require函数看起来像全局的但实际上并不是，**require是每个模块本地的**，在每个模块中，require都是作为参数传递给''大函数''，我们称这个''大函数''为**模块包装函数**（Module Wrapper Function）

还有`module`和`exports`函数参数

`exports`是module.exports的简写，所以在这个例子中你可以写module.exports.log = log;也可以写exports.log = log; ⚠️但是如果没有module对象的引用就不能重置module对象，🙅🏻‍♀️不能写exports=log,因为这个exports是一个module.exports的引用，你不能更改它的引用，你只能往上添加属性。

`__filename`和`__dirname`参数是俩常量 代表文件名和目录名

```j
console.log(__filename); /Users/mac/first-nodeApp/app.js 文件的完整路径
console.log(__dirname);  /Users/mac/first-nodeApp  包含模块的文件夹路径
```

