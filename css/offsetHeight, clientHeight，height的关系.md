# 背景
由于在实际开发中经常遇到 offsetXXX、scrollXXX 和 clientXXX 这些属性，但是这些属性之间的差异又不是很大，导致在使用的时候经常混淆它们，接下来，我会用最直观的方式让你一劳永逸。
有关的属性先列出来：

- offsetWidth/offsetHeight/offsetTop
- clientWidth/clientHeight
- scrollWidth/scrollHeight/scrollTop

## offsetXXX 

offsetWidth/offsetHeight

offsetWidth/offsetHeight = content + padding + border

CSS 「标准宽高」，它包含了边框、内边距、元素内容 以及滚动条（如果存在的话）。

box-sizing: border-box + 滚动条 
box-sizing: content-box + padding + border + 滚动条

offsetWidth 就表示元素的布局宽高，并不代表实际渲染出来的宽高

比如，当元素的形状发生变化时（放大或缩小等）

### element.getBoundingClientRect()
返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合，就是该元素的 CSS 边框大小。 返回的结果是包含完整元素的最小矩形，并且拥有 left, top, right, bottom, x, y, width, height

渲染的宽高请使用 getBoundingClientRect() 方法计算得到真正的 offsetWidth

当元素的形状发生变化时（比如说放大或缩小），offsetWidth 就表示元素的布局宽高，并不代表实际渲染出来的宽高

使用 element.getBoundingClientRect() 只能获取元素的 width / height， 但是这个值是 offsetWidth / offsetHeight ，包括边框的长度。


https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect

## clientXXX

clientWidth/clientHeight = content + padding

clientWidth/clientHeight 就表示一个元素的「内容宽高」，包含元素内容以及内边距
也就是说如果你只想要获取「显示内容区域的大小」就是用 clientWidth

## scrollXXX

scrollWidth/scrollHeight 表示一个元素内容区域的实际大小，包括不在页面中的可滚动部分（内容和内边距）
它可以理解为 clientXXX 的增强版，是整个内容的大小

## xxxTop

- offsetTop： offsetTop是相对于其offsetParent元素的顶部内边距的距离--offsetParent元素：最近的包含该元素的定位元素或者最近的table,td,th,body元素
- scrollTop： 在有滚动条的情况下，为元素可视区域距离元素顶部的像素，也就是已经滚动了多少距离

