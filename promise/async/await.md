### async的本质
敲黑板！！！很重要！async声明的函数的返回本质上是一个Promise。
```javascript 
(async function () {
    return '我是Promise'
})()
// 返回是Promise
//Promise {<resolved>: "我是Promise"}
```

自动解析成Promise.resolve('我是Promise');

### await的本质

await的本质是可以提供等同于”同步效果“的等待异步返回能力的语法糖。

所以更准确的说法应该是用await声明的Promise异步返回，必须“等待”到有返回值的时候，代码才继续执行下去。

请记住await是在等待一个Promise的异步返回