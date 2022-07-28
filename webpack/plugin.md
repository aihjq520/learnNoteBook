webpack 在整个编译周期中会触发很多不同的事件，plugin 可以监听这些事件，并且可以调用 webpack 的 API 对输出资源进行处理。

这是它和 loader 的不同之处，loader 一般只能对源文件代码进行转换，而 plugin 可以做得更多。plugin 在整个编译周期中都可以被调用，只要监听事件。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。
> compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

> compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用

我们看一下官网的定义，webpack 插件由以下部分组成：


<ol>
<li>一个 JavaScript 命名函数。</li>
<li>在插件函数的 prototype 上定义一个 apply 方法。</li>
<li>指定一个绑定到 webpack 自身的事件钩子。</li>
<li>处理 webpack 内部实例的特定数据。</li>
<li>功能完成后调用 webpack 提供的回调。</li>
</ol>

简单的说，一个具有 apply 方法的函数就是一个插件，并且它要监听 webpack 的某个事件。下面来看一个简单的示例：

```javascript

function Plugin(){}

Plugin.prototype.apply = function(compiler){
    compiler.plugin('emit', function(compilation, callback){
        callback()
    })
}

module.exports = Plugin

```

写完插件后要怎么调用呢？

先在 webpack 配置文件中引入插件，然后在 plugins 选项中配置：

```javascript 
const Plugin = require('./src/plugin')

module.exports = {
	...
    plugins: [
        new Plugin()
    ]
}

```