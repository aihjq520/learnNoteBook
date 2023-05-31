# web worker

Web Workers 在独立的线程中工作，因此，需要单独的执行代码文件。
workers 和主线程间的数据传递通过这样的消息机制进行 —— 双方都使用 postMessage() 方法发送各自的消息，使用 onmessage 事件处理函数来响应消息（消息被包含在message事件的 data 属性中）。这个过程中数据并不是被共享而是被复制。

适用于大量复杂计算场景： excel大文件导出、图片压缩

限制：
- 同源
- 文件限制，不能使用file://，需来自于网络
- dom操作限制无法使用document, window
- 通信限制，主线程和worker限制只能通过postmessage通信
- 不能使用alert,但可以使用xhr发出请求请求，也可以使用settimeout/setinterval等API


# serviceworker


# shareworker