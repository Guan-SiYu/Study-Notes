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



## 创建组件

组件是React的核心。React中的所有内容都是一个组件，有两种创建React组件的方法：

### function方式创建组件

第一种方法是使用JavaScript函数。以这种方式定义组件会创建一个`无state`的功能组件。将无状态组件视为可以接收和呈现数据但不管理或跟踪该数据更改的组件（因为它没有state）

要使用函数创建组件，只需编写一个返回JSX或null的JavaScript函数。需要注意的重要一点是，React**要求函数名称以大写字母开头**。

```jsx
// After being transpiled, the <div> will have a CSS class of 'customClass'
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

由于JSX组件代表HTML，因此您可以将多个组件放在一起以创建更复杂的HTML页面。这是React提供的组件架构的关键优势之一。它使您可以由许多单独的隔离组件来组成UI。这使构建和维护复杂的用户界面变得更加容易。

### ES6 class语法创建组件 

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

## 