# axios 总结

## 拦截请求


## 拦截响应


## cancel请求

使用场景： 在轮询接口或者表格翻页的时候很有用。

axios支持cancenlToken (deprecated) 或者 AbortController 取消一个请求。

使用方法：

```javascript
// abortController
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()

// cancelToken
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();

```

即对每一个axoios请求new一个cancelToken或者abortController,用来控制响应的请求。然后需要有个缓存去保存axios promise或者是更小概念的cancel executor。

## 额外

另外AbortController也可以当作移除事件监听，我们经常需要在 js 中处理 dom 的监听和卸载工作。但是下面的例子由于事件监听和卸载传入的函数不是同一个引用时不会生效的

```javascirpt
window.addEventListener('resize', () => doSomething());

// 不会生效
window.removeEventListener('resize', () => doSomething());

```

因此我们经常需要一些额外的代码去维护这个回调函数的引用的一致性。而有了AbortSignal之后我们就可以有一种的新的方式去实现.

```
const controller = new AbortController();
const { signal } = controller;

window.addEventListener('resize', () => doSomething(), { signal });

controller.abort();

```