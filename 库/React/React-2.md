## 将Props传递给无状态功能组件

如果我们需要向组件传递参数，可以使用 **this.props**  对象,实例如下：

```jsx
function HelloMessage(props) {
    return <h1>Hello {props.name}!</h1>;
}

const element = <HelloMessage name="Guansiyu"/>; //*name** 属性通过 props.name 来获取。
 
ReactDOM.render(
    element,
    document.getElementById('example')
);
//界面显示：Hello Guansiyu!
```

在React中，您可以将props或属性传递给子组件。假设您有一个`App`呈现子组件的组件，该子组件称为`Welcome`无状态功能组件：

```jsx
<App>
  <Welcome user='Mark' />
</App>

```

创建的属性`user`将传递给组件 `Welcome` :

```jsx
const Welcome = (props) => <h1>Hello, {props.user}!</h1>
```

​	练习

```jsx
const CurrentDate = (props) => {
  return (
    <div>
      { /* change code below this line */ }
      <p>The current date is: {props.date}</p> {/*🙋🏻‍每一个引用的模板都可以访问到*/}
      { /* change code above this line */ }
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var dt = Date();
    return (
      <div>
        <h3>What date is it?</h3>
        <CurrentDate date={dt}/> {/*🙋🏻‍注意这里引用变量的语法使用{}括起来，该语法告诉JSX将大括号内的值解释为JavaScript。

*/}
       	{/*✏️或者直接写成<CurrentDate date={Date()}/>*/}			
      </div>
    );
  }
};

```

💻显示

### What date is it?

The current date is: Wed Mar 11 2020 00:07:06 GMT+0800 (中国标准时间)



## 将数组作为props传递

```jsx
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red"]} />
</ParentComponent>
```

子组件可以访问array属性`colors`。访问属性时可以使用数组方法。

 `const ChildComponent = (props) => {props.colors.join(', ')}` 会将所有`colors`数组项连接成一个逗号分隔的字符串并产生： `green, blue, red` .

## 使用默认props

React还可以选择设置默认props。你可以为组件分配默认属性作为组件本身的属性，React会在必要时分配默认属性。这样，就可以指定如果未明确提供值，则prop值应为什么。例如，如果声明`MyComponent.defaultProps = { location: 'San Francisco' }`如果props未定义，React会分配默认props，当然如果你传递`null`作为prop的值，它将保留`null`。

```jsx
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};
// 设置默认props
ShoppingCart.defaultProps = {
  items:0
}
```

## 覆盖默认props

设置默认道具的功能是React中的一个有用功能。覆盖默认属性的方法是显式设置组件的props。

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    return <Items quantity={10}/>  {/*🙋🏻‍覆盖掉默认属性*/}
   
  }
};

```

## 使用PropTypes定义你期望的props	

React提供了有用的类型检查功能，以验证组件是否接收到正确类型的props。

例如，你的应用程序调用API来检索数组中的数据，然后将其作为props传递给组件。可以在组件上设置propTypes，以要求数据类型为array。当数据不是array类型时，将抛出一个有用的警告。

当您提前知道“props”的类型时，设置“propTypes”被认为是最佳实践。您可以用定义“defaultProps”的方式为组件定义“propTypes”属性。

下面是一个例子，需要为一个名为“handleClick”的“prop”输入“function”：

```jsx
MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }
```

在上面的示例中，`PropTypes.func`部分检查`handleClick`是否是函数。添加`isRequired`将告诉React `handleClick`是该组件的必需属性。

在七种JavaScript原语类型中，function和boolean(写为bool)是唯一两种使用异常拼写的类型。除了基本类型之外，还有其他类型可用。例如，可以检查props是否为React元素。

**注意：**从React v15.5.0开始，`PropTypes`是独立于React导入的，如下所示： `import PropTypes from 'prop-types';`

## 使用this.props访问道具(⚠️用class定义的组件要用this)

最后几个挑战涉及将道具传递给子组件的基本方法。但是，如果您要传递道具的子组件是ES6类组件，而不是无状态功能组件，该怎么办？ES6类组件使用略有不同的约定来访问道具。

在任何时候引用类组件本身时，都可以使用`this`关键字。例如，如果ES6类组件的prop名为`data`，则可以用`{this.props.data}`JSX 编写。

```js
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: <strong>{this.props.data}</strong></p> {/*🙋🏻‍*/}
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
         <ReturnTempPassword data={'abcdefghi'}/>{/*🙋🏻‍*/}
        </div>
    );
  }
};
```

## 审查使用带有无状态功能组件的道具

除了最后一个挑战，您一直在向无状态功能组件传递“props”。这些组件像纯函数一样工作。它们接受“props”作为输入，每次传递相同的props时返回相同的视图。你可能想知道是什么状态，下一个挑战将更详细地介绍它。在此之前，我们将回顾一下组件的术语。

**无状态函数组件**是任何接受props并返回JSX的函数。无状态组件是一个扩展React.component的类，但不使用内部状态（在下一个挑战中介绍）。

**有状态组件**是一个class类组件，它维护自己的内部状态。有状态的组件被简单地称为组件或反应组件。

一个常见的模式是尽量减少有状态组件，并尽可能创建无状态功能组件。这有助于将状态管理包含到应用程序的特定区域。反过来，这可以通过更容易地跟踪状态更改对应用程序行为的影响来改进应用程序的开发和维护。