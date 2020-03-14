## 使用Array.map（）动态渲染元素

条件渲染很有用，但是组件渲染来未知数量的元素怎么实现？通常程序员直到运行时才知道程序
"state"的情况，因为此时state取决于用户与该程序的交互。程序员需要编写代码以提前正确处理未未知的state。`Array.map()`在React中使用可以说明这个概念。

例如，您创建一个简单的“待办事项列表”应用程序。作为程序员，您无法知道用户列表中可能有多少个项目。您需要设置组件以动态呈现正确数量的列表元素：

```jsx
const textAreaStyles = {
  width: 235,
  margin: 5
};

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
      this.state={
        toDoList:[],
        userInput:""
      }    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    const itemsArray = this.state.userInput.split(',');
    this.setState({
      toDoList: itemsArray
    });
  }
  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }
  render() {
    const items = this.state.toDoList.map(i=><li>{i}</li>); //⚠️{i}在标签中引用变量要用大括号
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={this.state.userInput}
          style={textAreaStyles}
          placeholder="Separate Items With Commas" />
        <br />
        <button onClick={this.handleSubmit}>Create List</button>
        <h1>My "To Do" List:</h1>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
};

```

## 为同级元素赋予唯一的key属性

最后一个挑战展示了如何使用map方法根据用户输入动态呈现多个元素。然而，这个例子中有一个重要的部分缺失了。创建元素数组时，每个元素都需要一个设置为唯一值的“key”属性。React使用这些键来跟踪哪些项被添加、更改或移除。这有助于在以任何方式修改列表时提高重新呈现过程的效率。

注意：键只需要在同级元素之间是唯一的，它们不需要在应用程序中是全局唯一的。

代码编辑器有一个包含一些前端框架的数组和一个名为frameworks（）的无状态函数组件。Frameworks（）需要将数组映射到无序列表，就像上次的挑战一样。完成映射回调的编写，以返回frontEndFrameworks数组中每个框架的li元素。这一次，确保给每个li一个key属性，设置为一个唯一的值。li元素还应该包含来自前端框架的文本。
通常，您希望使键成为唯一标识要呈现的元素的东西。最后，可以使用数组索引，但通常应尝试使用唯一标识。

```jsx
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map((i,idx)=><li key={idx}>{i}</li>); // 🙋🏻‍
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```

## 使用Array.filter（）动态过滤一个数组

请先使用`filter`返回一个新数组，该数组仅包含`online`属性为的用户`true`。然后，在`renderOnline`变量中，映射到过滤后的数组上，并`li`为每个用户返回一个包含其文本的元素`username`。`key`像在上一个挑战中一样，确保也包括唯一性。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    }
  }
  render() {
    const usersOnline = this.state.users.filter(i=>i.online); // 🙋🏻‍
    const renderOnline = usersOnline.map((i,idx)=><li key={idx}>{i.username}</li>); // 🙋🏻‍
    return (
       <div>
         <h1>Current Online Users:</h1>
         <ul>
           {renderOnline}
         </ul>
       </div>
    );
  }
};
```

## 使用renderToString在服务器上渲染React

到目前为止，您已经在客户端上呈现了React组件。但是，在某些用例中，在服务器上呈现React组件是有意义的。因为React是一个JavaScript视图库，您可以在带有Node的服务器上运行JavaScript，React提供了一个`renderToString()`方法，所以这是可能的。

There are two key reasons why rendering on the server may be used in a real world app：

有两个重要因素解释了为什么要在服务器上呈现React：首先，如果不这样做，React应用程序在最初加载到浏览器时将包含一个相对空的HTML文件和一个大的JavaScript包。这对于搜索引擎来说可能不太理想，因为搜索引擎正试图为您的页面内容编制索引，以便人们能够找到您。如果在服务器上呈现初始HTML标记并将其发送到客户端，则初始页面加载将包含可由搜索引擎爬网的所有页面标记。其次，这会创建更快的初始页面加载体验，因为呈现的HTML比整个应用程序的JavaScript代码小。React仍然能够识别您的应用程序并在初始加载后对其进行管理。

renderToString（）方法是在ReactDOMServer上提供的，它在这里作为全局对象提供。该方法接受一个参数，该参数是React元素。使用此选项将应用程序呈现为字符串：

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

//🙋🏻‍
ReactDOMServer.renderToString(<App/>);
```

