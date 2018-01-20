## HTML5 video 详解 属性 事件 方法



>时至今天 2016年12月9日，chrome 的 版本 55.0.2883.75 (64-bit)。浏览器自带的播放器已经足够强大了，看下图，现在完全没必要去自己创建个播放器了。（可以想象html5视频播放器就是一套theme(皮肤)）


![chrome 浏览器.png](http://upload-images.jianshu.io/upload_images/1899643-50eab698d5c35c0d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![safari 浏览器](http://upload-images.jianshu.io/upload_images/1899643-dc1b86e0374426bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####那么 HTML5 (视频)- 如何工作 ？

HTML5 中显示视频，您所有需要的是：

    <video width="320" height="240" controls>
     <source src="/example/video/movie.mp4" type="video/mp4">
     <source src="/example/video/movie.ogg" type="video/ogg">
     您的浏览器不支持Video标签。
    </video>


####视频格式与浏览器的支持 


![浏览器的支持 .png](http://upload-images.jianshu.io/upload_images/1899643-c87b3128081067e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如此的话，只需要写

    <source src="/example/video/movie.mp4" type="video/mp4">
    <source src="/example/video/movie.ogg" type="video/ogg">


就能支持所有的浏览器播放格式

####<video> 标签的属性

    //autoplay 则视频在就绪后马上播放。
    //controls 用户显示控件，比如播放按钮。
    //width 频播放器的宽度。
    //height 设置视频播放器的高度
    //loop 文件完成播放后再次开始播放。
    //preload 视频在页面加载时进行加载，并预备播放
    // src 要播放的视频的 URL。
    
    let ele = `<div id="videoPlayModal"  data-type='m9' class='fn-hide  '>
      <video id="video1" width="854" height="480" controls  autoPlay preload >
         <source src=${url}  />
               您的浏览器不支持Video标签。
      </video>
    </div>`



####使用 DOM 进行控制video

简单的例子

    var myVid=document.getElementById("video1"); //获取video 元素
    myVideo.play(); //播放视频
    myVideo.pause();  //暂停视频
    myVideo.width=560; //设置视频宽度
    myVideo.height=560;  //设置视频高度


#### 视频全屏 

chrome 

    document.getElementById('video1').webkitRequestFullScreen()
    document.webkitCancelFullScreen();

Firefox 

    document.getElementById('video1').mozRequestFullScreen();
    document.mozCancelFullScreen();

// W3C 提议

    document.getElementById('video1').requestFullscreen();
    document.exitFullscreen();



【css伪类】

:fullscreen – 当前全屏化的元素
:fullscreen-ancestor – 所有全屏化元素的祖先元素





####HTML5 <video> - 方法、属性以及事件

    var myVid=document.getElementById("video1");
    //播放的速度
    myVid.playbackRate = 1
    myVid.onloadstart = function(){
      console.log(`onloadstart  客户端开始请求数据  `);
    }
    myVid.ondurationchange=function(){
      console.log(`durationchange 资源长度改变  `);
    }
    myVid.onratechange=function(){
      console.log(`onratechange  //播放速率改变  `);
    }
    myVid.onseeking=function(){
      console.log(` //seeking  寻找中 点击一个为（缓存）下载的区域`);
    }
    myVid.onseeked=function(){
      console.log(` //seeked 寻找完毕 `);
    }
    myVid.onplay=function(){
      console.log(`开始播放时触发 `);
    }
    myVid.onwaiting=function(){
      console.log(`播放由于下一帧数据未获取到导致播放停止，但是播放器没有主动预期其停止，仍然在努力的获取数据，简单的说就是在等待下一帧视频数据，暂时还无法播放。 `);
    }
    myVid.onplaying=function(){
      console.log(`真正处于播放的状态，这个时候我们才是真正的在观看视频。 `);
    }
    myVid.oncanplay=function(){
      console.log(`视频播放器已经可以开始播放视频了，但是只是预期可以正常播放，不保证之后的播放不会出现缓冲等待。 `);
    }
    myVid.onpause=function(){
      console.log(`暂停播放时触发 `);
    }
    myVid.onended=function(){
      alert(` //播放结束 loop 的情况下不会触发  `);
    }
    myVid.onvolumechange=function(){
      console.log(`音量改变  `);
    }
    myVid.onloadedmetadata=function(){
      console.log(`获取视频meta信息完毕，这个时候播放器已经获取到了视频时长和视频资源的文件大小。 `);
    }
    myVid.onloadeddata=function(){
      console.log(`"视频播放器第一次完成了当前播放位置的视频渲染。"`);
    }
    
    myVid.onabort=function(){
      console.log(`客户端主动终止下载（不是因为错误引起）， `);
    }
    
    myVid.onerror=function(){
      console.log(`请求数据时遇到错误`);
      //1.用户终止 2.网络错误 3.解码错误 4.URL无效
      alert(myVid.error.code);
    }
    
    //客户端请求数据
    myVid.onprogress=function(){
    
      console.log(`客户端正在请求数据 触发多次，是分段请求的`);
      console.log(myVid.buffered);
       //0.此元素未初始化  1.正常但没有使用网络  2.正在下载数据  3.没有找到资源
      console.log(`networkState ${myVid.networkState}`);
      //  //当前播放的位置，赋值可改变位置 myVid.currentTime = 11 从11秒位置开始播放
      console.log(myVid.currentTime);
      // //返回当前资源的URL
      console.log(myVid.currentSrc);
    
      console.log(myVid.videoWidth);
      //播放结束 返回true 或 false
      console.log(myVid.ended);
      //音量大小 为0-1 之间的值
      console.log(myVid.volume);


      //当前资源长度
      console.log(myVid.duration);
      console.log(myVid.startDate)
      // myVid.currentTime = 11



>平时能用到的也就这些了。