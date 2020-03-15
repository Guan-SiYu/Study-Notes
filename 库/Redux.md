#### 简介

Redux是JavaScript应用程序的可预测状态容器。它可以帮助您编写行为一致、在不同环境（客户机、服务器和本机）中运行且易于测试的应用程序。虽然您可以将Redux与任何视图库一起使用，但在将其与React结合使用之前，这里将介绍它。

Redux是一个状态管理框架，可以与许多不同的web技术一起使用，包括React。

## 创建Redux存储

Redux是一个状态管理框架，可以与许多不同的web技术一起使用，包括React。
在Redux中，只有一个state对象负责应用程序的整个状态。这意味着，如果你有一个包含10个组件的React应用程序，并且每个组件都有自己的本地状态，那么你的应用程序的整个状态将由位于Redux商店中的单个状态对象定义。这是学习Redux时要理解的第一个重要原则：Redux存储是应用程序状态的唯一真实来源。

在Redux中，只有一个state对象负责应用程序的整个state。这意味着如果您有一个包含十个组件的React应用，并且每个组件都有自己的本地state，则应用的整个状态将由Redux中的一个`store`对象定义。这是学习Redux时要理解的第一个重要原则：Redux存储是应用程序状态的唯一事实来源。

 这也意味着，任何时候你的应用想要更新状态，它都必须通过Redux`store`来更新。单向数据流使您的应用程序更容易跟踪状态管理。 

Redux store是一个保存和管理应用程序状态的对象。在Redux对象上有一个名为`create store()`的方法，使用它来创建`Redux store`。此方法将`reducer function`作为必需的参数。

```jsx
const reducer = (state = 5) => {
  return state;
}
var store = Redux.createStore(reducer);
```

## 从 Redux Store 获取 State

Redux store对象提供了几种允许你与其交互的方法。例如，可以使用`getState()`方法检索Redux store对象中保存的当前state。

使用store.getState（）从存储中取回state，并将其分配给新变量currentState。

```jsx
const store = Redux.createStore(
  (state = 5) => state
);
var currentState = store.getState();

```

## 定义Redux action

由于Redux是状态管理框架，因此更新状态是其核心任务之一。

在Redux中，所有状态更新都是由调度操作触发的。`action`只是一个JavaScript对象，其中包含有关已发生的`action`事件的信息。

在Redux中，所有state更新都是由`dispatching action`(分派操作或叫调度操作)触发的。`action`只是一个JavaScript对象，其中包含有关已发生的action事件的信息。`Redux store`接收这些action对象，然后相应地更新其state。有时一个`Redux action`也会携带一些数据。例如，该action在用户登录后携带用户名。虽然数据是可选的，但action必须带有指定所发生action的“类型”的类型属性。

将看`Redux action`作是将应用程序中发生的 事件的信息 传递到你应用程序的`Redux store`的信使。然后，store根据发生的action执行state更新业务。

编写Redux action与使用type属性声明对象一样简单。声明一个`action`对象，并将其`type`设置为字符串的属性`'LOGIN'`：

```jsx
var action = {
    type:'LOGIN'
}
```

## 定义action创建者

创建action后，下一步是将action发送到Redux store以便它可以更新state。在Redux中，定义`action creator`来实现这一点。`action creator`只是一个返回action的JavaScript函数。`action creator`创建 表示action事件的对象。

定义一个名为`actionCreator()`的函数，该函数在调用时返回action对象。

```jsx
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
function actionCreator(){
  return action;
}
```

## 发送action event

**dispatch方法**用于将action分派到Redux存储区(Redux store)。调用`store.dispatch()`并传递从`action creator`返回的值将action发送回store。

回想一下，ation creator返回一个对象，该对象具有指定发生action的类型属性。然后，该方法将action对象分派到Redux store。基于上一个示例，以下几行是等效的，这两行都分派类型LOGIN的action：

