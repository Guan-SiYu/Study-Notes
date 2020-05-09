https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN	

# NaN是一个全局对象window的属性

全局属性 **`NaN`** 的值表示不是一个数字

## 描述

`NaN` 是一个*全局对象*的属性。

NaN 属性的初始值就是 NaN，和 [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 的值一样。在现代浏览器中（ES5中）， `NaN` 属性是一个不可配置（non-configurable），不可写（non-writable）的属性。但在ES3中，这个属性的值是可以被更改的，但是也应该避免覆盖。

编码中很少直接使用`到 NaN`。通常都是在计算失败时，作为 Math 的某个方法的返回值出现的（例如：`Math.sqrt(-1)`）或者尝试将一个字符串解析成数字但失败了的时候（例如：`parseInt("blabla")`）。

### 判断一个值是否是`NaN`

⚠️`NaN`如果通过  `==` 、 `!=` 、 `===` 、以及 `!==`与其他任何值比较都将**不相等** 包括与 NaN自己进行比较。

所以在执行自比较之中：NaN，也只有NaN，比较之中不等于它自己。

如果想比较 必须使用 必须使用 [`Number.isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 或 [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 函数。