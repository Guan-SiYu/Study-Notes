## 用Promise替换CallBack

```js
/* callbak.js */

getUser(1,(user)=>{
    console.log(user);
    getRepoArr(user.GitHubName,(repoArr)=>{
        console.log("此用户的所有仓库：",repoArr);
        getContent(repoArr,(content)=>{
            console.log(repoArr[1]+"的内容是：",content);
            console.log(user); //在这里因为是嵌套关系所以可以访问到
        })
    })
});

function getUser(userID,callback) {
    setTimeout(()=>{
        console.log('setTimeout--A')
        callback({id:userID,GitHubName:'mosh',birth:'1999'})
    },6000)
}
function getRepoArr(username,callback) {
    setTimeout(()=>{
        console.log('setTimeout--B')
        callback(['仓库1','仓库2','仓库3'])
    },6000)
}
function getContent(repoArr,callback){
    setTimeout(()=>{
        console.log('setTimeout--C')
        callback("仓库的内容是...'")
    },6000)
}
```

```js
/* promise.js */

//我们对getUser函数进行优化，不用传入一个回调，返回一个Promise对象
function getUser(userID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout--A')
            //为了将查询结果返回给Promise的调用者，我们要使用resolve函数
            resolve({id: userID, GitHubName: 'mosh', birth: '1999'})
        }, 3000)
    })
}

function getRepoArr(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('setTimeout--B')
            //用resolve函数将异步操作的结果返回给Promise的使用者
            resolve(["repo1","repo2","repo3"])
        }, 3000)
    })
}

function getContent(repoArr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //用resolve函数将异步操作的结果返回给Promise的使用者
            console.log('setTimeout--C',repoArr)
            resolve("仓库的内容是...'")
        }, 3000)
    })
}

//现在没有任何异步操作需要CallBack了，他们都返回promise


//我们看看如何使用promise：
//别忘了这里的三个函数调用都返回一个promise对象，而每个promise都有then方法

getUser(1) //调用返回一个promise对象，查询结果user保留在这个promise中
    .then(user => {
        console.log(user);
        return getRepoArr(user.GitHubName) //调用返回一个promise对象，查询结果repoArr保留在这个promise中
    })
    .then(repoArr => {
        console.log(repoArr);
        return getContent(repoArr[0])//调用返回一个promise对象，查询结果content保留在这个promise中
    })
    .then(content => {
        return console.log(content);
    })
```

```bash
# 3s
setTimeout--A
{ id: 1, GitHubName: 'mosh', birth: '1999' }
# 3s
setTimeout--B
[ 'repo1', 'repo2', 'repo3' ]
# 3s
setTimeout--C repo1
仓库的内容是...'

```



# Promise.resolve()

Promise.resolve等价于下面的写法。有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。

```
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

### Promise.resolve方法的参数分成四种情况：

#### **参数是一个 Promise 实例**

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

#### **参数是一个thenable对象**

thenable对象指的是具有then方法的对象，比如下面这个对象

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42

#### **参数不是具有then方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个**新的 Promise 对象**，状态为resolved。

```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会执行。Promise.resolve方法的参数，会同时传给回调函数

#### **不带有任何参数**

Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

```js
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

.then()函数里不返回值或者返回的不是promise，那么 `then`返回的 Promise 将会成为接受状态（resolve）

```js
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3
```

需要注意的是，**立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行执行，不是马上执行,也不是在下一轮“事件循环”的开始时执行**原因：传递到 `then()`中的函数被置入了一个微任务队列，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，事件队列被清空之后，才开始执行

### resolve()本质作用：

- resolve()是用来表示promise的状态为fullfilled，相当于只是定义了一个有状态的Promise，但是并没有调用它；
- promise调用then的前提是promise的状态为fullfilled；
- 只有promise调用then的时候，then里面的函数才会被推入微任务中；
