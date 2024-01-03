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