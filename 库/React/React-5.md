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

