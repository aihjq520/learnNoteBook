## 元编程

元编程是指编写可以操作或改变其他程序的程序。

元编程可以改变 JavaScript 的一些基本操作的行为。

Symbol：通过覆写内置的Symbol值等方法 更改js语言内部的基本操作。
Reflect：可以获取语言内部的基本操作。
Proxy：通过钩子函数 拦截&改变 js语言的基本操作。



## Proxy

Proxy代理就是通过Proxy对一个原始对象进行基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```javascript
const p = new Proxy(target, handler);
```

在上面代码片段中，Proxy可以接收两个参数target、handler：

**target**：表示要进行代理的原始对象（可以是任意类型对象，函数、数组等）
**handler**：通常以函数作为属性的对象，该对象是一组夹子（trap），各属性中的函数分别定义了在执行各种操作时代理 p 的行为

```javascript

const data = {
    name:"pingping",
    age:18
}

const state = new Proxy(data, {
    //拦截属性取值操作
    get(target, key){
        //在这里拦截打印数据
        console.log(`我的${key}是：${target[key]}`);
        return target[key];
    },
    //拦截属性设置操作
    set(target, key, value){
        //在这里拦截设置数据
        target[key] = value;
        console.log(`我的${key}数据更改为${target[key]}`);
        return value
    }
});

state.name;

state.name = "onechuan"

```

在上面代码中，我们只用到了get的前两个参数target和target，分别表示代理的原始对象、被获取的属性名。其实Proxy的get方法中还可以传入第三个参数receiver，表示Proxy代理之后的对象或继承Proxy的对象。

**target**：被代理的原始对象。
**property**：被获取的属性名。
**receiver**：Proxy代理后的对象或者继承Proxy的对象, 传递对象get调用者指向，即传递上下文对象。

我们进行个简单的实践：

```javascript
const data = {
    name:"pingping",
    age:18
}

const state = new Proxy(data, {
  get: function(target, property, receiver) {
    console.log(state === receiver);
    return target[property];
  }
});

state.name;
```

此时，看到控制台打印的结果是： **true**

```js
const data = {
  name:"pingping",
  age:18
}

const state = new Proxy(data, {
  get: function(target, property, receiver) {
    console.log(state === receiver);
    return target[property];
  }
});

const obj = {
  name:"onechuan"
}

//将obj对象原型设置为state对象，即obj继承state
Object.setPrototypeOf(obj, state);

obj.name;

```

控制台打印结果:

![](./9cc338f070684c15a8ff311183be8a8f~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.awebp)


## Reflect 反射

在了解了Proxy后，我们再来讨论下Proxy的好兄弟Reflect，它们是如何配合工作的。
Reflect是一个全局内置的对象，它提供拦截JavaScript操作的方法。但是，Reflect本身不是个函数对象，因此其不是一个构造函数，不能使用new进行调用。Reflect的所有属性和方法都是静态的。

```js
Reflect.get(target, propertyKey[, receiver])
```

**target**：需要取值的目标对象
**propertyKey**：需要获取的值的键值
**receiver**：如果target对象中指定了getter，receiver则为getter调用时的this值

```js

const state = new Proxy(data, {
  get: function(target, property, receiver) {
    console.log(this === receiver);//false
    console.log(state === receiver);//false
    console.log(obj === receiver);//true
    return Reflect.get(target, property);
    // 等价于return target[property];
  }
});


```


在这里，使用Reflect.get(target, property)是等价于return target[property]的，this在Proxy.get拦截器中将this的指向了原始数据data对象，这样obj.value打印结果自然也是pingping。
如果我们要获取obj对象自身的name属性，应该怎么办？


```js

const state = new Proxy(data, {
  get: function(target, property, receiver) {
    console.log(this === receiver);//false
    console.log(state === receiver);//false
    console.log(obj === receiver);//true
    return Reflect.get(target, property, receiver);
    // 等价于return target[property];
  }
});

```


我们将Proxy.get的第三个参数receiver传入Reflect.get中，此时我们发现打印结果就变成了onechuan。这是因为Proxy.get的第三个参数receiver，可以表示代理对象state还可以表示继承代理对象state的对象obj。而在Reflect.get中传入了Proxy.get的第三个参数receiver，即obj对象作为参数，此时Reflect.get会把this的指向改为obj。
Reflect.get(target, key, receiver)其实可以理解为target[key].call(receiver)，而Reflect.get的参数receiver作用：修改属性访问时this的指向receiver。

