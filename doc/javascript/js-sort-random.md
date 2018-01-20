# 如何实现数组的随机排序？



```javascript
方法一：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	function randSort1(arr){
  		for(var i = 0,len = arr.length;i < len; i++ ){
  			var rand = parseInt(Math.random()*len);
  			var temp = arr[rand];
  			arr[rand] = arr[i];
  			arr[i] = temp;
  		}
  		return arr;
  	}
  	console.log(randSort1(arr));
  	
  方法二：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	function randSort2(arr){
  		var mixedArray = [];
  		while(arr.length > 0){
  			var randomIndex = parseInt(Math.random()*arr.length);
  			mixedArray.push(arr[randomIndex]);
  			arr.splice(randomIndex, 1);
  		}
  		return mixedArray;
  	}
  	console.log(randSort2(arr));

  方法三：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	arr.sort(function(){
  		return Math.random() - 0.5;
  	})
  	console.log(arr);
```