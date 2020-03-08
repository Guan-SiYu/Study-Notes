#### 了解脚本标签和文档准备工作的方式

The important thing to know is that code you put inside this `function` will run as soon as your browser has loaded your page.

This is important because without your `document ready function`, your code may run before your HTML is rendered, which would cause bugs.

```html
<script>
  $(document).ready(function(){

  });
</script>
```

#### 使用jQuery使用选择器定位HTML元素

```js
$("button").addClass("animated bounce");
```

#### 使用jQuery按类定位目标元素

```js
$(".text-primary").addClass("animated shake");
```

#### 使用jQuery通过id定位目标元素

```js
$("#target6").addClass("animated fadeOut");
```

#### 

#### 使用jQuery从元素中删除类

您可以使用jQuery的`addClass()`功能向元素添加类的方式相同，也可以使用jQuery的`removeClass()`功能删除类。

这是您要针对特定按钮执行的操作：

```js
$("#target2").removeClass("btn-default");
```

#### 使用jQuery更改元素的CSS

我们还可以直接使用jQuery更改HTML元素的CSS。

jQuery有一个称为的功能`.css()`，可让您更改元素的CSS。

这是我们将其颜色更改为蓝色的方法：

```js
$("#target1").css("color", "blue");
```

#### 使用jQuery禁用元素

您也可以使用jQuery更改HTML元素的非CSS属性。例如，您可以禁用按钮。

禁用按钮后，该按钮将变为灰色，无法再单击。

jQuery有一个名为的函数`.prop()`，可让您调整元素的属性。

禁用所有按钮的方法如下：

```js
$("button").prop("disabled", true);
```

#### 使用jQuery更改元素内的文本

使用jQuery，您可以在元素的开始标签和结束标签之间更改文本。您甚至可以更改HTML标记。

jQuery有一个名为的功能`.html()`，可让您在元素中添加HTML标签和文本。元素中先前包含的所有内容将完全替换为您使用此功能提供的内容。

这是您重写和强调标题文字的方式：

```js
$("h3").html("jQuery Playground");
```

jQuery还具有类似的功能`.text()`，即仅更改文本而不添加标签。换句话说，此函数不会评估传递给它的任何HTML标记，而是将其视为您要替换现有内容的文本。

#### 使用jQuery删除元素

现在，让我们使用jQuery从页面中删除HTML元素。

jQuery有一个名为的函数`.remove()`，它将完全删除HTML元素

```js
$("#target4").remove();
```

#### 使用appendTo与jQuery移动元素

现在，让我们尝试将元素从一个`div`移到另一个。

jQuery有一个名为的函数`appendTo()`，允许您选择HTML元素并将其附加到另一个元素。

例如，如果我们想`target4`从右边的井移到左边的井，则可以使用：

```js
$("#target4").appendTo("#left-well");
```

#### 使用jQuery克隆元素

除了移动元素外，您还可以将它们从一个地方复制到另一个地方。

jQuery有一个称为的功能`clone()`，可复制元素。

例如，如果我们`target2`要从复制`left-well`到`right-well`，则可以使用：

```
$("#target2").clone().appendTo("#right-well");
```

您是否注意到这涉及将两个jQuery函数粘贴在一起？这称为函数链接，这是使用jQuery完成工作的便捷方法。

#### 使用jQuery定位元素的父级

每个HTML元素都有`parent`其`inherits`属性的元素。

例如，您的`jQuery Playground` `h3`元素具有的父元素``，其本身具有parent `body`。

jQuery有一个名为的函数`parent()`，该函数使您可以访问所选元素的父级。

这是一个示例的示例，`parent()`如果您想为元素的父元素赋予`left-well`蓝色背景色，将如何使用该函数：

```js
$("#left-well").parent().css("background-color", "blue")
```

#### 使用jQuery定位元素的子级

jQuery有一个名为`children()`的函数，该函数使您可以访问所选元素的子级。

这是一个示例，说明如何使用该`children()`函数为`left-well`元素的子级赋予颜色`blue`：

```
$("#left-well").children().css("color", "blue")
```

#### 使用jQuery定位元素的特定子元素

您已经了解了为什么id属性如此方便使用jQuery选择器进行定位。但是您将不会总是拥有如此整洁的ID。

幸运的是，jQuery还有一些针对正确元素的技巧。

jQuery使用CSS选择器来定位元素。该`target:nth-child(n)`CSS选择器允许您选择所有与目标类或元素类型的第n个元素。

这是为每个井中的第三个元素设置反弹类的方法：

```js
$(".target:nth-child(3)").addClass("animated bounce");
```

#### 使用jQuery修改整个页面

我们已经完成了jQuery游乐场的玩耍。让我们把它拆下来！

jQuery也可以定位`body`元素。

这是使整个身体淡出的方法： `$("body").addClass("animated fadeOut");`