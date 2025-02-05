# Iterator 迭代器 和 for...of

原理：
Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

```JS
var it = idMaker();

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...

function idMaker() {
  var index = 0;

  return {
    next: function() {
      return {value: index++, done: false};
    }
  };
}
```

在学习的es6的iterator时，接触到一个类数组比较好记住的概念：

对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。


# async await 
async 函数是什么？一句话，它就是 Generator 函数的语法糖。

async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

# splice
这个api比较全能，可以做到增，删，替换元素。

- 增

```javascript

/**
 * 第一个参数是增加的位置
 * 第二个参数增加的话，就是写0
 * 第三个参数就是增加的元素
 * 会返回空数组
 */
const arr = [0,2,3]
arr.splice(1, 0, 1)

// 原数组变为
[0,1,2,3]
```

- 删

```javascript
/**
 * 第一个参数是删除的位置
 * 第二个参数是要删除的长度
 * 会返回被删除的数组
 */
const arr = [0,1,2,3]
arr.splice(0,2)

// 原数组变为
[2,3]

```

- 替换

```javascript
/**
 * 第一个元素是替换的位置
 * 第二个元素替换元素的长度
 * 第三个是要替换的元素
 * 会返回被替换的数组
 */

const arr = [0,1,3,3]
arr.splice(2,1,2)

// 原数组变为

[0,1,2,3]
```

## 提示与注意事项

- 注意splice()方法会直接修改原数组。
- 如果deleteCount为0，则只进行插入操作。
- 可以同时插入多个元素，只需要在splice()中传递多个参数。
- splice()方法返回一个包含被删除元素的数组。

### weakmap 与 map的区别


```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    const map = new Map();
    const weakmap = new WeakMap();


    let foo = { foo: 1 };
    let bar = { bar: 2 };

    map.set(foo, 1);
    weakmap.set(bar, 2);

    bar = null


    console.log(map);
    console.log(weakmap);
  </script>
</body>
</html>

```

Map 相对于 WeakMap ：

<ul>
<li>
Map 的键可以是任意类型，WeakMap 只接受对象作为键（null除外），不接受其他类型的值作为键
</li>
<li>
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； WeakMap 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
</li>
<li>
Map 可以被遍历， WeakMap 不能被遍历
</li>
</ul>


当该函数表达式执行完毕后，对于对象 foo 来说，它仍然作为 map的 key 被引用着，因此垃圾回收器（grabage collector）不会把它从内存中移除，我们仍然可以通过 map.keys 打印出对象 foo。然而对于对象 bar来说，由于WeakMap的 key是弱引用，它不影响垃圾回收器的工作，所以一旦表达式执行完毕，垃圾回收器就会把对象 bar从内存中移除，并且我们无法获取 WeakMap的 key值，也就无法通过 WeakMap取得对象 bar。


简单地说，WeakMap对 key是弱引用，不影响垃圾回收器的工作。据这个特性可知，一旦key被垃圾回收器回收，那么对应的键和值就访问不到了。所以 WeakMap经常用于存储那些只有当 key所引用的对象存在时（没有被回收）才有价值的信息，例如上面的场景中，如果 target 对象没有任何引用了，说明用户侧不再需要它了，这时垃圾回收器会完成回收任务。但如果使用 Map来代替 WeakMap，那么即使用户侧的代码对 target没有任何引用，这个 target 也不会被回收，最终可能导致内存溢出。
我们看下打印的结果，会有一个更加直观的感受，可以看到 WeakMap里面已经为空了。


总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
