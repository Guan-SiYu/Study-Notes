https://nodejs.org/dist/latest-v12.x/docs/api/ 查看node所提供的内建的核心模块

## Path Module 路径模块

node核心中有些内建模块，使用这些模块可以操作系统、文件和网络。Path给我们很多工具去操作路径。

```js
const pathObj = require('path'); //这是一个包含多个有用方法的对象
/*
path作为参数传给require函数，node意识到这是一个内建模块
如果没有这里给定字符串(如path)的内建模块,node就会查找相对路径中存在的文件
这也是为什么引用相同文件路径下的模块要加./的原因
*/
var pathVal = pathObj.parse(__filename);
console.log(pathVal);
```

```bash
#得到一个path对象
{ root: '/',
  dir: '/Users/mac/first-nodeApp', #应用所处文件夹的路径
  base: 'app.js', #应用的名称
  ext: '.js', #应用的扩展名
  name: 'app' } #除去扩展名的应用名
```

## OS Module 系统模块

这一节学习如何获取当前操作系统的信息

`os.freemem()` 返回当前可用的内存有多少

`os.totalmem()` 返回总内存的大小

`os.userInfo()` 得到当前用户的信息 

`os.uptime()` 得到开机的时间

```js
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
//ES6新语法：字符串模板
console.log(`Total Memory : ${totalMemory}`)
console.log(`Free Memory : ${freeMemory}`)
```

```
Total Memory : 8589934592 #总内存
Free Memory : 1154465792 #剩余内存
```

## File System Module 文件系统模块

fs所拥有的方法几乎都分为两类：同步/阻塞 的方式、异步/非阻塞 的方法。比如access就是一个异步方法，accessSync就是同步方法。就算是这里有同步方法也要避免使用，如果你用node来创建你应用的后端，你可能有成百上千的客户端接入后端，如果单线程时刻忙碌，就无法服务众多客户端，所以永远使用异步方法。

先试试同步方法

```js
const fs = require('fs');
const files = fs.readdirSync('./')//返回当前文件夹的所有文件和文件夹
console.log(files);                                    
```

```bash
[ 'app.js', 'logger.js' ] #files常量是一个字符串数组
```

再试试异步方法，所有异步方法都用一个函数作为最后一个参数，node会在异步操作完成后自动执行这个函数

，我们叫这种函数为回调函数，这个函数有两个参数，一个是异常，一个是结果，这里的结果就是字符串数组。

```js
const fs = require('fs');
fs.readdir('./',(Err,result)=>{
    //这里我们要检测是否有Error或者有result,只会有一个值,另一个是null
    if(Err)console.log('Error',Err);//后面有章专门讲node如何处理异常
    else console.log('Result',result);

}); 
```

```
Result [ 'app.js', 'logger.js' ]
```

现在我们模拟一个异常，把路径改为别的字符

```
Error { [Error: ENOENT: no such file or directory, scandir '$'] errno: -2, code: 'ENOENT', syscall: 'scandir', path: '$' }
```

## Events Module 事件模块

node中一个核心概念就是事件，事实上很多node的模块都是基于事件的。**事件就是提示程序中发生了什么的信号**。例如node中有个模块是http，可以用来创建网络服务，我们监听给定的端口，每次我们在这个端口得到的请求，http类就会发起一个事件，我们的工作就是响应这个事件，具体说就是读取请求内容并给出对应的反馈。你接着看node的文档，你可以看到很多不同的模块发起不同的事件，你的代码关心的是如何反馈这些事件。这节课来学习如何操作事件模块。 

Events模块有里有个类叫做  `EventEmitter`  (emitter [n.]发射器)，这是node的核心模块之一，很多类是基于这个EventEmitter类的，我们来看看如何操作这个类。

​	

```js
const EventEmitter = require('envents');
//EventEmitter这个明明表名它是一个类，不是一个对象而是一个包含属性和方法的类! 
//所以为了使用EventEmitter，首先要创建它的实例
const emitter = new EventEmitter();//这里emitter才是一个对象
//emitter有很多方法，我们常用的只有俩
//一个是emit，用来发起一个事件的 emit这个单词的意思就像是制造噪音提示什么事发生了
emitter.emit('messageLoged');//参数就是事件的名称
//以后将扩展logger模块，每次记录一个日志都要发起一个事件 
```

到现在为止，运行程序，什么都没有发生，因为我们发起了事件，但我们的应用中没有任何人注册了对这个事件感兴趣的监听器。**监听器是当事件发生时被调用的函数**。现在我们来注册关注'messageLoged'事件发生的监听器：

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
    
//注册一个监听器
emitter.on('messageLoged',()=>{
    console.log('哈哈，事件已经发生啦');
})
//发起事件
emitter.emit('messageLoged');
```

这里的顺序很重要，如果你在发起事件之后才定义监听器，什么都不会显示，因为当你发起事件时，emit遍历了所有的监听器都没有。

on比addListener方法更常用 这里传入两个参数，一个是事件名称；第二个是回调函数，事件发生时被调用。

```bash
$ node app.js
哈哈，事件已经发生啦
```

​	

## Event Arguments 事件参数

经常我们在发起事件的时候想带点数据，例如在logger模块中当我们记录日志时，我们的服务器可能想创建一个日志的编号之后返回给客户端，或者给它一个URL，可以直接访问日志的信息。所以在这里发起事件的时候，我们可以带一个参数作为事件的参数，如果需要给事件加入多个数据，更好的方式是将这些数据装在对象中。

```js
emitter.emit('messageLoged',{id:01,url:'http//...'});
```

监听器的回调函数可以得到事件的参数，

```js
emitter.on('messageLoged',(args)=>{
    console.log('得到参数',args);
})
```

```bash
$ node app.js
得到参数 { id: 1, url: 'http//...' }
```

使用这个技巧就可以在事件发生时的传递数据了。

还有一个让代码变简洁的技巧
