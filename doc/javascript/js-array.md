# js数组详解

 

[**谦龙**](https://segmentfault.com/u/116263) 2015年10月17日发布



## 数组初认识

> Array是js中的引用数据类型，除了Object外，Array几乎是ECMAScript中最常用的数据类型了。

**js中的数组与其他语言的不同之处**

1. 可以保存任意的数据类型
2. 数组长度动态调整

## 栈方法

> ECMAScript中提供了让数组的行为类似于栈的方法，即可以让数组表现的如同栈的LIFO数据结构一般，方法分别是push，pop

### push

> 用法：该方法接收任意数量的参数，把他们逐个添加到数组的末尾，并返回修改后数组的长度

**DEMO**

```js
    var nums=[];
    var len =nums.push(1,2,3);//一次性添加三个元素 返回修改后的数组长度3
        console.log(nums,'len='+len);
        len=nums.push(4);//添加一个元素 返回数组修改后的数组长度4
        console.log(nums,'len='+len);
        
```

**测试**
![img](https://segmentfault.com/img/bVqoQm)

### pop

> 用法：该方法删除数组最后一项，减少length的值，并且返回被删除的元素

**DEMO**

```js
    var nums=[1,2,3,4];
    var returnNum=nums.pop();//删除最后一项 并返回
        console.log('len='+nums.length,'returnNum='+returnNum);
```

**测试**
![img](https://segmentfault.com/img/bVqoQS)

### 栈常见应用之数制转换

进行数制之间的相互转换是是编程中经常遇见的问题，我们可以利用数组栈的这个特性来完成这个操作
**DEMO**

```js
    //该函数接收一个整型数字，以及要转化的数制基数
     function mulBase(num,base){
        var numArr=[];
        do{
           numArr.push(num%base);//入栈
           num=Math.floor((num/base))
        }while(num>0);
        var converted='';
        while(numArr.length>0){
           converted+=numArr.pop();//出栈
        }
        return converted;
    }
```

**测试**
![img](https://segmentfault.com/img/bVqoRu)

### 栈常见运用之回文判断

**回文**：回文是指这样的一种现象 一个单词、短语、或者数字，**从前往后**写和**从后往前**写都是一样的。例如单词"dad"、"racecar"。
**DEMO**
function isPalindrome(word){

```js
var word=''+word;
var wordArr=[];
    for(var i=0;i<word.length;i++){
        wordArr.push(word.charAt(i));//入栈
    }
var reWord='';
    while(wordArr.length>0){
        reWord+=wordArr.pop();//出栈
    }
    return reWord == word?true:false;   
```

}
**测试**
![img](https://segmentfault.com/img/bVqqan)

## 队列方法

> 栈数据结构的访问规则是LIFO(后进先出),而队列数据结构的访问规则是FIFO(先进先出),即队列在末端添加项，在前端移除项。实现这一结构的方法是push(末端添加),shift(前端移除),前面已经说过push，接下来主要说shift

### shift

> shift方法能够移除数组的第一项并且返回该项，同时将数组的长度减一

**DEMO**

```js
    var arr=[1,2,3,4];
    var reNum=arr.shift();//1
        console.log(reNum,arr.length)//1,3
```

**测试**
![img](https://segmentfault.com/img/bVqqbj)

### unshift

> unshift与shift**作用相反**，在数组的前端添加任意个项，并且返回该数组的长度。

**DEMO**

```js
    var arr=[1,2,3,4];
var reLen=arr.unshift(0);//5
    reLen2=arr.unshift(-2,-1);//7
    console.log('reLen='+reLen,'reLen2='+reLen2,'arr='+arr)
```

**测试**
![img](https://segmentfault.com/img/bVqqbQ)

## 排序方法

> 数组中存在两个直接用来排序的方法：reverse和sort，其中reverse用来逆反数组，sort则默认按照字母顺序进行排序。

### reverse

> reverse 将对原来的数组进行反转，并返回改变后的数组，其会改变原数组的值。

**DEMO**

```js
    var arr=[5,4,3,2,1];
    var reverseArr=arr.reverse();
    console.log('arr:'+arr,'reverseArr:'+reverseArr);
```

**测试**
![img](https://segmentfault.com/img/bVqqcO)

### sort

> 在默认情况下，sort方法按照升序排列数组项，为了实现排序，sort会调用每个数组项的**toString**方法，然后比较得到的字符串，以确定如何进行排序。故sort方法是通过字符串进行比较的，即使数组的每一项是数字类型亦是如此。

**DEMO**

```js
    var sortArr=[0,1,5,10,15];
        sortArr.sort();
        console.log(sortArr);//0,1,10,15,5
```

**测试**
![img](https://segmentfault.com/img/bVqqdo)
**为了能够对数组进行我们想要的排序，可以给sort传一个比较函数作为参数**

```js
     var sortArr=[0,1,5,10,15];
        sortArr.sort(function(a,b){
            return a-b//升序
            /*
                return b-a//降序
            */
        });
        console.log(sortArr);//[0,1,5,10,15]
```

**测试**
![img](https://segmentfault.com/img/bVqqeE)

## 转换方法

> 所有对象都有toLocalString()、toString()、valueOf()方法。

### toString

> 将一个值转换成一个字符串有两种方法，一是使用toString()方法，二是使用转型函数String() **(当然还有添加空字符串的方式)**

**以下几点需要注意**

1. 几乎所有值都有toString方法，说明有的值是没有的，比如null、undefined
   **推荐观看**[toString](https://msdn.microsoft.com/zh-cn/library/k6xhc6yc%28v=vs.94%29.aspx)

```js
    var num=10;
    var boolean1=true;
    var str='谦龙';
    var obj={"name":"谦龙"};
    var arr=[1,2,3,4];
    var nul=null;
    var undefined1=undefined;
    
    console.log( num.toString())
    console.log( boolean1.toString())
    console.log( str.toString())
    console.log( obj.toString())
    console.log( arr.toString())
    console.log( nul.toString())
    console.log( undefined1.toString())
```

**测试**
![img](https://segmentfault.com/img/bVqqxT)

1. 对于字符串类型的数值也可以使用toString方法，返回值是该字符串的副本
2. toString方法接收一个参数，表示将要转换的数值的基数(默认是10)，**注意**只最**数值**起作用

**DEMO**

```js
     var num=10;
    var num2='10';
    console.log(num.toString()) // '10'
    console.log(num.toString(2))// '1010'
    console.log(num.toString(8))// '12'
    console.log(num.toString(16))//'a'
    console.log(num2.toString(2)) // '10'不是1010  只对数值起作用
    
```

**测试**
![img](https://segmentfault.com/img/bVqqxn)

### valueOf

> 返回指定对象的基元值。

**推荐观看**[valueOf](https://msdn.microsoft.com/zh-cn/library/ftx8swz5%28v=vs.94%29.aspx)
**DEMO**

```js
var arr=[1,2,3,4];
var bl=true;
 function fn(){console.log('谦龙')};
var num=10;
var str='谦龙';
var obj=/\d/;
console.log(arr.valueOf(),typeof( arr.valueOf()));
console.log(bl.valueOf(),typeof( bl.valueOf()));
console.log(fn.valueOf(),typeof( fn.valueOf()));
console.log(num.valueOf(),typeof( num.valueOf()));
console.log(str.valueOf(),typeof( str.valueOf()))
console.log(obj.valueOf(),typeof( obj.valueOf()));
```

**测试**
![img](https://segmentfault.com/img/bVqqGn)

### toLocalString

> toLocalString方法作用几乎和toString相同

### join

> 将数组中的元素用不同的分隔符连接成字符串（默认是"，"号）

**DEMO**

```js
    var arr=[1,2,3,4,5];
        console.log(arr.join());
        console.log(arr.join(''));
        console.log(arr.join('+'))
```

**测试**
![img](https://segmentfault.com/img/bVqqKw)

## 操作方法

### concat

> concat方法可以基于当前数组中的所有项创建一个**新的数组**，具体来说：

1. 该方法会先创建一个当前数组的副本，然后将接收到的参数添加到这个数组的末尾，最后返回新构建的数组。
2. 如果传递的是一个或者多个数组，则会将这些数组中的每一项都添加到结果数组中。
3. 如果传递的不是数组，这些值就会被简单的添加到结果数组的末尾。
   **DEMO**

```js
    var sourceArr=[0];
    var reArr=sourceArr.concat(1,[2,3],[4,5]);
        console.log('sourceArr'+sourceArr,'reArr'+reArr);
```

**测试**
![img](https://segmentfault.com/img/bVqqL4)

### slice

> 基于当前数组的一项或者多项创建一个**新的数组**，slice方法接受一个或者两个参数。**一个参数时**：返回该参数**指定的位置**到当前数组末尾的所有项。**两个参数时**：返回起始位置到结束位置之间的项（不包括结束位置并且该方法不影响原来的数组）

**DEMO**

```js
    var arr=[1,2,3,4,5];
    var arr2=arr.slice(0);// 0-末尾所有元素
    var arr3=arr.slice(0,3)// 0-3 不包括3的位置的元素
    var arr4=arr.slice(-3,-1);//即最后一个元素是-1 以此往左类推 所以得到的结果是[3,4]
    console.log(arr2);
    console.log(arr3);
    console.log(arr4);
```

**测试**
![img](https://segmentfault.com/img/bVqqXx)

### splice

> slice方式可以说是数组中功能最强大的方法，可以完成任意位置的**插入**，**删除**和**替换**操作

**插入**：可以向任意位置插入任意数量的项，提供三个参数--插入的起始位置、0（删除元素的个数）、插入的元素（如果要插入多个元素，再传入第四第五...个参数），返回被删除的项目（如果没有被删除的元素返回的是[]空数组）。
**DEMO**

```js
    var arr=[1,2,3,4,5];
    var reArr=arr.splice(1,0,'谦龙','谦龙2','谦龙3');
    console.log(arr,reArr);
```

![img](https://segmentfault.com/img/bVqqYa)
**删除**：可以删除任意数量的项，需要指定2个参数，要删除的第一项的位置和要删除的项数。
**DEMO**

```js
    var arr=[1,2,3,4,5];
    var reArr=arr.splice(0,2);
    console.log(arr,reArr);
    
    var arr=[1,2,3,4,5];
    var reArr=arr.splice(5,2);//注意这里的5不在数组的范围内
    console.log(arr,reArr)
    
```

![img](https://segmentfault.com/img/bVqqYF)

**替换**:可以向指定的位置插入任意数量的项，且同时删除任意数量的项，需要提供三个参数
**DEMO**

```js
    var arr=[1,2,3,4,5];
    var reArr=arr.splice(0,2,'谦龙');
    console.log(arr,reArr)
```

**测试**
![img](https://segmentfault.com/img/bVqqY0)

## 位置方法

> 数组中有两个位置方法：indexOf和lastIndexOf。都接收两个参数---要查找的项和（可选）表示查找起点的索引。其中indexOf从数组开头开始往后查找，lastIndexOf从后往前查找，返回值是项在数组中的位置或者-1（没有找到）

### indexOf 和 lastIndexOf

**DEMO**

```js
   var arr=[1,2,3,'谦龙',4,5,'谦龙',6];
    console.log(arr.indexOf('谦龙'));//3
    console.log(arr.indexOf('帅哥'));//-1
   console.log(arr.lastIndexOf('谦龙'));//6
```

**测试**
![img](https://segmentfault.com/img/bVqqZS)

## 迭代方法

> ECMAScript为数组定义了5个迭代的方法，每个方法都可以接受两个参数，要在每一项运行的函数和（可选）运行该函数的作用域对象---影响的是this的值。而传入的函数有三个参数分别是：数组项的值，索引，数组本身。

### forEach

> 对数组的每一项运行给定的函数，没有返回值。

**DEMO**

```js
    var arr=[1,2,3,4,5];
        arr.forEach(function(item,index,arr){
            console.log(item,index,arr);
        })
```

**测试**
![img](https://segmentfault.com/img/bVqq0q)
**特别注意：**除了以上的基本用法，forEach中默认的this指的是window对象，所以其可以接受一个用来改变this的参数。
**DEMO**

```js
var arr=[1,2,3,4];
arr.forEach(function(item,index,arr){
   console.log(this)
},arr);
```

**测试**
![img](https://segmentfault.com/img/bVqw6c)

### map

> 对数组的每一项运行有返回值的函数，最后映射成一个新的数组。

**DEMO**

```js
    var arr=[1,2,3,4,5];
    arr.map(function(item,index,arr){
    console.log(this);
    return item*item;
    },arr)
```

**测试**
![img](https://segmentfault.com/img/bVqw6Z)

### filter

> 有过滤筛选的含义，接收一个有返回值为**弱==true**的函数，最后返回一个过滤后的新数组。关于this指向的问题与上面的forEach和map是一样的

**DEMO**

```js
    var arr=[1,2,3,4,5,6,7];
    var newArr=arr.filter(function(item){
     if(item%2==0){
        return true;//返回值为布尔
      }
      //也可以直接写成 return item%2;
    })
    console.log(newArr)
```

**测试**
![img](https://segmentfault.com/img/bVqw71)

### every 和some

> 接收一个返回值为布尔值的函数，如果对于数组中的每一项，该函数都是返回true则，该方法返回true。**注意**该方法和前面的几个方法不同，不会返回数组，而是返回一个布尔值。some也是如此

**DEMO**

```js
       var arr=[1,2,3,4,5];
        var b=arr.every(function(item){
            return item%2==0?true:false;
        });
        console.log(b) 
        
        ar arr=[1,2,3,4,5];
        var b=arr.some(function(item){
            return item%2==0?true:false;
        });
        console.log(b)
```

**测试**
![img](https://segmentfault.com/img/bVqw8G)

## 减小方法

> ES5中对数组新增了两个"缩小"方法(ps:缩小是相对的)，这两个方法都会迭代数组中的每一项，然后构建一个最终的返回值。reduce从第0项开始，ruduceRight从末尾开始。

### reduce

> 该函数接收一个函数参数，函数接受4个参数：之前值、当前值、索引值以及数组本身。initialValue参数可选，表示初始值。若指定，则当作最初使用的previous值；如果缺省，则使用数组的第一个元素作为previous初始值，同时current往后排一位，相比有initialValue值少一次迭代。

**DEMO**

```js
    var arr=[1,2,3,4];
    var sum=arr.reduce(function(pre,cur,index,arr){
        return pre+cur;
    });
    console.log(sum)
```

**测试**
![img](https://segmentfault.com/img/bVqw9p)

```js
// 初始设置
pre = initialValue = 1, cur = 2

// 第一次迭代
pre = (1 + 2) =  3, cur = 3

// 第二次迭代
pre = (3 + 3) =  6, cur = 4

// 第三次迭代
pre = (6 + 4) =  10, cur = undefined (退出)
```

### reduceRight

> 该函数接收一个函数参数，函数接受4个参数：之前值、当前值、索引值以及数组本身。initialValue参数可选，表示初始值。若指定，则当作最初使用的previous值；如果缺省，则使用数组的第一个元素作为previous初始值，同时current往后排一位，相比有initialValue值少一次迭代。

**DEMO**

```js
var arr=[1,2,3,4];
var reNum=arr.reduceRight(function(pre,cur,idnex,arr){
return pre+cur;
})
console.log(reNum)
```

**测试**
![img](https://segmentfault.com/img/bVqw9R)

```js
// 初始设置
pre = initialValue = 4, cur = 3

// 第一次迭代
pre = (4 +3) =  7, cur = 2

// 第二次迭代
pre = (7 + 2) =  9, cur = 1

// 第三次迭代
pre = (9 + 1) =  10, cur = undefined (退出)
```