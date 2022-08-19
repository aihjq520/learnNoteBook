##  useMemo && useCallback

默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染
一般的优化：

函数组件：使用 React.memo ，将函数组件传递给 memo 之后，就会返回一个新的组件，新组件的功能：如果接受到的属性不变，则不重新渲染函数；

但是怎么保证属性不会变？每次更新都是独立的，也就是说每次都会生成一个新的值（哪怕这个值没有变化），即使使用了 React.memo ，也还是会重新渲染

```javascript

import React,{useState,memo,useMemo,useCallback} from 'react';

function SubCounter({onClick,data}){
    console.log('SubCounter render');
    return (
        <button onClick={onClick}>{data.number}</button>
    )
}
SubCounter = memo(SubCounter);
export  default  function Counter6(){
    console.log('Counter render');
    const [name,setName]= useState('计数器');
    const [number,setNumber] = useState(0);
    const data ={number};
    const addClick = ()=>{
        setNumber(number+1);
    };
    return (
        <>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <SubCounter data={data} onClick={addClick}/>
        </>
    )
}

```

#### 更深入的优化：

```javascript
import React,{useState,memo,useMemo,useCallback} from 'react';

function SubCounter({onClick,data}){
    console.log('SubCounter render');
    return (
        <button onClick={onClick}>{data.number}</button>
    )
}
SubCounter = memo(SubCounter);

let oldData,oldAddClick;
export  default  function Counter2(){
    console.log('Counter render');
    const [name,setName]= useState('计数器');
    const [number,setNumber] = useState(0);
    // 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
    // 所以子组件也会随之更新，这时候可以用到 useMemo
    // 有没有后面的依赖项数组很重要，否则还是会重新渲染
    // 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
    //const data = useMemo(()=>({number}),[]);
    const data = useMemo(()=>({number}),[number]);
    console.log('data===oldData ',data===oldData);
    oldData = data;
    
    // 有没有后面的依赖项数组很重要，否则还是会重新渲染
    const addClick = useCallback(()=>{
        setNumber(number+1);
    },[number]);
    console.log('addClick===oldAddClick ',addClick===oldAddClick);
    oldAddClick=addClick;
    return (
        <>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <SubCounter data={data} onClick={addClick}/>
        </>
    )
}

```

## useContext

- 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
- 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值
- useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context

## useLayoutEffect

```javascript
function LayoutEffect() {
    const [color, setColor] = useState('red');
    useLayoutEffect(() => {
        alert(color);
    });
    useEffect(() => {
        console.log('color', color);
    });
    return (
        <>
            <div id="myDiv" style={{ background: color }}>颜色</div>
            <button onClick={() => setColor('red')}>红</button>
            <button onClick={() => setColor('yellow')}>黄</button>
            <button onClick={() => setColor('blue')}>蓝</button>
        </>
    );
}
```


## useRef & useImperativeHandle

###  useRef

- useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数（initialValue）
- useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个（使用 React.createRef ，每次重新渲染组件都会重新创建 ref）

#### 获取上一个值, 这在实际场景中并不少, 我们尝试把它封装成自定义 hook 
```javascript

usePrevious = (state)=>{
   const pre =  useRef()
   useEffect(()=>{
       pre.current = state
   })
   return pre.current
}

function App(){
    const [num,setNumber] = useState(0)
    const pre = usePrevious(num)
    return (
        <div>
           <button onClick={()=>setNumber(num+1)}>+1</button>
           <button onClick={()=>setNumber(num-1)}>-1</button>
           <p>Now:{num}, Before:{pre}</p>
        </div>
    )
}
```

值得注意的是，当 useRef 的内容发生变化时,它不会通知您。更改.current属性不会导致重新呈现。因为他一直是一个引用 .

###  forwardRef

- 因为函数组件没有实例，所以函数组件无法像类组件一样可以接收 ref 属性
- forwardRef 可以在父组件中操作子组件的 ref 对象
- forwardRef 可以将父组件中的 ref 对象转发到子组件中的 dom 元素上
- 子组件接受 props 和 ref 作为参数

### useImperativeHandle

- useImperativeHandle可以让你在使用 ref 时，自定义暴露给父组件的实例值，不能让父组件想干嘛就干嘛
- 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用
- 父组件可以使用操作子组件中的多个 ref

```javascript
import React,{useState,useEffect,createRef,useRef,forwardRef,useImperativeHandle} from 'react';

function Child(props,parentRef){
    // 子组件内部自己创建 ref 
    let focusRef = useRef();
    let inputRef = useRef();
    useImperativeHandle(parentRef,()=>(
      // 这个函数会返回一个对象
      // 该对象会作为父组件 current 属性的值
      // 通过这种方式，父组件可以使用操作子组件中的多个 ref
        return {
            focusRef,
            inputRef,
            name:'计数器',
            focus(){
                focusRef.current.focus();
            },
            changeText(text){
                inputRef.current.value = text;
            }
        }
    });
    return (
        <>
            <input ref={focusRef}/>
            <input ref={inputRef}/>
        </>
    )

}
Child = forwardRef(Child);
function Parent(){
  const parentRef = useRef();//{current:''}
  function getFocus(){
    parentRef.current.focus();
    // 因为子组件中没有定义这个属性，实现了保护，所以这里的代码无效
    parentRef.current.addNumber(666);
    parentRef.current.changeText('<script>alert(1)</script>');
    console.log(parentRef.current.name);
  }
  return (
      <>
        <ForwardChild ref={parentRef}/>
        <button onClick={getFocus}>获得焦点</button>
      </>
  )
}

```

