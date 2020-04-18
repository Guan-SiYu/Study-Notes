## npm挑战管理软件包简介

Node Package Manager（npm）是开发人员用于共享和控制为与Node.js一起使用而编写的JavaScript代码模块（或程序包）的命令行工具。

启动新项目时，npm会生成一个`package.json`文件。该文件列出了项目的程序包依赖关系。由于npm软件包会定期更新，因此该`package.json`文件允许您为每个依赖项设置特定的版本号。这样可以确保对软件包的更新不会破坏您的项目。

npm将软件包保存在名为的文件夹中`node_modules`。这些软件包可以通过两种方式安装：

1. 全局放在一个根`node_modules`文件夹中，所有项目都可以访问。
2. 在项目自己的`node_modules`文件夹中本地访问，仅该项目可以访问。

大多数开发人员更喜欢在每个项目本地安装软件包，以在不同项目的依赖关系之间建立隔离。

## 如何使用package.json（任何Node.js项目或npm软件包的核心）

该`package.json`文件是任何Node.js项目或npm软件包的中心。它存储有关项目的信息，类似于HTML文档的<head>部分如何描述网页的内容。它由单个JSON对象组成，其中信息以键值对的形式存储。只有两个必填字段；“名称”和“版本”，但是最好提供有关项目的其他信息，这些信息可能对将来的用户或维护者有用。

如果查看项目的文件树，则会在树的顶层找到package.json文件。这是您在接下来的两个挑战中将要改进的文件。

该文件中最常见的信息之一就是`author`字段。它指定了谁创建了项目，并且可以由字符串或带有联系人或其他详细信息的对象组成。对于较大的项目，建议使用对象，但是对于以下项目，将使用以下示例的简单字符串。

```json
{
	"name": "fcc-learn-npm-package-json",
	"dependencies": {
		"express": "^4.14.0"
	},
  "author":"Guansiyu",
	"main": "server.js",
	"scripts": {
		"start": "node server.js"
	},
	"engines": {
		"node": "8.11.2"
	},
	"repository": {
		"type": "git",
		"url": "https://idontknow/todo.git"
	}
}

```

## 向package.json添加说明


一个好的package.json文件的下一部分是`description`字段，其中包含一个关于您的项目的简短但信息丰富的描述。


如果有一天你打算将一个包发布给npm，那么当用户决定是否安装你的包时，这个字符串应该会把你的想法卖给用户。然而，这并不是的`description`唯一用例，它是总结项目所做工作的好方法。在任何Node.js项目中，帮助其他开发人员、未来的维护人员甚至未来的自我快速理解项目都是同样重要的。


不管你对你的项目有什么计划，绝对推荐一个描述。下面是一个例子：

```json
"description": "A project that does something awesome",
```

## 向package.json添加Keywords


在`keywords`字段中，可以使用相关关键字描述项目。下面是一个例子：

```json
"keywords": [ "descriptive", "related", "words" ],
```

如您所见，此字段的结构为双引号字符串数组。

##  将 License 添加到package.json

 在`license`字段中，可以通知用户他们可以对你的项目执行什么操作。 

开放源码项目的一些常见许可证包括MIT和BSD。不需要许可证信息，大多数国家的版权法都会默认为您提供所创建内容的所有权。然而，明确说明用户可以做什么和不能做什么总是一个好的实践。下面是许可证字段的示例： 

```json
"license": "MIT",
```

##  将 Version 添加到package.json

将版本添加到package.json
版本是package.json文件的必选字段之一。此字段描述项目的当前版本。下面是一个例子：

```json
"version": "1.2.0",
```

## 使用来自npm的外部包扩展项目


使用包管理器的最大原因之一是它们强大的依赖性管理。npm不必手动确保在新计算机上设置项目时获得所有依赖项，而是自动为您安装所有内容。但是npm怎么知道你的项目到底需要什么呢？请参阅package.json文件的dependencies部分。


在本节中，项目所需的包使用以下格式存储：

