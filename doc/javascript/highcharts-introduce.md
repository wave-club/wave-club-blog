## Highcharts 江湖就这样

>最近老喜欢夸人。
>真是 吾辈之楷模，业界之精英，家里好男人。社会好榜样，人民好公仆，能上厅堂。能下厨房。能搬砖起舞，能舞枪弄棒，能吞能吐，能屈能伸



图表插件,业界有很多，有**highcharts **和**echarts **，**D3**抑或其他，但是个人觉得 **highchairs** 确实好用。起码我理解起来是这样的

这篇文章不是简单的讲解怎么使用highcharts 。 官网有get started。

___


####Highcharts 基本组成




Highcharts 包含**标题**（Title）、**坐标轴**（Axis）、**数据列**（Series）、**数据提示框**（Tooltip）、**图例**（Legend）、**版权标签**（Credits）等，另外还可以包括**导出功能按钮**（Exporting）、**标示线**（PlotLines）、**标示区域**（PlotBands）、数据标签（dataLabels）等


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-1787680a5bd02a78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-edbb8418dc85024a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


我们姑且由浅入深的来看下这些

首先假设我们已经有了html 页面 , 我们现在需要做的就是改变 options

    <script src="https://code.highcharts.com/highcharts.js"></script>

    <div id="container"></div>

    <script>
         var options = {}
         $(function(){
         Highcharts.chart('container’,options)
         })
    </script>
___



###颜色（colors）

Highcharts 中数据列的颜色是通过 colors 来指定的，colors 是个颜色值数组，默认是：

    colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1']

共有 10个默认颜色，你可以修改颜色值或增加颜色个数来自定义图表数据列颜色。

####每个点的形状通过plotOptions 控制

       plotOptions: {
        series: {
            marker: {
                enable: true,
                symbol: 'circle'
            }
        }
    },


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-6702f944ac9100e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




### chart  ， title ，subtitle 


一图解决的事情就不唧唧歪歪了。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-c50ff005bded08f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-43c068b9a6815b52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-280dcb001ba5aadf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

___

 ###版权标签（Credits）


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-47c653e40ea3769c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###图例（Legend） 

图例。用不同形状、颜色、文字等 标示不同数据列，通过点击标示可以显示或隐藏该数据列。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-71d788696dd35721.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下面是详细描述

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-632df53df3a6baa7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-1f05ee53cd793224.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-9f23dc5ea02f2400.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**默认图例点击事件**

   



1、默认图例点击事件
图例默认的点击行为是显示或隐藏当前数据列。

     plotOptions: {
        series: {
          events: {
              legendItemClick: function(e) {
                  /*
                   * 默认实现是显示或隐藏当前数据列，e 代表事件， this 为当    前数据列
                   */
              }
          }
        }
      } 


2、禁用图例点击隐藏效果

    plotOptions: {
        series: {
          events: {
              legendItemClick: function(e) {
                  return false;
              }
          }
        }
      } 



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-3f601a7303ff6510.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

***

###数据提示框（Tooltip）


数据提示框指的当鼠标悬停在某点上时，以框的形式提示该点的数据，比如该点的值，数据单位等。数据提示框内提示的信息完全可以通过格式化函数动态指定；通过设置 **tooltip.enabled = false**
 即可不启用提示框。


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-32780a425d8e9439.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


提示框外观

下面的实例代码给出了关于数据提示框的外观的常用配置

      tooltip: {
      backgroundColor: '#FCFFC5',   // 背景颜色
      borderColor: 'black',         // 边框颜色
      borderRadius: 10,             // 边框圆角
      borderWidth: 3,               // 边框宽度
      shadow: ture,                 // 是否显示阴影
      animation: true               // 是否启用动画效果
      style: {                      // 文字内容相关样式
          color: "#ff0000",
          fontSize: "12px",
          fontWeight: "blod",
          fontFamily: "Courir new"
        }
      }


提示框内容


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-f116fe37a9b2934f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**html 内容**

数据提示框默认（在没开启支持 HTML 模式的情况下）支持少量的 HTML 标签，包括 b  br strong  i em，标签的内容可以通过 style 属性来指定，不过仅限文字相关的 CSS 样式属性。


通过设置 ** tooltip.useHTML = true **


 可以开启 HTML 模式，即可以用纯 HTML 内容来渲染数据提示框（默认是以 SVG 渲染）。


开启 HTML 模式后，就可以给提示框添加 链接、图片、表格等 HTML 元素，给提示框添加表格的示例代码是：

    tooltip: {
    shared: true,
    useHTML: true,
    headerFormat: '<small>{point.key}</small><table>',
    pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y} EUR</b></td></tr>',
    footerFormat: '</table>',
    valueDecimals: 2
    }



#####值的前缀、后缀及小数点

在展现数据信息是，我们经常会给数据添加一些修饰信息，例如数据单位。highcharts 提供了 valuePrefix、valueSuffix 来给数据添加前缀及后缀。

    tooltip: { 
        valuePrefix: '￥',
        valueSuffix: '元'
    }

