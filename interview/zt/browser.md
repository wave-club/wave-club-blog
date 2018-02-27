# 浏览器线程阻塞



#### 1.浏览器线程

**js单线程**

js运作在浏览器中，是单线程的，js代码始终在一个线程上执行，此线程被称为js引擎线程。

**浏览器多线程**

1.js引擎线程(js引擎有多个线程，一个主线程，其它的后台配合主线程)--执行js任务(执行js代码，用户输入，网络请求)

2.ui渲染线程--渲染页面(js可以操作dom，影响渲染，所以js引擎线程和UI线程是互斥的。js执行时会阻塞页面的渲染。)

3.浏览器事件触发线程--控制交互，响应用户

4.http请求线程--ajax请求等

5.定时触发器线程--settimeout

6.事件轮询处理线程--用于轮询消息队列，event loop

所以异步是浏览器的两个或者两个以上线程共同完成的。比如ajax异步请求和settimeout

**消息队列**

javascript运行时，除了一个运行线程，引擎还提供一个消息队列，里面是各种需要当前程序处理的消息。新的消息进入队列的时候，会自动排在队列的尾端。 单线程意味着js任务需要排队，如果前一个任务出现大量的耗时操作，后面的任务得不到执行，任务的积累会导致页面的“假死”。这也是js编程一直在强调需要回避的“坑”。

**执行任务**

同步任务和异步任务 它们的区别是: 本段中的线程指的是js引擎主线程

同步任务：在主线程排队支持的任务，前一个任务执行完毕后，执行后一个任务,形成一个执行栈，线程执行时在内存形成的空间为栈，进程形成堆结构，这是内存的结构。执行栈可以实现函数的层层调用。注意不要理解成同步代码进入栈中，按栈的出栈顺序来执行。 异步任务会被主线程挂起，不会进入主线程，而是进入消息队列，而且必须指定回调函数，只有消息队列通知主线程，并且执行栈为空时，该消息对应的任务才会进入执行栈获得执行的机会。

主线程执行的说明: 【js的运行机制】 （1）所有同步任务都在主线程上执行，形成一个执行栈。 （2）主线程之外，还存在一个”任务队列”。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。 （3）一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。 （4）主线程不断重复上面的第三步。

可用图说明 <https://www.zhihu.com/question/20866267> <http://www.ruanyifeng.com/blog/2014/10/event-loop.html><http://www.cnblogs.com/lvdabao/p/3744030.html>

#### 2.js引擎线程（ajax）和UI线程互斥

前提：导出数据，每次从后台请求100条数据，最后拼接成文件。同时，才下载之前修改dom，显示loading效果。导出之后，取消loading效果。

1.考虑每次都要用到响应结果，则使用同步ajax，但dom就被阻塞。

```js
function getData1(){
        var result;
        $.ajax({
            url : '',
            async : false,
            success: function(data){
                result = data;
            }
        });

    return result;
}        

```

2.阻塞后，则考虑是js和ui互斥。想用settimeout，则将ajax重开线程，放入事件循环队列。 如果是一个简单的dom则可以，但如果loading是个动图之类的，则无效。因为从循环队列取出，又一次阻塞。

```js
$('.btn2').click(function(){
    $('.loadingicon').show();
    setTimeout(function(){
        $.ajax({
            url : '',
            async : false,
            success: function(data){
                $('.loadingicon').hide();
                alert(data);
            }
        });
    }, 0);
});

```

3.使用异步和递归==有顺序，不会出现dom阻塞

```js
getDataByChunk(writeToCSV);
function getDataByChunk(done){
    if(firstTime){
        offsetValue = 0;
        firstTime = false;
    } else{
        offsetValue = get_talent_query.offset + get_talent_query.count;
    }
    $.ajax({
        url: '/neihan/op/pro_user/pro_users/',
        type: 'GET',
        dataType: 'JSON',
        data: $.extend(true, get_talent_query, {count: 100,offset: offsetValue}),
        timeout: 600000,     // 超时时间设置为10分钟
    }).done(function (re) {
        if(re.status_code !== 0){
            Tooltips.showTips({
                type: 'ERROR',
                text: re.data.prompts || '导出数据失败, 请检查数据接口!'
            });
            return
        }
        result = result.concat(re.data.users);

        if(offsetValue + get_talent_query.count >= re.data.total){
            $(".btn-export-talent").html('导出数据');
            done(result);
        }else{
            getDataByChunk(done)
        }

    }).fail(function (e) {
        Tooltips.showTips({
            type: 'ERROR',
            text: httpErrorInfo(e)
        });
    });

```

4.但时间较长，使用promise

```js
// 给每个数据请求都转成promise对象
generaterPromise(count, offset){
	let data = {
		count: count,
		offset: offset
	}

	return UTIL.request.get(CONST.APIS.PRO_USER_USERS, data).
	then( res => {
		this.exportData.splice( data.offset, 0,  ...res.data.users );
	});
},
//下载文件，使用了promise，下载相对的比较快
exportCSV(){
	this.exportData = [];
	this.exportString = EXPORT_STRING.DOWNLOADING;
	let count = 100;
	let times = Math.ceil(this.pageTotal / count );
	let arr = [];
	for(let i=0; i< times; i++){
		arr.push(i);
	}

	// 这样使用可以保证generaterPromise函数生成的offset是需要的，如果使用for循环只会得到最后一次的变量
	let promises = arr.map( ( index )=>{
		return this.generaterPromise( count, count * index);
	});

	console.log( new Date())
	Promise.all( promises ).then( res => {
		console.log( new Date() )
		this.exportString = EXPORT_STRING.DOWNLOAD;
		this.writeToCSV( this.exportData )
	}).catch( error => {
		console.log( error )
	})
},

```

#### 3.js引擎线程（ajax）和UI线程互斥

有一个需求： 获取视频接口，urlready好，让文件上传组件显示。 则在handleBeforeUpload上传文件之前， 1.url改变，这个url会在下边post中用到（url双向绑定到action属性中） 2.触发beforeupload后，iview中会随后调用post（其中有ajax） 但是发现双向绑定url没有更新，导致post未更新，则需要在post中使用nexttick才可以解决。 其实就是被阻塞的原因。

