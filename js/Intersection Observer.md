

**Intersection Observer API 的核心精神是 “当被观察者与观察范围重叠到某个百分比时，呼叫我的 callback function 做某件事”。**

可以用来自动监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"

所以重点有三个，“观察者”、“被观察者”、“要被呼叫的 callback”。

```

const observer = new IntersectionObserver(callback, option)

```

## callback参数
目标元素的可见性变化时，就会调用观察器的回调函数callback。

callback一般会触发两次。 一次是目标元素刚刚进入视口，另一次是完全离开视口。

## options 参数

threshold： 决定了什么时候触发回调函数。

root: 用于观察的元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素。


## IntersectionObserverEntry对象

call函数所接受的第一个参数，是一个数组中，里面每一项都是IntersectionObserverEntry对象

isIntersecting: 布尔值，目标元素与交集观察者的根节点是否相交

isVisible: 布尔值，目标元素是否可见

target： 被观察的目标元素，是一个dom节点对象

# 应用场景

## 惰性加载(lazy load)

### 一、惰性加载（lazy load）

我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做"惰性加载"。

有了 IntersectionObserver API，实现起来就很容易了。

```javascript

function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  function(changes) {
    changes.forEach(function(change) {
      var container = change.target;
      var content = container.querySelector('template').content;
      container.appendChild(content);
      observer.unobserve(container);
    });
  }
);

query('.lazy-loaded').forEach(function (item) {
  observer.observe(item);
});

```

# 
