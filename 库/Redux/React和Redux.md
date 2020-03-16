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