另外，对于小数点的处理，可以通过 valueDecimals 来指定保留小数位数（当然可以通过格式化函数来进行更复杂的处理）。

对于多个数据列数据提示框添加后缀时，一般是将属性分别配置在数据列中，实例：

    series: [{
      name: 'Rainfall',
      type: 'column',
      yAxis: 1,
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      tooltip: {
          valueSuffix: ' mm'
      }
      }, {
      name: 'Temperature',
      type: 'spline',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      tooltip: {
          valueSuffix: '°C'
      }
    }]

坐标轴（Axis）

所有的图表除了饼图都有X轴和Y轴，默认情况下，x轴显示在图表的底部，y轴显示在左侧（多个y轴时可以是显示在左右两侧），通过设置** chart.inverted = true ** 可以让x，y轴显示位置对调。下图为图表中坐标轴组成部分

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-8bf6949b19be517d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


坐标轴标题。默认情况下，x轴为null（也就是没有title），y轴为'Value'

设置坐标轴标题的代码如下：

      xAxis:{
       title:{
         text:'x轴标题'
     }
    }
    yAxis:{
       title:{
           text:'y轴标题'
       }
    }

坐标轴刻度标签

坐标轴标签（分类）。Labels常用属性有enabled 、formatter、setp、staggerLines

1）enabled
是否启用Labels。x，y轴默认值都是true，如果想禁用（或不显示）Labels，设置该属性为false即可。

2）Formatter

标签格式化函数。默认实现是：

    formatter:function(){ return this.value;}

>this.value
>代码坐标轴上当前点的值（也就是x轴当前点的x值，y轴上当前点的y值），除了value变量外，还有axis、chart、isFirst 、isLast

可用。例如调用this.isFirst的结果如下图所示

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-ef9424711fc4cf27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


另外一个例子，实现更高级的自定义格式化函数，截图如下：

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-47cf1f88405b7704.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


实现代码如下：

    yAxis: {        
      labels: {
        formatter:function(){
          if(this.value <=100) { 
            return "第一等级("+this.value+")";
          }else if(this.value >100 && this.value <=200) { 
            return "第二等级("+this.value+")"; 
          }else { 
            return "第三等级("+this.value+")";
          }
        }
      }
    }

3）Step
Labels显示间隔，数据类型为number（或int）。下图说明了step的用法和作用

