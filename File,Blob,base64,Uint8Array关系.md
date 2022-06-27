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

## BlobURL(ObjectURL)
```javascript
let blobURL = URL.createObjectURL(object)
```



## 应用举例
### 文件下载
通过 a 标签实现下载，blob 或 file 对象。至于如何获取 blob 和 file 上面已经说得很清楚了。

```javascript
function downloadFile1 (blob, fileName = 'fileName') {
  let blobURL = URL.createObjectURL(blob)
  let link = document.createElement('a')
  link.download = fileName
  link.href = blobURL
  link.click()
  // 释放 blobURL
  URL.revokeObjectURL(blobURL)
}

// 当然也可以通过 window.location.href 下载文件
function downloadFile2 (blob, fileName = 'fileName') {
  let blobURL = URL.createObjectURL(blob)
  window.location.href = blobURL
  // 释放 blobURL
  URL.revokeObjectURL(blobURL)
}

```

### 压缩图片

```javascript
compressImage('to/path/someImg.png', 0.6).then(base64 => {
  console.log('compressImage: ', base64)
})

// imgUrl 图片地址
// quality 图片质量 0 ~ 1 之间
// type 压缩图片只支持，image/jpeg 或 image/webp 类型
// 返回 base64 数据
async function compressImage (imgUrl, quality = 1, type = 'image/jpeg') {
  let imgEle = await fetchImg(imgUrl)
  let canvas = document.createElement('canvas')
  let cxt = canvas.getContext('2d')
  // 设置 canvas 宽高
  let { width, height } = imgEle
  canvas.setAttribute('width', width || 100)
  canvas.setAttribute('height', height || 100)

  cxt.drawImage(imgEle, 0, 0)
  return canvas.toDataURL(type, quality)
}

// 通过 url 获取图片
function fetchImg (url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      resolve(img)
    }
  })
}
```
