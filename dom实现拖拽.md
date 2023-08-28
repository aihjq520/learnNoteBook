# draggable 属性和事件

**draggable** 属性是 HTML5 新增的可拖拽属性。

在 HTML 中，除了图像、链接和选择的文本默认可拖拽外，其他元素默认是不可拖拽的。如果想让其他元素变成可拖拽的，首先需要把 draggable 属性设置为 true。

```javascript

<p draggable="true"> 可拖拽</p>

```

设置完成之后，还需要结合一些事件才能完成拖拽：

- 拖拽元素的事件

| 事件 | 触发时机 |
| --- | --- |
| dragstart | 开始拖拽时执行 1 次 |
| drag | 拖拽开始后多次触发 |
| dragend | 拖动结束后触发 1 次 |

- 可释放目标的事件

| 事件 | 触发时机
| --- | --- |
dragenter |	拖拽元素进入可释放目标时执行 1 次
dragover | 拖拽元素进入可释放目标时触发多次（100毫秒触发一次）
drop | 拖拽元素进入可释放目标内释放时(设置了dragover此事件才会生效)


## 可放置目标
dragenter 或 dragover事件可用于表示有效的放置目标，也就是被拖拽元素可能放置的地方。

设置允许被被放置还需要阻止 dragenter 和 dragover 事件的默认处理。

```javascript

<div id="div"
  ondragover="dragover(event)"
  ondragenter="dragenter(event)""
 >
    我是可放置目标
</div>

<p id="drag" 
  draggable="true" 
  ondragstart="dragstart(event)"
  ondragend="dragend(event)" 
>
    我是拖拽元素，把我拖拽到上面去
</p>

```


# vuedraggable 



