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

您可以使用`res.sendFile(path)`方法使用文件来响应请求。您可以将其放入`app.get('/', ...)`路由处理程序中。在后台，此方法将设置适当的标头，以指示浏览器根据其类型来处理要发送的文件。然后它将读取并发送文件。此方法需要绝对文件路径。我们建议您使用Node全局变量`__dirname`来计算路径，如下所示：



```js
absolutePath = __dirname + relativePath/file.ext
```

