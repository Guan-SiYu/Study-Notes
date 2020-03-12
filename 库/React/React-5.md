## 将state作为props传递给子组件

有一个“App”组件来呈现导航栏和其他组件。在“App”中有包含许多用户信息的state，但导航栏只需要访问用户的用户名即可显示。你把那部分“state”作为“prop”传递给导航栏组件。

这个模式说明了React中的一些重要范式。

- 单向数据流。”State“沿着应用程序组件树的一个方向流动，从“有状态”父组件流向子组件。子组件只接收它们需要的state数据。

- 复杂的应用程序🉑分解为几个或单个的'stateful component'。其余组件只是从父组件接收“state”作为“props”，并从该“state”呈现UI。它开始创建一个分离，在代码的一部分中处理“/state”管理，在另一部分中处理UI呈现。将“state”逻辑与UI逻辑分离的这一原则是React的关键原则之一。如果使用正确，它会使复杂的、有状态的应用程序的设计更易于管理。

MyApp组件是“有状态的”，并将Navbar组件呈现为子组件。将其“/state/”中的name属性传递给子组件，然后在h1标记（Navbar render方法的一部分）中显示名称：

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    }
  }
  render() {
    return (
       <div>
         <Navbar name={this.state.name}/> //传递state给Navbar
       </div>
    );
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <h1>Hello, my name is: {this.props.name} </h1> //引用时 所有属性值的集合作为props
    </div>
    );
  }
};

```



## 将回调函数作为props传递

可以将“state”作为“props”传递给子组件，但仅不限于传递数据。

将a“dsha”作为B传递
可以将“state”作为“props”传递给子组件，但不限于传递数据。还可以将“handler函数”或在React组件上定义的任何方法传递给子组件。这是允许子组件与其父组件交互的方式。你把方法像普通的'/prop'一样传递给子组件。它被分配了一个名称，您可以在子组件的this.props下访问该方法名称。

代码编辑器中概述了三个组件。MyApp组件是将呈现GetInput和RenderInput子组件的父组件。将GetInput组件添加到MyApp中的render方法，然后将一个名为input的属性传递给MyApp状态下的inputValue。还要创建一个名为handleChange的属性，并将输入处理程序handleChange传递给它。

 接下来，向MyApp中的render方法添加“/render input/”，然后创建一个名为input的“/prop/”并将inputValue从state传递给它。完成后，您将能够在GetInput组件中键入输入字段，然后通过props调用其父级中的handler方法。这将更新父级状态下的输入，该输入将作为道具传递给两个子级。

```js
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
        <GetInput input={this.state.inputValue} handleChange={this.handleChange}/>

        <RenderInput input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};

```