```jsx
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

```jsx
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
store.dispatch(loginAction());
```

## 处理 Store 中的 Action

After an action is created and dispatched, the Redux store needs to know how to respond(响应) to that action. 这是`reducer`函数的工作。

Redux中的reducer负责响应操作而发生的状态修改。reducer将`state`和`action`作为参数，并且总是返回一个新的state。这是reducer的唯一作用。reducer没有副作用——它从不调用API端点，也从不隐藏任何意外。reducer只是一个纯函数，它接受state和action，然后返回新的state。

Redux的另一个关键原则是“state”是只读的。换言之，reducer函数必须**始终返回state的新副本**，**决不能直接修改state**。Redux并不强制执行状态不变性，但是，您负责在`reducer函数`的代码中强制执行它。你将在以后的挑战中练习。

代码编辑器有上一个示例以及reducer函数的开始。填写reducer函数的主体，以便如果它接收到“LOGIN”类型的操作，它将返回LOGIN设置为true的state对象。否则，它将返回当前状态。请注意，当前状态和分派的操作将传递给reducer，因此您可以使用action.type直接访问操作的类型。

```js
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
 return action.type=="LOGIN" ? {login:true} :state;
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```

## 使用switch语句处理多个操作

您可以告诉Redux store如何处理多个action type。假设你正在您的Redux store中管理用户身份验证。你希望在用户登录和注销时具有state表示。可以用一个经过身份验证的属性的状态对象来表示它。还需要创建与用户登录和用户注销对应的action的action creator，以及action对象本身。

在reducer中使用JavaScript switch语句来响应不同的action事件。这是编写Redux reducer的标准模式。switch语句应切换action.type并返回相应的身份验证state。

```js
  const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // change code below this line
  switch (action.type){
    case "LOGIN":
      return {authenticated:true}
    break;
    case "LOGOUT":
      return {authenticated:false}
    break;
    default:
    return state;
  }
  // change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};

```

## 对操作类型使用const

使用Redux时的一个常见做法是将action type指定为只读常量，然后在使用这些常量的任何位置引用它们。

通常以大写形式写常量是惯例，这也是Redux中的标准做法。

```js
// change code below this line
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
// change code above this line

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case LOGIN:
      return {
        authenticated: true
      }

    case LOGOUT:
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT
  }
};
```

## 注册  Store 侦听器

Redux store对象的另一个方法是store.subscribe（）。每当针对该store发送action时，都会调用一个函数。

编写一个回调函数，该函数在每次存储收到操作时递增全局变量计数，并将此函数传递给store.subscribe（）方法。您将看到store.dispatch（）被连续调用三次，每次都直接传入一个action对象。观察操作分派之间的控制台输出以查看更新是否发生。:

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// global count variable:
let count = 0;

// change code below this line
const callback = ()=> ++count;
store.subscribe(callback);
// change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);

```

## 合并多个Reducer

当你的应用程序的状态变得越来越复杂时，记住Redux的原则：所有应用程序“state”都保存在“store”中的单个“state”对象中。因此，Redux提供reducer组合作为复杂状态模型的解决方案。定义多个“reducer”来处理应用程序状态的不同部分，然后将这些reducer组合成一个根reducer。然后根减缩器被传递到Redux createStore（）方法中。

为了让我们将多个“reducer”组合在一起，Redux提供了`combineReducers()`方法。此方法接受一个`对象`作为参数，在该参数中定义将键与特定`reducer函数`关联的属性。Redux将使用给键的名称作为相关状态块的名称。

通常，当应用程序状态的每一部分在某种程度上是不同的或唯一的时，为它们创建一个reducer是一个很好的实践。例如，在带有用户身份验证的笔记记录应用程序中，一个“reducer”可以处理身份验证，而另一个处理用户提交的文本和笔记。对于这样的应用程序，我们可以这样编写`combineReducers()`方法：

```js
const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});
```

代码编辑器中提供了counterReducer（）和authReducer（）函数以及一个“Redux存储”。使用Redux.combineReducers（）方法完成rootReducer（）函数的编写。将counterReducer分配给count键，将authReducer分配给auth键:

```js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};
//	change code below this line
const rootReducer = Redux.combineReducers({
  auth:authReducer,
  count:counterReducer
})
//	change code below this line
const store = Redux.createStore(rootReducer);

```

