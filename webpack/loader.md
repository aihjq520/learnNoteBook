官网上的定义：

loader 是一个转换器，用于对源代码进行转换。

例如 babel-loader 可以将 ES6 代码转换为 ES5 代码；sass-loader 将 sass 代码转换为 css 代码。

loader 的实现
```javascript
module.exports = function (source) {
    return source.replace(/var/g, 'const')
}

```


```javascript
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve('./src/loader1.js'),
                    },
                ]
            }
        ]
    },
}
```


下面我们来实现一个异步 loader：
```
module.exports = function (source) {
    const callback = this.async()

    // 由于有 3 秒延迟，所以打包时需要 3+ 秒的时间
    setTimeout(() => {
        callback(null, `${source.replace(/;/g, '')}`)
    }, 3000)
}
```

异步 loader 需要调用 webpack 的 async() 生成一个 callback，它的第一个参数是 error，这里可设为 null，第二个参数就是处理后的源码。当你异步处理完源码后，调用 callback 即可。