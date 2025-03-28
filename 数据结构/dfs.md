dfs 主要分为两类， 一类是树的dfs， 还有一类是图的dfs。

## 图的dfs

### 1.网格问题

网格问题是这样一类搜索问题：有 m×n 个小方格，组成一个网格，每个小方格与其上下左右四个方格认为是相邻的，要在这样的网格上进行某种搜索。这种题目乍一看可能有点麻烦，实际上非常简单，尤其是用 DFS 的方法。题目没有限制的话，我们尽量用 DFS 来写代码。

首先，每个方格与其上下左右的四个方格相邻，则 DFS 每次要分出四个岔：

```JS
// 基本的 DFS 框架：每次搜索四个相邻方格
const dfs = (grid, r, c) {
    dfs(grid, r - 1, c); // 上边相邻
    dfs(grid, r + 1, c); // 下边相邻
    dfs(grid, r, c - 1); // 左边相邻
    dfs(grid, r, c + 1); // 右边相邻
}
```
但是，对于网格边缘的方格，上下左右并不都有邻居。一种做法是在递归调用之前判断方格的位置，例如位于左边缘，则不访问其左邻居。但这样一个一个判断写起来比较麻烦，我们可以用“先污染后治理”的方法，先做递归调用，再在每个 DFS 函数的开头判断坐标是否合法，不合法的直接返回。同样地，我们还需要判断该方格是否有岛屿（值是否为 1），否则也需要返回。

但是这样还有一个问题：DFS 可能会不停地“兜圈子”，永远停不下来，那么我们需要标记遍历过的方格，保证方格不进行重复遍历。


网格 DFS 遍历的框架代码：

```javascript

// 处理方格位于网格边缘的情况
void dfs(int[][] grid, int r, int c, visited) {
    // 若坐标不合法，直接返回
    if (!(0 <= r && r < grid.length && 0 <= c && c < grid[0].length)) {
        return;
    }

    if(visited[x][y]){
        return;
    }
    
    visited[r][c] = 1;

    // 若该方格不是岛屿，直接返回 （不满足条件直接返回）
    if (grid[r][c] != 1) {
        return;
    }
    dfs(grid, r - 1, c);
    dfs(grid, r + 1, c);
    dfs(grid, r, c - 1);
    dfs(grid, r, c + 1);
}

```

### 2.岛屿问题



https://lfool.github.io/LFool-Notes/algorithm/%E7%A7%92%E6%9D%80%E6%89%80%E6%9C%89%E5%B2%9B%E5%B1%BF%E9%A2%98%E7%9B%AE(DFS).html


### leetcode hot100

https://blog.csdn.net/qq_41784433/article/details/121090488