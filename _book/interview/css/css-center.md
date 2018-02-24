# 如何居中div？

- 水平居中：给div设置一个宽度，然后添加margin:0 auto属性

  ```css
   div{
   	width:200px;
   	margin:0 auto;
    }
  ```

- 让绝对定位的div居中

  ```css
   div {
   	position: absolute;
   	width: 300px;
   	height: 300px;
   	margin: auto;
   	top: 0;
   	left: 0;
   	bottom: 0;
   	right: 0;
   	background-color: pink;	/* 方便看效果 */
   }
  ```

- 水平垂直居中一

  ```css
   确定容器的宽高 宽500 高 300 的层
   设置层的外边距

   div {
   	position: relative;		/* 相对定位或绝对定位均可 */
   	width:500px;
   	height:300px;
   	top: 50%;
   	left: 50%;
   	margin: -150px 0 0 -250px;     	/* 外边距为自身宽高的一半 */
   	background-color: pink;	 	/* 方便看效果 */

    }
  ```

- 水平垂直居中二

  ```css
   未知容器的宽高，利用 `transform` 属性

   div {
   	position: absolute;		/* 相对定位或绝对定位均可 */
   	width:500px;
   	height:300px;
   	top: 50%;
   	left: 50%;
   	transform: translate(-50%, -50%);
   	background-color: pink;	 	/* 方便看效果 */

   }
  ```

- 水平垂直居中三

  ```css
   利用 flex 布局
   实际使用时应考虑兼容性

   .container {
   	display: flex;
   	align-items: center; 		/* 垂直居中 */
   	justify-content: center;	/* 水平居中 */

   }
   .container div {
   	width: 100px;
   	height: 100px;
   	background-color: pink;		/* 方便看效果 */
   }  
  ```