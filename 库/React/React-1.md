#### 简介

React是Facebook创建和维护的一个开源视图库。这是呈现现代Web应用程序的用户界面（UI）的绝佳工具。

React 是一个用于构建用户界面的 JAVASCRIPT 库。

React 主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

#### React 特点

- **1.声明式设计** −React采用声明范式，可以轻松描述应用。
- **2.高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互。
- **3.灵活** −React可以与已知的库或框架很好地配合。
- **4.JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
- **5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- **6.单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

#### React 安装

```html
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 生产环境中不建议使用 -->
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```



## 创建一个简单的JSX元素

```html
<script>
	const JSX = <h1>Hello JSX</h1>;
</script>
```



## 创建一个复杂的JSX元素

但是JSX也可以表示更复杂的HTML。

了解嵌套JSX的重要一件事是**它必须返回单个元素**。

这个父元素将包装所有其他级别的嵌套元素。

例如，几个没有父包装器元素的兄弟姐妹的JSX元素将不会被转换。

这是一个例子：

**有效的JSX：**

```jsx
const element = (<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>); //加不加括号都可以
```

**无效的JSX：**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

练习

```jsx
const JSX = <div>
    <h1>hi</h1>
    <p>oh</p>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>   
```



## 在JSX中添加注释

要将注释放入JSX中，可以使用语法`{/* */}`

```jsx
const JSX = (
  <div>
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>{/*zhushi*/}
  </div>
);
```



## 将HTML元素渲染到DOM

到目前为止，您已经了解到JSX是在JavaScript中编写可读HTML的便捷工具。使用React，我们可以使用React的渲染API（称为ReactDOM）直接将此JSX渲染为HTML DOM。

ReactDOM提供了一种将React元素呈现到DOM的简单方法，如下所示：`ReactDOM.render(componentToRender, targetNode)`，其中第一个参数是您要呈现的React元素或组件，第二个参数是您要将组件呈现到的DOM节点。 。

如您所料，`ReactDOM.render()`必须在JSX元素声明之后调用，就像在使用变量之前必须声明变量一样。

```jsx
const JSX = (
  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);
ReactDOM.render(JSX,document.getElementById('challenge-node'));
```



## 在JSX中定义一个HTML类

既然您已经习惯了编写JSX，您可能想知道它与HTML有何不同。

到目前为止，似乎HTML和JSX完全相同。

JSX的一个主要区别是您不能再使用该词`class`来定义HTML类。这是因为这是`class`JavaScript中的保留字。而是JSX使用`className`。

实际上，JSX中所有HTML属性和事件引用的命名约定都变成了camelCase。例如，JSX中的click事件是`onClick`，而不是`onclick`。同样，`onchange`变为`onChange`。尽管这是一个细微的差异，但要牢记向前迈进的重要一步。

```jsx
const JSX = (
  <div className="myDiv">
    <h1>Add a class to this div</h1>
  </div>
);
```



## 了解自动关闭的JSX标签

JSX与HTML区别的另一种重要方式是自动关闭标签的概念。

HTML中换行标记可以写为`<br>`或`<br/>`，但在JSX中，每个元素都必须关闭。所以换行标记必须始终写为`<br/>`，`<hr>`必须写为`<hr/>`。这样才能成为有效的JSX可以被传输。另一方面，<div>可以写成<div/>或<div></div>。不同之处在于，在第一个语法版本中，无法在<div/>中包含任何内容。您将在后面的挑战中看到，在呈现React组件时，此语法非常有用。

## 创建无状态功能组件

组件是React的核心。React中的所有内容都是一个组件，在这里您将学习如何创建一个组件。

有两种创建React组件的方法。第一种方法是使用JavaScript函数。以这种方式定义组件会创建一个*无状态的功能组件*。应用程序中的状态概念将在以后的挑战中介绍。现在，将无状态组件视为可以接收和呈现数据但不管理或跟踪该数据更改的组件。（我们将在下一个挑战中介绍创建React组件的第二种方法。）

要使用函数创建组件，只需编写一个返回JSX或null的JavaScript函数。需要注意的重要一点是，React要求函数名称以大写字母开头。这是在JSX中分配HTML类的无状态功能组件的示例：

```jsx
// After being transpiled, the <div> will have a CSS class of 'customClass'
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

由于JSX组件代表HTML，因此您可以将多个组件放在一起以创建更复杂的HTML页面。这是React提供的组件架构的关键优势之一。它使您可以由许多单独的隔离组件来组成UI。这使构建和维护复杂的用户界面变得更加容易。



### 创建反应组件 

另外一种定义React组件的方法是**使用ES6类语法**。参考【面向对象/用class语法实现构造器与继承】

在下面的示例中，`Kitten`extends `React.Component`：

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

这将创建一个扩展React.Component类的ES6类Kitten。因此Kitten类现在可以访问许多有用的React特性，比如本地状态和生命周期挂钩。如果您还不熟悉这些术语，请不要担心，它们将在以后的挑战中得到更详细的介绍。还要注意Kitten类中定义了一个调用super（）的构造函数。它使用super（）调用父类的构造函数，在本例中是React.Component。构造函数是在初始化使用类关键字创建的对象时使用的特殊方法。最好使用super调用组件的构造函数，并将道具传递给两者。这将确保正确初始化组件。现在，要知道这是包含此代码的标准。很快你就会看到构造器和道具的其他用途。 

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



