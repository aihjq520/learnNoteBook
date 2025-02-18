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

# Array sort方法

在JavaScript中，sort()方法用于对数组元素进行排序。默认情况下，它将元素作为字符串进行排序，并按字母升序排列。这意味着数字可能不会按照预期的数值大小顺序进行排序，因为它们被转换成了字符串

# ...args和arguments

## ...args 展开运算符

展开运算法在多个参数（函数调用）、多个元素（用于数组和字面量）和多个变量（用于解构赋值） 地方使用。剩余参数语法允许我们将一个不定数量的参数表示为一个数组

```JS

function sum(...args) {
  // 因为...args 将函数内的所有剩余实参（这里是所有实参），转换成一个数组
  // args --> [1, 2, 3]
  return args.reduce((previous, current) => {
    return previous + current;
  });
}

console.log(sum(1, 2, 3));
// expected output: 6

console.log(sum(1, 2, 3, 4));
// expected output: 10

```

如果函数的最后一个命名参数以 ... 为前缀，则它会将所有后面剩余的是实参个数包裹成一个数组。

```JS

// 例子

function test(a, b, ...args) {
  console.log(args)
}

test(1,2,3,4) // [3, 4]

```


## arguments对象

在函数代码中，使用特殊对象 arguments，开发者无需明确指出参数名，就能访问它们。arguments对象并不是一个数组，是一个类数组对象，在调用时请注意。

```JS

function test(a, b, c) {
  console.log(arguments) // Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ] 
  console.log(test.length) // 3
  console.log(arguments.callee.length) // 3
}

test(1,2,3,4)

```

## ...args剩余参数和 arguments对象的区别

剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
arguments对象还有一些附加的属性 （如callee属性）。


##  复杂对象排序（自定义排序）
假设我们有一个包含学生信息的数组，需要按成绩排序，如果成绩相同则按名字排序：
```js

const students = [

  { name: 'Alice', grade: 85 },


  { name: 'Bob', grade: 92 },


  { name: 'Charlie', grade: 85 },


  { name: 'David', grade: 90 }


];


students.sort((a, b) => {


  const gradeDiff = b.grade - a.grade; // 成绩从高到低排序


  if (gradeDiff !== 0) return gradeDiff;


  return a.name.localeCompare(b.name); // 成绩相同按名字排序


});


console.log(students);


// [{ name: 'Bob', grade: 92 }, { name: 'David', grade: 90 }, { name: 'Alice', grade: 85 }, { name: 'Charlie', grade: 85 }]

```

更多案例： https://docs.pingcode.com/baike/2500346

**注意：b的值是数组遍历到的当前值，a是数组遍历到的下一个值（即b的下一个）**

sort()方法没有参数时，按照ascii码进行排序
通过给sort()的参数返回一个负值可以实现数组reverse()效果
sort(next,prev) 参数返回 next - prev时，数组是升序，返回-(next - prev) 即prev - next时，数组是降序

##  最快获取二进制每一位的方法？


```JS
const a = 124
const hex = a.toString(2)
for(let i = 0; i < hex.length; i++) {
  let  offset = hex.length - i
  let t = (b >> offset) & 0b00000001
  console.log(t)
}
```

那如果我想取后四位呢？

一样的是做 & 操作， 如果要去取后四位 那么就是 (n & 0b1111)， 取高四位那么就要位运算右移动4四位（前提是不超过256）

## js把一个数字转成二进制

```js
parseInt('11', 2)
```

### 一个数子变成4位数字， 不够的补0

```js

const a = 1

a.toString().padEnd(4, '0')

// 0001

```


### 二维，一维数组转换

有M行N列的二维数组a[M][N]中，转换公式定义如下a[i*N+j] = a[i][j]，那三维数组a[M][N][P]换算为一维数组的关系公式是什么呢？
答：三维数组维展a[M][N][P],下标为a[m][n][p]，则一维表达式为a[ (m*N+n)*P+p]

理解：二维转一维时，第一个维度指向N个元素的数组首地址（i*N），第二个维度是自身（j）。
三维转一维时，第一个维度指向N*P个元素的二维数组的首地址（m*N*P），第二维度指向P个元素的数组首地址（n*P），第三个维度是自身（p）。

