主要可以分为 **浏览器** -〉**资源** -〉**图片** -〉**代码**  层面来讲解, 还可以额外增加一个 **webpack**


### 浏览器

#### 1. 减少浏览器请求

http1.1 最多限制6个并发请求，会造成资源堵塞。

#### 2. http 2.0

需要配置一个支持h2的web服务器，并下载安装一张TLS证书，让浏览器与服务器通过h2链接

http2.0优势：

1. 采用二进制格式传输数据, 1.1是文本格式
2. 对消息头采用Hpack进行压缩传输，能够节省消息头占用的网络流量，1.1每次请求，都会携带大量冗余的头信息，浪费了很多宽带资源
3. 异步连接多路复用


#### 3. 设置浏览器缓存策略

强缓存和协商缓存

### 资源

#### 静态资源cdn

js/css/img文件可以存放到cdn缓存

#### gzip压缩


#### css资源放在头部， script标签放在底部，增加defer


### 图片

#### 字体图标代替图片图标

一些通用的小图标，如箭头，叉，可以使用字体图标，减少请求，渲染更快

#### 雪碧图

#### 图片懒加载

为了首屏渲染更快，图片可设置一张加载图代替，当页面在可视区域内时在替换为正真的图片
如果有首屏很大的高清图，可先渲染清晰度低的缩略图，在首页基本构建完成下一次事件循环再去替换为高清图


#### 图片预加载

原理

#### 图片格式

png, awebp, jpg的区别

#### 小于一定大小图片使用base64


### 代码

具体应用情况：

#### echart的10w+海量数据

主要是运用库的配置项，项目能做的是应该就是在多张图表的情况下进行**懒加载**。echart提供以下配置项进行优化

1. 降采样

ECharts 有 提供 sampling 功能 ，其中有max，min，avg以及lttb等。

坏处是有些点丢失了， tooltips无法使用

2. appendData 

分片加载 但只支持line图，散点图

3. 我们的业务情况

秒级数据，共有9+指标（9张图），图例不定可能也有几十个。在初次打开的时候非常慢，采用懒加载，series超过一定量的时候，后面N个series置灰，暂时不渲染。 这里就是交互较少的场景。


#### 防抖节流

#### 减少回流和重绘







### webpack

#### 1.使用webpack-bundle-analyzer

它能够排查出来的信息有:

1. 显示包中所有打入的模块
2. 显示模块size 及 gzip后的size
3. 排查包中的模块情形是非常有必要的，通过webpack-bundle-analyzer来排查出一些无用的模块，过大的模块。然后进行优化。以减少我们的bundle包size，减少加载时长。


#### 2.Tree Shaking


#### 3.split chunks 分包，按需加载


#### 4.路由懒加载


#### 5.拆包

和分包不太一样， 拆包是指从bunlde中拆分出来，最后打包的产物不会再存在。 而是用cdn或者dll类似的方案。  就   