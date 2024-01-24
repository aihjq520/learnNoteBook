
## 背景

在逛掘金的时候看到一篇文章，里面有一个好玩的东西，也非常实用,就是给我们项目的node_moudles等第三方库打补丁。

## patch-package

很多时候我们会遇到第三方库有一些缺陷或者性能问题，这时候要不提个mr或issue给github仓库或者fork项目然后把包的链接改成这个地址。
但这两种都有缺点，第一种响应时间太长，第二种就比较麻烦，需要重新开个地址，也不利于后续版本升级。这时候patch-package就非常有用。

它的优点就是非常方便，及时性非常高。因为所有修改都是在本地的。我们看下如何使用

### 安装

```shell
npm install patch-package postinstall-postinstall --save-dev
```

### 创建补丁
在项目根目录下的 node_modules 文件夹中找到要修改依赖包的相关文件，然后回到根目录执行；

```shell
# npm > 5.2
npx patch-package package-name
```

### 安装补丁

In package.json

```json
"scripts": {
    +  "postinstall": "patch-package"
 }
```


## 注意

直接修改 node_modules 下的代码不是被推荐的做法，应该仅在应急情况下考虑
长期还是需要彻底修复第三方包缺陷并逐步移除项目中的 .patch 文件


