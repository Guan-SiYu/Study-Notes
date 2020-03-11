## 创建一个有状态组件

state是React最重要的话题之一。

“State”由**应用程序需要知道的任何数据**组成，这些数据可以随时间而变化。如果希望你的application响应**状态更改**并在必要时显示更新的UI，React为现代Web应用程序的状态管理提供了一个不错的解决方案。

通过在React组件的构造函数中(class)的组件类上声明“state”属性，可以在该组件中创建状态。创建组件时用state初始化组件。state属性必须设置为JavaScript `object`。声明如下：

```jsx
this.state = {
  // describe your state here
}
```

在组件的整个生命周期中，你都可以访问“state”对象。你可以更新它，在UI中呈现它，并将其作`props`传递给子组件。state对象可以是复杂的，也可以是简单的。⚠️注意，必须通过class * extendsReact.component来创建组件，才能创建这样的`state`。

```jsx
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  /*🙋🏻‍初始化state*/
      name:"Guansiyu"
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## 用户界面中的渲染状态

一旦初始化了一个组件的state，就可以在呈现的UI中显示state的任何部分。如果一个组件是stateful(有状态)的，那么它总是可以在render（）方法中访问“state”中的数据。您可以使用this.state访问数据。

`state`是React中组件最强大的特性之一。它允许您跟踪应用程序中的重要数据并呈现一个UI以响应此数据中的更改。如果你的数据改变了，你的用户界面也会改变。React使用所谓的虚拟DOM来跟踪幕后的变化。当“/state/”数据更新时，它会触发使用该数据的组件的重新呈现，包括作为道具接收数据的子组件。React更新实际的DOM，但仅在必要时更新。这意味着您不必担心更改DOM。您只需声明UI应该是什么样子。

请注意，如果使组件成为有状态的，则没有其他组件知道其/state/。它的/state/是完全封装的，除非您将/state/数据作为/props/传递给子组件。封装状态的概念非常重要，因为它允许您编写特定的逻辑，然后在代码中的一个位置包含和隔离该逻辑。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    return (
      <div>
       <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## 以另一种方式在用户界面中呈现state

有另一种方法可以访问组件中的state。在render()方法中，在返回语句之前，可以直接编写JavaScript。例如，可以声明函数、从state或props接收数据、对此数据执行计算等等。然后，可以将任何数据赋给变量，你可以在return语句中访问这些变量。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
      const name = this.state.name;{/*🙋🏻‍因为可以直接在代码的这一部分中编写JS，所以不必将此引用括在花括号中。*/}
    return (
      <div>
        <h1>{name}</h1> 
      </div>
    );
  }
};

```

## 使用this.setState更改组件state

先前的挑战涉及组件`state`以及如何在`constructor`中初始化状态。还有一种方法可以**更改**组件的`state`。React提供了一个名为`setState`的更新组件state的方法。在“component class”中调用setState方法如下：this.setState（），传入一个具有键值对的对象。键是“state”属性，值是更新的“state”数据。例如，如果我们将用户名存储在state中并希望对其进行更新:

```jsx
this.setState({
  username: 'Lewis'
});
```

React要求您永远不要直接修改“state”，而是在“state”发生更改时始终使用this.setState（）。另外，您应该注意React可能会批处理多个状态更新，以提高性能。这意味着通过setState方法的状态更新可以是异步的。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);//❓❓❓为什么一定要用super 而且用super还要传入props参数
    this.state = {
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);//⚠️‼️‼️非常重要
  }
  {/*点击button触发handleClick方法，该方法使用this.setState()更新组件状态。将状态中的name属性设置为等于字符串React Rocks！。*/}
  handleClick() {
    this.setState({
      name:"React Rocks!"
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```

## 将 'this' 绑定到 Class 方法

除了设置和更新“state”之外，还可以为“component class/”定义方法。“class/”方法通常需要使用this关键字，以便可以访问方法范围内类的属性（如“state”和props）。有几种方法允许您的“class/”方法访问它。

一种常见的方法是在构造函数中显式绑定“this”，以便在初始化组件时将“this”绑定到类方法。刚才在构造函数中使用this.handleClick=this.handleClick.bind作为其handleClick方法。调用类似于this.setState()的函数时，它将引用该类，并且不会未定义。 

