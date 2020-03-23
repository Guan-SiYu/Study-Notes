## 实施根级请求记录器中间件

之前，您已经了解了`express.static()`中间件功能。现在是时候详细了解什么是中间件了。中间件函数是带有3个参数的函数：请求对象，响应对象和应用程序的请求-响应周期中的下一个函数。这些函数执行一些可能会对应用程序产生副作用的代码，通常会将信息添加到请求或响应对象中。他们还可以通过在满足某些条件时发送响应来结束循环。如果完成后未发送响应，则将开始执行堆栈中的下一个函数。这将触发调用第三个参数`next()`。

看下面的例子：



```js
app.use((req,res,next)=>{
    const string = req.method+" "+req.path+" - "+req.ip;
    console.log(string);
    next();
}) //最好放在所有请求的前面

//Terminal打印如下：
GET / - ::ffff:127.0.0.1
GET /node_modules/jquery/dist/jquery.min.js - ::ffff:127.0.0.1
GET /a1.js - ::ffff:127.0.0.1
GET /a2.js - ::ffff:127.0.0.1
GET /publicStyle.css - ::ffff:127.0.0.1
GET /timg.jpg - ::ffff:127.0.0.1

```



假设您在路由上安装了此功能。当请求与路由匹配时，它显示字符串“我是中间件……”，然后执行堆栈中的下一个功能。在本练习中，您将构建根级中间件。如您在挑战4中所见，要在根级别安装中间件功能，可以使用该`app.use()`方法。在这种情况下，将对所有请求执行该功能，但是您也可以设置更具体的条件。例如，如果要仅对POST请求执行功能，则可以使用`app.post()`。所有HTTP动词（GET，DELETE，PUT等）都存在类似的方法。

## 创建时间服务器的链中间件


中间件可以使用app.METHOD（path，middlewareFunction）安装在特定的路由上。中间件也可以链接到路由定义中。


请看以下示例：

```js
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

这种方法对于将服务器操作拆分为更小的单元非常有用。这将导致更好的应用程序结构，以及在不同地方重用代码的可能性。这种方法也可以用于对数据执行一些验证。在中间件堆栈的每个点上，您都可以阻止当前链的执行，并将控制权传递给专门为处理错误而设计的函数。或者您可以将控制权传递给下一个匹配的路由，以处理特殊情况。我们将在“高级快车”部分中了解如何操作。

```js
app.get('/',(req,res,next)=>{
    req.time = new Date().toString();
    next();
},(req,res)=>{
    res.send(req.time)
})
//浏览器打印出时间
```

### 从客户端获取路由参数输入

在构建一个API时，我们必须允许用户与我们交流他们想从我们的服务中得到什么。例如，如果客户机请求有关存储在数据库中的用户的信息，他们需要一种方法让我们知道他们对哪个用户感兴趣。实现此结果的一种可能方法是使用路线参数。路由参数是URL的命名段，由斜线（/）分隔。每个段捕获URL中与其位置匹配的部分的值。捕获的值可以在req.params对象中找到。

```js
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

