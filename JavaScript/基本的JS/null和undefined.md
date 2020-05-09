http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html?utm_source=tuicool&utm_medium=referral

## 一、相似性

在JavaScript中，将一个变量赋值为undefined或null，老实说，几乎没区别。

> ```javascript
> var a = undefined;
> 
> var a = null;
> ```

上面代码中，a变量分别被赋值为undefined和null，这两种写法几乎等价。

undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等。

> ```javascript
> if (!undefined) 
>     console.log('undefined is false');
> // undefined is false
> 
> if (!null) 
>     console.log('null is false');
> // null is false
> 
> undefined == null
> // true
> ```

上面代码说明，两者的行为是何等相似！

既然undefined和null的含义与用法都差不多，为什么要同时设置两个这样的值，这不是无端增加JavaScript的复杂度，令初学者困扰吗？Google公司开发的JavaScript语言的替代品Dart语言，就明确规定只有null，没有undefined！

JavaScript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误。

因此，Brendan Eich又设计了一个undefined。

## 最初设计

JavaScript的最初版本是这样区分的：**null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。**

> ```javascript
> Number(undefined)
> // NaN
> 
> 5 + undefined
> // NaN
> ```

```
 notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
   console.log('bar');
};
```