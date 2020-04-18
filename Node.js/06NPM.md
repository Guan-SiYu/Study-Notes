## Node Package Manager （NPM)

node包管理工具 它基本是一个命令行工具 也是第三方库注册到node的注册机，无论你想向node添加什么功能，很可能在注册库中已经有第三方的免费模块或者包了，npm伴随着node而来，如果你安装了node就也同时安装了npm,但这两个应用程序是各自独立开发的

```bash
$ npm -v
```

## Package.json文件

在你向node添加任何包之前，你需要创建一个文件，就是package.json，这个文件本质是一个JSON文件，它包含了你的应用程序的最基本信息，比如名字、版本、作者、依赖关系等，也就是你应用的一堆基本信息，所有node的应用都有这个json文件，为了创建这个文件，我们运行

```bash
$ cd 项目文件夹
$ npm init --yes
```

## 安装一个node包

https://www.npmjs.com/ 查看想要安装的包

```bash
$ npm install underscore
```

在package.json文件中标识了每个依赖包的名字的版本

当运行了npm install，npm会从注册库中下载给定名称的库的最新版本，然后会将它保存在一个叫📂`node_modules` 的文件夹中，每个被安装的包会有自己的package.json描述了这个包的基本信息

## 使用一个包

创建一个与`node_modules`文件夹同级的index.js文件。

```js
var us = require('underscore'); //加载模块
```

当你在require方法传入了模块名，require认为你需要一个核心模块，但在node中没有一个叫underscore的内建核心模块，然后require函数就会认为，也许有叫这个名字的文件或文件夹。但是我们早先说过，当你要引用文件夹中的文件，需要使用  `./`   如果参数是  `./underscore` require会认为在同目录中有一个叫 underscore.js 的文件，如果不是，require会认为有一个叫underscore的文件夹里面有一个index.js文件,很显然也不是。这样require就会认为有第三种可能：它认为在 `node_modules` 文件夹中有个叫underscore的库，这就是require函数查找一个模块的过程。首先它假设参数名是一个node核心模块，否则就是一个文件或文件夹，再不然它就会在node_modules文件夹里找对应的库。

好，现在已经加载模块了，我们该使用它了

```js
var result = us.contains([1 ,2 ,3],2);
console.log(result); 
```

```bash
$ node index.js
true
```

## Package Dependencies 包的依赖

```bash
$ npm i mongoose #我们用它来向MongoDB保存数据，将在后面的视频介绍
```

你会发现`node_modules` 文件夹里一下子多出了好多文件夹，明明只安装了underscore和mongoose，这里你看到的这些多出来的库，是其他的node模块包并且是mongoose模块依赖的库

```bash
$ ls node_modules/
bl				ms
bluebird			process-nextick-args
bson				readable-stream
core-util-is			regexp-clone
debug				require_optional
denque				resolve-from
inherits			safe-buffer
isarray				saslprep
kareem				semver
memory-pager			sift
mongodb				sliced
mongoose			sparse-bitfield
mongoose-legacy-pluralize	string_decoder
mpath				underscore
mquery				util-deprecate
```

## NPM Package and SCM npm包与源代码管理

https://www.bilibili.com/video/BV1kt411k7A3?p=26 学会用git排除`node_modules` 文件夹

## 语义化版本控制

SemVer 语义化版本控制，什么意思？ 在SV中，npm所install的包的版本号有3个部分：主版本号(新增特性破坏了现有应用与本包的依赖关系，就增加主版本号).次版本号(添加新特性,不会破坏现有的api).补丁号(或补丁更新，用来表示修复的bug)

` ^ ` 这个插入符号告诉npm只要主版本号是这个，关心本包的任何版本更新

`~` 波浪号是告诉npm 主版本号和次版本号是这个，关心本包的任何版本更新

这两个符号帮助你伴随最新发布的依赖库而保持应用为最新，但这同样也会带来接口的危险，所以尽量不加。

## 列出已安装的包

想查看所有依赖库的版本 ，这个树表示了所有的依赖和它们的依赖

```bash
npm-demo$ npm list
npm-demo@1.0.0 /Users/mac/npm-demo
├─┬ mongoose@5.9.9
│ ├── bson@1.1.4
│ ├── kareem@2.3.1
│ ├─┬ mongodb@3.5.5
│ │ ├─┬ bl@2.2.0
│ │ │ ├─┬ readable-stream@2.3.7
│ │ │ │ ├── core-util-is@1.0.2
│ │ │ │ ├── inherits@2.0.4
│ │ │ │ ├── isarray@1.0.0
....
```

只看自己的应用所需的依赖

```bash
npm-demo$ npm list --depth=0
npm-demo@1.0.0 /Users/mac/npm-demo
├── mongoose@5.9.9
└── underscore@1.10.2
```

## 查看包的注册信息 安装特定版本的包

https://www.bilibili.com/video/BV1kt411k7A3?p=29

https://www.bilibili.com/video/BV1kt411k7A3?p=30

## 升级本地包

https://www.bilibili.com/video/BV1kt411k7A3?p=31

全局安装新的命令行工具sudo npm i -g npm-check-updates

## DevDependencies 开发用依赖库

https://www.bilibili.com/video/BV1kt411k7A3?p=32

## 创建自己的包并发布到npm注册库

https://www.bilibili.com/video/BV1kt411k7A3?p=35

## 发布包更新

https://www.bilibili.com/video/BV1kt411k7A3?p=36
