## Compiler 

Compiler 继承自 Tapable，是 Webpack 的整个生命周期管理，代表了完整的 Webpack 环境配置。
每个Webpack 的配置，对应一个 Compiler 对象，记录了 Webpack 的 options 、loader 和 plugin 等信息，并且通过的 Hook 机制管理整个打包流程的生命周期。

### 钩子



## Compilation

Compilation 也继承自 Tapable，代表了一次资源版本构建，包含了当前的模块资源、编译生成资源、变化的文 件、以及被跟踪依赖的状态信息。





### 流程


主要分为三个阶段

- 准备阶段: 主要是创建compiler, compilation
- 编译阶段: 递归分析依赖，并生成相对应的chunks
- 生成资源: 根据 chunks 生成最终文件，主要有三个步骤：模板 Hash 更新，模板渲染 chunk，生成文件。


## 编译阶段

chunk 的生成算法如下：

Webpack 先将 entry 中对应的 module 都生成一个新的 chunk；

遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中；

如果一个依赖module是动态引入(import()、require.ensure())的模块，那么就会根据这个module创建一

个新的 chunk，继续遍历依赖;

重复上面的过程，直至得到所有的 chunks。



### 参考
https://github.com/darrell0904/webpack-doc/blob/master/docs/chapter4/webpack_process.md