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
        this.fullFillList.shift()(val)
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
        })
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

        return thenPromise
    }

    all(PromiseArr: MyPromise[]){
        return new MyPromise((resolve,reject)=>{    
            let count = 0
            let arr = []
            for(let i=0;i<PromiseArr.length;i++){
                PromiseArr[i].then((res)=>{
                    arr[i] = res
                    if(++count===PromiseArr.length){
                        resolve(arr)
                    }
                })
            }
        })
    }

    race(PromiseArr: MyPromise[]){
        return new MyPromise((resolve, reject)=>{
            for(let i=0;i<PromiseArr.length;i++){
                PromiseArr[i].then((res)=>{
                    resolve(res)
                })
            }
        })
    }
}