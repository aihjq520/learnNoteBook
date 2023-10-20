## 原理

监听URL变化，在不需要刷新页面的情况下，按路由规则展示不同的页面部分。

有两种方式
- history
- hash

### 准备

Vue.use（new VueRouter）

VueRouter实现的install方法， 为全局挂载了router-view和router-link组件和使用了Vue.mixin为所有的组件添加$router，$route属性

其中的$router是vueRouter对象， 而$route是当前路由的router对象

```typescript
interface Route {
  path: string
  name?: string | null
  hash: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  fullPath: string
  matched: RouteRecord[]
  redirectedFrom?: string
  meta?: RouteMeta
}
```

### router-view

在install的时候会使用的Vue.util.defineReactive(this, '_router', this._router.history.current) 做响应式化，然后当数据改变时，会重新router-view的render函数。
render函数里面有逻辑决定了渲染哪个组件， 会有判断路由层级等。

