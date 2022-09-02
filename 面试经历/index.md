### 1.8月24 A公司

没有问技术问题，自我介绍完之后说一个印象最深刻的项目并说明遇到了什么问题，怎么解决的。

团队成员组成，在团队中的位置，怎么沟通的。还问了职业规划。

### 2.8月25 B公司
1.hr面试
- 带5+人团队的组成结构
- 离职原因

hr简单了解一下

2.技术面
1.题目
正则表达式，难点在？是什么含义

Js 基础，一时忘记了every, some返回布尔值，以及splice传负数的时候是什么样

第三个算法题，给定两个数，计算出任意在这个数中间的一个数。答案是Math.floor(Math.random()*end+start)

第四个看代码说出数据流。

总体来说不难

2.问题

说出webpack loader和plug-in的区别

如果批量下载和批量上传难点在哪里？

弹窗如果有一个很大的图片，打开弹窗会渲染很慢，怎么解决？

说一个最熟悉的项目

3.最终面
- 离职原因

- 最有成就感的事情

- 证明学习能力

- 优点缺点


### 3.8月26 C公司

1.笔试题
- 垂直水平居中
- 简述设计模式并说出应用场景，应用场景有点记不太清
- Es6常用方法
- 手写promise，then怎么写的忘记了

2.面试

- 父子组件传值方法
- 实现三角形的做法
  - https://zhuanlan.zhihu.com/p/482361933
  - https://bennettfeely.com/clippy/
  - width,height设都为0，调整 border 颜色 透明。
  - backgroundColors, liner-gradient
  - clip-path 制多边形（或圆形、椭圆形等）并将其定位在元素内。实际上，浏览器不会绘制 clip-path 之外的任何区域，因此我们看到的是 clip-path 的边界。兼容性会有问题
- 了解过canvas吗
- 实现过最复杂的动画效果
  背景是要实现抽奖功能，分为抽一次和10连抽。首先ui设计出特效，例如背景动画的爆炸光，用lottie-web加载json动画，这时候请求数据，监听等动画加载完之后，移除改dom，渲染dom。 中间散开上下两排，并由3d翻转效果。
- 工作上遇到的困难
- 团队组成

3.hr
- 职业发展规划
- 发生什么事情对你影响比较大？

### 4.8月29 D公司
技术部门在面试过程中可以感觉到一般。问的问题我都没记住

### 6.8月30 E公司
1.技术面
- code-push 热更新原理,其他实现热更新方案。
- 强更新原理
- mobx 和 redux区别

### 6.8月30 F公司
1.CTO面
- 简述一下vdom的原理？ 以及如何调度更新？
- 怎么约束项目开发统一？
- sessionstorage、localstorage的区别？
- 谈一谈你对闭包的理解？

2.前端小组长面
- 跨域的解决方法? 发送的请求会不会到服务端？
- 怎么打开一个页面？ 
  
  window.open 
  
  <Link />
- 怎么适配多屏幕大小？
- 构造函数和类的区别？

  ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

  类的构造函数，不使用new是没法调用的，会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行
  
- sessionstorage、localstorage 的区别？
- new 做了什么？

###  7. 9.1 G公司
问的简历上问题的问题比较多，果然是大公司，在做项目的时候要多思考为什么用这个？优缺点？背后的原理
- 在移动端 1px 的问题？

https://segmentfault.com/a/1190000037790305


方案                     优点    缺点

使用0.5px实现	代码简单，使用css即可	IOS及Android老设备不支持

使用border-image实现	兼容目前所有机型	修改颜色不方便

通过 viewport + rem 实现	一套代码，所有页面	和0.5px一样，机型不兼容

使用伪类 + transform实现	兼容所有机型	不支持圆角

box-shadow模拟边框实现	兼容所有机型

box-shadow不在盒子模型，需要注意预留位置
- flutter 和 react-native的区别？
- 图片懒加载原理
- webpacK基本原理？
- loader 和 plugin 的区别？
- webapck中的compile 和 ？ 
- redux 和 mobx的区别
  - 编程思维方式的不同
    
    redux更多的是遵循函数式编程,编写纯函数代码。mobx更多从面向对象去考虑。

  - 储存数据形式区别

    Redux默认以JavaScript原生对象形式存储数据，而Mobx使用可观察对象：

    Redux需要手动追踪所有状态对象的变更；
    Mobx中可以监听可观察对象，当其变更时将自动触发监听；

  - 操作对象方式不同
    我们不能直接操作状态对象，而总是在原来状态对象基础上返回一个新的状态对象，这样就能很方便的返回应用上一状态
    Redux状态对象通常是不可变的（Immutable），Mobx中可以直接使用新值更新状态对象。

    优缺点：
     - mobx模板代码少，规范容易不统一。也说明容易上手。
  
  - 注入方式不同

    mobx不会强制像redux那样必须全局注入store，如2.2所示，在mobx中，我们可以针对每个特定的页面或者功能编写专有的store来使用。
     


- 两道代码题， 手写promise.All和 寻找target值升级版
- 强缓存和协商缓存以及协商缓存的区别？
    - cache-control: max-age , expires
    - last-modified,If-Modified-Since, 
    etag,If-None-Match
- 为什么要升级使用recoil？
- jsbridge web与原生app通信
- new 做了什么？





