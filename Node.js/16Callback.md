## 模拟数据库查询

模拟访问数据库的场景，我们想让数据库查找用户信息，找到了再在控制台打印出来：

```js
console.log('Before');
var user = getUser(1);
console.log(user);
console.log('After');

function getUser(userID) {
    setTimeout(()=>{
        console.log('终于找到了这个ID的相关信息：')
        return {id:userID,GitHubName:'mosh',birth:'1999'}
    },3000);
}

```

兴高采烈运行，结果惨不忍睹：

```bash
Before
undefined 
After
#（数三秒)
读取数据库信息...
#(居然没后文了，我对象呢？)
```

undefined是因为程序执行到第二行，调用getUser，这个函数的setTimeout是异步的，所以进程只在这里制定了一个计划，并没有等3秒过去，所以进程把undefined返回给了user变量就走了。

我们访问数据库时，数据库不会立即给你结果，花多长时间才出结果也是未知的。在打印 '终于找到了这个ID的相关信息：' 这句时，这个时间点数据才准备好，然鹅，一切为时已晚，人家进程不会再倒回去给user变量赋值，因为赋值语句是同步代码里的，已经被执行过了。

异步编程有三个标签🏷：callback，promise，Async/await

## callback 回调

先解决上面那个遗留问题，让变量user获取到数据库查到的数据。

分析这个问题本身，还是在于数据还没被查询好，进程就已经赋值给user变量了，这显然不是我们想要的。那么怎么让数据库查好了就告诉进程去赋值呢？显然要用异步的思想。

我们传入一个回调函数作为getUser函数的第二个参数，回调参数**callback是在异步操作完毕后调用的函数**，在这里我们想让 `console.log('终于找到了这个ID的相关信息：')` 执行完毕，也就是数据库查询操作完成，就调用这个callback来返回查询对象。

```js
console.log('Before');
getUser(1,(user)=>{
    console.log(user);
});
console.log('After');

function getUser(userID,callback) {
    console.log('其实我这里还是在同步，只是下面那兄弟它不能被马上执行')
    setTimeout(()=>{
        console.log('终于找到了这个ID的相关信息：')
        return {id:userID,GitHubName:'mosh',birth:'1999'}
    },3000);
}
```

经过此番改动，终于如愿以偿：

```bash
Before
其实我这里还是在同步，只是下面那兄弟它不能被马上执行
After
#全神贯注盯着屏幕数三秒
终于找到了这个ID的相关信息：
{ id: 1, GitHubName: 'mosh', birth: '1999' } #我对象来了！
```

分析一波 ，程序执行到第二行，调用getUser函数，进程左手端着一个userID，右手拎着一个callback回调来到了

getUser家门口，开始执行，执行者函数里的第一句打印，紧接着，发现setTimeout是个异步啊！(进程：那你慢慢查，我先去忙 ) 于是放下手里这俩参数、拿起小本本写上计划就转身离去执行别的。当数据库出了结果， 数据库会给事件队列推一个消息（**Node持续在后台监听这个队列**），**当进程发现队列中有事件，它就去取出事件并处理** ，也就是执行setTimeout。

(🙋🏻‍♀️小关大胆猜测：这里有闭包。根据闭包的定义：闭包是由<u>函数</u>以及<u>创建该函数时的词法环境</u>组合而成。 就是在getUser函数被执行的那一刻就是setTimeout里的这个函数被创建的时刻，getUser函数带的两个参数，就是setTimeout里的这个函数的词法环境，所以后面被执行才有得参数可用 )



接下来，当得到了数据库中的用户对象后，我们读取这个对象的GitHubName属性值，然后用这个值得到这个用户所拥有的仓库数组，创建一个新函数getRepositories，显然这个函数需要GitHubName属性值作为参数，我们还是使用setTimeout来模拟调用GitHub的API：

```js
function getRepositories(username) {
    setTimeout(()=>{
        console.log('GitHub的API调用完毕:')
        return ['这个用户总仓库','仓库1','仓库2','仓库3']
    },3000)
}
```

但是通过刚才的教训你也知道，这里的return在执行时已经不知道返回给谁了，所以我们还是要用回调。

```js
console.log('Before');
getUser(1,(user)=>{
    console.log(user);
    getRepositories(user.GitHubName,(RepoArr)=>{
        console.log(RepoArr);
    })
});
console.log('After');

function getUser(userID,callback) {
    console.log('其实我这里还是在同步，只是下面那兄弟它不能被马上执行')
    setTimeout(()=>{
        console.log('数据库找到了这个ID的相关信息：')
        callback({id:userID,GitHubName:'mosh',birth:'1999'})
    },6000);
}
function getRepositories(username,callback) {
    setTimeout(()=>{
        console.log('GitHub的API调用完毕:')
        callback(['这个用户总仓库','仓库1','仓库2','仓库3'])
    },6000)
}
setTimeout(()=>console.log('Hey!!!!!!'),9000);
```

运行结果：

