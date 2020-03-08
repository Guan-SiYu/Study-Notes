#### 简介

Sass或“语法上很棒的StyleSheets”是CSS的语言扩展。它添加了使用基本CSS语法不可用的功能。Sass使开发人员更容易简化和维护其项目的样式表。

Sass可以扩展CSS语言，因为它是预处理器。它采用Sass语法编写代码，并将其转换为基本CSS。这使您可以创建变量，将CSS规则嵌套到其他规则中，以及导入其他Sass文件等。结果是更紧凑，更易于阅读代码。

Sass有两种语法。第一个被称为SCSS（Sassy CSS），并在所有这些挑战中使用，它是CSS语法的扩展。这意味着每个有效的CSS样式表都是具有相同含义的有效SCSS文件。使用此语法的文件扩展名为.scss。

第二种或更旧的语法称为缩进语法（有时也称为“ Sass”），它使用缩进而不是方括号来表示选择器的嵌套，并使用换行符而不是分号来分隔属性。使用此语法的文件扩展名为.sass。

#### 使用Sass变量存储数据

Sass与CSS的不同之处之一是它使用变量。声明它们并设置为存储数据，类似于JavaScript。

在JavaScript中，使用`let`和`const`关键字定义变量。在Sass中，变量以开头，`$`后跟变量名称。

这是几个例子：

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;

//To use variables:
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

变量有用的一个例子是当许多元素需要相同的颜色时。如果该颜色发生更改，则唯一可编辑代码的位置就是变量值。

## 使用Sass嵌套CSS

Sass允许嵌套CSS规则，这是组织样式表的一种有用方法。

通常，每个元素都指向不同的行以对其进行样式设置，如下所示：

```scss
nav {
  background-color: red;
}

nav ul {
  list-style: none;
}

nav ul li {
  display: inline-block;
}
```



对于大型项目，CSS文件将具有许多行和规则。在这里，嵌套可以通过将子样式规则放置在各自的父元素中来帮助组织代码：

```scss
nav {
  background-color: red;

  ul {
    list-style: none;

    li {
      display: inline-block;
    }
  }
}
```



## 使用Mixins创建可重用的CSS

在Sass中，mixin是一组CSS声明，可以在整个样式表中重复使用。

较新的CSS功能需要一段时间才能被完全采用并准备在所有浏览器中使用。将功能添加到浏览器后，使用它们的CSS规则可能需要供应商前缀。考虑“盒子阴影”：

```scss
div {
  -webkit-box-shadow: 0px 0px 4px #fff;
  -moz-box-shadow: 0px 0px 4px #fff;
  -ms-box-shadow: 0px 0px 4px #fff;
  box-shadow: 0px 0px 4px #fff;
}
```



要为所有具有的元素重新编写此规则`box-shadow`，或者更改每个值以测试不同的效果，需要进行大量键入。Mixins就像CSS的功能一样。这是如何写一个：

```scss
@mixin box-shadow($x, $y, $blur, $c){ 
  -webkit-box-shadow: $x, $y, $blur, $c;
  -moz-box-shadow: $x, $y, $blur, $c;
  -ms-box-shadow: $x, $y, $blur, $c;
  box-shadow: $x, $y, $blur, $c;
}
```



定义以`@mixin`自定义名称开头。的参数（`$x`，`$y`，`$blur`，和`$c`在上面的例子）是可选的。现在`box-shadow`，只要需要一条规则，只需一行调用mixin的行就可以替换，而不必键入所有供应商前缀。用`@include`指令调用mixin ：

```scss
div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```



## 用@if和@else为样式添加逻辑

`@if`Sass中的指令对于测试特定情况非常有用-就像`if`JavaScript中的语句一样工作。

```scss
@mixin make-bold($bool) {
  @if $bool == true {
    font-weight: bold;
  }
}
```



就像在JavaScript中一样，`@else if`并`@else`测试更多条件：

```scss
@mixin text-effect($val) {
  @if $val == danger {
    color: red;
  }
  @else if $val == alert {
    color: yellow;
  }
  @else if $val == success {
    color: green;
  }
  @else {
    color: black;
  }
}
```