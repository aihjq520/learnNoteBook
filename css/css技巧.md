### You-need-to-know-css
1.    https://lhammer.cn/You-need-to-know-css/#/zh-cn/
2.    https://github.com/chokcoco/CSS-Inspiration
3.    https://github.com/QiShaoXuan/css_tricks
4.    http://animista.net/

### css之限制文本行数，超出部分显示 “...“

多行文本省略

- 基于高度截断
- 基于行数截断


一般都是用按行数阶段
```css

display: -webkit-box;
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;

```

单行文本省略

涉及的css属性有：
- text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
- white-space：设置文字在一行显示，不能换行
- overflow：文字长度超出限定宽度，则隐藏超出的内

```css
<style>
    p{
        overflow: hidden;
        line-height: 40px;
        width:400px;
        height:40px;
        border:1px solid red;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
<p 这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本</p >
```

### 换行问题

主要的两个属性是word-break和word-wrap

使用word-break: word-break会使超出宽度的文本新起一行换行。


### 如何给非input元素，例如 div span元素添加blur事件？

给dom元素添加tabIndex属性, 需要**注意**的是click事件会失效，要替换成mousedown事件

### flex是哪三个属性的缩写？

flex-grow、flex-shrink、flex-basis （搞耍b）

