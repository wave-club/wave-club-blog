# Util


### 项目目录结构
-----------------

|--Date.js （时间处理方法）<br />
|&emsp;&emsp;|-------  Date.prototype.format  <br />
|&emsp;&emsp;|-------  Number.prototype.toDateFormat  <br />
|&emsp;&emsp;|-------  Number.prototype.toDistanceNow  <br />





### 使用展示

##### Date.prototype.format

    /**
     * @class Date 时间格式转换
     * @descrption
     * **使用方式 new Date().format('yyyy-MM-dd  HH:mm:ss w')
     * **返回值 "2018-01-06  13:51:36 星期六"
     **/


##### Number.prototype.toDateFormat

    /**
    * @class Number 时间戳格式转换
    * @descrption  依赖于 Date.prototype.format
    * **使用方式 Number(1514764800).toDateFormat('yyyy-MM-dd HH:mm:ss w')
    * **返回值 "2018-01-01 08:00:00 星期一"
     **/

##### Number.prototype.toDistanceNow

    /**
     * @class Number
     * @descrption 时间戳格式转换成距离现在多久 几 "年","天","小时","分钟","秒钟" 前
     * **使用方式  Number(1514764800).toDistanceNow()
     * **返回值  "5天前"
     **/


​     
​     
​     


