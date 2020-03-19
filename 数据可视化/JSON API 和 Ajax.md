## JSON API

类似于用户界面如何帮助人们使用程序，应用程序编程接口（API）帮助程序与其他程序交互。api是计算机用来相互通信的工具，部分用于发送和接收数据。一旦您了解了如何从页面中发出请求和处理数据，就可以在页面中使用API功能。

#### 什么是 JSON ？

浏览器和服务器之间传输的数据通常采用一种称为JavaScript对象表示法（JSON）的格式。JSON类似于JavaScript对象文本语法，只是它是作为字符串传输的。一旦收到，它就可以转换成一个对象并在脚本中使用。



#### 使用JavaScript XMLHttpRequest方法获取JSON

也可以从外部源请求数据。这就是api发挥作用的地方。


记住，api（或应用程序编程接口）是计算机用来相互通信的工具。您将学习如何使用名为AJAX的技术使用从api获得的数据更新HTML。


大多数webapi以JSON格式传输数据。JSON代表JavaScript对象表示法。


JSON语法看起来非常类似于JavaScript对象文字表示法。JSON具有对象属性及其当前值，夹在{和a}之间。


这些属性及其值通常称为“键值对”。

但是，api传输的JSON是以字节的形式发送的，应用程序将以字符串的形式接收它。这些对象可以转换为JavaScript对象，但默认情况下它们不是JavaScript对象。`JSON.parse()`方法解析字符串并构造它所描述的JavaScript对象。

```js
const req = new XMLHttpRequest();
req.open("GET",'/json/cats.json',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);//将响应回来的数据转换为JSON格式
  document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json);
};
```

JavaScript `XMLHttpRequest`对象有许多用于传输数据的属性和方法。首先，XMLHttpRequest对象的一个实例被创建并保存在req变量中。接下来，open方法初始化一个请求——这个例子是从一个API请求数据，因此是一个“GET”请求。open的第二个参数是请求数据的API的URL。第三个参数是布尔值，其中true使其成为异步请求。send方法发送请求。最后，onload事件处理程序解析返回的数据并应用JSON.stringify方法将JavaScript对象转换为字符串。然后将此字符串作为消息文本插入。

#### 使用JavaScript fetch方法获取JSON

另一种请求外部数据的方法是使用JavaScript `fetch()`方法。它相当于XMLHttpRequest，但是语法被认为更容易理解。

下面是向/json/cats.json发出GET请求的代码:

```js
fetch('/json/cats.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerHTML = JSON.stringify(data);
    })
```

看看这段代码的每一部分：

看看这段代码的每一部分。
第一行是提出请求的那一行。因此，fetch（URL）对指定的URL发出GET请求。方法返回一个`Promise`。

 在返回Promise之后，如果请求成功，则执行`then`方法，该方法接受响应回来的数据并将其转换为JSON格式。 

`then`方法还返回一个`Promise`，由next-then方法处理。第二个参数是您正在寻找的JSON对象！

#### 从API访问JSON数据

现在，仔细查看返回的数据，以便更好地理解JSON格式。回想一下JavaScript中的一些符号：

[]->方括号表示数组
{}->括号表示对象
“”->双引号表示字符串。它们还用于JSON中的键名

理解API返回的数据的结构非常重要，因为它会影响您检索所需值的方式。

这是上一个示例中返回的JSON数据是一个由三个对象组成的数组：

```
[{"id":0,"imageLink":"https://s3.amazonaws.com/freecodecamp/funny-cat.jpg","altText":"A white cat wearing a green, helmet shaped melon on its head.  ","codeNames":["Juggernaut","Mrs.  Wallace","Buttercup"]},{"id":1,"imageLink":"https://s3.amazonaws.com/freecodecamp/grumpy-cat.jpg","altText":"A white cat with blue eyes, looking very grumpy.  ","codeNames":["Oscar","Scrooge","Tyrion"]},{"id":2,"imageLink":"https://s3.amazonaws.com/freecodecamp/mischievous-cat.jpg","altText":"A ginger cat with one eye closed and mouth in a grin-like expression.  Looking very mischievous. ","codeNames":["The Doctor","Loki","Joker"]}]
```

