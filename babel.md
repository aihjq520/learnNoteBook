### 是什么
babel是一个源码转换工具，目标是把ECMAScript 2015+的js代码转换成可以被当前浏览器识别的js代码

babel 的编译流程

- parse：通过 parser 把js源码转成抽象语法树（AST）
- type: 用于创建、操作和检查抽象语法树（AST）节点
- transform：遍历 AST，提供各种钩子hook, 调用各种 transform 插件对 AST 进行增删改
- generate：把转换后的 AST 打印成目标代码，并生成 sourcemap


#### parse

```js

function add(a, b) {
  console.log('add');
  return a + b;
}

```

转换成

```json

{
  "type": "Program",
  "start": 0,
  "end": 59,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 59,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "add"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 13,
          "end": 14,
          "name": "a"
        },
        {
          "type": "Identifier",
          "start": 15,
          "end": 16,
          "name": "b"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 18,
        "end": 59,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 22,
            "end": 41,
            "expression": {
              "type": "CallExpression",
              "start": 22,
              "end": 40,
              "callee": {
                "type": "MemberExpression",
                "start": 22,
                "end": 33,
                "object": {
                  "type": "Identifier",
                  "start": 22,
                  "end": 29,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 30,
                  "end": 33,
                  "name": "log"
                },
                "computed": false,
                "optional": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 34,
                  "end": 39,
                  "value": "add",
                  "raw": "\"add\""
                }
              ],
              "optional": false
            }
          },
          {
            "type": "ReturnStatement",
            "start": 44,
            "end": 57,
            "argument": {
              "type": "BinaryExpression",
              "start": 51,
              "end": 56,
              "left": {
                "type": "Identifier",
                "start": 51,
                "end": 52,
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "Identifier",
                "start": 55,
                "end": 56,
                "name": "b"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}

```


这里边有很多的属性：

- type：AST 节点的类型，后续在 @babel/types 部分会说明节点的判断与生成；
- "start" 和 "end"：是用于表示源代码中节点位置的属性。这些属性记录了节点在源代码中的起始位置（开始位置）和结束位置（结束位置），以字符索引的形式表示；
  - 这里的位置，会计算换行与空格，都被作为一个字符计算了位置；
- "id" 通常表示标识符（Identifier），它代表了代码中的变量名、函数名或其他标识符名称。标识符节点包含了标识符的名称以及有关该标识符的其他信息；
- "argument" 是一个常见的属性，通常用于表示函数调用（Call Expression）或其他操作的参数。参数是传递给函数、方法或操作的值或表达式；


#### types

@babel/types 是 Babel 工具链中的一个核心模块，用于创建、操作和检查抽象语法树（AST）节点


### types 的能力

<ol>
<li>创建节点（Node Creation），生成一些基本的类型：
<ol>
<li>t.identifier("c")，声明一个变量 c；</li>
<li>t.stringLiteral("hahaha")，生成一个直接量字符串"hahaha"；</li>
<li>types.numericLiteral(10)，直接量数值 10；</li>
</ol>
</li>

<li>节点检查和比较（Node Checking and Comparison）：
<ol>
<li>使用 t.isIdentifier(node) 来检查节点是否为标识符；</li>
<li>使用 t.isFunctionDeclaration(node) 来检查节点是否为函数声明；</li>
<li>t.isArrayExpression 方法，用于检查给定的 AST 节点是否为数组表达式（Array Expression）。数组表达式通常表示 JavaScript 中的数组字面量；</li>
</ol>
</li>

<li>节点操作和修改（Node Manipulation and Modification）
<ol>
<li>你可以使用 t.cloneNode(node) 复制节点；</li>
<li>使用 t.removeComments(node) 删除注释；</li>
<li>使用 t.isAssignmentExpression(node) 检查是否为赋值表达式等。</li>
</ol>
</li>

</ol>


