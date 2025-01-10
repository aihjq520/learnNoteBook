### 1.8 月 24 A 公司

没有问技术问题，自我介绍完之后说一个印象最深刻的项目并说明遇到了什么问题，怎么解决的。

团队成员组成，在团队中的位置，怎么沟通的。还问了职业规划。

### 2.8 月 25 B 公司

1.hr 面试

- 带 5+人团队的组成结构
- 离职原因

hr 简单了解一下

2.技术面 1.题目
正则表达式，难点在？是什么含义

Js 基础，一时忘记了 every, some 返回布尔值，以及 splice 传负数的时候是什么样

第三个算法题，给定两个数，计算出任意在这个数中间的一个数。答案是 Math.floor(Math.random()\*end+start)

第四个看代码说出数据流。

总体来说不难

2.问题

说出 webpack loader 和 plug-in 的区别

如果批量下载和批量上传难点在哪里？

弹窗如果有一个很大的图片，打开弹窗会渲染很慢，怎么解决？

说一个最熟悉的项目

3.最终面

- 离职原因

- 最有成就感的事情

- 证明学习能力

- 优点缺点

### 3.8 月 26 C 公司

1.笔试题

- 垂直水平居中
- 简述设计模式并说出应用场景，应用场景有点记不太清
- Es6 常用方法
- 手写 promise，then 怎么写的忘记了

  2.面试

- 父子组件传值方法
- 实现三角形的做法
  - https://zhuanlan.zhihu.com/p/482361933
  - https://bennettfeely.com/clippy/
  - width,height 设都为 0，调整 border 颜色 透明。
  - backgroundColors, liner-gradient
  - clip-path 制多边形（或圆形、椭圆形等）并将其定位在元素内。实际上，浏览器不会绘制 clip-path 之外的任何区域，因此我们看到的是 clip-path 的边界。兼容性会有问题
- 了解过 canvas 吗
- 实现过最复杂的动画效果
  背景是要实现抽奖功能，分为抽一次和 10 连抽。首先 ui 设计出特效，例如背景动画的爆炸光，用 lottie-web 加载 json 动画，这时候请求数据，监听等动画加载完之后，移除改 dom，渲染 dom。 中间散开上下两排，并由 3d 翻转效果。
- 工作上遇到的困难
- 团队组成

  3.hr

- 职业发展规划
- 发生什么事情对你影响比较大？

### 4.8 月 29 D 公司

技术部门在面试过程中可以感觉到一般。问的问题我都没记住

### 6.8 月 30 E 公司

1.技术面

- code-push 热更新原理,其他实现热更新方案。
- 强更新原理
- mobx 和 redux 区别

### 6.8 月 30 F 公司

1.CTO 面

- 简述一下 vdom 的原理？ 以及如何调度更新？
- 怎么约束项目开发统一？
- sessionstorage、localstorage 的区别？
- 谈一谈你对闭包的理解？

2.前端小组长面

- 跨域的解决方法? 发送的请求会不会到服务端？
- 怎么打开一个页面？

  window.open

  <Link />

- 怎么适配多屏幕大小？
- 构造函数和类的区别？

  ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

  类的构造函数，不使用 new 是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行

- sessionstorage、localstorage 的区别？
- new 做了什么？

### 7. 9.1 G 公司

问的简历上问题的问题比较多，果然是大公司，在做项目的时候要多思考为什么用这个？优缺点？背后的原理

- 在移动端 1px 的问题？

https://segmentfault.com/a/1190000037790305

方案 优点 缺点

使用 0.5px 实现 代码简单，使用 css 即可 IOS 及 Android 老设备不支持

使用 border-image 实现 兼容目前所有机型 修改颜色不方便

通过 viewport + rem 实现 一套代码，所有页面 和 0.5px 一样，机型不兼容

使用伪类 + transform 实现 兼容所有机型 不支持圆角

box-shadow 模拟边框实现 兼容所有机型

box-shadow 不在盒子模型，需要注意预留位置

- flutter 和 react-native 的区别？
  - 图层渲染方式不一样
  - 开发语言不一样
  - 开发插件方式不一样
  - hook 类
  - 开发界面的方式不一样，html, widget
  - 编译产物不一样
- 图片懒加载原理
- webpacK 基本原理？
- loader 和 plugin 的区别？
- webapck 中的 compiler 和 compilation ？
- redux 和 mobx 的区别

  - 编程思维方式的不同

    redux 更多的是遵循函数式编程,编写纯函数代码。mobx 更多从面向对象去考虑。

  - 储存数据形式区别

    Redux 默认以 JavaScript 原生对象形式存储数据，而 Mobx 使用可观察对象：

    Redux 需要手动追踪所有状态对象的变更；
    Mobx 中可以监听可观察对象，当其变更时将自动触发监听；

  - 操作对象方式不同
    我们不能直接操作状态对象，而总是在原来状态对象基础上返回一个新的状态对象，这样就能很方便的返回应用上一状态
    Redux 状态对象通常是不可变的（Immutable），Mobx 中可以直接使用新值更新状态对象。

    优缺点：

    - mobx 模板代码少，规范容易不统一。也说明容易上手。

  - 注入方式不同

    mobx 不会强制像 redux 那样必须全局注入 store，如 2.2 所示，在 mobx 中，我们可以针对每个特定的页面或者功能编写专有的 store 来使用。

