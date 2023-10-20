# Rust

# 内存与拥有权

## 拥有权

Rust 没有垃圾回收。Rust 的内存管理基于以下两个原则：

原则1：堆上的数据，都被**唯一**一个栈上变量所拥有，受其控制

原则2：当栈上的变量（所有者）离开作用域，释放它拥有的堆上数据

所有权转移发生在变量的赋值传递中。其实在 Rust 中，任何使用值的场景，都可能伴随着所有权的转移。

### 函数的入参数和返回

```rust

fn logData(data: Vec<i32>)  {
    println!("打印成功：{:?}",data);
}

fn main() {
    let v = vec![1,2,3]; // 动态数组的所有权属于 v

    logData(v); // 所有权转移给函数的参数data，v 当场死亡
    //---------- logData 运行结束，data 内存释放，动态数组失效
    
    println!("{:?}",v); // error！访问了一个无效的引用
}

```

在实际编码过程中，我们其实会这样写：


```rust

fn logData(data: &Vec<i32>) {
    println!("打印成功：{:?}",data);
}

fn main() {
    let v = vec![1,2,3];
    logData(&v);
    println!("{:?}",v);
}

```

参数 data 的类型是 &Vec<i32>，调用入参时，传入的是 &v。这个神奇的符号 &，叫做借用（引用）：变量 v 拥有的值，借过来给用用，所有权不用转移（Move）给我。借用（Borrowing）是基于所有权（Ownership）衍生出的另一机制。


### 循环


### 初始化集合数据



### 集合数据索引取值


## 1. &str 和 String
str 是 Rust 核心语言类型，就是字符串切片（String Slice），常常以引用的形式出现（&str）。
凡是用双引号包括的字符串常量整体的类型性质都是 &str：
```rust
let s = "hello";
```
这里的 s 就是一个 &str 类型的变量。

String 类型是 Rust 标准公共库提供的一种数据类型，它的功能更完善——它支持字符串的追加、清空等实用的操作。String 和 str 除了同样拥有一个字符开始位置属性和一个字符串长度属性以外还有一个容量（capacity）属性。

String 和 str 都支持切片，切片的结果是 &str 类型的数据。

注意：切片结果必须是引用类型，但开发者必须自己明示这一点

## 2.结构体
##### 2.1结构体定义
这是一个结构体定义：
```rust
struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32
}
```
 Rust 里 struct 语句仅用来定义，不能声明实例，结尾不需要 ; 符号，而且每个字段定义之后用 , 分隔。
 #### 2.2结构体实例
 ```rust
 let runoob = Site {
    domain: String::from("www.runoob.com"),
    name: String::from("RUNOOB"),
    nation: String::from("China"),
    found: 2013
};
 ```
 
#### 2.3结构体方法
结构体方法的第一个参数必须是 &self，不需声明类型，因为 self 不是一种风格而是关键字。
```rust
struct Rectangle {
    width: u32,
    height: u32,
}
   
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("rect1's area is {}", rect1.area());
}
```
请注意，在调用结构体方法的时候不需要填写 self ，这是出于对使用方便性的考虑。

#### 2.4结构体关联函数
之所以"结构体方法"不叫"结构体函数"是因为"函数"这个名字留给了这种函数：它在 impl 块中却没有 &self 参数。
这种函数不依赖实例，但是使用它需要声明是在哪个 impl 块中的。
一直使用的 String::from 函数就是一个"关联函数"。
```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn create(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect = Rectangle::create(30, 50);
    println!("{:?}", rect);
}
```
## 3. 枚举类
```rust
#[derive(Debug)]

enum Book {
    Papery, Electronic
}

fn main() {
    let book = Book::Papery;
    println!("{:?}", book);
}
```
输出结果 Papery
如果你现在正在开发一个图书管理系统，你需要描述两种书的不同属性（纸质书有索书号，电子书只有 URL），你可以为枚举类成员添加元组属性描述：
```rust
enum Book {
    Papery(u32),
    Electronic(String),
}

let book = Book::Papery(1001);
let ebook = Book::Electronic(String::from("url://..."));
```

## Trait 特征
一个类型的行为由其可供调用的方法构成。如果可以对不同类型调用相同的方法的话，这些类型就可以共享相同的行为了。trait 定义是一种将方法签名组合起来的方法，目的是定义一个实现某些目的所必需的行为的集合。

## #[derive()]

用于自动为结构体或枚举实现特性的traits。 traits定义了类型可以实现的行为，使用derive属性可以让编译器为我们生成实现代码。

一些常见的traits包括：

- Debug: 打印结构体的调试信息
- Clone: 创建结构体的克隆副本
- PartiaEq和Eq, 进行结构体相对性的比较，分为部分性和完全性
- PartilOrd和Ord, 进行结构体有序性比较，分为部分性和完全性