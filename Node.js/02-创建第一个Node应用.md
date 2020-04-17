https://nodejs.org/en/ 点LTS版本下载安装,一路continue

打开终端检验是否已安装

```bash
$ node --version
```

```js
//first-nodeApp/app.js
function sayHello(name){
    console.log("Hello " + name);
}
sayHello("GuanGuan");
```

```bash
$ cd first-nodeApp
$ node app.js
```

Node是一个C++程序结合了Chrome的V8引擎，所以这个app.js传给node，node会把它传给V8来执行

```js
//first-nodeApp/app.js
console.log(window);//Error 
```

Node中没有window或document对象，这些是在浏览器作为运行环境才有的东西

在Node中有另一个对象来操作文件、使用操作系统、使用网络等等

#### 	课程结构

- 在使用MangoDB保存数据之前，需要完全了解js的异步操作

- MangoDB + 用于操作MangoDB的Mongoose库

- Authentication and Authorization ----实现认证和授权 包括管理使用json命令的原则

- Handling and Logging Errors 处理和记录异常 这是现实编程中很重要的课题

- Node-Module-System 模块系统-----node的基础概念之一 ，将学习如何自定义模块 并且学习如何使用node核心内建的模块：比如操作系统、文件系统、HTTP请求等

-  Node-Package-Manager    npm-----node包管理工具

- 用Express创建RESTful应用程序接口

- 单元和集成测试

- Test-driven-Development-----TDD 测试驱动开发模式 是一种先写测试的软件开发方式

- 部署 ---学习如何在Heroku上部署软件

  