- 两道代码题， 手写 promise.All 和 寻找 target 值升级版
- 强缓存和协商缓存以及协商缓存的区别？
  - cache-control: max-age , expires
  - last-modified,If-Modified-Since,
    etag,If-None-Match
- 为什么要升级使用 recoil？
- jsbridge web 与原生 app 通信
- new 做了什么？

### 7. 9.2 H 公司

1.技术面

- 对前端工程化什么理解？
- webpack 有哪些优化的点？
- 怎么理解 promise？
- http 和 https 的理解？
- 虚拟 dom 和 diff 算法？
- webpack 怎么做热更新？怎么与浏览器通信？
- vite 为什么打包这么快？
- 会怎么提升小组成员的能力？
- 泛型的作用？
- 输入 url 到看见页面中间过程发生了什么？
- 怎么建立起一个 http 连接？长连接？
- websocket 了解吗
- ajax 和 websocket 的区别
- post 有哪些数据内容格式 content-type?
  - application/json 适用场景：数据结构较复杂，层级较深的情况。
  - multipart/form-data 适用场景：文件上传。
  - application/x-www-form-urlencoded 适用场景：数据量不大、数据层级不深的情况下强烈建议这种数据提交格式。

### I 公司

笔试题没及格没有下一面，也算是查漏补缺了，promise 异步这一块很薄弱，还有 js 基础。也有考 react class 组件，组件更新逻辑也有点问题。

- null 和 undefined 的区别
- async await 执行机制
  其实 async await 实质只是 promise.then 的语法糖，带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象，如果 async 关键字函数返回的不是 promise，会自动用 Promise.resolve()包装，如果 async 关键字函数显式地返回 promise，那就以你返回的 promise 为准。

  https://juejin.cn/post/7038972445079896101

- 隐式全局变量，var a=1,b=1；与 var a=b=1;的区别

- domlevel 事件 https://blog.51cto.com/knifeedge/5010718

### J 公司

- 说下对 webpack 的理解
- fiber
- 说出项目最值得介绍的一点，每次都觉得答的不好，要好好思考一下。
  充分展示自己的创造力、学习能力、创新能力、沟通能力等面试考核要点，

  cli 脚手架
  产品 背景： 不断尝试业务方向，需要经常新起一个项目，配置文件很多，包括 dockerfile,gitlab.yml,package.json 等。所以为了提高小组的工作效率，就想着能不能开发出像
  create-react-app 的一个脚手架，一键创建项目，也趁着这个机会提升一下 node 知识。
  难点(开发阶段)： 不熟悉 node, 需要经常对文件进行操作，翻看文档。
  库 commander, chalk, inquirer, 会翻看别人的优秀设计，源码。
  测试发布(验收阶段)
  自己测试，小组成员测试，体验效果。
  总结:
  有方便到，但是提升有限，我需要定时维护模板仓库。

  星河存储 h5
  完整的一套流程，项目负责人，成功上线。
  用 gitlab 管理项目，用 gitlab runner 部署项目，用 git 来管理代码。我在这个项目里，除了写代码外，还参与了单元测试和联调，代码上线，写 dockerfile 和 k8s 配置环境变量。我们代码发布时，最终会把代码 docker 并部署到 linux 服务器上。

  动画效果：
  背景：尽可能贴现原生的效果。因为有套一层 webview 的壳。

  打包体积优化？
  webpack analyze 分析

  计算问题多？
  BigNumber.js 封装一层。

- 算法题
- TCP 三次握手，4 次挥手
- react 常用的 hook

### K 公司
   *
  * *
 * * *

for(let i = 1; i<n; i++) {
  for(let j = i; j<=n;j++ ) {
    console.log(" ")
  }
  
} 

侧重项目比较多。

- seo NEXT.JS 这一块涉及到 SSR，需要多去了解，空白。
- vite 生产打包
- vue 和 react 的数据流
- 在小组长扮演什么样的角色？做了哪些方面的工作

### L 公司

- 手撕一道打印三角形
- react hook 解决了什么问题
  - 从组件中提取状态逻辑，解决了在组件之间复用状态逻辑很难的问题；
  - 将组件中相互关联的部分拆分成更小的函数，解决了复杂组件的问题；
  - 组件中的 this 增加学习成本
- fiber
- webpack 有哪些优化方法
  这里列举 web 所有可优化的点
  - 渲染优化
  - 代码优化
  - webpack 优化
  - 资源优化
  - 传输加载优化
- 浏览器缓存机制
- 写过最难的组件
- css 预处理器
