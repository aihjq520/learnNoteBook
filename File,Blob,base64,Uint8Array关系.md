## File 类型
File 包含文件的相关信息，可以通过 js 来访问其内容

### 如何获取 file 对象？
1. new File(bits, name[, options])
```javascript
// 1. 参数是字符串组成的数组
let hiFile = new File([`<h1>Hi gauseen!<h1>`], 'fileName', { type: 'text/html' })

// 2. blob 转 file 类型
let hiBlob = new Blob([`<h1>Hi gauseen!<h1>`], { type: 'text/html' })
let hiFile = new File([ hiBlob ], 'fileName', { type: 'text/html' })
```
2. inputElement.files
```javascript
// input 上传文件时触发 change 事件
$('input').addEventListener('change', e => {
  let file = e.target.files[0]
  console.log('file: ', file)
})
```


## DataURL（base64）
DataURL，前缀为 data: 协议的 URL，可以存储一些小型数据

语法：data:[<mediatype>][;base64],<data>

如下，黑色 1 像素示例：
```javascript
data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=
```
上面提到的 Blob File 类型，如何“消费”它们呢？接着向下看

1. FileReader
```javascript
// 将 blob 或 file 转成 DataURL（base64） 形式
fileReader(someFile).then(base64 => {
  console.log('base64: ', base64)
})

function fileReader (blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.readAsDataURL(blob)
  })
}
```