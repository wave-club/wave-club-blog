# 通过简单的懒加载了解节流和去抖



### 背景

为什么要去了解函数节流和去抖呢？因为我想了解啊～搞事情～好了还是正经点吧，原因是是下面：
下面场景往往由于事件频繁被触发，因而频繁执行DOM操作、资源加载等重行为，导致UI停顿甚至浏览器崩溃。

1. window对象的resize、scroll事件
2. 拖拽时的mousemove事件
3. 射击游戏中的mousedown、keydown事件
4. 文字输入、自动完成的keyup事件
   实际上对于window的resize事件，实际需求大多为停止改变大小n毫秒后执行后续处理；而其他事件大多的需求是以一定的频率执行后续处理。针对这两种需求就出现了debounce和throttle两种解决办法。
   那么我们就通过一个简单图片懒加载来了解下咯～



```html
<html >
<head>
    <title>通过懒加载了解节流和去抖</title>
</head>
<meta charset="utf-8">
<style>
    img {
        display: block;
        width: 300px;
        height: 200px;
        float: left;
        margin: 100px;
    }
</style>
<body>

<img data-src="1.png" alt="1.png">
<img data-src="2.png" alt="2.png">
<img data-src="3.png" alt="3.png">
<img data-src="4.png" alt="4.png">
<img data-src="5.png" alt="5.png">
<img data-src="6.png" alt="6.png">
<img data-src="7.png" alt="7.png">
<img data-src="8.png" alt="8.png">
<img data-src="9.png" alt="1.png">
<img data-src="10.png" alt="1.png">
<img data-src="11.png" alt="1.png">
<img data-src="12.png" alt="1.png">
<img data-src="13.png" alt="1.png">
<img data-src="14.png" alt="1.png">
<img data-src="15.png" alt="1.png">
<img data-src="16.png" alt="1.png">
<img data-src="17.png" alt="1.png">
<img data-src="18.png" alt="1.png">
<img data-src="19.png" alt="1.png">
<img data-src="20.png" alt="1.png">
<img data-src="21.png" alt="1.png">
<img data-src="22.png" alt="1.png">
<img data-src="23.png" alt="1.png">
<img data-src="24.png" alt="1.png">
<img data-src="25.png" alt="1.png">
<img data-src="26.png" alt="1.png">
<img data-src="27.png" alt="1.png">
<img data-src="28.png" alt="1.png">
<img data-src="29.png" alt="1.png">


<script>

    // 简单的去抖函数
//    去抖相比较节流函数要稍微简单一点，去抖是让函数延迟执行，而节流比去抖多了一个在一定时间内必须要执行一次
    function debounce(fn, delay) {
        // 持久化一个定时器 timer
        let timer = null;
        // 闭包函数可以访问 timer
        return function() {
            // 通过 'this' 和 'arguments'
            // 获得函数的作用域和参数
            let context = this;
            let args = arguments;
            // 如果事件被触发，清除 timer 并重新开始计时
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }

//    简单的节流函数
//    好比一台自动的饮料机，按拿铁按钮，在出饮料的过程中，不管按多少这个按钮，都不会连续出饮料，中间按钮的响应会被忽略，必须要等这一杯的容量全部出完之后，再按拿铁按钮才会出下一杯。所以我们理解节流函数就是每隔一段时间执行一次函数。不用一动就执行，减少消耗。
    function throttle(func, delay, time){

        var timeout,
            startTime = +Date.now();
        return function(){
            var context = this,
                args = arguments,
                curTime = +Date.now();
            clearTimeout(timeout);
            // 达到了最长触发时间
            if(curTime - startTime >= time){
                func.apply(context, args);
                startTime = curTime;
            }else{
                // 没达到最长触发时间，重新设定定时器
                timeout = setTimeout(function(){
                    func.apply(context, args);
                }, delay);
            }
        }
    }

    //懒加载 图片 原理
    var lazyLoadImg = function () {
        //懒加载
        var imgTags = document.querySelectorAll('img')
        var n = 0
        var len = imgTags.length
        console.log(this)

        for(var i = n ; i< len; i++){
            var html_h = document.body.clientHeight
            var html_scroll_t = document.body.scrollTop
            if(imgTags[i].offsetTop < html_h + html_scroll_t){
                if(imgTags[i].getAttribute('data-src')){
                    imgTags[i].src = imgTags[i].getAttribute('data-src')
                    imgTags[i].removeAttribute('data-src')
                }
                n++
            }
        }

    }
    lazyLoadImg()

    //成功 this 是document 对象
    document.addEventListener('scroll',throttle(lazyLoadImg, 500, 1000) , false)
    //失败 this 是window 对象
    document.addEventListener('scroll',function () {
        throttle(lazyLoadImg, 500, 1000)()
    }, false)


//    var deepCopy1 = function (obj) {
//        var _obj = {}
//        _obj = JSON.parse(JSON.stringify(obj))
//        return _obj
//    }
//
//    var deepCopy2 = function (obj) {
//        var _obj = {}
//        for( var k in obj) {
//            if(typeof obj[k] === 'object'){
//                _obj[k] = deepCopy2(obj[k])
//            }else{
//                _obj[k] = obj[k]
//            }
//        }
//        return _obj
//    }

    var deepCopy3 = function (obj) {
        var _obj = {}
        obj = Object.entries(obj)
        for( var [k,v] of obj) {
            if(typeof v === 'object'){
                _obj[k] = deepCopy2(v)
            }else{
                _obj[k] = v
            }
        }
        return _obj
    }



    //    Array.prototype.unique = function () {
//        var _arr = []
//        for(var i = 0; i <this.length;i ++) {
//            if((_arr.indexOf(this[i]) === -1 )){
//                _arr.push(this[i])
//            }
//        }
//        return _arr
//
//    }


//    var Person = function (name) {
//        this.name = name
//    }
//    Person.prototype.sayName = function () {
//        console.log(this.name || 'default')
//    }

//    var new2 = function (func) {
//        var o = Object.create(func.prototype);
//        var k = func.call(o);
//        if (typeof k === 'object') {
//            return k;
//        } else {
//            return o;
//        }
//    };


//    var new2 = function (fn,name) {
//        var _o = Object.create(fn.prototype);
//        var _obj = fn.call(_o,name)
//
//        if(typeof _obj === 'object'){
//            console.log('return _object')
//            return _obj
//        }else{
//            console.log('return _o')
//            return _o
//        }
//
//    }
//    var p1 = new Person('bbb')
//    p1.sayName()
//
//    var p2 = new2(Person,'aaa')
//    p2.sayName()
</script>

<!--<ul>-->
    <!--<li><a href="#/">turn white</a></li>-->
    <!--<li><a href="#/blue">turn blue</a></li>-->
    <!--<li><a href="#/green">turn green</a></li>-->
<!--</ul>-->


</body>
</html>
```