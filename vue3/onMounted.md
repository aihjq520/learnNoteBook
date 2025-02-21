## 原理

mount函数 主要运行了两个核心函数进 **createVNode**, **render**

```

  // packages/runtime-core/src/apiCreateApp.ts
   mount(rootContainer: HostElement, isHydrate?: boolean): any {
    // 判断下 isMounted 挂载状态
    if (!isMounted) {
      //TODO 挂载时  获取整棵树 的 vnode
      // createApp(base).mount('#app')
      // 虚拟 DOM 创建方法
      const vnode = createVNode(
        rootComponent as ConcreteComponent,
        rootProps
      )

      // 将初始化上下存储在 根节点的 appContext 属性上
      vnode.appContext = context

      if (isHydrate && hydrate) {
        hydrate(vnode as VNode<Node, Element>, rootContainer as any)
      } else {
        // TODO 渲染器传入的vnode 生成 node 挂载到根节点
        render(vnode, rootContainer)
      }
      // 修改标记已挂载
      isMounted = true
      // 绑定根节点元素
      app._container = rootContainer
      // for devtools and telemetry
      ;(rootContainer as any).__vue_app__ = app
      // 返回 Vue 的实例
      return vnode.component!.proxy
    }
  },



```


### createVNode (Todo)


### 组件初始化挂载阶段 render



https://juejin.cn/post/7000613932553486343#heading-4