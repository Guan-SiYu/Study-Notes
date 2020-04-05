1.margin控制元素border与周围元素之间的空间量。 如果将元素的margin值设置为负值，则元素将变大。

 2.选择器问题

 3.绝对单位:px 相对单位:em em:本元素的字体大小相对于父元素的font-size,margin padding border相对于本元素font-size大小 [font-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size)

 4.其他所有元素都将继承body元素的样式 

5.选择器优先级

 6.短十六进制代码:rgb各一位 

7.使用CSS变量一次更改多个元素:CSS变量是一种仅更改一个值即可一次更改许多CSS样式属性的强大方法。 CSS变量在创建它的选择器中使用,或该选择器的任何后代中。发生这种情况是因为CSS变量像普通属性一样被继承。

9.:root是与文档的根元素匹配的伪类选择器,CSS变量想在全局范围内可用 通常在：root元素中定义。 

10.css变量作用域与js函数同理。 

10.text-align:justify;使除最后一行以外的所有文本行与行框的左右边缘相交。 

11.[关于css的长度单位](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 12.box-shadow的参数:[box-shadow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)

 13.opacity属性设透明度,text-transform属性大小写转换 

14.line-height用于更改文本块中每行高度的属性。改变了每行文本获得的垂直空间量。 

15.display取值被分为六类 

16.absolute的元素，top等属性会取替覆盖掉margin。

 17.hsl()色相, 创建渐变CSS线性渐变:background属性的linear-gradient()函数, 使用CSS线性渐变创建条纹元素：repeating-linear-gradient()重复指定的梯度图案 

18.Use the CSS Transform scale Property to Change the Size of an Element:transform: scale(); 

19.transform属性具有多种功能，可让您缩放，移动，旋转，倾斜等元素 scale() skewX() skewX() rotate 

20.box-shadow绘制月亮🌛 

21.::before和::after伪元素,用于在选定元素之前或之后添加内容。CSS伪元素::after用来创建一个伪元素，作为已选中元素的最后一个子元素。通常会配合content属性来为该元素添加装饰内容。这个虚拟元素默认是行内元素。 其中content属性是必填项，用于将照片或文本等内容添加到所选元素。 

22.利用transform + rotate(21) 完成一个 ❤ 

23.@keyframes和动画属性如何工作 animation-fill-mode指定动画结束时应用于元素的样式 animation-iteration-count控制遍历动画的次数 animation-timing-function在动画持续时间内改变动画的速度 cubic-bezier(p1x,p1y,p2x,p2y)实现ease-out缓出效果原理 

24.对移动网页优化过的页面的 viewport meta 标签:width=device-width;使逻辑像素=设备的物理像素 25.@media(){ /* CSS Style */ } 

26.使图像响应式： img{ max-width:100%;//自动缩放图像以适合其容器的宽度，但图像的拉伸范围不会超过其原始宽度 height:auto;//保持原有比例 display:block;//从内联元素变为独占一行的块元素 } 图像正确显示在高分辨率显示器（例如MacBook Pro“视网膜显示器”）上的最简单方法是将其width和height值定义为原始文件的一半。 因为视网膜显示器的DPR=2 

27.视口单位是相对于设备的视口尺寸（宽度或高度），而百分比是相对于父容器元素的大小. vmin: 视口高度和宽度之间的最小值的 1/100。 vmax: 视口高度和宽度之间的最大值的 1/100。 

#### 28.flex: 

(1)关于子项的width height: 子项的盒模型由margin算起,子项上的box-sizing无效。 flex子项需要一个主轴方向上的width(row时)/height(column时),不然元素因默认0而不显示。 交叉轴不设length自动填满父元素: 主轴方向为row,flex项在未设置height时默认与父元素等高(即填充父元素高度), 主轴方向为column时,flex子项未设置width时默认与父元素等宽(即填充父元素宽度）。

 (2)关于子项的display变化: 父元素设置是flex容器，其所有子元素display为block(比如inline的span会变为block）;

 (3/1)子项在主轴上的拉伸: 原理:在主轴原有width/height的基础上,分配剩余的空间. flex-grow是一个让元素在剩余空间里拉长的属性: 当子项里只有一个设置了flex-grow值时(默认为0）,这个子项会在主轴方向占据所有父元素留下来的空间。 当子项里有不止一个设置flex-grow值时,这些子项将会按设置的比例分享剩余主轴空间。

 (3/2)子项在主轴上的收缩: flex-shrink 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。 

(4)子项在轴上的排列:justify-content设置到父容器,justify-self设置到单个子项(align-...交叉轴同理） 本质讲还是分配剩余空间的问题， 计算方式:flex容器length-(子项的margin+length+padding)=剩余可分配空间(也就是说,每个子项按margin边算） 

(6)flex-basis 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。 当一个元素同时被设置了 flex-basis (除值为 auto 外) 和 width (或者在 flex-direction: column 情况下设置了height) , flex-basis 具有更高的优先级.

 (7)简写: 快捷方式可用于一次设置多个flex属性。的flex-grow，flex-shrink和flex-basis 例如，flex: 1 0 10px;将设置项flex-grow: 1;，flex-shrink: 0;和flex-basis: 10px;

(5)兼容性问题: 

#### 28.grid

grid属性把元素作用成grid容器,其子元素成为一个cell;子项的display变为block; (1)grid-template-columns/rows单位: px em fr将容器剩余空间按比例分配 auto将列或行设置为其内容的宽度或高度 %将列或行调整为容器宽度的百分比 

(1/1)属性值可用函数repeat(number/auto-fill/auto-fit,length);minmax(minlength,maxlength); 

(1/2)当容器的大小超过所有组合项目的大小时，auto-fill将继续插入空的行或列并将您的项目推到一边;auto-fit折叠这些空的行或列并拉伸您的项目以适合容器的大小 

(2）使用grid-column/row-gap创建列行间隙 简写:grid-gap:row-gap column-gap|all-gap; (3)grid子项: (3/1)grid-colum/row:指定这个子项夹在哪两条线之间; (3/2)justify/align-self:子项在cell里的水平/竖直方向上的位置; (4)那么问题来了，怎样指定一个子项在某一片区域呢？ 解决这个问题，一种思路是先给grid容器划分区域: (4/1)方法一:在grid容器上用grid-template-areas属性来划分cell的区域并命名,代码中的每个单词代表一个单元格，每对引号代表一行。 子项grid-area的属性值对应容器area的命名来指定它在哪片区域; (4/2)方法2:grid容器上不划分区域，利用子项夹在哪几条水平、竖直的线间来控制它的位置: grid-area: horizontal line to start at / vertical line to start at / horizontal line to end at / vertical line to end at; 

29.transition :https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition 属性是 transition-property，transition-duration，transition-timing-function 和 transition-delay 的一个简写属性。 过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 :hover，:active 或者通过 JavaScript 实现的状态变化。