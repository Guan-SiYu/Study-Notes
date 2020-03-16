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

## action携带数据发送到Store

将操作数据发送到存储
到目前为止，您已经了解了如何将action分派到Redux Store，但是到目前为止，这些action除了type之外还没有包含任何信息。你还可以随action一起发送特定数据。事实上，这是非常常见的，因为action通常来自于一些用户交互，并且往往携带一些数据。Redux Store通常需要知道这些数据。

在代码编辑器中定义了一个基本的notesReducer()和一个addNoteText() `action creator`。完成addNoteText（）函数的主体，以便它返回一个action对象。该对象应包括一个值为ADD_NOTE的type属性，以及一个设置为传递给action creator的注释数据的文本属性。当你调用action creator时，您将传入可以访问该对象的特定注释信息。

```js
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    case ADD_NOTE:
      return action.text
    default:
      return state;
  }
};

const addNoteText = (note) => {
  return{
    type:ADD_NOTE,
    text:note
  }
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());	//Initial State
store.dispatch(addNoteText('Hello!')); //🙋🏻‍调度操作
console.log(store.getState());	//Hello!
```



## 使用中间件处理异步操作

到目前为止，这些挑战避免了讨论异步操作，但它们是web开发中不可避免的一部分。在某个时候，您需要在Redux应用程序中调用异步端点，那么如何处理这些类型的请求？Redux提供专门为此目的设计的`中间件`，称为`Redux Thunk中间件`。这里有一个简单的描述如何使用这个与Redux。

要包含Redux Thunk中间件，请将其作为参数传递给`Redux.applyMiddleware（）`。然后将此语句作为createStore（）函数的第二个可选参数提供。看看编辑器底部的代码就可以看到这一点。然后，要创建异步操作，需要在`action creator`中返回一个以dispatch作为参数的函数。在这个函数中，您可以dispatch action并执行异步请求。

在此示例中，通过`setTimeout()`调用模拟了异步请求。通常在启动任何异步行为之前先dispatch action，以便你的应用程序状态知道正在请求某些数据（例如，该状态可以显示加载图标）。然后，一旦接收到数据，将调度另一个action，该action将数据作为有效载荷以及完成该action的信息一起携带。
将dispatch作为参数传递给这个特殊的“action creator”。这是用于`dispatch action`的方法，只需将action直接传递给dispatch，然后中间件来处理其余的事情。

在handleAsync（）`action creator`中同时写入这两个dispatch。在setTimeout（）之前调度requestingData（）（模拟的API调用）。然后，在接收（假装）数据后，发送receivedData（）操作，传入此数据:

```js
const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => { return {type: REQUESTING_DATA} }
const receivedData = (data) => { return {type: RECEIVED_DATA, users: data.users} }

//这个序列模拟了请求数据、接收数据然后发送接收到的数据的过程:

const handleAsync = () => {
  return function(dispatch) {	//将dispatch参数视为函数并在其中传递操作事件。
    
    dispatch(requestingData());	//	首先传递requestingData操作事件。
    //异步操作：
    setTimeout(function() {
      let data = {														
        users: ['Jeff', 'William', 'Alice']		//必须将数据变量作为receivedData的参数传递。
      }
      dispatch(receivedData(data))	//receivedData操作事件将在setTimeout函数之后传递。
    }, 2500);
  }
};

//createStore第一个参数：
const defaultState = {
  fetching: false,
  users: []
};
const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

//创建store：
const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

```

## 有关 state 不变性的一些细节

不可变状态意味着您永远不会直接修改state，而是返回state的新副本。

Redux没有在其“store”或“reducers”中主动强制执行状态不变性，这一责任落在程序员身上。幸运的是，JavaScript（尤其是ES6）提供了一些有用的工具，无论是字符串、数字、数组还是对象，都可以使用这些工具来增强“state”的不变性。请注意，字符串和数字是原始值，本质上是不可变的。换句话说，3总是3。不能更改数字3的值。state可能由一个数组或对象组成，因为这些是表示许多类型信息的有用数据结构。然而，数组或对象是可变的。

```js
const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return state.concat(action.todo);	//🙋🏻‍
    default:
      return state;
  }
};


const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo:todo
  }
}

const store = Redux.createStore(immutableReducer);

```

## 在阵列上使用扩展运算符

```js
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return [...state,action.todo]	//🙋🏻‍继续上一个例子，可以这样写
    default:
      return state;
  }
};

```

## 从阵列中删除项目

```js
const immutableReducer = (state = [0,1,2,3,4,5], action) => {
  switch(action.type) {
    case 'REMOVE_ITEM':
      return state.slice(0,action.index).concat(state.slice(action.index+1));
  //return [...state.slice(0, action.index),...state.slice(action.index + 1, state.length)
      ];
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index:index
  }
}

const store = Redux.createStore(immutableReducer);

```

## Copy an Object with Object.assign

assign（）接受目标对象和源对象，并将属性从源对象映射到目标对象。任何匹配的属性都将被源对象中的属性覆盖。此行为通常用于通过将空对象作为第一个参数传递给要复制的对象来生成对象的浅复制。下面是一个例子：
const newObject=Object.assign（{}，obj1，obj2）；
这会将new object创建为一个新对象，其中包含obj1和obj2中当前存在的属性。

⚠️更改的是assign方法传入的第一个参数的这个对象

```js
var obj1 = {
    a:"1"
}
var obj2 = {
    b:"2"
}
Object.assign({},obj1,obj2);	//Object { a: "1", b: "2" }
Object.assign({c:"3"},obj1);	//Object { c: "3", a: "1" }
Object.assign({a:"4"},obj1);	//Object { a: "1" }
```

发送类型为ONLINE的操作时，应将state中的status状态更新为'online'，并且不应更改state:

```js
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      return Object.assign({},state,{status:'online'}) //⚠️不可以写成Object.assign(state,{status:'online'}),因为这时state会被更改
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);

```

