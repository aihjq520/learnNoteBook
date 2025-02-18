### computed原理

调用 initState 函数会进行数据状态的初始化，在 Vue 中 props、methods、data、computed、watch 都可以被称为状态，所以被统一到 initState 函数中进行初始化。但是这里需要注意是先初始化 data，在初始化 computed，最后在初始化 watch

在initState的时候会有initComputed函数

```JS

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();
  // 遍历 computed 对象，为每一个属性进行依赖收集
  for (var key in computed) {
    // 1. 
    var userDef = computed[key];
    // 获取 get
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    
    if (!isSSR) {
      // 2. 
      watchers[key] = new Watcher(
        vm, // vm 实例
        getter || noop, // getter 求值函数或者是一个空函数
        noop, // 空函数 function noop(a, b, c) {}
        computedWatcherOptions // computedWatcherOptions 常量对象 { lazy: true };
      );
    }
    if (!(key in vm)) {
      // 3. 
      defineComputed(vm, key, userDef);
    } else {
      
      if (key in vm.$data) {
        warn(("The computed property "" + key + "" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property "" + key + "" is already defined as a prop."), vm);
      }
    }
  }
  }

```




defineComputed 时，根据 Object.defineProperty 前面的代码可以看到 sharedPropertyDefinition 的 get/set 方法在经过 userDef 和 shouldCache 等多重判断后被重写，当非服务端渲染时，sharedPropertyDefinition 的 get 函数也就是createComputedGetter(key) 的结果。

在 defineComputed 最后调用了原生的 Object.defineProperty 方法，并且在 Object.defineProperty(target, key, sharedPropertyDefinition); 传入属性描述符 sharedPropertyDefinition。 描述符初始化值为：

``` JS

function defineComputed (
  target,
   key,
   userDef
  ) {

    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
    : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
    } else {
    sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
    : createGetterInvoker(userDef.get)
    : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
        warn(
        ("Computed property "" + key + "" was assigned to but it has no setter."),
        this
        );
    };
    }
    //
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

```

我们找到 createComputedGetter 函数调用结果并最终改写 sharedPropertyDefinition 大致呈现如下：

```

sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  },
  set: userDef.set || noop
}

```