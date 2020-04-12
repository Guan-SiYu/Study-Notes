

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

在构建一个API时，我们必须允许用户与我们交流他们想从我们的服务中得到什么。例如，如果客户机请求有关存储在数据库中的用户的信息，他们需要一种方法让我们知道他们对哪个用户感兴趣。实现此结果的一种可能方法是使用路线参数。**路由参数是URL的命名段，由斜线（/）分隔**。每个段捕获**URL中与其位置匹配的部分**的值。捕获的值可以在`req.params`对象中找到。

```js
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'//实际请求URL
req.params: {userId: '546', bookId: '6754'}
```

构建一个echo服务，在路线GET/：word/echo上。用JSON对象响应，采用结构{echo:word}。您可以在req.params.word中找到要重复的单词：

```javascript
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});
```

## 从客户端获取查询参数输入

从客户端获取输入的另一种常见方法是使用查询字符串对路由路径之后的数据进行编码。查询字符串以问号（？）分隔，并包括field = value对。每对都由“＆”号分隔。Express可以从查询字符串中解析数据，然后填充对象`req.query`。某些字符（例如百分比（％））不能出现在URL中，并且必须以其他格式编码后才能发送。如果使用JavaScript中的API，则可以使用特定方法来编码/解码这些字符。

```
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

构建安装在的API端点`GET /name`。响应JSON文档，采用结构`{ name: 'firstname lastname'}`。名字和姓氏参数应编码在查询字符串中，例如`?first=firstname&last=lastname`。

```js
  app.get('/name',(req,res)=>{
    const {first:firstName,last:lastName} = req.query
    res.json({name:`${firstName} ${lastName}`})
  })
```



##  使用body-parse(body解析器)解析POST请求 

在下面的练习中，您将在同一`/name`路径下从POST请求接收数据。如果需要，可以使用方法`app.route(path).get(handler).post(handler)`。使用此语法，可以在同一路径路线上链接不同的动词处理程序。您可以节省一些输入时间，并使用更简洁的代码。

除了GET，还有另一个常见的HTTP动词POST。POST是使用HTML表单发送客户端数据的默认方法。在REST约定中，POST用于发送数据以在数据库中创建新项（新用户或新博客文章）。在这个项目中没有数据库，但是无论如何，您将学习如何处理POST请求。 

在此类请求中，数据不会出现在URL中，而是隐藏在请求正文中。这是HTML请求的一部分，也称为有效负载。因为HTML是基于文本的，即使你看不到数据，也不意味着它是秘密的。HTTP POST请求的原始内容如下所示： 

```http
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20
name=John+Doe&age=25
```

如您所见，正文的编码方式与查询字符串类似。这是HTML表单使用的默认格式。使用Ajax，还可以使用JSON处理结构更复杂的数据。还有另一种类型的编码：多部分/表单数据。这个用来上传二进制文件。在本练习中，您将使用urlencoded主体。要解析来自POST请求的数据，必须安装body parser包。这个包允许您使用一系列中间件，这些中间件可以解码不同格式的数据。

在`package.json`中安装`body-parser`模块。然后，在文件的顶部`require`它，存在`body-Parser`的变量中。处理`urlencoded` data的中间件由`bodyParser.urlencoded（{extended:false}）`返回。`app.use（）`使用中间件。和往常一样，中间件必须安装在所有需要它的路由之前。

注意：extended=false是一个配置选项，它告诉解析器使用经典编码。使用时，值只能是字符串或数组。扩展版本允许更大的数据灵活性，但它比JSON强。

```js
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
```

## 从POST请求获取数据

在`/name`路径上安装POST handler。我们已经在html主页中准备了一个表单。它将提交与练习10相同的数据（查询字符串）。由于已经配置了body-parse(body解析器)，所以能在`req.body`对象中找到参数。看一下通常的库示例：

```
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

提示：除了GET和POST之外，还有其他几种http方法。按照约定，http动词与您将在服务器上执行的操作之间存在对应关系。常规映射为：

POST（有时是PUT）-使用随请求发送的信息来创建新资源，

GET-读取现有资源而不进行修改，

PUT或PATCH（有时是POST）-使用发送的数据更新资源，

DELETE =>删除资源。

```js
app.post('/name',(req,res)=>{
  const {first:firstName,last:lastName}=req.body;
  res.json({
    name:`${firstName} ${lastName}`
  })
})
```

