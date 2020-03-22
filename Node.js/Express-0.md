Node.js是一个JavaScript运行时，允许开发人员使用JavaScript编写后端（服务器端）程序。简单的说 Node.js 就是运行在服务端的 JavaScript。Node.js附带了一些内置模块-小型独立程序-有助于实现此目的。一些核心模块包括：

- HTTP：充当服务器的模块
- File System：读取和修改文件的模块
- Path：用于处理目录和文件路径的模块
- Assertion Testing：根据指定的约束检查代码的模块

Express虽然不包含在Node.js中，但它是另一个常用的模块。Express在`由Node.js创建的服务器`和`Web应用程序的前端页面`之间运行。Express还处理应用程序的路由。路由基于`用户`与`应用程序的交互`将用户定向到正确的页面。尽管有使用Express的替代方法，但它的简单性使其成为学习Node.js支持的后端与前端之间交互时的良好起点

## 运行node代码

Node只是一个JavaScript环境。与客户端JavaScript一样，您可以使用控制台显示有用的调试信息。在本地计算机上，您将看到终端中的控制台输出。出现故障时，可以打开屏幕下部的日志。您可以使用“日志”`Logs`按钮（工具菜单内左下角）切换日志面板。通过阅读日志，你可以了解可能发生的错误的性质。

打开Terminal

```js
$	cd 要运行的node代码的js文件所在文件夹的命名;
$ node 文件名.js
```

## 启动可运行的Express服务器

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('示例应用正在监听 3000 端口!');
});

```



前两行通过 `require()` 导入 Express 模块，并创建了一个 [Express 应用](http://www.expressjs.com.cn/4x/api.html#app)。传统上把这个对象命名为 `app`，它可以进行路由 HTTP 请求、配置中间件、渲染 HTML 视图、注册模板引擎以及修改 [应用程序设置](http://www.expressjs.com.cn/4x/api.html#app.settings.table) 等操作，从而控制应用的行为（例如，环境模式，路由定义是否为区分大小写等）。

代码的中间部分（从 `app.get()` 开始共三行）是**路由定义**。`app.get()` 方法指定了一个回调（callback）函数，该函数在每监听到一个关于站点根目录路径（`'/'`）的 HTTP `GET` 请求时调用。此回调函数以一个请求和一个响应对象作为参数，并直接调用响应的 `send()` 来返回字符串“Hello World!”

最后一个代码块在 “3000” 端口上启动服务器，并在控制台打印日志。服务器运行时，可用浏览器访问 `localhost:3000`，浏览器显示Hello World。



### 导入和创建模块

模块是 JavaScript 库或文件，可以用 Node 的 `require()` 函数将它们导入其它代码。Express 本身就是一个模块，Express 应用中使用的中间件和数据库也是。

下面的代码以 Express 框架为例展示了如何通过名字来导入模块。首先，调用 `require()` 函数，用字符串（`'express'`）指定模块的名字，然后调用返回的对象来创建Express 应用 。然后就可以访问应用对象的属性和函数了。

```js
const express = require('express');
const app = express();
```



## 创建自定义模块

还可以创建自定义模块，并用相同的方法导入。你一定会有自建模块的**需求**，因为这可以让代码管理更有序。单文件应用是很难理解和维护的。使用模块还有助于管理名字空间，因为在使用模块时只会导入模块中显式导出的变量。

#### 导出模块

```js
/*square.js中*/
//为了让对象暴露于模块之外，只需把它们设置为 exports 对象的附加属性即可
exports.area = width => { return width * width; };
exports.perimeter = width => { return 4 * width; };
```

或

```js
// 赋值给 `exports` 不会修改模块，必须使用 `module.exports`。
module.exports = {
  area: width => { return width * width; },
  perimeter: width => { return 4 * width; }
};
```

更多信息请参阅 [模块](http://nodejs.cn/api/modules.html)（Node API 文档）。

#### 用 require()导入模块

```js
/*test.js中，demo.js与square.js同在Demo文件夹下*/
const square = require('./square'); // 这里 require() 了文件名，省略了 .js 扩展名（可选）
console.log("正方形的面积为"+square.area(6));
console.log("正方形的周长为"+square.perimeter(5));

💻Terminal
/* $ cd Demo 
	 $ node test.js
	 运行结果：
	 正方形的面积为36
	 正方形的周长为20
*/
```

注：为模块指定绝对路径也是可行的。

## 创建路由处理器（Route handler）

Express 提供了为所 HTTP 动词定义路由处理器的方法，大多数处理器的使用方式完全一致：

`checkout()`, `copy()`, **`delete()`**, **`get()`**, `head()`, `lock()`, `merge()`, `mkactivity()`, `mkcol()`, `move()`, `m-search()`, `notify()`, `options()`, `patch()`, **`post()`**, `purge()`, **`put()`**, `report()`, `search()`, `subscribe()`, `trace()`, `unlock()`, `unsubscribe()`.

上文的 Hello World 示例中定义了一个（回调）路由处理函数来处理对站点根目录（`'/'`）的 HTTP `GET` 请求。

```js
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

