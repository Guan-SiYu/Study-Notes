## Express简介

回顾一下之前用node内建核心模块http模块写的代码

```js
const server = http.createServer((req,res)=>{
    if(req.url === '/'){ 
        res.write('You can see me now')
        res.end();                     
    }
    if(req.url === '/api/courses'){ 
        req.write(JSON.stringify([1 ,2 ,3]))   
        res.end();	
    }
});
```

使用回调函数的request对象，我们可以检查来访问的是哪家url，可以使用它定义多个路由规则，写很多的if代码块不好维护，这是框架就要登场了，框架给我们一个优秀的结构，可以在保持良好维护性的前提下创建很多路由规则。有很多框架可以在node上创建web服务器，Express是相当好用的。

```

```

## 	用Express创建第一个Web服务器

```js
const expressFunc = require('express');//require返回一个函数
const app = expressFunc();//调用这个函数，返回类型为Express的对象
//这个对象有很多方法，比如你想处理发给服务器的post请求，你就使用post方法 app.post()
//下面的示例 实现一个应对http GET请求的服务器
app.get('/',(req,res)=>{
    res.send("Hey")
});//这就是我们定义的一个路由，我们特别制定了
/*
	需要两个参数，第一个是url,这里用/代表站点的根目录；
	第二个参数是回调函数，这个函数在给定端口使用get方法时被调用，这个回调也叫一个路由句柄
  回调有两个参数 request和response request参数给了我们很多用来了解请求的属性
	当我们的get方法得到一个对服务器根目录的请求，我们就返回字符串‘Hey’
*/

//最后我们要监听特定的端口,我们调用app.listen方法，可以给一个回调函数在开始监听的时候执行
app.listen(3000,()=>console.log('服务器正在监听3000端口'));
 
```

运行结果：终端打印出服务器正在监听3000端口，浏览器访问http://localhost:3000/ 显示Hey。

现在我们定义另一个路由，同样再次调用get方法

```js
    app.get('api/courses',(req,res)=>{//这里从服务器中得到数据并返回
        res.send([1, 2, 3]);
    });
```

这里的实现没有那些if代码块，使用get方法创建新的路由规则，这样的结构使应用更简洁。我们可以把路由规则移到另一个文件去，例如可以将所以与课程有关的路由合并到如course.js这样单独的文件。所以Express将应用变得更有结构感

自己模拟理解：

```js
const SCreq = {name:'实参request'},SCres = {name:'实参response'}; //SC代表实参
var url = '';//浏览器发来的请求报头字段
class Exp{
    cooking(foodName,todoCallback){
        if(url === foodName)
            todoCallback(SCreq,SCres);
    }
}
var e = new Exp();

function callback0(XCreq,XCres){ //XC代表形参
    console.log(XCreq,XCres);
}

function emit(newurl){
		url = newurl; 
    e.cooking(url,callback0); //处理事件
}

//模拟浏览器发送GET请求，此时请求服务器的根目录
emit('/');
```

## 全局安装nodemon包  Node监视器

每次我们做出代码修改，都需要control+C手动重启应用，这样太麻烦了，有更好的方法。安装一个叫nodeMon的包，node monitor的缩写。

```bash
$ nodemon index.js
```

nodemon会监测该文件夹所有的文件改动、任何文件名和任何扩展名。

## Environment Variables 环境变量

```js
app.listen(3000,()=>console.log('服务器正在监听3000端口'));
```

现在需要优化的地方，是这里硬编码的端口地址 ，我们使用的3000是一个写死的数字，也许在你的开发环境还行，但到生产环境可能就不灵了，因为当我们把应用发布到一个共享的平台上，该应用可用的端口是由平台动态分配的，我们就不能假设3000端口就一定是可用的了。优化这个的做法就是使用环境变量。基本上node环境的共享平台，环境变量中管理端口的属性是 `PORT`  ，环境变量就是在进程运行时才产生的变量，它是在应用之外设置的变量。

这个应用中，需要读取环境变量PORT属性，为了做到这点，要使用全局对象 `process` ，这个对象有个属性是 `env`  是环境变量的缩写，然后加上所需的环境变量也就是PORT。 如果PORT设置了我们就用它，否则就用3000

```js
const port = process.env.PORT || 3000; // 👀 这个赋值写法很新
app.listen(port,()=>console.log(`服务器正在监听${port}端口`));
```

```js
$ nodemon index.js
[nodemon] 2.0.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
服务器正在监听3000端口
```

因为这台机器没有设置PORT环境变量，所以服务器还是监听我们设置的3000端口。现在我来设置环境变量。首先终止进程，在Mac上可以执行export命令来设置：

```bash
express-demo$ export PORT=8000
express-demo$ nodemon index.js
服务器正在监听8000端口
```



## Route Parameters 路由参数

```js
app.get('api/courses',(req,res)=>{	//获取所有课程
        res.send([1, 2, 3]);
});
```

现在我们有给出一个课程列表的路由了，现在来写获取单一课程的路由规则

#### 单个参数

如果想得到单一课程，就要在URL中包含课程id，在api/courses后要定义一个参数，添加 `:id` ，id是参数名。在回调中，为了读取这个参数，调用 `req.params.id` 

```js
app.get('/api/courses/:id',(req,res)=>{	//获取指定id的单一课程
    res.send(req.params.id);
});
```

浏览器访问 http://localhost:8000/api/courses/99 显示 99

#### 多个参数

同样，有多个参数也是可行的，假设你开发一个支持博客的后端程序，你可能有这样的参数 `/api/posts/:year/:month/:day` ，有三个参数这样就可以得到指定年月日的贴子。我们可以像之前那样获取参数，我们先看看这个 `params` 对象本身。

```js
app.get('/api/posts/:year/:month/:day',(req,res)=>{	//获取指定日期的贴子
    res.send(req.params);
})
```

浏览器访问 http://localhost:8000/api/posts/2019/7/7  显示 {"year":"2019","month":"7","day":"7"}

#### 查询字符串

使用这种表达式也可以读取查询字符串，也就是在 `?` 后面的参数，例如我们可以获取所有2019年的贴子，然后以这些贴子的名称来排序，我们输入问号+查询字符串 `localhost:8000/api/posts/2019/7/7?sortBy=name`         sortBy=name就是查询字符串。

我们使用查询字符串向后端服务传递额外的参数，我们用参数 `2019/7/7` 提供路由必须的数据或值，使用查询查询字符串 `sortBy=name` 传递附加的内容。

现在来学习如何读取查询字符串。使用 `req.query` 

```js
 app.get('/api/posts/:year/:month/:day',(req,res)=>{
        res.send(req.query); //读取查询字符串
})
```

浏览器访问 http://localhost:8000/api/posts/2019/7/7?sortBy=name  显示 {"sortBy":"name"}                                    查询字符串保存为一个个键值对