```bash
Before
其实我这里还是在同步，只是下面那兄弟它不能被马上执行
After
# 👀 数6秒
数据库到了这个ID的相关信息：
{ id: 1, GitHubName: 'mosh', birth: '1999' }
# 👀 数3秒
Hey!!!!!!
# 👀 数3秒
GitHub的API调用完毕:
[ '这个用户总仓库', '仓库1', '仓库2', '仓库3' ]
```

接着刚才上面的分析，进程调用getUser函数里的setTimeout的callback，首先它执行 `console.log(user)` ，紧接着开始执行 getRepositories函数，进程左手提着user.GitHubName，右手拎着一个callback，来到 getRepositories家门口，执行了里面的console语句后发现，有个setTimeout异步，记下转头去执行打印Hey，最后执行回调里的。（这里也就熟能生巧了，user.GitHubName这个参数里的user，getUser给它的，也就是这里又是在调用getRepositories这一刻同时创建了里面的函数，这个函数的此法环境当然就包含user。）

小关认为，这样就实现了**一个函数要用上一个函数返回的结果来做事**，不过可能第一反应会想，我为啥不这么做：

```js
var a = 数据库查询();
var b = 接口查询(a);
var c = 连接结果(b);
......
```

如果是以下这样同步代码，当然可以

```js
function getObj() {
    return {name:'guan-siyu',age:18,grade:3}
}
function getName(obj) {
    return obj.name;
}
function getFirstName(name) {
    return name.split('-')[0];
}
var obj = getObj();
var name = getName(obj);
var firstName = getFirstName(name);
console.log(firstName);//guan
```

亲，你想的挺美，数据库查询这种活不知道查询多久啊，毕竟这不是一瞬间跑完的事情，前面介绍[Node如何工作]这一节就讲了，Node是异步的，进程碰到查数据库这种活，就好像服务员不会等厨子做菜一样，进程会去跑下面的代码，查询结果就被赋值上undefined，然后一切凉凉...  所以说，学吧，学无止境，太深了。

## 堆栈分析

在返回用户GitHub仓库数组后，还要拿这个数组做一些事情，你想进到这个数组的第一个仓库里，然后查询仓库1的所有版本，返回版本数量。

```js
console.log('Before');
getUser(1,(user)=>{    
    console.log(user);
    getRepoArr(user.GitHubName,(repoArr)=>{
        console.log("此用户的所有仓库：",repoArr);
        gerRepoContent(repoArr,(content)=>{
            console.log(repoArr[1]+"的内容是：",content);
        })
    })
});
console.log('After');
function getUser(userID,callback) {                 
    console.log('其实我这里还是在同步，只是下面那兄弟它不能被马上执行')
    setTimeout(()=>{ ---⭐️☝🏻标记为1️⃣  A
        console.log('终于找到了这个ID的相关信息：')
        callback({id:userID,GitHubName:'mosh',birth:'1999'})
    },6000)
}
function getRepoArr(username,callback) {
    setTimeout(()=>{  ---✌🏻标记为2️⃣
        console.log('GitHub的API调用完毕:')
        callback(['这个用户总仓库','仓库1','仓库2','仓库3'])
    },6000)
}
function gerRepoContent(repoArr,callback){ 
    setTimeout(()=>{  ---👌🏻✌标记为3️⃣
        console.log("查到第一个仓库的内容：")
        callback(['内容1','内容2','内容3','...'])
    },6000)
}
setTimeout(()=>console.log('Hey!!!!!!'),9000)  ---⭐️☝🏻标记为1️⃣  B
setTimeout(()=>console.log('------'),15000);  ---⭐️☝🏻标记为1️⃣   C
```

‼️从这个执行结果可以看出来，标记为1️⃣⭐️的是同时被放入事件队列推的，而2️⃣3️⃣是后来依次放入队列的。

进程是哪个做完了就处理拿出来处理哪个

```bash
Before
其实我这里还是在同步，只是下面那兄弟它不能被马上执行
After
# 👀 数6秒 1A
终于找到了这个ID的相关信息：
{ id: 1, GitHubName: 'mosh', birth: '1999' }
# 👀 数3秒 1B
Hey!!!!!!
# 👀 数3秒 2
GitHub的API调用完毕:
此用户的所有仓库： [ '这个用户总仓库', '仓库1', '仓库2', '仓库3' ]
# 👀 数3秒 1C
------
# 👀 数3秒 3
查到第一个仓库的内容：
仓库1的内容是： [ '内容1', '内容2', '内容3', '...' ]

```

| 时间轴 / s | 放 ‘所需时间         | 取 =>放    | 取 => 放  | 取 => 放 | 取汇总 |
| ---------- | -------------------- | ---------- | --------- | -------- | ------ |
| 0          | ①A '6、①B '9、①C '15 |            |           |          |        |
| 3          |                      |            |           |          |        |
| 6          |                      | ①A => ② '6 |           |          | ①A     |
| 9          |                      | ①B         |           |          | ①B     |
| 12         |                      |            | ② => ③ '6 |          | ②      |
| 15         |                      | ①C         |           |          | ①C     |
| 18         |                      |            |           | ③        | ③      |

