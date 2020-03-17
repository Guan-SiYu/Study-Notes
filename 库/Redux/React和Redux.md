## React Redux入门

React是一个随数据提供的视图库，它以一种高效、可预测的方式呈现视图；Redux是一个状态管理框架，使用它来简化应用程序状态的管理。在React Redux应用程序中，创建一个Redux store用于管理整个应用程序的状态。React组件只订阅“store”中与其角色相关的数据片段。然后直接从React组件dispatch action，发“store”更新。

尽管React组件可以在本地管理自己的状态，但是当您有一个复杂的应用程序时，通常最好使用Redux将应用程序状态保持在一个位置。个别组件可能只有其特定的本地状态时，也有例外。最后，由于Redux不是设计用来与React一起使用的，所以您需要使用React Redux包。它提供了一种将Redux“state”和“dispatch”作为“props”传递给React组件的方法。

在接下来的几个挑战中，首先，您将创建一个简单的React组件，它允许您输入新的文本消息。这些将添加到视图中显示的数组中。这应该是对你在“Reac”课程中学到的东西的一个很好的回顾。接下来，您将创建一个Redux“store”和“actions”，用于管理消息数组的状态。最后，使用react redux将“redux store”与组件连接，从而将本地状态提取到redux“store”中。

```jsx
class DisplayMessages extends React.Component {
  constructor(props){
    super(props);
    this.state={
      input:"",
      messages:[]
    }
  }
  render() {
    return <div />
  }
};

```

## 首先在本地管理状态

在这里，您将完成`DisplayMessages`组件的创建。

```jsx

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input:"",
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this)
  }
 handleChange(e){
   this.setState({
     input:e.target.value
   })
 }
 submitMessage(){
   this.setState(state=>({
     messages:state.messages.concat(state.input),
     input:""
   }))
 }
  render() {
   const list = this.state.messages.map(i=><li>{i}</li>)
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input onChange={this.handleChange} value={this.state.input}/>
        <button onClick={this.submitMessage}>Submint</button>
        <ul>
          {list}
        </ul>
      </div>
    );
  }
};
```

## 提取State逻辑到Redux

现在您已经完成了React组件，您需要将它在本地状态下执行的逻辑移到Redux中。这是将简单的React应用程序连接到Redux的第一步。你的应用程序的唯一功能是将来自用户的新消息添加到无序列表中。为了演示React和Redux是如何协同工作的，这个例子很简单。

```js
const ADD = "ADD";
const addMessage = (message)=>{
    return {type:ADD,message}
}
const messageReducer = (state=[],action)=>{
    switch (action.type){
        case ADD:
            return state.concat(action.message);
        default:
            return state;
    }
}
const store = Redux.createStore(messageReducer);
```

## 使用提供程序将 Redux 连接到 React

您创建了一个Redux store来处理messages数组，并创建了一个action来添加新消息。下一步是提供对Redux store的React访问，以及发送更新所需的操作。React Redux提供其`React Redux包`来帮助完成这些任务。

React Redux提供了一个小API，它有两个关键特性：`Provider`和`connect`。`Provider`是来自React Redux的包装组件，用于包装React应用程序。然后，这个包装器允许您访问整个组件树中的“Redux sto	re”和“dispatch”函数。Provider有两个道具：`Redux store`和`应用程序的子组件`。为应用程序组件定义“Provider”如下所示：

```jsx
<Provider store={store}>
  <App/>
</Provider>
```

代码编辑器现在显示了过去几个挑战中的所有Redux和React代码。它包括“Redux store”、“actions”和“DisplayMessages”组件。唯一新的部分是底部的AppWrapper组件。使用此顶级组件从ReactRedux呈现“Provider”，并将“Redux store”作为道具传递。然后将DisplayMessages组件呈现为子组件。完成后，您应该会看到React组件呈现到页面上:

```jsx
//接上面两挑战的代码
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  render(){
    return (<Provider store={store}>
      <DisplayMessages/>
    </Provider>);
  }
};
```

## 将state映射到Props

The `Provider` component allows you to provide `state` and `dispatch` to your React components, but you must specify exactly what `state` and `action` you want.这样，就可以确保每个组件只能访问其所需的“state”。通过创建两个函数：`mapStateToProps()`和`mapDispatchToProps()`可以实现这一点。
In these functions, you declare what `pieces of state` you want to have  access to and which `action creators` you need to be able to dispatch. 一旦这些函数就位，您将在另一个挑战中看到如何使用React Redux connect方法将它们连接到组件。
注意：在幕后，React Redux使用store.subscribe（）方法实现mapstatetrops（）。

创建函数mapstatetrops（）。此函数应将state作为参数，然后返回一个将该state映射到特定属性名的对象。这些属性将通过“props”对组件进行访问。由于此示例将应用程序的整个“state”保存在单个数组中，因此可以将整个“state”传递给组件。在要返回的对象中创建属性messages，并将其设置为state：

```jsx
const state = [];

function mapStateToProps(state){
    return {
        messages:state
    }
}
```

## 将Dispatch映射到Props

`mapDispatchToProps()`函数用于为React组件提供特定的action creators，以便他们可以针对`Redux store `dispatch action。 However, instead of returning a piece of `state`, each property returns a function that calls dispatch with an `action creator` and any relevant action data. 

