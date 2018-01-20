## Js 连线支持随意拖



### 先上效果图


不知道为什么喜欢用元芳2个字！如果都要世界都要元芳来看，感觉元芳要忙不过来！

![cav1.gif](http://upload-images.jianshu.io/upload_images/1899643-a30686df11466430.gif?imageMogr2/auto-orient/strip)

### 在上demo下载地址

https://github.com/976500133/CanvasCurve


###分析
1.需要canvas 事件支持
  canvas 支持 
onmouseenter  
 onmousedown
onmousemove
onmouseup
onmouseout 
事件等

2.最终这个效果是每次30/1000 s 清空画布重置的效果。


###上代码，程序员就是这么干脆，说多了没意思

>HTML 代码

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
        <script type="text/javascript" src="./common/script.js">
    
        </script>
      </head>
      <body>
        <div class="container">
            <canvas id="scene" width="1120" height="130" >    </canvas>
        </div>
      </body>
    </html>


> JS 代码

    // xxxxx.style.cursor?=?"url(005.jpg),auto";

    var canvas, ctx;
    var defaultCircles = [
      {x : 112 , y : 65  } ,
      {x : 336 , y : 65  } ,
      {x : 560 , y : 65  } ,
      {x : 784 , y : 65  } ,
      {x : 1008 , y : 65 }
    ];
        var circles = [];//所有的圆
        var selectedCircle;//选中的圆
        var hoveredCircle;//
        var Timer = null;
        //圆对象
    function Circle(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    
    //清除canvas
    function clear() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    //画圆
    function drawCircle(ctx, x, y, radius , fillStyle = 'rgba(198, 199,  199, 1.00)') {
        ctx.fillStyle = fillStyle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    
    //传说中的吸附效果
    function renderCircle(circles){
      return circles.map(function(item , index){
        return new Circle(item.x <= 10 ? 10 : (item.x >= 1110 ? 1110 : item.x) , item.y >=115 ? 115 : (item.y <= 10 ? 10 : item.y) ,item.radius )
      })
    }
    
    //传说中的
    
     //画场景
    function drawScene() {
        //清空画布
        clear();
        ctx.beginPath();
        ctx.moveTo(0, 65);
        ctx.lineTo(circles[0].x, circles[0].y);
        for (var i=0; i<circles.length; i++) {
            ctx.lineTo(circles[i].x, circles[i].y);
        }
        ctx.lineTo(1120, 65);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(27, 138, 203, 1.00)';
        ctx.stroke(); // 画边界,用直线连接所有圆心
    
        //画出所有的圆,滑过的圆半径稍大
        for (var i=0; i<circles.length; i++) {
            drawCircle(ctx, circles[i].x, circles[i].y, (hoveredCircle == i) ? 12 : 9 , (hoveredCircle == i) ? 'rgba(27, 138, 203, 1.00)' : 'rgba(198, 199, 199, 1.00)' );
        }
    }
    
    //初始化
    window.onload=function(){
    
      canvas = document.getElementById('scene');
      ctx = canvas.getContext('2d');
    
      var circleRadius = 15;//每个小圆的半径
      var width = canvas.width;
      var height = canvas.height;
    
      var circlesCount = 5; // 圆的数目
      for (var i=0; i<defaultCircles.length; i++) {
          var x = defaultCircles[i].x;//随机的圆心坐标
          var y = defaultCircles[i].y;
          circles.push(new Circle(x,y,circleRadius));
      }
      //鼠标按下事件,这是传统的事件绑定,它非常简单而且稳定,适应不同浏览器.e表示事件,this指向当前元素.
      canvas.onmousedown =function(e) {
         var e = window.event || e
         var rect = this.getBoundingClientRect();
         var mouseX =e.clientX - rect.left;//获取鼠标在canvsa中的坐标
         var mouseY =e.clientY - rect.top;
          for (var i=0; i<circles.length; i++) { //检查每一个圆，看鼠标是否落在其中
              var circleX = circles[i].x;
              var circleY = circles[i].y;
              var radius = circles[i].radius;
              if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
              selectedCircle = i;//选中此圆
              break;
              }
          }
      }
    
       //鼠标移动
       canvas.onmousemove=function(e) {
    
         var e = window.event || e
         var rect = this.getBoundingClientRect();
         var mouseX =e.clientX - rect.left;//获取鼠标在canvsa中的坐标
         var mouseY =e.clientY - rect.top;
    
          if (selectedCircle != undefined) {
              var radius = circles[selectedCircle].radius;
              circles[selectedCircle] = new Circle(mouseX, mouseY,radius); //改变选中圆的位置
          }
    
          hoveredCircle = undefined;
          for (var i=0; i<circles.length; i++) { // 检查每一个圆，看鼠标是否滑过
    
              var circleX = circles[i].x;
              var circleY = circles[i].y;
              var radius = circles[i].radius;
              if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2)) {
                  hoveredCircle = i;
                  e.target.style.cursor = 'move'
    
                  break;
              }else {
                e.target.style.cursor = 'initial'
              }
         }
      }
    
     //鼠标松开
     canvas.onmouseup =function(e) {
          circles = renderCircle(circles);
          selectedCircle = undefined;
      };
    
      //鼠标离开，清除定时器，提高性能
      canvas.onmouseout =function(e) {
           selectedCircle = undefined;
           circles = renderCircle(circles);
           clearInterval(Timer)
      };
      //鼠标进入，开启30渲染
       canvas.onmouseenter =function(e) {
          Timer = setInterval(drawScene, 30);
      };
    
      Timer = setInterval(drawScene, 30);
    
    }


###如此。代码就写完了。

再次附上demo地址

https://github.com/976500133/CanvasCurve