回调函数将请求和响应对象作为参数。该函数直接调用响应的 `send()` 以返回字符串“Hello World!”。有 [许多其它响应方法](http://www.expressjs.com.cn/guide/routing.html#response-methods) ，例如，通过调用 `res.json()` 来发送JSON 响应、调用 `res.sendFile()` 来发送文件。

## 提供HTML文件

您可以使用`res.sendFile(path)`方法使用文件来响应请求。您可以将其放入`app.get('/', ...)`路由处理程序中。在后台，此方法将设置适当的标头，以指示浏览器根据其类型来处理要发送的文件。然后它将读取并发送文件。⚠️此方法需要**绝对文件路径**。

```js
var express = require('express');
var app = express();

app.get('/',(request,response)=>{
    response.sendFile('/users/mac/tryNode/dom.html')
})
app.listen(3000,()=>{
    console.log("成功监听localhost的3000端口")
})
```

可以使用Node全局变量`__dirname`来计算路径，如下所示：

```js
absolutePath = __dirname + relativePath/file.ext
```

```js
app.get('/',(request,response)=>{
    response.sendFile(__dirname+"/index.html")  //index.html与node_modules文件夹同级
})
```

## 服务务静态资产

HTML服务器通常具有一个或多个用户可访问的目录。您可以在其中放置应用程序所需的静态文件（样式表，脚本，图像）。在Express中，您可以使用中间件`express.static(path)`来实现此功能，其中的`path`参数是包含静态文件的`文件夹的绝对路径`。如果您不知道什么是中间件，请放心，我们将在后面详细讨论。基本上，中间件是拦截路由处理程序并添加某种信息的函数。

需要使用`app.use(path, middlewareFunction)`方法来**安装中间件**。第一个`path`参数是可选的，如果不传递，则将对所有请求执行中间件。

💁🏻‍♀️一般项目都有一个public文件夹，里面放有公共样式文件等。这里有两个html文件分别处在项目的不同目录下，他们都要引入同一个在`public`文件夹里的公共样式文件`public/publicStyle.css`，那么对于这两个html来说，对于引入这个css的写法路径各有不同，如果改了其中某html文件的目录位置，其相对引入代码又要手动更改，难以维护。为了省去此麻烦，我们在此项目所有html文件里都这样引入公共css：

```html
	<!--Public-Style-->
    <link rel="stylesheet" href="/publicStyle.css">
```

显然，这个路径是不准确的，不过不用担心，Express 提供了内置的中间件 **express.static**  来设置静态文件，你可以使用 **express.static**  中间件来设置静态文件路径。我们在node中添加以下代码：

```js
app.use(express.static(__dirname+"/public"));
```

##  在特定路由上提供JSON 

当HTML服务器提供HTML时，API提供数据。REST（REpresentational State Transfer）API允许以简单的方式进行数据交换，而不需要客户机知道服务器的任何细节。客户机只需要知道资源在哪里（URL），以及要对其执行的操作（动词）。获取某些信息时使用GET动词，而不做任何修改。如今，在web上移动信息的首选数据格式是JSON。简单地说，JSON是一种将JavaScript对象表示为字符串的便捷方式，因此可以轻松地进行传输。

```js
var newsdata=[{
    'id':'1',
    'title':'标题1',
    'link':'链接1',
    'content':'内容1',
},
    {
        'id':'2',
        'title':'标题2',
        'link':'链接2',
        'content':'内容2',
    }
];
app.get('/',(request,response)=>{
    response.json(newsdata);
})
```

## 使用.env文件

`.env 文件`是一个隐藏文件，用于`将环境变量`传递给应用程序。这个文件是秘密的，除了你之外没有人可以访问它，它可以用来存储你想要保密或隐藏的数据。例如，你可以存储来自外部服务或数据库URI的API密钥。你还可以使用它来存储配置选项。设置配置选项可以更改应用程序的行为，而无需重写某些代码。


可以从应用程序中以`process.env.VAR_NAME`的形式访问环境变量。`process.env`对象是全局节点对象，变量作为字符串传递。按照惯例，变量名都是大写的，单词之间用下划线隔开。该`.env`文件是一个shell文件，因此**不用将名称或值用引号引起来**。同样重要的是，当你给变量赋值时，**等号周围不能有空格**，例如`VAR_NAME=value`。

让我们添加一个环境变量作为配置选项。

将变量MESSAGE_STYLE=uppercase存储在.env文件中。然后告诉GET/json路由处理程序，如果process.env.message_STYLE等于uppercase，您在上一个挑战中创建了将响应对象的消息转换为大写的GET/json路由处理程序。响应对象应该变成{“message”：“HELLO JSON”}。

```js
process.env.MESSAGE_STYLE='uppercase';
app.get('/json',(request,response)=>{
  process.env.MESSAGE_STYLE == 'uppercase'
  ? response.json({"message":"Hello json".toUpperCase()})
  : response.json({"message":"Hello json"})

})
```