![Y轴坐标轴标签步进](http://upload-images.jianshu.io/upload_images/1899643-7a3fa7799f713965.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


4）staggerLines

水平轴 Labels 显示行数。（该属性只对水平轴有效）当 Lables 内容过多时，可以通过该属性控制显示的行数。和该属性相关的还有[maxStaggerLines](http://api.hcharts.cn/highcharts#yAxis.labels.maxStaggerLines)属性。


3、坐标轴刻度
Tick为坐标轴刻度。默认情况下x轴刻度高(tickLength
属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)。Tick相关的属性主要有tickLength、tickWidth、tickColor、tickInterval、tickmarkPlacement。

***
1）tickLength、tickWidth、tickColor 分别代表刻度线的长度、宽度、颜色。
2）tickInterval 刻度间隔。其作用和Lables.step 类似，就是不显示过多的x轴标签内容，不同的是，tickInterval是真正意义上的调整刻度，而Lables.step只是调整Labels显示间隔。所以在实际应用中，**tickInterval** 用的多。

***


3）tickmarkPlacement刻度线对齐方式，有between和on 可选，默认是between。设置为on

后的变化如下图：
![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-decff484da962f33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

***

Axis gridLines
坐标轴网格线。默认情况下，x轴网格线宽度为0,y轴网格线宽度为1px。网格线共有三个属性可设置，分别是: 

      gridLineWidth
      gridLineColor
      gridLineDashStyle

1）gridLineWidth
网格线宽度。x轴默认为0，y轴默认为1px。

2）gridLineColor
网格线颜色。默认为：#C0C0C0。

3）gridLineDashStyle
网格线线条样式。和Css border-style类似，常用的有：Solid、Dot、Dash


下图为自定义x和y轴的gridLines效果图

![自定义网格线.png](http://upload-images.jianshu.io/upload_images/1899643-1bdee5a50702639c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



###数据列（Series）

 数据列配置是 Highcharts 最复杂也是最灵活的配置，如果说 Highcharts 是灵活多变，细节可定制的话，那么数据列配置就是这个重要特性的核心

#####一、什么是数据列

数据列是一组数据集合，例如一条线，一组柱形等。图表中所有点的数据都来自数据列对象，数据列的基本构造是：

    series : [{ name : '', data : []}]

>提示：数据列配置是个数组，也就是数据配置可以包含多个数据列。数据列中的 name 代表数据列的名字，并且会显示在数据提示框（Tooltip）及图例（Legend）中。


#####二、数据列中的数据
在数据列的 data 属性中，我们可以定义图表的数据数组，通常有三种定义方式：

1、数值数组。在这种情况下，配置数组中的数值代表 Y 值，X 值则根据 X 轴的配置，要么自动计算，要么从 0 起自增，或者是根据 pointStart
 及 pointInterval

 自增；在分类轴中， X 值就是 categoies
 配置，数值数组配置实例如下：

    data : [1, 4, 6, 9, 10] 

2、包含两个值的数组集合。在这种情况下，集合中数组的第一个值代表 X， 第二个值代表 Y；如果第一个值是字符串，则代表该点的名字，并且 X 值会如 **1** 中所说的情况决定。数组集合的实例：

    data ： [ [5, 2], [6,3], [8,2] ]

3、数据点对象集合。在这种情况下，集合中元素都是数据点对象，对象中可以配置数据见 [plotOptions.series
](http://api.hcharts.cn/highcharts#plotOptions.series) 或 plotOptions.{图表类型}
 所列。配置实例：


    data : [{ name : "point 1", color : "#00ff00", y : 0}, { name : "Point 2", color : "#ff00ff", y : 5}]

另外，通过这种方式还可以增加额外变量，详见例子：[增加额外变量](http://code.hcharts.cn/jianshukeji/4RSTLX)

***
#####三、数据点及标记

>在直角坐标图（即常规的包含X、Y轴的图表）中，数据点相当于图表中的一个 （x,y）点。数据点的配置可以在数据列中是数据数组里指定。对于其他类型的图表（非直角坐标图），数据点不仅仅表示 X，Y值，例如在范围图中，数据点包含 x，low， high值；在 OHLC （蜡烛柱状图）中，数据点包含 x，open ， high， low， close；在饼图或仪表图中，数据点只表示一个值。


数据点配置适用所有图表，下面的例子说明了如何指定某个点的颜色：


    series : [{
        data : [ 29,9, 71.5, 106.4, 
        {
            y : 200,
            color : "#BF0B23"
        }, 194.1 , 20 ]
    }]

在 直线图、曲线图、面积图及面积范围图中可以为数据点指定标记，可以是某种形状， 图片等，实例：


    series : [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,148.5,
        {
          y: 216.4, 
          marker: { 
              fillColor: '#BF0B23',
              radius: 10 
          }
        }, 194.1, 95.6, 54.4]
    }]



四、数据列配置

数据列共有三个级别的配置，权重从低到高依次如下：

配置在 plotOptions.series 中

对应的 API 为：[plotOptions.series](http://api.hcharts.cn/highcharts#plotOptions.series) 中，针对所有类型图表有效，一般是通用配置。配置在 plotOptions.{图表类型} 中

对应的 API 为 ： [plotOptions](http://api.hcharts.cn/highcharts#plotOptions) 下的指定图表类型，针对当前类型图表有效，一般是某一种图表的通用配置。

配置在 series 中对应的 API 为：[series](http://api.hcharts.cn/highcharts#series)， 针对当前数据列有效
以上三中方式自上往下权重依次递增的，也就是配置在 series 中的属性会覆盖 plotOptions 中的配置。 Highcharts API 的这种层级关系体现了 API 设计的继承性和灵活性。

***

######下面列举数据列的一些常用属性


1、动画（Animation）

Highcharts 图表默认是以动画的形式展现图形加载过程的，可以通过 series.animation或 plotOptions.series.animation来指定动画相关配置（是否启用动画，动画效果等）。


2、颜色（Color）
可以通过 series.color 来指定数据列的颜色，通过 plotOptions.{图表类型}.color 来给某一种类型的图表设定颜色。



3、点的选择（Selection）

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-0dd3dff43e3c637c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

通过设置 allowPointSelect = true 可以使数据点可选择

    plotOptions: { series: { allowPointSelect: true }}

对应的获取选中的点是通过 chart.getSelectedPoints() 函数来实现的

    var selectedPoints = chart.getSelectedPoints();

提示：按住 CTRL 或 SHIFT 键可以多选
4、线条宽度（lineWidth）

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-adc16541650282b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以通过 lineWidth 来指定线条宽度

    series: [{
      data: [216.4, 194.1, 95.6],
      lineWidth: 5
    }]

5、鼠标形状（cursor）
cursor 属性可以指定鼠标形状，即指定当鼠标悬停在数据列上时对应的鼠标样式（当配置了数据列点击事件时）。
6、数据标签（dataLables）

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-1d94a26b9b3919be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

数据标签指的是在数据点上显示一些数据信息标签，对应的 API 为 [series.data.dataLabels](http://api.hcharts.cn/highcharts#series.data.dataLabels)

    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            }
        }
    }


数据标签默认显示当前数据点的点值，可以通过 formatter函数或 format来对其格式化。

    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
                formatter: function() {
                    return this.x + "   " + this.y;
                },
                // format: "{x}      {y}"
            }
        }
    }

7、线条样式（Dash Style）

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-0333b18bcd29902b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

dashStyle 可以指定线条的样式 （这里有 Highcharts 支持的所有 [线条样式](http://code.hcharts.cn/highcharts/hhhh6n)）

    series: [{    data: [1, 3, 2, 4, 5, 4, 6, 2, 3, 5, 6],    dashStyle: 'longdash'
    }]


![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-0491f44a21079bbf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####小功能



![Paste_Image.png](http://upload-images.jianshu.io/upload_images/1899643-4d52bc165bc144cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)