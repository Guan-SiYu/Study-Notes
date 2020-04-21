这一章将了解Express更深层次的知识，我们会特别关注Middleware中间件、Configuration配置、Debugging查虫、Templating Engines模板引擎...

## Middleware 中间函数

Express中的一个核心概念就是中间件或者叫中间函数。一个中间函数，技术上说就是得到一个请求对象，要么反馈给客户端，要么传递给另一个中间函数。你已经见过两个中间函数了：一个就是路由处理的回调函数 `app.get('/',callback)` （这个callback也叫路由句柄函数），在Express中，所有路由句柄函数都是中间函数，因为它需要传入一个请求对象并且 `res.send(...)` 向客户端返回数据从而终结了请求反馈闭环；第二个你见过的就是 `app.use(express.json())` ，当我们调用 `express.json()` ，它返回了一个需要三个参数的函数，这三个参数分别是 `request`、`response` 和 `next` ，在json()的函数体中 格式化了请求体，如果请求体是一个JSON对象就设置给`req.body` 属性，然后把控制权交给下一个中间件。

当服务器收到一个请求，请求就进入一个管道，我们将这个管道称为 Request Processing Pipeline  **请求处理管道**

管道中有一个或多个中间函数，每个中间函数要么根据请求向客户端返回数据，要么将控制权交给其他中间函数。

在"增删改查"这一节的例子中，请求处理管道中有2个中间函数：第一个中间函数是将请求转换为一个JSON格式对象，这个情况下它并没有终结请求反馈闭环，这样它就将控制权交给下一个中间函数------路由句柄，在路由句柄中，`req.body` 属性已经被`app.use(express.json())`设置好，这样路由句柄就可以开开心心进行一些操作，然后以向客户端发送反馈来终结请求反馈闭环。`Request` ====== `json()`  ==> `route()` ======= `Response`

Express有一些内建的中间函数，你同样也可以在管道中添加自定义的中间函数。每个服务器获得的请求都会转到中间函数，使用自定义的中间函数，我们可以创建横切关注点(Crosscutting Concerns)，比如我们可以实现登录、验证、认证等功能，所以Express总体来说就是一堆中间函数，下节我们来看看如何创建自定义中间函数。

## 创建自定义中间函数

```js
const expressFunc = require('express');
const app = expressFunc();
app.use(expressFunc.json()); //我们添加了JSON中间件

```

我们**通过调用use方法在请求处理管道中安插一个中间函数** ，这里传入一个匿名函数，它有三个参数：`request`、`response` 和 `next` ，**next 表示管道中下一个中间件的引用** ，处理完登录，我们就调用next来将控制权交给下一个中间件。如果你没调用next，后面就没闭合请求反馈闭环，我们的**请求就会被无限期的挂起**

```js
//在下面再次调用app.use方法，我们假设这个匿名中间函数处理的是登录功能

app.use((requset,response,next)=>{
    console.log('登录中...');    //处理登录
    next();                     //将控制权交给下一个中间函数  
})
```

```js
//处理授权中间件
app.use((request,response,next)=>{
    console.log('授权中...');
    next();
})
```

**中间件是按顺序调用的**，首先是登录中间函数的调用，然后是授权中间函数的调用，最后调用路由句柄中间件。

```bash
express-demo$ node index.js
服务器正在监听3000端口
登录中...
授权中...
```

为了让代码更简明，当我们创建中间件的时候，我们不要将所有代码都写在index模块当中，我们要将每个中间件放在各自独立的文件中，在这里我们新创建一个 `logger.js` 新文件

```js
/* logger.js */
function log(requset,response,next){
    console.log('登录中...');    
    next();                     
}
module.exports = log;
```

```js
/* index.js */

//处理登录中间件
const logger = require('./logger');
app.use(logger);
```

