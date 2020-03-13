## 介绍内联样式

如何设置在React中创建的JSX元素的样式？您可能知道，由于将类应用于JSX元素的方式，它与使用HTML并不完全相同。

如果从样式表中导入样式，则完全没有什么不同。使用className属性将类应用于JSX元素，并将样式应用于样式表中的类。另一个选择是应用内联样式，这在ReactJS开发中非常常见。

您将内联样式应用于JSX元素，类似于在HTML中的应用方式，但有一些JSX差异。下面是HTML中内联样式的示例：

```html
HTML:<div style="color: yellow; font-size: 16px">Mellow Yellow</div>
```

```jsx
JSX:<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>
```

连字符之类的单词`font-size`对JavaScript对象属性而言是无效的语法，因此React使用驼峰式大小写。通常，在JSX中，所有带连字符的样式属性都使用驼峰式大小写。

除非另有说明，否则假定所有属性值长度单位（如`height`，`width`和`fontSize`）都位于`px`。`em`例如，如果要使用，则将值和单位用引号引起来，例如`{fontSize: "4em"}`。除了默认为的长度值外`px`，所有其他属性值都应使用引号引起来。

## 在React中添加内联样式

如果有大量样式集，可以将样式对象指定给常量，以保持代码的组织性。声明具有三个样式属性及其值的对象。然后将style属性设置为等于styles常量。

```jsx
const styles ={
  color:"purple",
  border:"2px solid purple",
  fontSize:40
}
class Colorful extends React.Component {
  render() {
    return (
      <div style={styles}>Style Me!</div>
    );
  }
};
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

