#js数组去重



**数组去重**

今天要聊的，也是我以前笔试时碰到过的一个问题，数组去重，不知道现在的笔试题还考不考这个？

数组去重，一般需求是给你一个数组，调用去重方法，返回数值副本，副本中没有重复元素。一般来说，两个元素通过 === 比较返回 true 的视为相同元素，需要去重，所以，1 和 "1" 是不同的元素，1 和 new Number(1) 是不同的元素，{} 和 {} 是不同的元素（引用不同）。（当然如果需求认为 {} 和 {} 算作相同的元素，那么解法就不一样了）

**方法一**

无需思考，我们可以得到 O(n^2) 复杂度的解法。定义一个变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在在 res 中了，则说明是重复的元素，如果没有，则放入 res 中。



> function unique(a) {
>
>   var res = [];
>
>  
>
>   for (var i = 0, len = a.length; i < len; i++) {
>
> ​    var item = a[i];
>
>  
>
> ​    for (var j = 0, jLen = res.length; j < jLen; j++) {
>
> ​      if (res[j] === item)
>
> ​        break;
>
> ​    }
>
>  
>
> ​    if (j === jLen)
>
> ​      res.push(item);
>
>   }
>
>  
>
>   return res;
>
> }
>
>  
>
> var a = [1, 1, '1', '2', 1];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, "1", "2"]

代码非常简单，那么是否能更简洁些？如果不考虑浏览器兼容，我们可以用 ES5 提供的 Array.prototype.indexOf 方法来简化代码。

> function unique(a) {
>
>   var res = [];
>
>  
>
>   for (var i = 0, len = a.length; i < len; i++) {
>
> ​    var item = a[i];
>
>  
>
> ​    (res.indexOf(item) === -1) && res.push(item);
>
>   }
>
>  
>
>   return res;
>
> }
>
>  
>
> var a = [1, 1, '1', '2', 1];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, "1", "2"]

既然用了 indexOf，那么不妨再加上 filter。

> function unique(a) {
>
>  
>
>   var res = a.filter(function(item, index, array) {
>
> ​    return array.indexOf(item) === index;
>
>   });
>
>   
>
>   return res;
>
> }
>
>  
>
>  
>
> var a = [1, 1, '1', '2', 1];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, "1", "2"]

**方法二**

法一是将原数组中的元素和结果数组中的元素一一比较，我们可以换个思路，将原数组中重复元素的最后一个元素放入结果数组中。

> function unique(a) {
>
>   var res = [];
>
>  
>
>   for (var i = 0, len = a.length; i < len; i++) {
>
> ​    for (var j = i + 1; j < len; j++) {
>
> ​      // 这一步十分巧妙
>
> ​      // 如果发现相同元素
>
> ​      // 则 i 自增进入下一个循环比较
>
> ​      if (a[i] === a[j])
>
> ​        j = ++i;
>
> ​    }
>
>  
>
> ​    res.push(a[i]);
>
>   }
>
>  
>
>   return res;
>
> }
>
>  
>
>  
>
> var a = [1, 1, '1', '2', 1];
>
> var ans = unique(a);
>
> console.log(ans); // => ["1", "2", 1]

虽然复杂度还是 O(n^2)，但是可以看到结果不同，1 出现在了数组最后面，因为结果数组取的是元素最后一次出现的位置。

**方法三（sort)**

如果笔试面试时只答出了上面这样 O(n^2) 的方案，可能还不能使面试官满意，下面就来说几种进阶方案。

将数组用 sort 排序后，理论上相同的元素会被放在相邻的位置，那么比较前后位置的元素就可以了。

> function unique(a) {
>
>   return a.concat().sort().filter(function(item, pos, ary) {
>
> ​    return !pos || item != ary[pos - 1];
>
>   });
>
> }
>
>  
>
>  
>
> var a = [1, 1, 3, 2, 1, 2, 4];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, 2, 3, 4]

但是问题又来了，1 和 "1" 会被排在一起，不同的 Object 会被排在一起，因为它们 toString() 的结果相同，所以会出现这样的错误：

> var a = [1, 1, 3, 2, 1, 2, 4, '1'];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, 2, 3, 4]

当然你完全可以针对数组中可能出现的不同类型，来写这个比较函数。不过这似乎有点麻烦。

**方法四 （object）**

用 JavaScript 中的 Object 对象来当做哈希表，这也是几年前笔试时的解法，跟 sort 一样，可以去重完全由 Number 基本类型组成的数组。

> function unique(a) {
>
>   var seen = {};
>
>  
>
>   return a.filter(function(item) {
>
> ​    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
>
>   });
>
> }
>
>  
>
>  
>
> var a = [1, 1, 3, 2, 1, 2, 4];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, 3, 2, 4]

