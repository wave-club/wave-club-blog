# 什么是闭包（closure），为什么要用它？

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。



 闭包的特性：

 1.函数内再嵌套函数
 2.内部函数可以引用外层的参数和变量
 3.参数和变量不会被垃圾回收机制回收

```js

 //li节点的onclick事件都能正确的弹出当前被点击的li索引
  <ul id="testUL">
     <li> index = 0</li>
     <li> index = 1</li>
     <li> index = 2</li>
     <li> index = 3</li>
 </ul>
 <script type="text/javascript">
   	var nodes = document.getElementsByTagName("li");
 	for(i = 0;i<nodes.length;i+= 1){
 	    nodes[i].onclick = (function(i){
 	              return function() {
 	                 console.log(i);
 	              } //不用闭包的话，值每次都是4
 	            })(i);
 	}
 </script>



 执行say667()后,say667()闭包内部变量会存在,而闭包内部函数的内部变量不会存在
 使得Javascript的垃圾回收机制GC不会收回say667()所占用的资源
 因为say667()的内部函数的执行需要依赖say667()中的变量
 这是对闭包作用的非常直白的描述

   function say667() {
 	// Local variable that ends up within closure
 	var num = 666;
 	var sayAlert = function() {
 		alert(num);
 	}
 	num++;
 	return sayAlert;
 }

  var sayAlert = say667();
  sayAlert()//执行结果应该弹出的667
```


某段dom结构如下:在该dom结构中,li在列表的下标分别是0,1,2,3,4.请分别为每个li添加点击事件,输出响应的下标,注意:使用原生的js,且只能添加事件不能添加属性.



```js
<ul id="list">
  <li>qw</li>
  <li>er</li>
  <li>ty</li>
  <li>ui</li>
  <li>ou</li>
</ul>

var lis = document.querySelectorAll('li');
    //闭包实现
    for (var i = 0; i < lis.length; i++) {
      lis[i].onclick = (function (j) {
        return function () {
          console.log(j);
        }
      })(i);
    }
    //forEach实现
    lis.forEach(function (v, i) {
      v.onclick = function () {
        console.log(i);
      }
    })
    //ES6实现
    for(let i=0;i<lis.length;i++){
      lis[i].onclick=function(){
        console.log(i);
      }
    }
```