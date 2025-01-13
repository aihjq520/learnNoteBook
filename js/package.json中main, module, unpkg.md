在一些第三方库打包完成后，都会在 package.json 中明确指定 main 和 module 字段。那这些字段究竟起着怎样的作用呢？这就得从 node.js 的模块化体系说起啦。

我们都知道，node.js 的模块化一般有好几种类型呢，比如 cjs（通常是 node.js 采用的方式）、umd、amd 以及 ESModule（这可是 JavaScript 官方推出的标准化模块系统哦，不过浏览器得支持才行）。

有些第三方库可能采用的是 CommonJs 方式，而有些则用的是 ESModule 方式，这完全取决于作者的选择。同样，我们在开发项目的时候，虽然常用的打包工具一般是 webpack 或者 vite，但我们也可以通过配置相应的选项来调整不同的打包方式哦。所以呢，为了适应各种打包方式，package.json 就添加了几个字段。要是你用的是 require，那就去加载我 main 字段指定的对应入口文件。嘿，万一你用的是 import 呢，也没关系，你可以用 esmodule 字段对应的入口文件。

下面看看对应 commonjs 引入方式的程序入口文件：

```JS
const { Sandpack } = require('sandpack-vue3')
```

再瞧瞧对应 esmodule 引入方式的程序入口文件：

```JS
import { Sandpack } from 'sandpack-vue3';
```

所以呀，这些字段主要就是为了应对 nodejs 模块化的不同而产生的。

通常呢，我们在 Web 项目中引入包的方式基本上都是通过 ESM 的方式，也就是采用 import xxx from 'xxx' 这样的形式来引入。一般来说，webpack 会按照特定的查找方式，先找 module 字段对应的入口文件，找不到的话再找 main 字段对应的入口文件，最后找 index.js 文件。

比如说，假如我们使用 webpack 来构建我们的前端项目，并且希望所有的包引入都默认按照 main 字段的路径作为入口文件，那这时候我们就可以通过 [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolvemainfields) 来进行处理。

### unpkg 是什么呢？

unpkg 是一个源自 npm 的全球快速 CDN 哦。要注意啦，它部署在 cloudflare 上，在大陆地区访问到的是香港节点。它支持 h/2 以及很多新特性呢，如果不考虑网络延迟的问题，性能优化那是相当出色。在国内的一些互联网公司也有它的镜像，比如知乎和饿了么。

它能够以快速又简单的方式提供任意的包或者任意的文件，通过类似这样的 URL：

```SHELL
unpkg.com/:package@:version/:file
```

#### UNPKG 的发布流程

如果你是 npm 包的作者，只要把包发布到 npm 仓库，unpkg 就会帮你省去发布到 CDN 的麻烦哦。只需要在 npm 包中包含 UMD 构建就行啦（这里要注意，不是在代码仓库里包含哦，两者是不一样的！）。

简单来讲，通过以下几个步骤：

1. 把 umd（或者 dist）目录添加到.gitignore 文件中。
2. 把 umd 目录添加到 package.json 文件的数组(files)中。
3. 在发布的时候，使用脚本把 UMD 打包文件构建到 umd 目录。

就是这么简单哦，当 npm 发布的时候，在 unpkg 上也会有一个有效的文件版本呢。一旦发布到 npm 后就可以被访问到啦，如果按照以上说明操作，效果会更好哦。建议大家参考 Vue 的 package.json 来帮助理解。