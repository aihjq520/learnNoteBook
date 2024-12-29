## props的类型定义

### 运行时声明

```ts

<script setup lang="ts">
import type { IUser } from './types.ts'
import type { PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<IUser>,
    required: true
  }
})

props.data  // data: IUser
</script>


```

### 类型声明

```ts
<script setup lang="ts">
import type { IUser } from './types.ts'
const props = defineProps<{
  title?: string,
  size: 'mini' | 'default' | 'large',
  data: IUser
}>()

props.title // title?: string | undefine
props.size  // size: "default" | "mini" | "large"
props.data  // data: IUser
</script>

```

### props默认值

```ts
<script setup lang="ts">
import {withDefaults} from 'vue'
import type { IUser } from './types.ts'
const props = withDefaults(defineProps<{
  title?: string,
  size: 'mini' | 'default' | 'large',
  data: IUser
}>(), {
  title: '标题',
  size: 'default',
  data: () => {
    return {name: '细狗', age: 18}
  }
})
</script>

```


## emits类型的定义


### 运行时声明

```ts

const emit = defineEmits(['change', 'confirm'])

```


这种声明方式比较方便，但是无法给触发的事件参数定义类型。如有这个需求，我们可以通过对象字面量的方式解决这个问题。


```ts

const emit = defineEmits({
    change: (id: string)=>{
        if(id !== 1) return false
        return true
    }
})

```


### 基于类型声明


```TS

const emit = defineEmits<{
  // 无返回值
  (e: 'change', id: number, value: string): void
  (e: 'confirm', value: string): void
}>()

```


### 不关注返回值时

```ts

const emit = defineEmit<{
    change: [id: number, value: string],
    confirm: [id: number]
}>()

```

## 给computedf标记类型

```TS

const doubleAmount = computed<number>(() => amount.value * 2)

```


## 给provide / inject 标注类型


## 给组件ref引用标记类型

当我们在自定义组件上绑定一个ref值时，如果需要编辑器能够正确的提示组件内暴露的属性，则需要正确设置组件的ref类型，下面来看一个例子

```TS

<!-- Item.vue -->
<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const summit = () => {
  console.log('提交')
}
const reset = () => {
  console.log('重置')
}

// 向外暴露属性或方法
defineExpose({
  show,
  summit,
  reset
})
</script>

```


```ts

<!-- Parent.vue -->
<template>
  <Item ref="Item"></Item>
</template>

<script setup lang="ts">
import Item from "./Item.vue";
import { ref} from "vue";

const ItemRef = ref(null) // ItemRef: Ref<null>

```

上没有给ref传递泛型，所以使用ItemRef时将得不到任何提示，因为是一个null类型，如下图

![](./types1.awebp


为了得到Item的类型，我们首先需要通过TypeScript中的typeof得到Item组件的类型，再使用TypeScript内置的InstanceType工具类型来获取其实例类型：


```ts

<script setup lang="ts">

import Item from "./Item.vue";
import { ref} from "vue";


const itemRef = ref<InstanceType<typeof Item> | null>(null)

</script>

```

这样我们就能得到正确的类型提示了

![](./types2.awebp)