## 创建具有子组件的组件

现在我们来看看如何将多个React组件组合在一起。假设您正在构建一个应用程序，并创建了三个组件：导航栏、仪表板和页脚。


要将这些组件组合在一起，可以创建一个`APP`父组件，该组件将这三个组件中的每个组件呈现为子组件。若要将组件呈现为React组件中的子组件，请在JSX中包含编写为自定义HTML标记的组件名称。例如，在render方法中可以编写：

```jsx
return (
 <App>
  <Navbar />
  <Dashboard />
  <Footer />
 </App>
)
```

 当React遇到引用另一个组件的自定义HTML标记（如本例中用</>包装的组件名称）时，它会在标记的位置呈现该组件的标记。这应该说明应用程序组件与导航栏、仪表板和页脚之间的父/子关系。 

练习

```jsx
const ChildComponent = () => {
  return (
    <div>
      <p>I am the child</p>
    </div>
  );
};

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        <ChildComponent/> {/*🙋🏻‍该组件应返回ChildComponent作为其第二个子组件。*/}
      </div>
    );
  }
};
//显示一个<h1>I am the parent</h1>,下面是一个<p>I am the child</p>
```

## 

## 将类组件渲染到DOM

你可能还记得在先前的挑战中使用ReactDOM API将JSX元素呈现到DOM。渲染React组件的过程看起来非常相似。过去的几个挑战集中在组件和合成上，因此渲染是在后台为您完成的。但是，你编写的任何React代码都不会在不调用ReactDOM API的情况下呈现给DOM。

以下是语法的复习：`ReactDOM.render(componentToRender, targetNode)`。第一个参数是您要渲染的React组件。第二个参数是要在其中渲染该组件的DOM节点。

React组件被传递到`ReactDOM.render()`与JSX元素略有不同的地方。对于JSX元素，您传入要渲染的元素的名称。但是，⚠️对于React组件，您需要使用与渲染嵌套组件相同的语法，例如`ReactDOM.render(<ComponentToRender />, targetNode)`。您可以对ES6类组件和功能组件使用此语法。

 ⚠️render语法可能有点复杂，在传入类组件时需要使用三角括号。

```javascript
class TypesOfVehicles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Vehicles:</h1>
        <Car />
        <Motorcycle />
      </div>
    );
  }
}	
ReactDOM.render(<TypesOfVehicles />, document.getElementById("node-id"));
```



## 在React Render方法中使用高级JavaScript

在前面的挑战中，您学习了如何使用大括号{}将JavaScript代码注入JSX代码，用于访问props、传递props、访问state、在代码中插入注释以及最近的组件样式设置等任务。这些都是将JavaScript放入JSX的常见用例，但它们并不是在React组件中利用JavaScript代码的唯一方法。

您也可以在render方法中直接在return语句之前编写JavaScript，而无需将其插入大括号中。这是因为它还不在JSX代码中。如果稍后要在返回语句中的JSX代码中使用变量，可以将变量名放在大括号中。

在提供的代码中，render方法有一个数组，其中包含20个短语，button click事件绑定到“ask”方法，因此每次单击按钮时，都会生成一个随机数，并将其存储为“state”中的“randomIndex”。在第52行，删除字符串“change me！”并重新分配应答const，以便代码在每次组件更新时随机访问possibleAnswers数组的不同索引。最后，在p标记中插入应答常量。

```jsx
const inputStyle = {
  width: 235,
  margin: 5
}

class MagicEightBall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: ''
    }
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  ask() {
    if (this.state.userInput) {
      this.setState({
        randomIndex: Math.floor(Math.random() * 20),
        userInput: ''
      });
    }
  }
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }
  render() {
    const possibleAnswers = [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes, definitely',
      'You may rely on it',
      'As I see it, yes',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      'Don\'t count on it',
      'My reply is no',
      'My sources say no',
      'Most likely',
      'Outlook not so good',
      'Very doubtful'
    ];
    const answer = possibleAnswers[this.state.randomIndex] // ❓❓用const也可以？
    return (
      <div>
        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
          style={inputStyle} /><br />
        <button onClick={this.ask}>
          Ask the Magic Eight Ball!
        </button><br />
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>
    );
  }
};

```