#### 将JSON数据转换为HTML


现在您从JSON API获取数据，可以在HTML中显示它。

您可以使用forEach方法循环数据，因为cat photo对象保存在一个数组中。当您到达每个item时，您可以修改HTML元素。


首先，使用let html=“；”声明一个html变量；然后，循环JSON，将HTML添加到变量中，该变量将键名包装在强标记中，后跟值。循环完成后，将渲染它。


下面是执行此操作的代码：

```js
let html = "";
 json = json.filter(itemObj=>itemObj.id!==1);//使用filter方法筛选出“id”键值为1的cat。 
json.forEach(function(val) {
  const keys = Object.keys(val);	//Object.keys生成对象所有键的数组
  html += "<div class = 'cat'>";
  keys.forEach(function(key) {
    html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
  });
  const imgURl = iObj["imageLink"];	//加载图片
  const imgAlt = iObj["altText"];
          html+="<img src = "+imgURl+" alt="+imgAlt+">"
  html += "</div><br>";
});
```

## 使用JavaScript XMLHttpRequest方法发布数据


在前面的示例中，您从外部资源接收数据。您还可以向外部资源发送数据，只要该资源支持AJAX请求并且您知道URL。

JavaScript的XMLHttpRequest方法也用于向服务器发送数据。下面是一个例子：

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', url, true);
xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 201){
    const serverResponse = JSON.parse(xhr.response);
    document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
  }
};
const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' });
xhr.send(body);
```

`open`方法将请求初始化为外部资源的给定URL的“POST”，并使用`true`布尔值使其异步。`setRequestHeader`方法设置HTTP请求头的值，该值包含有关发送者和请求的信息。它必须在`open`方法之后、`send`方法之前调用。这两个参数是头的名称和要设置为该头主体的值。接下来，`onreadystatechange`事件侦听器处理请求状态的更改。`readyState`为4表示**操作已完成**，`status`为201表示**请求成功**。文档的HTML可以更新。最后，send方法发送带有body值的请求，用户在输入字段中给出用户名密钥。

## 异步

程序员在使用api时经常使用AJAX技术。


AJAX一词起源于异步JavaScript和XML的缩写。它是指一组技术，这些技术向服务器发出异步请求以传输数据，然后将返回的任何数据加载到页面中。异步进程有几个关键属性。浏览器不会停止加载页面以等待服务器的响应。此外，浏览器将更新的数据插入页面的一部分，而不必刷新整个页面。


用户体验从异步进程中受益的方式有很多。页面加载速度更快，因为浏览器不会在页面呈现过程中等待服务器响应。请求和传输在后台进行，不会中断用户的工作。当浏览器接收到新数据时，只刷新页面的必要区域。这些特性特别增强了单页应用程序的用户体验。

#### 使用onclick属性使用JavaScript处理单击事件

您希望只在页面加载完成后执行代码。为此，可以将JavaScript事件附加到名为DOMContentLoaded的文档。下面是执行此操作的代码：

```js
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('getMessage').onclick = function(){};
});
```

#### 单击事件来更改文本

当click事件发生时，可以使用JavaScript更新HTML元素。

```js
document.getElementsByClassName('message')[0].textContent="Here is the message";
```

#### 获取地理位置数据以查找用户的GPS坐标

另一个很酷的方法是访问用户的当前位置。每个浏览器都有一个内置的导航器，导航器将获取用户当前的经度和纬度。
您将看到允许或阻止此网站知道您当前位置的提示，选择allow，您将看到输出电话上的文本更改为您的经纬度。

```js
if (navigator.geolocation){ //浏览器内置navigator对象为内置Navigator构造器的实例
  navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById('data').innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
  });
}
```

 首先，它检查navigator.geolocation对象是否存在。如果是，则调用该对象上的`getCurrentPosition`方法，该方法将启动对用户位置的异步请求。如果请求成功，则方法中的回调函数将运行。此函数使用点表示法访问position对象的纬度和经度值，并更新HTML。 