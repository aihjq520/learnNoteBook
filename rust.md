# Rust

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
