## 生命周期方法

React组件有几个特殊的方法，这些方法提供了在组件生命周期的特定点执行操作的机会。

这些称为生命周期方法或生命周期挂钩，允许您在特定时间点捕获组件。

这可以在它们被呈现之前、更新之前、接收props之前、卸载之前等等。以下是一些主要生命周期方法的列表：

`componentWillMount()` ` componentDidMount()`  `shouldComponentUpdate()` ` componentDidUpdate()` `componentWillUnmount() `	接下来的几节课将介绍这些生命周期方法的一些基本用例。

## componentWillMount()方法

当组件被装载到DOM时，componentWillMount()方法在render()方法之前调用。将某些内容记录到componentWillMount()中的控制台-您可能希望打开浏览器控制台以查看输出。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
      console.log("componentWillMount")
  }
  render() {
    return <div>Hey</div>
  }
};
```

## componentDidMount()方法

大多数web开发人员在某些时候需要调用API端点来检索数据。如果您正在使用React，那么知道在哪里执行此操作非常重要。

React的最佳实践是将API调用或对服务器的任何调用放入`componentDidMount()`生命周期方法中。将组件安装到DOM后，将调用此方法。对`setState()`此处的任何调用都会触发组件的重新渲染。当您使用此方法调用API并使用API返回的数据设置状态时，一旦收到数据，它将自动触发更新。

componentDidMount（）中有一个模拟API调用。它在2.5秒后设置“state/”，以模拟调用服务器检索数据。此示例请求站点的当前活动用户总数`activeUsers`。在render方法中，在h1中呈现activeUsers的值。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: 20		//浏览器最开始显示20
    };
  }
  componentDidMount() {
    setTimeout( () => {
      this.setState({
        activeUsers: 1273 //2.5秒时从20变换成1273
      });
    }, 2500);
  }
  render() {
    return (
      <div>
        <h1>Active Users: {this.state.activeUsers}</h1>
      </div>
    );
  }
};
```

## 添加事件监听器

componentDidMount()方法还是添加的事件侦听器的最佳位置。React提供了一个综合事件系统，它将浏览器中的本机事件系统包装起来。这意味着，不管用户的浏览器是什么，合成事件系统的行为都是完全相同的——即使本地事件在不同浏览器之间的行为可能不同。

 您已经使用了一些合成事件处理程序，如onClick（）。React的合成事件系统非常适合用于在DOM元素上管理的大多数交互。但是，如果要将事件处理程序附加到文档或窗口对象(document or window objects)，则必须直接执行此操作。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
	//🙋🏻‍在componentDidMount()生命周期方法中添加事件侦听器，keydown事件发生j触发回调handleKeyPress()。
  componentDidMount() {
      document.addEventListener(onkeydown,this.handleKeyPress);
  }
  //🙋🏻‍然后，在componentWillUnmount（）中，删除同一事件侦听器。将相同的参数传递给document.removeEventListener（）。在React组件卸载和销毁之前，使用此生命周期方法对其进行清理是一种很好的做法。删除事件侦听器就是这样一个清理操作的示例。
  componentWillUnmount() {
    document.removeEventListener(onkeydown,this.handleKeyPress)
  }
  //敲下enter键显示
  handleEnter() {
    this.setState({
      message: this.state.message + 'You pressed the enter key! '
    });
  }
  //每按键判断
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  //render
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};

```

## 使用shouldComponentUpdate优化重渲染

到目前为止，如果任何组件接收到“new state”或“new props”，它将重新呈现自身及其所有子组件。这通常是可以的。但是React提供了一个生命周期方法，当子组件接收到“new state”或“props”时可以调用它，并明确声明组件是否应该更新。方法是shouldComponentUpdate（），它以nextProps和nextState作为参数。

该方法是一种有效的性能优化方法。例如，默认行为是组件在收到“new props”时重新呈现，即使“props”没有更改。通过比较“props”，可以使用shouldComponentUpdate（）来防止这种情况。该方法必须返回一个布尔值，告诉React是否更新组件。您可以将当前的“props”（this.props）与下一个“props”（nextProps）进行比较，以确定是否需要更新，并相应地返回true或false。

💻显示器上显示0 2 4 6 8....

```js
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }
  //🙋🏻‍每次点击，父组件会把新state传给子组件当props(也就是nextProps参数),这时子组件先不急着接受新props，而是先判断这个要接受的新值"nextProps"是否为偶数，偶数就接收props并同时更新UI界面，不是偶数的话只接收props新值而不更新UI界面
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?'+this.props.value);
   	return nextProps.value % 2 == 0 ;
  }
  //🙋🏻‍每当props值更新时 打印这句话
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState({
      value: this.state.value + 1
    });
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value}/>
      </div>
    );
  }
};

```

