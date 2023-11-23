
### mixin
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

我的理解是逻辑复用，编写一些在工具函数完成不到的功能。


- 使用场景1：

最常见的表格分页，如果后端接口规范的话，分页的参数一般都是固定的，例如

```JS
PAGINATION: {
    pageSize: 20,
    currentPage: 1,
    total: 0
}
```
定义好数据之后，我们再看下函数, 这些一般是表格组件所需要传的函数，翻页，page_size变化

```JS
    //查询按钮
    check() { 
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage: 1
      }
      this.queryParams = this.getParams()
      this.getTableData()
    },
    // 分页长度改变
    handleSizeChange(pageSize) {     
     this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      }
      this.getTableData()
    },
    //分页页码改变
    handleCurrentChange(currentPage) { 
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      }
      this.getTableData()
    },
```

我们在业务具体的vue文件中只需要写以下两个方法

```JS
    getParams() {
        let startTime = ''
        let endTime = ''
        if (this.rangeTime && this.rangeTime.length > 0) {
            startTime = this.rangeTime[0].valueOf() / 1000
            endTime = (this.rangeTime[1].valueOf() + this.dayMs) / 1000
        }
        return {
            keyword: this.keyword,
            state: this.state,
            page: this.PAGINATION.currentPage,
            offset: this.PAGINATION.pageSize,
            startTime: startTime,
            endTime: endTime
        }
    },
    async getTableData() {
        this.loading = true
        let res = await searchUserListByPage({ ...this.queryParams })
        this.tableData = res.body.list
        this.PAGINATION.total = res.body.total
        this.loading = false
    },

```

不用mixin 那就是基本在每个表格都要写一遍上述代码。


- 使用场景2：

减少单文件代码行数，逻辑分离。 例如在做一个音频播放的需求，因为需要在app.vue去做相应的逻辑处理，但是这个又和放在这里的其他代码没有什么强耦合，
所以为了方便维护，把相关data, methods都放到mixin里。

- 使用场景3：

echart中的监听页面尺寸发生变化，resize，然后调用相应的api去适应。


等等还有很多，其实只要是无关业务逻辑，又比较重复的代码都可以使用mixin，是vue2中很好的一种抽离代码，复用逻辑的一种手段。



### directives 指令

除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

使用场景1：

鲸眼表格分为观测型表格和配置型表格。 观测型表格默认一页展示50条，如果这时候表头很多，只能滑到底部才能拖动横向滚动条，非常不方便，交互侧希望横向滚动条固定在底部，当页面滚动到底部时，恢复默认状态。

使用指令在inserted的时候监听滚动容器container的scroll事件，判断滚动高度是否已经达到顶部，如果达到底部就恢复横向滚动条。不然设置位置为fixed

```JS
 if (scrollTop + clientHeight >= scrollHeight - pageHeight - 2) {
                // 恢复默认状态
                scrollBar.style.position = 'absolute'
                scrollBar.style.left = '0'
                return
            }
            const scrollBarStyle = getComputedStyle(scrollBar)
            const {position} = scrollBarStyle
            if (position !== 'fixed') {
                // 固定横向滚动条
                scrollBar.style.position = 'fixed'
                scrollBar.style.left = 'auto'
=}

```



### extend

使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。也可以是一个vue文件导出的组件。
一般使用在toast,message,model这种组件中，vue3移除了这个api，换成使用createVNode实现。

```js
var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
        }
    }
})
// 创建 Profile 实例，并挂载到一个元素上。返回一个虚拟dom vnode
const instance = new Profile().$mount('#mount-point')  或者 new Profile().$mount() 

document.body.appendChild(instance.viewmodel.$el)
```

我个人的理解来看，extend提供了一个能够构造组件的函数（也就是构造函数），所以使用的时候需要new，然后调用mount方法


### components



### provide和inject

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。


### 插件
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

- 添加全局方法或者 property。如：vue-custom-element

- 添加全局资源：指令/过滤器/过渡等。如 vue-touch

- 通过全局混入来添加一些组件选项。如 vue-router

- 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-route
通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成
插件需要提供install方法