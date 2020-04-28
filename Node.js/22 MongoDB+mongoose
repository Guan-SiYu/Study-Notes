MongoDB是一个文件型(非关系型)数据库，它与传统的关系型数据库MySQL有所不同，在MongoDB中没有表、视图、记录、列等概念；用关系型数据库你需要设计数据库，而MongoDB中是没有设计或者结构的，你就是简单的在MongoDB中保存JSON对象。也就是说查询数据时，我们从MongoDB中得到JSON对象，我们就可以直接将对象返回给客户端，中间不用转换。

## 在Mac上安装MongoDB

需要创建一个文件夹📂来保存数据，默认情况下MongoDB在 `/data/db` 路径下保存数据

https://blog.csdn.net/shine_a/article/details/104201167

```bash
Last login: Sat Apr 25 23:37:57 on ttys000
mac@MacdeMacBook-Air-2 ~ % cd ~/data
mac@MacdeMacBook-Air-2 data % pwd
/Users/mac/data
mac@MacdeMacBook-Air-2 data % sudo mongod --dbpath=/Users/mac/data
Password:
2020-04-26T00:22:38.397+0800 I  CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
2020-04-26T00:22:38.400+0800 W  ASIO     [main] No TransportLayer configured during NetworkInterface startup
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] MongoDB starting : pid=12753 port=27017 dbpath=/Users/mac/data 64-bit host=MacdeMacBook-Air-2.local
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] db version v4.2.5
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] git version: 2261279b51ea13df08ae708ff278f0679c59dc32
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] allocator: system
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] modules: none
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] build environment:
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten]     distarch: x86_64
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten]     target_arch: x86_64
2020-04-26T00:22:38.401+0800 I  CONTROL  [initandlisten] options: { storage: { dbPath: "/Users/mac/data" } }
2020-04-26T00:22:38.402+0800 E  STORAGE  [initandlisten] Failed to set up listener: SocketException: Address already in use
2020-04-26T00:22:38.402+0800 I  CONTROL  [initandlisten] now exiting
2020-04-26T00:22:38.402+0800 I  CONTROL  [initandlisten] shutting down with code:48
```



## MongoDB Compass

MongoDB Compass 是一个连接到数据库查看数据编写数据的工具

## 连接到MongoDB

```bash
$ npm i mongoose
```

`mongoose` 是一个用于连接MongoDB的简单API，

第一件事就是连接到MongoDB

```js
mongo-demo/index.js
const mongoose = require('mongoose');//这个对象有一个connect方法
mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true })//表示我在本机安装的MongoDB 当你在生产环境就需要用别的参数
//playground是数据库的名字,只要你向这个数据库写入数据，MongoDB就会自动创建它
//这个connect方法返回一个Promise
    .then(()=>console.log('已经连到数据库'))
    .catch(err=>console.error('不能连到数据库',err))
```

## 