还是和方法三一样的问题，因为 Object 的 key 值都是 String 类型，所以对于 1 和 "1" 无法分别，我们可以稍微改进下，将类型也存入 key 中。

> function unique(a) {
>
>   var ret = [];
>
>   var hash = {};
>
>  
>
>   for (var i = 0, len = a.length; i < len; i++) {
>
> ​    var item = a[i];
>
>  
>
> ​    var key = typeof(item) + item;
>
>  
>
> ​    if (hash[key] !== 1) {
>
> ​      ret.push(item);
>
> ​      hash[key] = 1;
>
> ​    }
>
>   }
>
>  
>
>   return ret;
>
> }
>
>  
>
>  
>
> var a = [1, 1, 3, 2, '4', 1, 2, 4, '1'];
>
> var ans = unique(a);
>
> console.log(ans); // => [1, 3, 2, "4", 4, "1"]

虽然解决了讨厌的 1 和 "1" 的问题，但是还有别的问题！

> var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
>
> var ans = unique(a);
>
> console.log(ans); // => [Object, String]

但是如果数组元素全部是基础类型的 Number 值，键值对法应该是最高效的！

**方法五 （ES6）**

ES6 部署了 Set 以及 Array.from 方法，太强大了！如果浏览器支持，完全可以这样：

> function unique(a) {
>
>   return Array.from(new Set(a));
>
> }
>
>  
>
> var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
>
> var ans = unique(a);
>
> console.log(ans); // => [Object, Object, String, Number]

**_.unique**

最后来看看 underscore 对此的实现方式，underscore 将此封装到了 _.unique 方法中，调用方式为 _.unique(array, [isSorted], [iteratee])。其中第一个参数是必须的，是需要去重的数组，第二个参数可选，如果数组有序，则可以传入布尔值 true，第三个参数可选，如果需要对数组迭代的结果去重，则可以传入一个迭代函数。而数组元素去重是基于 === 运算符的。

其实很简单，underscore 中的实现方式和上面的方法一相似。

我们来看它的核心代码：

> for (var i = 0, length = getLength(array); i  length; i++) {
>
>   var value = array[i],
>
> ​      // 如果指定了迭代函数
>
> ​      // 则对数组每一个元素进行迭代
>
> ​      computed = iteratee ? iteratee(value, i, array) : value;
>
>  
>
>   // 如果是有序数组，则当前元素只需跟上一个元素对比即可
>
>   // 用 seen 变量保存上一个元素
>
>   if (isSorted) {
>
> ​    // 如果 i === 0，则直接 push
>
> ​    // 否则比较当前元素是否和前一个元素相等
>
> ​    if (!i || seen !== computed) result.push(value);
>
> ​    // seen 保存当前元素，供下一次对比
>
> ​    seen = computed;
>
>   } else if (iteratee) {
>
> ​    // 如果 seen[] 中没有 computed 这个元素值
>
> ​    if (!_.contains(seen, computed)) {
>
> ​      seen.push(computed);
>
> ​      result.push(value);
>
> ​    }
>
>   } else if (!_.contains(result, value)) {  
>
> ​    // 如果不用经过迭代函数计算，也就不用 seen[] 变量了
>
> ​    result.push(value);
>
>   }
>
> }

外面的循环遍历数组元素，对于每个元素，如果数组有序，则和前一个元素比较，如果相同，则已经出现过，不加入到结果数组中，否则则加入。而如果有迭代函数，则计算传入迭代函数后的值，对值去重，调用 .contains 方法，而该方法的核心就是调用 .indexOf 方法，和我们上面说的方法一异曲同工。

关于 _.unique 方法的详细代码，可以参考 https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L519-L547





```js
//1.
Array.prototype.unique1 = function () {
  var n = []; //一个新的临时数组
  for (var i = 0; i < this.length; i++) //遍历当前数组
  {
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (n.indexOf(this[i]) == -1) n.push(this[i]);
  }
  return n;
}
//2.
Array.prototype.unique2 = function()
{
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (!n[this[i]]) //如果hash表中没有当前项
		{
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}
//3.
Array.prototype.unique3 = function()
{
	var n = [this[0]]; //结果数组
	for(var i = 1; i < this.length; i++) //从第二项开始遍历
	{
		//如果当前数组的第i项在当前数组中第一次出现的位置不是i，
		//那么表示第i项是重复的，忽略掉。否则存入结果数组
		if (this.indexOf(this[i]) == i) n.push(this[i]);
	}
	return n;
}
```