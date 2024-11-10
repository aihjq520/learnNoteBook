var b = (resole, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resole(3);
  }, 3000);
};

new Promise(b).then((res) => console.log(res));


const throttle = (fn, delay)=>{
  let start = Date.now()
  return ()=>{
    let end = Date.now()
    if(end-start-delay>0) return
    fn.apply(this, arguments)
    start = end 
  }
}

const debounce = (fn, delay, immediate)=>{
  let timer = null
  return ()=>{
    if(timer){
      clearTimeout(timer)
      return
    }
    if(immediate) {
      if(timer) {
        timer = setTimeout(()=>{
          timer = null
        },delay)
      }
      else {
        fn.apply(context,arguments)
      }
    }
    const context = this
    const timer = setTimeout(()=>{
      fn.apply(context,arguments)
    }, delay)
  }
}