您有权访问此“dispatch”，因为在定义函数时，它作为参数传递给mapsDispatchToprops（），就像将state传递给mapStateToProps（）一样。在幕后，React Redux使用Redux的store.dispatch（）使用mapDispatchToProps（）执行这些调度。这与它如何对映射到状态的组件使用store.subscribe（）类似。

例如，有一个名为loginUser()的action creator，它将username作为action负载。从mapsDispatchToProps（）返回的对象对于这个action creator应该类似于：

```jsx
{
  submitLoginUser: function(username) {
    dispatch(loginUser(username));
  }
}
```

代码编辑器提供了一个名为addMessage（）的action creator。编写以dispatch为参数的函数mapsDispatchtoProps（），然后返回一个对象。对象应将属性submitNewMessage设置为一个具有dispatch功能的函数，该函数dispatch 这个action 并将message作为参数传递，在dispatch的同时携带message：

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

function mapDispatchToProps(dispatch){
  return {
    submitNewMessage:(message)=>{
      dispatch(addMessage(message))
    }
  }
}
```

## 将Redux连接到React

既然已经编写了mapstatetops（）和mapsDispatchToprops（）函数，就可以使用它们将`state`和`dispatch`映射到某个React组件的`props`。来自React Redux的`connect方法`可以处理此任务。此方法接受两个可选参数：`mapStateToProps（）`和`mapsDispatchToprops（）`。它们是可选的，因为您可能有一个组件，它只需要访问state，而不需要dispatch”任何actions，反之亦然。

若要使用此方法，请将函数作为参数传入，然后立即使用组件调用结果。这种语法有点不寻常，看起来像：

`connect(mapStateToProps, mapDispatchToProps)(MyComponent)`

注意：如果您想省略connect方法的一个参数，可以在其位置传递`null`。

代码编辑器有`mapStateToProps()`和`mapsDispatchToprops()`函数以及一个名为`Presentational`的新React组件。使用ReactRedux全局对象中的Connect方法将Redux连接到此组件，并立即在`Presentational`组件上调用它。将结果分配给一个名为connected component的新常量，该常量表示连接的组件。就这样，现在你已经连接到Redux了！尝试将connect的任何一个参数更改为null并观察测试结果。

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
// change code below this line
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps) (Presentational)
//⚠️参数顺序不能反
```

## 将Redux连接到Messages App

现在您已经了解了如何使用·connect·来连接React to Redux，您可以将所学应用于处理消息的React组件。

在上一课中，您连接到Redux的组件被命名为`Presentational`，这并不是任意的。该术语*通常*是指未直接连接到Redux的React组件。他们只负责UI的呈现，并将此作为他们接收到的prop的函数来完成。

相比之下，`容器组件`连接到Redux。这些通常负责将dispatching actions 度到store，并经常将store state作为props传递给子组件。

代码编辑器具有到目前为止您在本节中编写的所有代码。唯一的变化是将React组件重命名为`Presentational`。创建一个保存在名为Container的常量中的新组件，该常量使用connect将“Presentational”组件连接到Redux。

Then, in the `AppWrapper`, render the React Redux `Provider` component. Pass `Provider` the Redux `store` as a prop and render `Container` as a child. 设置完所有内容后，您将再次看到在页面上呈现的消息应用程序。

```jsx
// 🙋🏻‍React:
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
// 🙋🏻‍Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// 🙋🏻‍React-Redux:
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// 🙋🏻‍define the Container component here:

const Container = connect(mapStateToProps,mapDispatchToProps)(Presentational);
class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    return <Provider store={store}>
      <Container/>
    </Provider>;
  }
};

```

## 将本地state提取到Redux

你几乎已经完成！回想一下，您编写了所有Redux代码，以便Redux可以控制React消息应用程序的状态管理。现在你已经连接了Redux，但是你正在`Presentational`组件内部处理本地状态。您需要将state的管理从`Presentational`组件中提取到Redux中。

在`Presentational`组件中，首先删除本地状态下的`messages`属性。这些`messages`将由Redux管理。

接下来，修改submitMessage（）方法，使其从this.props中“dispatches submitNewMessage（）”，并将当前“message”输入作为参数从local“state”传入。因为你从本地“state”中删除了“message”，所以也要从对this.setState（）的调用中删除“message s”属性。

最后，修改render（）方法，使其映射到从props而不是state接收的“message”上。

```jsx
//🙋🏻‍React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      // messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.props.submitNewMessage(this.state.input);  //🙋🏻‍♀️🙋🏻‍♀
    this.setState({
      input: '',
      // messages: this.state.messages.concat(this.state.input)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>  
          {     //🙋🏻‍♀️🙋🏻‍♀
            this.props.messages.map((i,idx)=><li key={idx}>{i}</li>)
          }
        </ul>
      </div>
    );
  }
};
//🙋🏻‍Redux:
const ADD = 'ADD';
const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};
const store = Redux.createStore(messageReducer);

//🙋🏻‍React-Redux
const mapStateToProps = (state) => {	//作为props的massages属性
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {	//作为props的dispatch方法
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>	//redux创建的store
        <Container/>	//在Presentational组件上 React-Redux的state和dispatch功能的函数作为props
      </Provider>
    );
  }
};

```

