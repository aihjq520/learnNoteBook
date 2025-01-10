## 背景

在学习微前端js沙箱机制的时候，看到源码有提到
`new Function` 和`with`，然后他们的用法也比较神奇

```javascript
new Function(fakeWindow,code)(fakeWindow)
```

这种写法自己也是第一次见，所以就在网上查了资料，总结如下。


## with

我们先看`with`的 mdn 文档的官方解释

> with 语句扩展一个语句的作用域链
> 
>  JavaScript 查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的 context 或者包含这个变量的函数有关。'with'语句将某个对象添加到作用域链的顶部，如果在 statement 中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出ReferenceError异常。



语法如下：

```JS
with (expression)
  statement
```


**备注** 不推荐使用with，在 ECMAScript 5 严格模式中该标签已被禁止。推荐的替代方案是声明一个临时变量来承载你所需要的属性


按照我的理解，在JS访问对象的一个属性时，如果未访问到，就会按照原型链的方式进行查找。with可以在这个过程中把传递的参数作为最高优先级去查找。 show me the code

```JS
var a = 1
const withObj = {a:2}

with(obj) {
    console.log(a)
}

// 输出2

```

mdn也建议我们尽量不去使用它，因为可能会造代码混淆，或者兼容性问题。但是特殊场景特殊使用。


## new Function

我们知道首字母大写的函数一般都是构造函数，它可以实例化一个新的函数对象并返回。所以 `new Function`就是实例化了一个函数并且返回了实例, 用法如下
```JS
new Function ([arg1, arg2, ...argN], functionBody);
```

但是创建出来的函数和一般的函数有点不一样，例如具名函数的`this`一般指向运行环境，所以在访问对象的时候，可以通过作用域链的方式进行查找

```JS

function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // "test"，从 getFunc 的上下文环境中获取的

```

而我们用`Func`进行创建的函数，运行结果就有点不同，他指向的是全局环境

```JS
function getFunc() {
  let value = "test";

  let func = new Function('console.log(window)');

  return func;
}

getFunc()(); // error: value is not defined
```


按照我的理解， new Functino的作用和eval有点像。


## new Function + with

结合以上的知识点，就不难分析这两个语法一起使用的作用就是为` new Function `的创建出来的代码指定一个上下文。

```JS
const code  = `
with(window) {
    try {
        // code
    }
}
`

new Function('window', code)(sandbox)


```