```javascript
const t = require('@babel/types');

// 函数节点
const identifier = t.identifier('myVariable');
const stringLiteral = t.stringLiteral('Hello, world!');
const functionDeclaration = t.functionDeclaration(
  t.identifier('myFunction'),
  [],
  t.blockStatement([]),
);

// 检测变量的声明类型

// 创建一个 let 变量声明节点
const letVariableDeclaration = t.variableDeclaration('let', [
  t.variableDeclarator(t.identifier('myVariable'), null),
]);

// 类型检查
const node = t.identifier('myVariable');
console.log(t.isIdentifier(node)); // true
console.log(t.isFunctionDeclaration(node)); // false

// 节点update
const node2 = t.identifier('myVariable');
const clonedNode = t.cloneNode(node2);
const modifiedNode = t.updateIdentifier(node2, 'newVariableName');

// 检查节点是否为 VariableDeclaration
if (t.isVariableDeclaration(letVariableDeclaration)) {
  // 进一步检查是否为 let 变量声明
  if (letVariableDeclaration.kind === 'let') {
    console.log('This is a let variable declaration.');
  } else {
    console.log('This is not a let variable declaration.');
  }
} else {
  console.log('This is not a variable declaration.');
}

// t.isArrayExpression
// 创建一个数组表达式节点
const arrayExpression = t.arrayExpression([
  t.stringLiteral('item1'),
  t.stringLiteral('item2'),
  t.stringLiteral('item3'),
]);

// 检查节点是否为数组表达式
if (t.isArrayExpression(arrayExpression)) {
  console.log('This is an array expression.');
} else {
  console.log('This is not an array expression.');
}

// t.react.isCompatTag
const tagName = 'div';

if (t.react.isCompatTag(tagName)) {
  console.log(`${tagName} is a valid React tag.`);
} else {
  console.log(`${tagName} is not a valid React tag.`);
}


```





#### traverse

可以对 ast 数据进行遍历和修改。参照 ast 的 json 结构进行遍历修改，类似 dom 树的修改，增删改查操作都很方便。


#### generate





### 核心库 @babel/core

@babel/core是babel最核心的一个编译库，他可以将我们的代码进行词法分析--语法分析--语义分析过程从而生成AST抽象语法树，从而对于“这棵树”的操作之后再通过编译成为新的代码。


因为 Babel 虽然开箱即用，但是什么动作也不做，如果想要 Babel 做一些实际的工作，就需要为其添加插件(plugin)或者预设(preset)。预设就是一系列插件的集合，因为有很多插件不可能一个个去装。


#### 使用预设进行编译
简单理解，预设就是一组插件，相当于你只要安装了我这么一个预设，就能享受到我这个预设里面所有的插件。
官方 Preset 有如下几个

@babel/preset-env，将高版本js编译成低版本js
@babel/preset-flow，对使用了flow的js代码编译成js文件
@babel/preset-react，编译react的jsx文件
@babel/preset-typescript，将ts文件编译成js文件

```javascript

// babel.config.json

{
  "presets": ["@babel/preset-env"]
}

```

插件和预设的执行顺序

插件在预设前运行。

插件顺序从前往后排列。

预设顺序是从后往前（颠倒的）


### babale的配置文件

babel的配置文件支持很多种格式

- babel.config.json

- babel.config.js

- babelrc.json

- babelrc.js

- babelrc


### @babel/polyfill

转换新的api

比如说我们需要支持String.prototype.include，在引入babelPolyfill这个包之后，它会在全局String的原型对象上添加include方法从而支持我们的Js Api

很多时候，我们未必需要完整的 @babel/polyfill，这会导致我们最终构建出的包的体积增大，@babel/polyfill的包大小为99K。我们更期望的是，如果我使用了某个新特性，再引入对应的 polyfill，避免引入无用的代码。


### 配置@babel/preset-env实现按需引入

### entry

当传入entry时，需要我们在项目入口文件中手动引入一次core-js，它会根据我们配置的浏览器兼容性列表(browserList)然后全量引入不兼容的polyfill。
如果是Babel7.4.0之前，我们需要在入门文件引入@babel/polyfill

```javascript

// core-js3.0版本中变化成为了下面两个包
import "core-js/stable";
import "regenerator-runtime/runtime";

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
const result1 = arr1.includes(8);

console.log(result1);

```

