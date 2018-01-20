## React 生命周期（顺序）和 组件 通信

>很多情况下，我们是通过props来定制组件实例的外观及行为,这样的组件我们称之为**无状态/stateless**的组件，因为在任何时刻，组件 实例的表现都仅仅取决于外部传入的**props**属性，与 它自身之前的表现毫无关系，即，它本身没有任何记忆

让一个组件拥有记忆能力,根据自身的**状态**对同样的刺激做出 不同的反应,React的组件的确引入了**状态机**的概念**state**


###setState 尖端使用的方法 callback
    //默认初始化close为false
    this.setState({close : true},() => {
    //setstate 不会及时修改state , 可以在回调中才能得到true
    //得到的为true    
    console.log(this.state.close)
    })
    //还是为false    
    console.log(this.state.close)

####设置组件初始状态,可以在constructor 中

    constructor(props){
        super(props)
        this.state= {
          tag : _tag
        }
    }


看下面清晰的图片吧,顺序是 

>1.componentWillMount
>2.componentDidMount

>3.componentWillReceiveProps 
>4.shouldComponentUpdate 
>5.componentWillUpdate
>6-componentDidUpdate
> (3-6一直重复) 
>7.componentWillUnmount



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-2a7812c50567604a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####解释下


**componentWillMount**  组件实例即将挂接（初次渲染）时被调用
这个方法在整个生命周期中只会被调用一次

**componentDidMount()** - 组件实例挂接（初次渲染）后被调用
这个方法在整个生命周期中只会被调用一次

**componentWillUnmount()** - 组件实例即将从DOM树移除时被调用
这个方法在整个生命周期中只会被调用一次。

####上面3个方法是只会触发一次

**componentWillReceiveProps(nextProps)** - 组件实例即将设置新属性时被调用
参数nextProps表示即将应用到组件实例上的新属性值。

**shouldComponentUpdate(nextProps, nextState)** - 组件实例即将重新渲染时被调用
参数nextProps传入即将应用到组件实例上的新属性值，需要return 布尔值 ，return true 表示 需要渲染 ，false 表示不需要渲染

**componentWillUpdate(nextProps, nextState)** - 组件实例即将重新渲染时被调用
**注意**：不能在此方法内调用setState()。


**componentDidUpdate(prevProps, prevState)** - 组件实例重新渲染后被调用


###React 组件 通信


react是单向数据流

####父组件 =>> 子组件
>父组件 =>> 子组件： 通过 props

####子组件 =>> 父组件
>子组件 =>> 父组件 ： 通过 callback

####子组件 =>>  子组件

>子组件 =>>  子组件  :    子组件 =>> 父组件  =>> 子组件 (callback 和props 组合) 也就是· 子组件通过回调改变父组件中的状态，通过props再修改另一个组件的状态




![1.png](http://upload-images.jianshu.io/upload_images/1899643-e9e27df4f72efef5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![2.png](http://upload-images.jianshu.io/upload_images/1899643-599204e4ec527357.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![3.png](http://upload-images.jianshu.io/upload_images/1899643-006cdd06f413c529.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![4.png](http://upload-images.jianshu.io/upload_images/1899643-d1c67aeceebdf5f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![5.png](http://upload-images.jianshu.io/upload_images/1899643-923210405ef8e14f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![6.png](http://upload-images.jianshu.io/upload_images/1899643-dc6a9dfb6c55abe1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)