## 了解CSS @keyframes和动画属性如何工作

要为元素设置动画，您需要了解动画属性和`@keyframes`规则。动画属性控制动画的行为方式，而`@keyframes`规则控制该动画过程中发生的情况。共有八个动画属性。这一挑战将使其保持简单，并首先涵盖两个最重要的挑战：

`animation-name`设置动画的名称，该名称随后用于`@keyframes`告诉CSS哪些规则与哪些动画一起使用。

`animation-duration` 设置动画的时间长度。

`@keyframes`如何确切指定动画在整个持续时间内会发生什么。这是通过在动画过程中为特定的“帧”提供CSS属性来完成的，百分比范围为0％到100％。如果将此与电影进行比较，则0％的CSS属性是元素在开幕场景中的显示方式。100％的CSS属性是元素在积分显示前的最后如何显示。然后CSS运用魔法在给定的持续时间内过渡元素以演绎场景。这是一个示例，用于说明`@keyframes`和动画属性的用法：

```css
#anim {
  animation-name: colorful;
  animation-duration: 3s;
}

@keyframes colorful {
  0% {
    background-color: blue;
  }
  100% {
    background-color: yellow;
  }
}
```



对于具有`anim`id 的元素，上面的代码段将设置为`animation-name`，`colorful`并将设置`animation-duration`为3秒。然后，`@keyframes`规则将链接到名称为的动画属性`colorful`。它将在动画开始时将颜色设置为蓝色（0％），在动画结束时将颜色转换为黄色（100％）。您不仅限于开始到结束过渡，还可以将元素的属性设置为0％到100％之间的任何百分比。

## 使用CSS动画更改通过的按钮的悬停状态

您可以使用CSS `@keyframes`更改处于悬停状态的按钮的颜色。

这是在鼠标悬停时按钮颜色宽度变化的示例：

```html
<style>
  img:hover {
    animation-name: width;
    animation-duration: 500ms;
  }

  @keyframes width {
    100% {
      background-color:#4791d0;
      width: 40px;
    }
  }
</style>

<img src="https://bit.ly/smallgooglelogo" alt="Google's Logo" />
```

请注意，`ms`代表毫秒，其中1000ms等于1s。

## 修改通过的动画的填充模式

很好，但是目前还无法正常工作。请注意，动画经过后如何重置`500ms`，从而使按钮恢复为原始颜色。您希望按钮保持突出显示状态。

可以通过将该`animation-fill-mode`属性设置为来完成`forwards`。该`animation-fill-mode`指定样式应用到一个元素时，动画结束。您可以这样设置：

```
animation-fill-mode: forwards;
```

将`button:hover`的`animation-fill-mode`属性设置为`forwards`,用户鼠标悬停在按钮上时按钮保持突出显示状态。

## CSS动画创建运动

当已指定的元素`position`，诸如`fixed`或`relative`的CSS偏移性`right`，`left`，`top`，和`bottom`可以在动画规则用于创建运动。

如下例所示，您可以通过将关键帧的`top`属性设置`50%`为50px 来先下推项目，然后将第一个（`0%`）和最后一个（`100%`）关键帧的属性设置为0px 。

```css
@keyframes rainbow {
  0% {
    background-color: blue;
    top: 0px;
  }
  50% {
    background-color: green;
    top: 50px;
  }
  100% {
    background-color: yellow;
    top: 0px;
  }
}
```

## 由衰落的元素从左至右创建视觉方向传递

对于此挑战，您将更改`opacity`动画元素的，使其在到达屏幕右侧时逐渐消失。

在显示的动画中，根据规则，具有渐变背景的圆形元素将向右移动动画的50％标记`@keyframes`。

------

以id为的元素作为目标，并在处`ball`添加`opacity`设置为0.1 的属性`50%`，以便该元素在向右移动时逐渐消失。

## 使用传递的无限动画计数连续对元素进行动画处理

先前的挑战涉及如何使用某些动画属性和`@keyframes`规则。的另一个动画属性是`animation-iteration-count`，它允许您控制要遍历动画的次数。这是一个例子：

```
animation-iteration-count: 3;
```

在这种情况下，动画将在运行3次后停止，但是可以通过将该值设置为infinite来使动画连续运行。

------

要使球连续不断地向右弹跳，请将`animation-iteration-count`属性更改为`infinite`(无限的)。

## 使用传递的无限动画计数制作CSS心跳

这是另一个具有`animation-iteration-count`属性的连续动画示例，该属性使用您在上一个挑战中设计的心脏。

一秒长的心跳动画由两个动画片段组成。使用属性可以对`heart`元素（包括`:before`和`:after`进行动画处理）以更改大小，使用`transform`属性可以对背景`div`进行动画处理以更改其颜色`background`。

------

通过添加类和类的`animation-iteration-count`属性并将值设置为infinite来保持心脏跳动。该和选择不需要任何动画属性。`back``heart``heart:before``heart:after`

```html
<style>
  .back {
    position: fixed;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    animation-name: backdiv;
    animation-duration: 1s;
    animation-iteration-count:infinite;
  }

  .heart {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: pink;
    height: 50px;
    width: 50px;
    transform: rotate(-45deg);
    animation-name: beat;
    animation-duration: 1s;
    animation-iteration-count:infinite;

  }
  .heart:after {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0px;
    left: 25px;
  }
  .heart:before {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -25px;
    left: 0px;
  }

  @keyframes backdiv {
    50% {
      background: #ffe6f2;
    }
  }

  @keyframes beat {
    0% {
      transform: scale(1) rotate(-45deg);
    }
    50% {
      transform: scale(0.6) rotate(-45deg);
    }
  }

</style>
<div class="back"></div>
<div class="heart"></div>

```

