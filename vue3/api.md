# defineComponent

在定义 Vue 组件时提供类型推导的辅助函数。即： 让传入的整个对象获得对应的类型，**在TypeScript下，给予了组件 正确的参数类型推断。**

```javascript
// 选项语法
function defineComponent(
  component: ComponentOptions
): ComponentConstructor

// 函数语法 (需要 3.3+)
function defineComponent(
  setup: ComponentOptions['setup'],
  extraOptions?: ComponentOptions
): () => any
```

详细信息

第一个参数是一个组件选项对象。返回值将是该选项对象本身，因为该函数实际上在运行时没有任何操作，仅用于提供类型推导。

注意返回值的类型有一点特别：它会是一个构造函数类型，它的实例类型是根据选项推断出的组件实例类型。这是为了能让该返回值在 TSX 中用作标签时提供类型推导支持。

你可以像这样从 defineComponent() 的返回类型中提取出一个组件的实例类型 (与其选项中的 this 的类型等价)：

# setup

在vue3中没有this对象, 所有的逻辑代码都写在setup方法里面, 若是要在HTML模板页面中使用变量或者方法, 需要在setup方法return出去。
也可以这么写

```JS
<script setup>
const a = ref('1')
const handleChange = ()=>{
  console.log(a.value)
}
</srcipt>
```

不用写return, template中就能写任何在script中定义好的变量和函数。

