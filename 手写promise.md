```javascript
let p1 = new Promise((resolve, reject) => {
    resolve('成功')
    reject('失败')
})
console.log('p1', p1)

let p2 = new Promise((resolve, reject) => {
    reject('失败')
    resolve('成功')
})
console.log('p2', p2)

let p3 = new Promise((resolve, reject) => {
    throw('报错')
})
console.log('p3', p3)


class MyPromise{
    constructor(executor){
        this.initValue()
        this.initBind()
        try{
            executor(this.resovle, this.reject)
        }catch(e){
            this.reject(e)
        }
    }

    initValue(){
        this.status = 'pending'
        this.result = ''
        this.fullFilledList = []
        this.rejectedList = []
    }

    initBind(){
        this.resolve = this.resolve.bind(this)
    }

    resolve(val){
        if(this.status!=='pending')return
        this.status = 'success'
        this.fullFillList.shift()(this.result)
        this.result = val 
    }

    reject(val){
        if(this.status!=='pending')return
        this.status = 'reject'
        this.rejectedList.shift()(this.result)
        this.result = val
    }

    then(onFullFilled, onRejcted){
        var thenPromise = MyPromise((resolve,reject)=>{
                const resolvePromise = cb => {
                    try{
                        const x = cb(this.PromiseResult)
                        if(x===thenPromise) throw Error('不能返回自身')
                    }
                    if(x instanceof MyPromise){
                        x.then(resove, reject)
                    }else{
                        resolve(x)
                    }
                } catch(err){
                    reject(err)
                }
            
                if(this.staus==='pending'){
                    this.fullFilledList.push(onFullFilled)
                    this.rejctedList.push(onRejcted)
                    return 
                }
                if(this.status==='success'){
                    resolvePromise(onFullFilled)
                    return
                }
                resolvePromise(onRejectd)
            })
        return MyPromise
    }

    static all(promiseArray: []){
        let promiseResult = []
        let count = 0
        return new MyPromise((resolve, reject)=>{
                const addData = (index,value)=>{
                    result[index] = value
                    if(count===promiseArray.length)resolve(promiseResult)
                }
                promiseArray.forEach((promise, index)=>{         
                    if (promise instanceof MyPromise) {
                            promise.then(res => {
                                addData(index, res)
                            }, err => reject(err))
                        } else {
                            addData(index, promise)
                    }
                })
        })
    }
    done() {
        
    }
}
```



# 问题：

1. 如何获取多个promiseh获取结果？ 其中有一个promise报错怎么处理？

可以用promise.all，坏处是其中有一个报错的话那么其他成功的promise结果就不会返回，解决方案可以换成promise.alllSettled。
另外也可以对promose数组里面的一promise.catch处理，使其报错不影响返回。

class Promise {
    status = 'pending'
    value = ''
    successCallback = []
    failCallback = []

    constrcutor(exectuor) {
        try {
        exectuor(this.resolve.bind(this), this.reject.bind(this))
        } catch(e) {
            this.reject(e)
        }
    }

    then(success, fail) {

        
        if (typeof success != 'function') {
    
            success = value => value
        }
​
        if (typeof fail != 'function') {
            fail = reason => reason
        }

        if(this.status === 'fulfilled') {
            setTimeout(()=>{
                success(this.value)
            })
        }

        if(this.status === 'rejected') {
            setTimeout(()=>{
                fail(this.value)
            })
        }

        if(this.status === 'pending') {
            this.successCallback.push(success)
            this.failCallback.push(fail)
        }

        const promise = new MyPromise((resolv,reject)=>{

        })




        try {

        } cath (e) {

        }


        return promise
    }

    resolve(value) {
        if(this.staus === 'pending') {
            this.value = value
            this.status = 'fulfiled'
            this.successCallback.forEach(item=>item(value))
        }
    }

    reject() {
        if(this.staus === 'pending') {
            this.value = value
            this.status = 'rejected'
            this.failCallback.forEach(item=>item(value))
        }
    }
}