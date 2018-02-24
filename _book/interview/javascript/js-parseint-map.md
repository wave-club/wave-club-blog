# ["1", "2", "3"].map(parseInt) 答案是多少？

```javascript
parseInt() 函数能解析一个字符串，并返回一个整数，需要两个参数 (val, radix)，
 其中 radix 表示要解析的数字的基数。【该值介于 2 ~ 36 之间，并且字符串中的数字不能大于radix才能正确返回数字结果值】;
 但此处 map 传了 3 个 (element, index, array),我们重写parseInt函数测试一下是否符合上面的规则。

 function parseInt(str, radix) {
     return str+'-'+radix;
 };
 var a=["1", "2", "3"];
 a.map(parseInt);  // ["1-0", "2-1", "3-2"] 不能大于radix

 因为二进制里面，没有数字3,导致出现超范围的radix赋值和不合法的进制解析，才会返回NaN
 所以["1", "2", "3"].map(parseInt) 答案也就是：[1, NaN, NaN]

 详细解析：http://blog.csdn.net/justjavac/article/details/19473199
```