### usage

上边我们说到配置为entry时，perset-env会基于我们的浏览器兼容列表进行全量引入polyfill。所谓的全量引入比如说我们代码中仅仅使用了Array.from这个方法。但是polyfill并不仅仅会引入Array.from，同时也会引入Promise、Array.prototype.include等其他并未使用到的方法。这就会造成包中引入的体积太大了。
此时就引入出了我们的useBuintIns:usage配置。

我们配置useBuintIns:usage时，会根据配置的浏览器兼容，以及代码中 使用到的Api 进行引入polyfill按需添加。

当使用usage时，我们不需要额外在项目入口中引入polyfill了，它会根据我们项目中使用到的进行按需引入。


```javascript

// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "3"
      }
    ]
  ]
}

```


### 配置@babel/runtime和@babel/plugin-transform-runtime实现按需引入

#### @babel/runtime

简单来讲，@babel/runtime更像是一种按需加载的解决方案，但是babel-runtime会将引入方式由智能完全交由我们自己，我们需要什么自己引入什么。比如哪里需要使用到Promise，就需要手动在文件顶部添加import promise from 'babel-runtime/core-js/promise'。
它的用法很简单，只要我们去安装npm install --save @babel/runtime后，在需要使用对应的polyfill的地方去单独引入就可以了。比如：

```javascript
// 如果需要使用Promise 我们需要手动引入对应的运行时polyfill
import Promise from 'babel-runtime/core-js/promise'

const promsies = new Promise()
```
到这里能看出来@babel/runtime的问题了吧，虽然能实现按需引入，但是全部得手动处理，这谁顶得住。

#### @babel/plugin-transform-runtime
所以就有了@babel/plugin-transform-runtime插件，这个插件能帮助我们自动按需引入，而不再手动了，是不是很爽，我们来使用下。
首先安装

```javascript 
npm i @babel/plugin-transform-runtime -D 
```

因为@babel/plugin-transform-runtime会使用到@babel/runtime所以请确保系统中也安装了@babel/runtime。
然后配置，在这里我们没有配置@babel/preset-env的useBuiltIns参数而是配置的@babel/plugin-transform-runtime插件
```javascript
// babel.config.json
{
  "presets": ["@babel/preset-env"],
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": "3" }]]
}
```

### 对比总结
我们知道，@babel/polyfill、@babel/preset-env 和 @babel/runtime、@babel/plugin-transform-runtime 都是用来引入polyfill的。那到底该怎么选择呢？

@babel/polyfill不用多说了，肯定不是首选，因为它全局引入，并且还会**污染环境**。

@babel/preset-env方案其实就是按需引入@babel/polyfill，所以它不会全局引入，但是它直接引入的polyfill会污染全局环境。

@babel/runtime和@babel/plugin-transform-runtime插件
优势就是

- 抽离重复注入的 helper 代码，减少构建后包的体积。
- 每次引入 polyfill 都会定义别名，所以不会污染全局。

缺点就是

- 由于每次引入 polyfill 都会定义别名，所以会导致多个文件出现重复代码。

好了说了这么多，那到底该怎么选择
写类库的时候用runtime，系统项目还是用polyfill。写库使用 runtime 最安全，如果我们使用了 includes，但是我们的依赖库 B 也定义了这个函数，这时我们全局引入 polyfill 就会出问题：覆盖掉了依赖库 B 的 includes。如果用 runtime 就安全了，会默认创建一个沙盒,这种情况 Promise 尤其明显，很多库会依赖于 bluebird 或者其他的 Promise 实现,一般写库的时候不应该提供任何的 polyfill 方案，而是在使用手册中说明用到了哪些新特性，让使用者自己去 polyfill。
话说的已经很明白了，该用哪种形式是看项目类型了，不过通常对于一般业务项目来说，还是plugin-transform-runtime处理工具函数，babel-polyfill处理兼容。也就是说使用@babel/preset-env配置usage来按需引入polyfill，并配置plugin-transform-runtime来抽取公共方法减少代码整体体积。
