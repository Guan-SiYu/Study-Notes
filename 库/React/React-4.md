## 用 State 切换元素

有时在更新/state/时，您可能需要知道前面的“state/”。但是，/state'更新可能是异步的-这意味着React可能会将多个setState（）调用批处理到一个更新中。这意味着您在计算下一个值时不能依赖This.state或This.props的上一个值。所以，您不应该使用这样的代码：

```jsx
❌this.setState({
  counter: this.state.counter + this.props.increment
});
```

相反，您应该向setState传递一个函数，该函数允许您访问state和props。使用带有setState的函数可以保证使用的是state和props的最新值。这意味着上述内容应重写为：

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

如果只需要“state”，也可以使用不带“props”：

```js
his.setState(state => ({
  counter: state.counter + 1
}));
```

⚠️注意，必须将对象文字括在括号()中，否则JavaScript会认为它是一个代码块。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);//⚠️‼️‼️非常重要
  }
//🙋🏻‍点击显示 再点击消失 再点击显示
  toggleVisibility(){
    this.setState(state=>({
      visibility:!state.visibility
    }))
  }
 
  render() {
    if (this.state.visibility) {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
          <h1>Now you see me!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.toggleVisibility}>Click Me</button>
        </div>
      );
    }
  }
};
```

## 编写一个简单的计数器

有两个按钮调用increment（）和decrement（）方法。编写这些方法，以便在单击相应按钮时计数器值增加或减少1。另外，创建reset（）方法，这样当单击reset按钮时，计数设置为0。

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.increment = this.increment.bind(this);//⚠️‼️‼️非常重要
    this.decrement=this.decrement.bind(this);//⚠️‼️‼️非常重要
    this.reset = this.reset.bind(this);//⚠️‼️‼️非常重要
  }
  increment(){
    this.setState(state=>({
      count:state.count+1
    }))
  }
  decrement(){
    this.setState(state=>({
      count:state.count-1
    }))
  }
  reset(){
    this.setState({
      count:0
    })
  }
  render() {
    return (
      <div>
        <button className='inc' onClick={this.increment}>Increment!</button>
        <button className='dec' onClick={this.decrement}>Decrement!</button>
        <button className='reset' onClick={this.reset}>Reset</button>
        <h1>Current Count: {this.state.count}</h1>
      </div>
    );
  }
};
```

## 创建受控输入

创建受控输入
您的应用程序在“state”和呈现的UI之间可能有更复杂的交互。例如，文本输入的表单控件元素（如input和textarea）在用户输入时在DOM中保持自己的状态。使用React，您可以将这个可变的'state'移动到React组件的'state'。用户的输入成为应用程序状态的一部分，因此React控制该输入字段的值。通常，如果您的React组件具有用户可以键入的输入字段，那么它将是一个受控的输入表单。

```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
		this.handleChange=this.handleChange.bind(this);//⚠️‼️‼️非常重要
  }
  //🙋🏻‍输入框中输入的文本实时显示在p标签里
  handleChange(event){		//👀传入event参数
    this.setState({
      input:event.target.value		//获取event.target.value值
    })
  }
  render() {
    return (
      <div>
       <input onChange={this.handleChange} value={this.state.input}/>
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};

```

## 创建一个受控表格

在提交处理程序中调用event.preventDefault（），以防止将刷新网页的默认表单提交行为。


最后，在表单之后创建一个h1标记，该表单从组件的状态呈现提交值。然后，您可以键入表单并单击按钮（或按enter键），您应该会看到您的输入呈现到页面上。

```jsx
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      submit: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      submit:this.state.input
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.input}/>
          <button type='submit'>Submit!</button>
        </form>
       <h1>{this.state.submit}</h1>
      </div>
    );
  }
};

```

