## Extending EventEmitter 扩展事件参数

现实编程中很少直接new EventEmitter的实例，相反，你会创建一个类拥有所有EventEmitter的功能然后使用它。

```js
//logger.js
const EventEmitter = require('events');
const emitter = new EventEmitter();
var url = 'http://mylogger.io/log';
function log(message){
    console.log(message);
    //发起一个事件 然后在app模块中监听
    emitter.emit('messageLoged',{id:01,url:'http//...'});   
}

module.exports = log;
```

```js
//app.js
const EventEmitter = require('events');
const emitter = new EventEmitter();
    
emitter.on('messageLoged',(args)=>{
    console.log('得到参数',args);
})

//加载logger模块并且调用log函数
const log = require('./logger');
log('message');
```

❓我们运行app.js，只会看到这个'message'字符串，换句话说，监听器没被调用

```bash
$ node app.js
message
```

这是为什么呢？这是因为现在我们操作着两个不同的EventEmitter，app.js中是这个EventEmitter对象，在logger模块中使用了一个emitter对象来发起事件，但是在app模块中使用了另一个emitter对象来处理事件。这是完全不同的，当我们在一个模块中注册一个监听器，这个监听器只在当前模块的emitter对象注册，与别的模块无关。这就是我们不直接new EventEmitter的实例的原因。而是要创建一个继承并扩展了EventEmitter所有能力的类。

修改logger.js

```js
const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{ 	//创建一个继承EventEmitter的Logger类
    log(message){                   //log在Logger.prototype上
        console.log(message);
        this.emit('messageLoged',{id:1,url:'http//...'});   
    }
}

module.exports = Logger;	//导出Logger类

```



修改app.js

```js
const Logger = require('./logger');	//加载logger模块

const logger =  new Logger();	//new Logger的实例
console.log(logger.__proto__===Logger.prototype); //true
console.log(Logger.prototype.__proto__=== require('events').prototype);	//true

logger.on('messageLoged',(args)=>{
    console.log('得到参数',args);
})

logger.log('message');

```

✅现在我们的监听器和发起事件使用了同一个对象

```bash
$ node app.js
true
true
message
得到参数 { id: 1, url: 'http//...' }
```
## Http Module HTTP模块

node中一个非常强大的模块就是用于创建网络应用的HTTP模块，例如我们可以创建一个服务监听给某个给定端口，这样我们就可以为客户端创建一个后端服务，就像React或者Angular创建的应用，或者在手机上使用的移动端应用，回到node的文档中，可以看到HTTP模块有很多类，比如http.Agent类、http.ClientRequest类等，每个类都有很多属性、方法和事件。

```js
const http = require('http');

const server = http.createServer();
```

我们用`http.createServer()`  创建一个网络服务并将它保存在server对象中，有趣的是这个server是一个EventEmitter，它具备你之前看到的所有的EventEmitter的功能如	server.on();	 server.addListener(); 	server.emit();等等

同样的，dang'ni看到http模块的文档，找到http.Server类，这里写明了这个类继承自net.Server类,所以Server也是定义在net模块的类,点进去发现，net.Server是一个EventEmitter，这就是我说的node中很多方法都是基于EventEmitter

```js
const http = require('http');

const server = http.createServer();

server.on('connection',(socket)=>{
    console.log('这是一个新连接...');
    console.log(socket);
})


server.listen(3000);
console.log('正在监听3000端口');//当运行，就会监听3000端口
```

当有一个请求或者连接，server就会发起事件，事件的名称是  `connection`  (node文档中可以找到)，所以这里我们在listen用on方法处理事件。on方法的第二个参数是一个回调函数，参数是一个`socket类`的实例（socket[n.]插座）这里我理解为：当有一个请求或者连接，server就会发起事件,前面学emit的时候说过发起事件可以伴随事件参数，那么这个`socket`就是server发起事件时带给监听器的参数。

```bash
$ node app.js
正在监听3000端口
```

我们打开浏览器输入地址localhost:3000，终端打印出新的文字

```bash
这是一个新连接...
```

这就说明，当我们的浏览器发起一个连接，server就发起'connection'事件，我们写的on监听器就处理了这个事件。

在真实编程中，发起connection然后on处理这种写法太低级了，程序媛都这样写：

我们常用的做法是给createServer()方法一个回调函数，这个回调函数有两个参数，分别是请求和回应。

```js
const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){ //我们可以检测如果请求的url是'/'
        res.write('You can see me now')//就返回点东西给客户端
        res.end();                     //然后使用end()关闭res对象
    }
});

server.listen(3000);
console.log('正在监听3000端口');
```

运行，浏览器会显示：You can see me now

如果我们想创建一个网络应用的后端服务，我们需要处理很多路由规则，例如我们需要另一些if语句

```js
const server = http.createServer((req,res)=>{
    if(req.url === '/'){ 
        res.write('You can see me now')
        res.end();                     
    }
    if(req.url === '/api/courses'){ //如果url是/api/courses
        req.write(JSON.stringify([1 ,2 ,3]))     // 用JSON格式返回一个对象
        res.end();	
    }
});
```

访问http://localhost:3000/api/courses ，浏览器显示数组 [1 ,2 ,3 ]

学到这里，你知道创建网络服务其实是很容易的，现实中我们不会使用http模块直接创建后端服务，理由是当这里的规则越多if语句就越多，代码会变得复杂，因为我们都是在回调函数中线性的增加它的内容。取而代之我们使用一个叫Express的框架，它可以给应用一个清晰的结构，来处理不同的路由请求。后面的章节我们会使用Express来替代node原有的HTTP模块的功能。
