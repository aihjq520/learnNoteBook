# 原理

1.  Vue.use(Vuex)
  
vuex这定义的install方法一步主要实现了


# 模块
- 1. state,getter,mutation,action,dispatch,commit
- 2. mapgetter, mapState
- 3. module的概念
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
命名空间:

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

- 4. action/mutation
mutation:
store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
```javascript
//对象风格的提交方式
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

# persistedstate

无论是vue的vuex，pinia 还是react的 redux, recoil的状态管理库，在web页面刷新后数据都会丢失，在某些情况下我们需要进行持久化处理，
有一种方式是手动调用api，localStorage/sessionStorage处理，但这种只适用一些简单的情况。 还有的就是使用persistedstate。




