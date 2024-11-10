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


### 与promise的区别

- 语法及可读性 ：
  
    - Promise：在使用 then 和 catch 链来处理异步操作。
    - async/await：使得异步代码看起来更像同步代码，更易读和理解。

- 错误处理 ：

    - Promise：使用 .catch 方法来处理错误。
    - async/await：使用 try...catch 块来处理错误。

- 嵌套调用 ：
    - Promise：通过链式调用，复杂的嵌套调用会使代码较难理解。
    - async/await：通过顺序的、类似同步的代码，使嵌套调用更容易书写和理解。