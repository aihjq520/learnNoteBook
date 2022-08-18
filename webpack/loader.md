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


### 处理css

- css-loader 是css-loader只是帮我们解析了css文件里面的css代码，
默认webpack是只解析js代码的，所以想要应用样式我们要把解析完的css代码拿出来加入到
style标签中。 
- style-loader 就是帮我们直接将css-loader解析后的内容挂载到html页面当中，我们来看一下
- postcss-loader 处理css属性浏览器兼容性
- scss-loader 处理scss文件

```javascript

module:{
    rules:[
        {
            test:/\.css$/,
            use:[
                'style-loader'
                'css-loader',
            ]
        }
    ]
}
```

### 处理图片
如果页面图片较多，发很多 http 请求，会降低页面性能。这个问题可以通过 url-loader 解决。url-loader 会将引入的图片以 base64 编码并打包到文件中，最终只需要引入这个dataURL 就能访问图片了。当然，如果图片较大，编码会消耗性能。因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 base64，大于 limit 的会使用 file-loader 的参数进行命名，并把图片 copy 到指定文件夹内。

- file-loader
- url-loader 
只处理两种图片引入情况
React 组件内部直接引入
```javascript
import red_png from "./red.png";
<img src = {red_png} />
```

css 背景图引入
```css
background-image: url("./images/blue.png");
```