## 使用If-Else条件渲染

使用JavaScript控制渲染视图的另一个应用是将渲染元素绑定到条件。条件为真时，将呈现一个视图。如果为假，则程序另一个视图。您可以使用React组件方法中的标准`if/else`语句来执行此操作`render()`。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState({
      display: !this.state.display
    });
  }
  //🙋🏻‍该button切换该值的状态。当前，它每次都呈现相同的UI。render()用if/else语句重写该方法，以便如果display为true，则返回当前标记。否则，返回不带h1元素的标记。
  render() {
    if(this.state.display){ 
        return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
       </div>
    );
    }else{
return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
       </div>
    );
    }

  
  }
};
```

## 使用&&以获得更简洁的条件

if / else语句在上一个挑战中起作用，但是有一种更简洁的方法来实现相同的结果。假设您正在跟踪组件中的多个条件，并且希望根据每个条件呈现不同的元素。如果编写许多`else if`语句以返回略有不同的UI，则可能会重复执行代码，从而可能会出现错误。相反，您可以使用`&&`逻辑运算符以更简洁的方式执行条件逻辑。这是可能的，因为您要检查条件是否为`true`，如果满足，则返回一些标记。这是一个例子：

```
{condition && markup}
```

如果条件为true，则将返回标记。如果条件为false，则运算将在评估条件后立即返回false，而不返回任何内容。您可以将这些语句直接包含在JSX中，并通过在每个条件之后编写&amp;&amp;来将多个条件串在一起。这允许您在render（）方法中处理更复杂的条件逻辑，而无需重复大量代码。改写上一个例子的render：

```jsx
  render() {
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {this.state.display &&<h1>Displayed!</h1>}
       </div>
    );
  }
```



## 使用三元表达式进行条件渲染

```js
condition ? expressionIfTrue : expressionIfFalse
```

当页面首次加载时，向页面呈现“提交”按钮`buttonOne`。然后，当用户输入其年龄并单击`buttonOne`按钮时，请根据该年龄呈现另一个按钮。如果用户输入的数字小于18，则渲染`buttonThree`。如果用户输入的数字大于或等于18，则渲染`buttonTwo`。

```jsx
const inputStyle = {
  width: 235,
  margin: 5
}

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // change code below this line
    this.state={
      input:"",
      userAge:""
    }
    // change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: "" //🙋🏻‍用户输入每敲击键盘 userAge值都为空字符串
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>; //🙋🏻‍用户提交才传出输入数据
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type="number"
          value={this.state.input}
          onChange={this.handleChange} /><br />
       
        { this.state.userAge ==""  //🙋🏻‍
          ? buttonOne
          :this.state.userAge >= 18 ? buttonTwo :buttonThree
        }  
        
      </div>
    );
  }
};
```



## 从props有条件地渲染

将`Results`组件作为的子代渲染`GameOfChance`，并`expression`作为称为的道具传入`fiftyFifty`。在`Results`组件中，编写一个三元表达式以呈现文本`"You Win!"`或`"You Lose!"`基于`fiftyFifty`从中传入的道具`GameOfChance`。最后，请确保该`handleClick()`方法正确地计算了每个回合，以便用户知道他们玩了多少次。这还可以让用户知道组件实际上已经更新了，以防他们连续两次输赢。

```jsx
class Results extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1>{this.props.fiftyFifty }</h1>  /🙋🏻‍
    )
  };
};

class GameOfChance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      counter: this.state.counter + 1 //🙋🏻‍
    });
  }
  render() {
    const expression = Math.random()>0.5?"You Win!":"You Lose!"; 
    return (
      <div>
        <button onClick={this.handleClick}>Play Again</button>
       <Results fiftyFifty={expression}/>  //🙋🏻‍
        <p>{'Turn: ' + this.state.counter}</p>
      </div>
    );
  }
};
```

