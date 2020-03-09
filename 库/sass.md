#### 简介

Sass (英文全称：Syntactically Awesome Stylesheets) 是一个最初由 Hampton Catlin 设计并由 Natalie Weizenbaum 开发的层叠样式表语言。

Sass 是一个 CSS 预处理器。

Sass 是 CSS 扩展语言，可以帮助我们减少 CSS 重复的代码，节省开发时间。

Sass 完全兼容所有版本的 CSS。

Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承、内置函数等等特性。

Sass 生成良好格式化的 CSS 代码，易于组织和维护。

Sass 文件后缀为 .scss。

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

## 使用@for创建一个Sass循环

该`@for`指令在循环中添加样式，与`for`JavaScript 中的循环非常相似。

`@for`有两种使用方式：“从头开始”或“从头到尾”。主要区别在于“开始**到**结束” *不包括*结束号作为计数的一部分，而“开始**至**结束” *包括*结束号作为计数的一部分。

这里是一个开始**通过**结束例如：

```scss
@for $i from 1 through 12 {
  .col-#{$i} { width: 100%/12 * $i; }
}
```



该`#{$i}`部分是将变量（`i`）与文本组合成字符串的语法。当Sass文件转换为CSS时，如下所示：

```scss
.col-1 {
  width: 8.33333%;
}

.col-2 {
  width: 16.66667%;
}

...

.col-12 {
  width: 100%;
}
```

```js
   @for $i from 1 through 6{
        .text-#{$i}{
            font-size:15px*$i;
        }
    }
```



## 使用@each映射列表中的项目

Sass还提供了`@each`在列表或映射中的每个项目上循环的指令。在每次迭代中，变量将从列表或映射中分配给当前值。

```scss
@each $color in blue, red, green {
  .#{$color}-text {color: $color;}
}
```

映射的语法略有不同。这是一个例子：

```scss
$colors: (color1: blue, color2: red, color3: green);

@each $key, $color in $colors {
  .#{$color}-text {color: $color;}
}
```

请注意，需要`$key`变量来引用映射中的键。否则，编译后的CSS将有`color1`，`color2`...在里面。上面的两个代码示例都转换为以下CSS：

```scss
.blue-text {
  color: blue;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}
```

练习

```scss
  $table:(k1:blue,k2:black,k3:red);
  @each $k,$color in $table{
    .#{$color}-bg{
      background-color:$color;
    }
  
```



## 应用样式直到使用@while满足条件

该`@while`指令是一个选项，具有与JavaScript `while`循环类似的功能。它创建CSS规则，直到满足条件为止。

该`@for`挑战举了一个例子来创建一个简单的网格系统。也可以使用`@while`。

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} { width: 100%/12 * $x;}
  $x: $x + 1;
}
```

首先，定义一个变量`$x`并将其设置为1。接着，使用该`@while`指令来创建网格系统*而* `$x`小于13设置CSS规则后`width`，`$x`加1，以避免无限循环。

练习

```scss
$i : 1;
@while $i<6{
    .text-#{$i}{
        font-size:15px*$i;
    }
    $i:$i+1;
}
```



## 将您的样式分割成带有局部的较小块

Sass中的`Partials` 是保存CSS代码段的独立文件。这些Partials文件被导入其他Sass文件中使用。这是将相似代码分组到模块中以保持其组织性的一种好方法。


partials的名称以下划线`_`字符开头，它告诉Sass这是CSS的一小段，而不是将其转换为CSS文件。另外，Sass文件以`.scss`文件扩展名结尾。要将 Partials 中的代码放入另一个Sass文件，使用`@import`指令。

例如，如果所有mixin都保存在一个名为“_mixins.scss”的部分中，并且它们需要在“main.scss”文件中，则如何在主文件中使用它们：

```css
// In the main.scss file
@import 'mixins'
```

请注意，import语句中不需要下划线和文件扩展名—Sass知道它是一个部分。将部分导入文件后，所有变量、mixin和其他代码都可以使用。

## 将一组CSS样式扩展到另一个元素

Sass具有一项称为的功能`extend`，可以轻松地从一个元素借用CSS规则，然后在另一个元素上构建CSS规则。
$$
extend (v.)使伸长;扩大;扩展;延长;使延期;扩大…的范围(或影响)
$$
例如，以下CSS规则块为一个`.panel`类设置样式。它有一个`background-color`，`height`和`border`。

```scss
.panel{
  background-color: red;
  height: 70px;
  border: 2px solid green;
}
```

现在，您需要另一个名为的面板`.big-panel`。它具有与相同的基本属性`.panel`，但还需要`width`和`ont-size`。可以从复制和粘贴初始CSS规则`.panel`，但是随着添加更多类型的面板，代码将变得重复。该`extend`指令是重用为一个元素编写的规则，然后为另一个元素添加更多规则的简单方法：

```scss
.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

