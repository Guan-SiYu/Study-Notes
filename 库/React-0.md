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
