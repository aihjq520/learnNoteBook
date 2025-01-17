先说结论，按版本来分主要看是react18之前还是之后的版本

- react v18之后就都是异步的。
- v18之前就需要看是什么情况


### setState是同步还是异步?

此处同步异步的定义

我们知道Promise.then(),setTimeout是异步执行. 从js执行来说, setState肯定是同步执行.

所以这里讨论的同步和异步并不是指setState是否异步执行, 而是指**调用setState之后this.state能否立即更新**

### 分析

众所周知调用setState({item: 'new xxx'})之后, 会将传入setState的参数包装成一个update对象并添加到updateQueue队列中.
之后updateQueue队列在什么时机被合并到this.state中才是本题目的关键. 因为合并之后this.state必然就已经更新了.
state的合并是在fiber构建循环中进行的, 而fiber构建循环必然是在触发scheduler调度之后进行. 关于这一点的详细论述可以参考react两大工作循环.
到这里问题转化为调用setState之后, 是否立即触发scheduler调度?

如果立即进行scheduler调度, 那么this.state必然能同步获取.
反之, 如果异步进行scheduler调度, 那么this.state不能同步获取.
每次调用setState都会进行一次scheduler调度(可以参考React 调度机制).
在最新源码v16.14.0中体现为调用ensureRootIsScheduled. 在该源码中, 可以得到回答本题目的最佳答案, 核心逻辑如下:
```javascript
 if (
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
       // .... 省略部分本次讨论不会涉及的代码
    } else {
      ensureRootIsScheduled(root, eventTime); // 触发scheduler调度(调度是异步的) , 所以该函数不会立即触发render.
      if (executionContext === NoContext) {  // 当执行上下文为0时, 会刷新同步队列
         // .... 省略部分本次讨论不会涉及的代码

        // 这里是关键,  执行同步回调队列. 有兴趣的同学可以继续在源码中查看, 可以得到结论:
        // if分支之外的ensureRootIsScheduled(root, eventTime)和此处的flushSyncCallbackQueue()
        // 最终都是调用performSyncWorkOnRoot进行fiber树的循环构建
        flushSyncCallbackQueue(); 
      }
    }
```

### 结论
综上所述, setState是同步和异步最关键的因素是react内部的执行上下文executionContext的状态.
当executionContext为空时, 表现为同步.
反之executionContext不为空, 表现为异步.

### executionContext何时为空?

这个问题反过来更好理解, 什么时候executionContext不为空? 因为executionContext是react内部控制的属性, 当初次render, 合成事件触发时都会改变executionContext的值.

只要绕开react内部触发更改executionContext的逻辑, 就能保证executionContext为空, 进而实现setState为同步.
可以使用异步调用如setTimeout, Promise, MessageChannel等
可以监听原生事件, 注意不是合成事件(合成事件是react体系, 会更改executionContext), 在原生事件的回调函数中执行 setState 就是同步的
附加条件

以上分析都是基于**legacy**模式进行分析的, 众所周知react即将(可能)全面进入concurrent模式(可以参考react 启动模式). 在concurrent模式下, 这个题目可能就没有意义了, 因为从目前最新代码来看, 在**concurrent模式**下根本就不会判断executionContext, 所以concurrent模式下setState都为异步.

 // concurrent模式下根本没有下列代码, 所以不可能同步
if (executionContext === NoContext) { 
        flushSyncCallbackQueue(); 
      }



