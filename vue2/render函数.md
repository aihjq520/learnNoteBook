# 概念
VNode用来描述DOM节点的，包括tag, data, text, children, elm, parent等。
data属性主要保存一些节点数据，比如style，class，attrs等。
vnode对象 由render function运行生成，下面先从 render 函数的创建开始说

# 两种生成render函数的方式

1. 第一种是用户在对象中直接创建render function
2. 第二种是在Vue编译模板生成render function

```javascript
	<div id="app"></div>
	<script type="text/javascript">
		const vm = new Vue({
			el: '#app',
			render(h) {
				return h('div', {
					attrs:{
						id: 'app'
					}
				}, [ h('h1', [' hello ' + this.name]) ])
			},
			data: {
				name: 'ludeng',
			}
		});
	</script>
```

如上，render函数有一个参数h，这个参数h是用来创建vnode虚拟节点的函数。h函数接收三个参数，h( tag，data| Object，children | String/Array )，分别对应 标签名，数据（class, style, attrs等），子级vnode。
data，和 children 都是可选的，另外 children 可以是 Array 或 String 类型，内容只有文本可以用 String 类型。

h函数的作用：
   在javascript中写html， 渲染生成虚拟dom

