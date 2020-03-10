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
        <ChildComponent/> {/*🙋该组件应返回ChildComponent作为其第二个子组件。*/}
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



## 将Props传递给无状态功能组件

先前的挑战涉及在React中创建和组合JSX元素，功能组件和ES6样式类组件的诸多挑战。有了这个基础，是时候看看React中非常常见的另一个功能了：**props**。在React中，您可以将props或属性传递给子组件。假设您有一个`App`呈现子组件的组件，该子组件称为`Welcome`无状态功能组件。可以通过写入以下内容来传递欢迎用户属性：

```jsx
<App>
  <Welcome user='Mark' />
</App>
```

使用由你创建并受React支持的**自定义HTML属性**来传递给组件。在这种情况下，创建的属性`user`将传递给组件 `Welcome`。由于`Welcome`是一个无状态功能组件，因此可以访问此值，如下所示：

```jsx
const Welcome = (props) => <h1>Hello, {props.user}!</h1>
```

调用`props`值是标准的，并且在处理无状态功能组件时，基本上将其视为返回JSX的函数的参数。可以在函数主体中访问参数的值。使用类组件，你将看到有些不同。

