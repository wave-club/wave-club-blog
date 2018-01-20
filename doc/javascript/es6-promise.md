## ES6 的 Promise实践



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-15c805e713c867a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#####<code>Promise</code>是对未来的预测，是异步编程的一种解决方案，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象
<br />
*所谓<code>Promise</code>，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。
<br />

><code>Promise</code>
>对象代表一个异步操作，有三种状态：Pending
>（进行中）、Resolved
>（已完成，又称Fulfilled）和Rejected
>（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise
>这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。


#####基本用法
######<code>ES6规定，Promise对象是一个构造函数，用来生成Promise实例,所以需要new出来</code>



#####基本格式


     // 基本格式是如下的(这个是不能运行的)
    var promise = new Promise(function(resolve,reject){
      //some code
      if (true) {
        retrn resolve(value)
      }else{
        reject(error)
      }
    })
    //一般只写个then
    promise.then(function(value){
      //some code
      console.log(value)
    },function(error){
      console.log(error)
    }).catch(function(error) {  
     console.log('发生错误！', error);
    })


  #####下面是一个Promise对象的简单例子。

    function promise(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(function(){
          return resolve(ms)
        },ms)
      });
    }
    
    promise(1100).then((value) => {
      alert(value);
    });

>如果定义promise 对象，Promise新建后就会立即执行。


    let promise = new Promise(function(resolve, reject) {
      console.log('Promise');
      resolve();
    });
    
    promise.then(function() {
      console.log('Resolved.');
    });
    
    console.log('Hi!');

如下图打印
![ECB1BB5D-A278-4F30-80EA-AEFC8FFE21D9.png](http://upload-images.jianshu.io/upload_images/1899643-b3552c550f99ee49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#####下面是异步加载图片的例子。

  function loadImageAsync(url) {

    return new Promise(function(resolve, reject) {
    var image = new Image();
    image.src = url;
    
    image.onload = function() {
      console.log('success')
      resolve(image);
      document.body.appendChild(image)
    };
    
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    
    });
    }
    loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png')


#####下面是一个用Promise对象实现的Ajax操作的例子。

    var loadData = function(url) {
    return new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.onreadystatechange = handler;
    client.send();
    
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    });
    };
    loadData("http://api.linked-f.com/test/weixin/lesson?code=Aaaaaaaaaaaa%2CB&openid=wapCode&specialCode=&currentPath=%2Ftest%2Fhtml%2Findex.html&lessonId=632&type=online_info").then(function(data) {
    console.log('Contents: ' );
    console.log(data);
    }, function(error) {
    console.error('出错了', error);
    });




![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-156697e2874cd15f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#####Promise 嵌套

    //测试promise中的promise
    loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png').then(function (resolve) {
      console.log('请求图片完成，开始loaddata')
      loadData("http://api.linked-f.com/test/weixin/lesson?code=Aaaaaaaaaaaa%2CB&openid=wapCode&specialCode=&currentPath=%2Ftest%2Fhtml%2Findex.html&lessonId=632&type=online_info").then(function(data) {
    console.log('请求数据完成: ' );
    console.log(data);
    loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png').then(function(img){
      console.log(img)
    })
      }, function(error) {
        console.error('出错了哦', error);
      });
    
    })


#####Promise.all()

><code>Promise.all</code>方法用于将多个Promise实例，包装成一个新的Promise实例。


    var p = Promise.all([p1, p2, p3]);

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例。）

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


    //promise all
    //
    var p1 =loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png')
    var p2 = loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png')
    var p3 = loadImageAsync('http://static.vlms.cn/images/2015/07/ic4hqb7b.png')
    
    var p = Promise.all([p1,p2,p3])
    p.then(function(data){
      //所有promise 都是resolve 状态才是成功
      console.log('成功了')
      console.log(data)
    },function(reason){
      //有1个是reject 就是失败
      console.log('失败的原因',reason)
      })


#####Promise.resolve()


>有时需要将现有对象转为Promise对象，Promise.resolve
>方法就起到这个作用。

    var jsPromise = Promise.resolve($.ajax('/whatever.json'));

上面代码将jQuery生成的deferred对象，转为一个新的Promise对象。
等价于下面的写法。

    Promise.resolve('foo')
    // 等价于new Promise(resolve => resolve('foo'))

如果参数是Promise实例，那么Promise.resolve 将不做任何修改、原封不动地返回这个实例

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve
方法返回一个新的Promise对象，状态为Resolved

    var p = Promise.resolve('Hello');
    p.then(function (s){ console.log(s)});// Hello



#####Promise.resolve
方法允许调用时不带参数，直接返回一个Resolved状态的Promis对象。
所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。

    var p = Promise.resolve();p.then(function () {  // ...});

上面代码的变量p就是一个Promise对象。需要注意的是，立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

    setTimeout(function () { console.log('three');},0);
    Promise.resolve().then(function () { 
    console.log('two');
    });
    console.log('one');// one// two// three

上面代码中，setTimeout(fn, 0)
在下一轮“事件循环”开始时执行，Promise.resolve()
在本轮“事件循环”结束时执行，console.log(’one‘)
则是立即执行，因此最先输出。