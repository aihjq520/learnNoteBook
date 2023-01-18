### 背景
最近在做表格相关的需求，想到如何手写一个table组件，发现这一块还比较薄弱，所以打算记录一下学习过程。

## 表格的组成

### 一般分为：
```html
<table>
    <colgroup>
        <col></col>
        <thead>
            <tr>
                <th></th>
            </tr>
        <thead>
    <colgroup>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>

</table>
```

### colgroup 与 col

COLGROUP 元素指定表格中一列或一组列的默认属性。

COL 指定基于列的表格默认属性

例如
```html

<colgroup>
<col width="70"> </col>

</colgroup>

```
**只有width和background生效**

### thead 与 th
- table的 border-collapse: collapse;会使边框合并。所以对th与td都设置border属性不会发生重叠

- rowspan colspan、rowspan。这两个属性接受大于等于 2 的正整数。如果一个 td 的 colspan 是 2，它仍是一个格子，但是会占水平两个格子的位置，rowspan 类似，占垂直两个格子的位置。




## 参考链接
https://ssshooter.com/2021-03-23-complete-guide-table-element/

https://github.com/missaryboy9/treetable