```json
"dependencies": {
  "package-name": "version",
  "express": "4.14.0"
}
```

## 通过理解语义版本控制管理npm依赖关系

package.json文件的dependencies部分中npm包的版本遵循所谓的语义版本控制（SemVer），这是软件版本控制的行业标准，旨在使管理依赖关系更容易。npm上发布的库、框架或其他工具应该使用SemVer，以便清楚地传达项目在更新时可以预期的更改类型。
当您开发使用外部依赖性的软件（您几乎总是这样做）时，了解SemVer是很有用的。总有一天，你对这些数字的理解会让你避免不小心给你的项目引入了破坏性的变化，而不理解为什么昨天成功的东西今天突然不起作用了。根据官方网站，语义版本控制就是这样工作的：

```json
"package": "MAJOR.MINOR.PATCH"
```

 当您进行不兼容的API更改时，主版本应该增加。当您以向后兼容的方式添加功能时，次要版本应该增加。当您做出向后兼容的bug修复时，修补程序版本应该增加。这意味着修补程序是错误修复程序，子程序添加了新功能，但它们都没有破坏以前的工作。最后，专业添加的更改与早期版本不兼容。 

## 用波浪号字符始终使用依赖关系的最新补丁程序版本

在上一个挑战中，您告诉npm仅包括软件包的特定版本。如果需要确保项目的不同部分彼此兼容，这是冻结依赖项的有用方法。但是在大多数使用情况下，您不想错过错误修复程序，因为它们通常包含重要的安全补丁程序，并且（希望如此）不会造成破坏。

要允许npm依赖项更新到最新的PATCH版本，您可以使用tilde（`~`）字符为依赖项的版本添加前缀。这是一个如何允许更新到任何1.3.x版本的示例。

```json
"package": "~1.3.8"
```

在package.json文件中，当前有关npm如何升级的规则是使用特定版本（1.3.8）。但是现在，您要允许使用最新的1.3.x版本。

使用波浪号（`~`）字符为依赖项中的弯矩版本添加前缀，并允许npm将其更新为任何新的PATCH版本。

**注意：**版本号本身不应更改。

## 使用插入符号字符以使用依赖项的最新次要版本

类似于我们在上次挑战中了解到的tilde允许npm安装依赖项的最新补丁，插入符号（^）也允许npm安装将来的更新。不同之处在于插入符号将允许小幅度的更新和修补程序。

```json
"package": "^1.3.8"
```

## 从您的依赖项中删除软件包

如果要删除不再需要的外部程序包怎么办？只需从`dependencies`中删除该程序包的对应键值对即可。

同样的方法也适用于删除package.json中的其他字段。

## npm在实际操作中的使用----增 删 改 查

打开Terminal

```js
bogon:NodeJS mac$ cd 文件夹	//进入项目目录
bogon:文件夹 mac$ npm init -y 	//初始化
👉🏻此时在项目目录下生成了package.json文件
bogon:20.2 mac$ npm install 包名 //安装所需的包
👉🏻此时在项目目录下生成与package.json文件同级的一个文件夹：node_modules文件夹
👉🏻node_modules文件夹下可以看到所需的包已经在里面了
👌🏻在 node_modules/包/dist文件夹下 拖拽所需文件到代码中
	比如你安装了jquery,你的代码中<script src="node_modules/jquery/dist/jquery.min.js"></script>
```

#### 模拟一个换了另一个环境用代码的场景：此时你把node_modules文件夹整个删除

不用担心，因为依赖关系全都写在package.json中了，查看package.json中的`dependencies`就可以

```
$ npm i
```

回车即可看到node_modules回来了，并且整个项目的依赖关系完完整整，要什么有什么。

如果对库的名字不把握，install前可以去https://www.npmjs.com查看核对。

#### 如果想删除一个依赖：

```
$ npm uninstall 包名
```

此时在node_modules文件夹里已经删除不需要的包。

#### 更新某个依赖

```
npm update 包名
```

#### 如果想install一个包的旧版本

```
npm i 包名@版本号
```

