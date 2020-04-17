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

