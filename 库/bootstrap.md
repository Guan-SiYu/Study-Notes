#### 引入bootstrap

通过将以下代码添加到HTML顶部来将Bootstrap添加到任何应用程序：

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>

#### 使图像移动响应

使用Bootstrap，图像可以恰好是我们手机屏幕的宽度，我们要做的就是将`img-responsive`类添加到您的映像中。这样做，图像应该完全适合您的页面宽度。

#### 带引导程序的中心文本

现在我们正在使用Bootstrap，我们可以将标题元素居中以使其看起来更好。我们需要做的就是将类添加`text-center`到`h2`元素中。

#### 创建引导程序按钮

Bootstrap具有自己的`button`元素样式，给与`btn`和`btn-default`类，看起来比纯HTML 样式要好得多。

#### 创建块元素引导程序按钮

通常，`button`带有`btn`和`btn-default`类的元素仅与它们包含的文本一样宽。

通过使用的附加类使它们成为块元素`btn-block`，您的按钮将伸展以填充页面的整个水平空间，并且其后的所有元素都将流入该块下方的“新行”。

此按钮将占用可用宽度的100％。

#### 品尝引导程序按钮的颜色彩虹

该`btn-primary`班是主要的颜色，你会在你的应用程序中使用。这对于突出显示您希望用户执行的操作很有用。

在您的按钮中替换Bootstrap的`btn-default`类`btn-primary`。

#### 使用btn-info调用可选操作

Bootstrap带有几种按钮的预定义颜色。该`btn-info`班是用来提醒人们注意可选的动作，用户可以采取。

在“ Like”按钮下方，使用文本“ Info”创建一个新的块级Bootstrap按钮，并向其中添加Bootstrap `btn-info`和`btn-block`类。

请注意，这些按钮仍需要`btn`和`btn-block`类。

#### 使用btn-danger警告用户危险的操作

Bootstrap带有几种按钮的预定义颜色。该`btn-danger`班是你用它来通知该按钮执行破坏性操作的用户，如删除猫照片按钮颜色。

#### 使用Bootstrap网格并排放置元素

Bootstrap使用响应式12列网格系统，可以轻松地将元素放入行并指定每个元素的相对宽度。Bootstrap的大多数类都可以应用于`div`元素。

Bootstrap具有不同的列宽属性，具体取决于用户屏幕的宽度。例如，电话的屏幕较窄，而笔记本电脑的屏幕较宽。

以Bootstrap的`col-md-*`类为例。此处`md`是中等，`*`是一个数字，指定元素应有多少列宽。在这种情况下，将指定中型屏幕（例如笔记本电脑）上元素的列宽。

```html
<div class="row">
   <div class="col-xs-4">
     <button class="btn btn-block btn-primary">Like</button>
     </div>
   <div class="col-xs-4">
     <button class="btn btn-block btn-info">Info</button>
     </div>
   <div class="col-xs-4">
     <button class="btn btn-block btn-danger">Delete</button>
     </div>    
 </div>
```

#### 针对Bootstrap的自定义CSS

通过使用Bootstrap的内置样式而不是我们先前创建的自定义样式，我们可以清理代码

不用担心-以后会有大量时间自定义CSS。

#### 使用跨度来定位内联元素

您可以使用跨度来创建内联元素。还记得我们使用`btn-block`该类使按钮填充整行吗？

这说明了“内联”元素和“块”元素之间的区别。

#### 创建自定义标题

## 将Font Awesome图标添加到我们的按钮

Font Awesome是一个方便的图标库。这些图标可以是webfonts或矢量图形。这些图标就像字体一样对待。您可以使用像素指定其大小，并且它们将假定其父HTML元素的字体大小。

通过将以下代码添加到HTML顶部，可以在任何应用程序中包含Font Awesome：

​	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

在这种情况下，我们已经为您在后台将此页面添加了它。

该`i`元素最初用于使其他元素变为斜体，但现在通常用于图标。您可以将Font Awesome类添加到`i`元素，以将其变成图标，例如：

​	<i class="fas fa-info-circle"></i>

请注意，该`span`元素也可以与图标一起使用。

#### 将字体真棒图标添加到我们所有的按钮中

Font Awesome是一个方便的图标库。这些图标可以是网络字体或矢量图形。这些图标就像字体一样对待。您可以使用像素指定其大小，并且它们将假定其父HTML元素的字体大小。

#### 响应式样式单选按钮

您也可以`col-xs-*`在`form`元素上使用Bootstrap的类！这样，无论屏幕分辨率有多宽，我们的单选按钮都会在页面上均匀分布。

将两个单选按钮都嵌套在一个``元素中。然后将它们每个嵌套在一个``元素中。

#### 响应式样式复选框

由于Bootstrap的`col-xs-*`类适用于所有`form`元素，因此您也可以在复选框中使用它们！这样，无论屏幕分辨率有多宽，复选框都将均匀地分布在页面上。

#### 将样式文本输入作为表单控件

您可以`fa-paper-plane`通过``在Submit `button`元素内添加来添加Font Awesome图标。

为表单的文本输入字段提供类别`form-control`。给您的表单的提交按钮class `btn btn-primary`。同时为该按钮提供字体真棒图标`fa-paper-plane`。

类别中的所有text ``，``和``元素`.form-control`的宽度均为100％。

#### 使用Bootstrap响应式排列表单元素

#### 将我们的页面放在Bootstrap容器-流体div中

现在，让我们确保页面上的所有内容都对移动设备敏感。

让我们将`h3`元素嵌套`div`在class中`container-fluid`。

#### 创建自举井

Bootstrap有一个名为的类`well`，可以为您的列创建视觉上的深度感。