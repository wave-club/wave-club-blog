## Yun.js



>`这`是2012年开发的网站 ， 为自己做个笔记。里面当时封装了好多方法

http://www.cphi.cn/file/script/Yun.js

```javascript
/*

- author 刘俊斌 2012年11月9日 15:13:15
- var target=ev.target||ev.srcElement; //目标元素
- if(target.nodeName.toLowerCae()=='li')  //控制范围
  */
  var Yun_MOVE_TYPE = {BUFFER:1,FLEX:2,TIME:3}
  function getById(str){return document.getElementById(str);}//        获取id节点的封装
  function getByTag(oParent,aTag)    {return oParent.getElementsByTagName(aTag);};
  function getByClass(oParent,sClass)      //获取class节点的封装
  {
  var aResault = [];
  var aAry = oParent.getElementsByTagName('*');
  var re = new RegExp('\\b'+sClass+'\\b','g');
  for(var i=0;i<aAry.length;i++)
  {
  if(re.test(aAry[i].className)){aResault.push(aAry[i]);}
  }
  return aResault;
  }
  function addEvent(obj,sEv,fn) // 添加事件函数
  {
  if(obj.attachEvent){obj.attachEvent('on'+sEv,function()        {fn.call(obj)});}else{obj.addEventListener(sEv,fn,false);}
    }
  function getStyle(obj,attr) //获取非行间样式
  {
  if(obj.currentStyle){return obj.currentStyle[attr];}
    else{return document.defaultView.getComputedStyle(obj,false)    [attr];}
  }
  function css(obj,attr,value) //获取和设置非行间样式
  {
  if(arguments.length==2)    {return parseFloat(getStyle(obj,attr));}
  else if(arguments.length==3)
    {
  if((attr=='width'||attr=='height')&&parseFloat(value)<0)    {value = undefined;}
  switch(attr)
  {
    case 'width': case 'height': case 'paddingTop': case 'paddingLeft'  : case 'paddingRight': case 'paddingBottom':
  value = Math.max(value,0);
    case 'left': case 'top': case 'marginLeft': case 'marginTop': case '    marginRight': case 'marginBottom':
  obj.style[attr] = value+'px';  break;
  case 'opacity': obj.style.filter = 'alpha(opacity='+    (value*100)+')'; obj.style.opacity = value; break;
  default:
  obj.style[attr]=value;
  }
  return css;
  }
  }

function startMove(obj,json,fn) //缓冲运动第一套 -- 属性
{
clearInterval(obj.timer);
obj.timer = setInterval(function(){
var bStop = true;
for(var attr in json)
{
var iCur=0;
if(attr=='opacity')
{iCur=Math.round(parseFloat(getStyle(obj,attr))*100);}else{iCur = parseInt(getStyle(obj,attr));}
var iSpeed = (json[attr]-iCur)/8;var iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
if(iCur!=json[attr]){bStop = false;}
if(attr=='opacity'){obj.style.filter = 'alpha(opacity:'+(iCur+iSpeed)+')';obj.style.opacity = (iCur+iSpeed)/100;}
else{obj.style[attr] = iCur+iSpeed+'px';}
}
if(bStop){clearInterval(obj.timer);if(fn){fn();}}
},30)
}
function startmove(obj, json, iTime, fn) { //缓冲运动第二套 -- 时间
var iInterval = 30;
var iTimes = Math.ceil(iTime / iInterval);
var oSpeed = {};
var iEnd = (new Date()).getTime() + iTime;
for (var attr in json) oSpeed[attr] = (json[attr] - css(obj, attr)) / iTimes;
if (obj.timer) clearInterval(obj.timer);
obj.timer = setInterval(function() {
doMove(obj, json, oSpeed, iEnd, fn);
},
30);
}
function doMove(obj, json, oSpeed, iEnd, fn) {
var iNow = (new Date()).getTime();
var attr = '';
if (iNow >= iEnd) {
clearInterval(obj.timer);
obj.timer = null;
for (attr in json) css(obj, attr, json[attr]);
if (fn) fn(obj, json);
} else for (attr in json) if (oSpeed[attr]) css(obj, attr, css(obj, attr) + oSpeed[attr]);
}
function startMove_FLEX(obj,json,fn) //弹性运动
{
clearInterval(obj.timer);
obj.timer = setInterval(function()
{
var bStop=true;
var speed=0;
var cur=0;
for(var attr in json)
{
if(!obj.oSpeed)obj.oSpeed={};
if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
cur=css(obj, attr);
if(Math.abs(json[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1)
{
bStop=false;

obj.oSpeed[attr]+=(json[attr]-cur)/5;
obj.oSpeed[attr]*=0.7;
var maxSpeed=65;
if(Math.abs(obj.oSpeed[attr])>maxSpeed)
{
obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
}

css(obj, attr, cur+obj.oSpeed[attr]);
}
}

if(bStop)
{
clearInterval(obj.timer);
obj.timer=null;
if(fn)fn.call(obj);
}
},30)
}
function YunStartMove(obj,json,iType,fn) //混合运动
{
var fnMove = null;
switch(iType)
{
case Yun_MOVE_TYPE.BUFFER :
fnMove = startMove(obj,json,fn);
break;
case Yun_MOVE_TYPE.FLEX:
fnMove = startMove_FLEX(obj,json,fn);
break;

}
}
function createTag(url) //动态创建Tag
{
var oUrl = url.split('.');
var file = oUrl[oUrl.length-1];
if(file=='css')
{
var obj = document.createElement('link'),lik='href',tpe='text/css';
obj.setAttribute('rel','stylesheet');
}else
{
var obj = document.createElement('script'),lik='src',tpe='text/javascript';
}
obj.setAttribute(lik,url);obj.setAttribute('type',tpe);
file=='css' ? document.getElementsByTagName('head')[0].appendChild(obj):document.body.appendChild(obj);
return obj;
}
/*------------------漂浮窗口-----------------------*/
function floatDiv(divId,imgUrl,aHref,iSpeedX,iSpeedY)
{
var timer = null;
var iSpeedX = iSpeedX;
var iSpeedY = iSpeedY;
if(!iSpeedX){iSpeedX=2;}
if(!iSpeedY){iSpeedY=1;}
var oBj = document.createElement('div');
oBj.id = divId;
with(oBj.style)
{
zIndex = 9999999;
position = 'absolute';
overflow = 'hidden';
}
var oA = document.createElement('a');
oA.href = aHref;
var oCloseBox = document.createElement('a');
with(oCloseBox.style)
{
zIndex = 101;
width = '30px';
height = '20px';
position = 'absolute';
display = 'block';
right = '0px';
top = '0px';
cursor = 'pointer';
backgroundColor = 'red'
}
oCloseBox.onclick = hide;
var oImg = new Image();
oImg.src= imgUrl;
oImg.style.border = '0';
oA.appendChild(oImg)
oBj.appendChild(oA);
oBj.appendChild(oCloseBox);
document.body.appendChild(oBj);
oBj.onmousemove = floatStopMove;
oBj.onmouseout = move
function hide()
{
floatStopMove();
oBj.style.display = 'none';
}
function floatStopMove()
{
clearInterval(timer)
}
function move()
{
timer = setInterval(function()
{
var l = oBj.offsetLeft;
var t = oBj.offsetTop;
var w = document.documentElement.clientWidth-oBj.offsetWidth;
var h = document.documentElement.clientHeight-oBj.offsetHeight;
oBj.style.left = (l+iSpeedX) +'px';
oBj.style.top = (t+iSpeedY)+'px';
if(parseInt(oBj.style.left)>=w)
{
iSpeedX*=-1;
oBj.style.left =  w+'px'
}
else if(parseInt(oBj.style.left)<=0)
{
iSpeedX*=-1;
oBj.style.left = '0';
}
else if(parseInt(oBj.style.top)>=h)
{
iSpeedY*=-1;
oBj.style.top = h+'px';
}
else if(parseInt(oBj.style.top)<=0)
{
iSpeedY*=-1;
oBj.style.top = 0;
}
},30)
}
move();
}
/*--------------------------幻灯片-------------------------------*/
function flashPic(divId,Min_url,Min_url_on,Min_width,Min_height)
{
var timer = null;
var iNow = 0;
var obj = document.getElementById(divId);
var aLi = obj.getElementsByTagName('ul')[0].getElementsByTagName('li');
var smallUl = document.createElement('ul');
if(!Min_url){Min_url='red'}
if(!Min_url_on){Min_url_on='green'}
if(!Min_width){Min_width=14}
if(!Min_height){Min_height=11}
for(var i=0;i<aLi.length;i++)
{
aLi[i].onmouseover = function(){clearInterval(timer)};
aLi[i].onmouseout = function(){timer = setInterval(function(){doMove(iNow);},3000)}
var oli = document.createElement('li');
with(oli.style)
{
width = Min_width + "px";
height = Min_height + "px";
cssFloat = 'left';
styleFloat ='left';
margin = "5px 8px 0 0";
background = 'url('+Min_url+') no-repeat left top';
cursor = "pointer";
}
smallUl.appendChild(oli);
}
obj.appendChild(smallUl);
var smallPic = smallUl.getElementsByTagName('li');
var oT = smallUl.getElementsByTagName('li')[0];
var smallLeft = aLi.length*(oT.offsetWidth+css(oT,'marginRight'));
var oDix = css(oT,'marginRight');
with(smallUl.style)
{
position = 'absolute';
width = smallLeft+'px'
height = '20px';
right=(obj.offsetWidth- smallLeft)/2+'px';
bottom='10px';
zIndex=999999;
listStyle = 'none';
overflow = 'hidden';
}
for(var i=0;i<smallPic.length;i++)
{
smallPic[i].index=i;
smallPic[i].onmouseover =function(){ clearInterval(timer);  var iNow = this.index;flashShow(iNow);}
smallPic[i].onmouseout = function(){timer = setInterval(function(){doMove(iNow);},3000)}
}
var oBg = document.createElement('li');
smallUl.appendChild(oBg);
with(oBg.style)
{
position='absolute';
left = '0';
top = '5px';
width = 14 + "px";
height = 11 + "px";
cursor = "pointer";
background = 'url('+Min_url_on+') no-repeat left top'
}
oBg.onmouseover = function(){clearInterval(timer)};
oBg.onmouseout = function(){timer = setInterval(function(){doMove(iNow);},3000)}
function flashShow(iNum)
{
for(var i=0;i<aLi.length;i++){startMove(aLi[i],{opacity:0});}
startMove(aLi[iNum],{opacity:100})
/*YunStartMove(oBg,{left:smallPic[0].offsetWidth*iNum+oDix*iNum},Yun_MOVE_TYPE.BUFFER);*/
startmove(oBg,{left:smallPic[0].offsetWidth*iNum+oDix*iNum},10)
/*startmove(oBg,{left:smallPic[0].offsetWidth*iNum+oDix*iNum},200)*/
iNow = iNum;
}
function doMove(iNum)
{iNum++;if(iNum>aLi.length-1){iNum=0;};flashShow(iNum);}
timer = setInterval(function(){doMove(iNow);},3000)
}
/*-------------------随机运动图片---------------------*/
function randFlash(id)
{
var oRanDiv = document.getElementById(id);
var oZindexA = oRanDiv.getElementsByTagName('a')[0];
var aImg = oRanDiv.getElementsByTagName('img');
var aIMG_ARRAY = [];
var fnArray = null;
fnArray = [function (obj){randShow(obj,-1,0)},function (obj){randShow(obj,1,0)},function (obj){randShow(obj,0,1)},function (obj){randShow(obj,0,-1)}]
for(var i=0;i<aImg.length;i++)
{
aIMG_ARRAY.push(aImg[i]);

}
function randShow(obj,iLeft,iTop)
{
startmove(obj,{left:iLeft*obj.offsetWidth+obj.offsetLeft,top:iTop*obj.offsetHeight+obj.offsetTop,opacity:0},400,function()
{
css(obj,'left',0)(obj,'top',0)(obj,'opacity',1)(obj, 'zIndex', 1)
})
}
//randShow(aIMG_ARRAY[2],0,1)
function picShow()
{
this.blur();
for(var i=0;i<aIMG_ARRAY.length;i++)
{
css(aIMG_ARRAY[i],'zIndex',i+2)(aIMG_ARRAY[i],'opacity',1);
}
var oImg = aIMG_ARRAY.pop();
aIMG_ARRAY.unshift(oImg);
fnArray[parseInt(Math.random()*999999)%aIMG_ARRAY.length](oImg)
}
oZindexA.onclick = oZindexA.onmouseover = picShow;
}
function MoveTOTOP(backTopId)
{
var backtop = document.getElementById(backTopId);
var timer=null;
var bySys=false;
window.onscroll = function()
{
if(!bySys){clearInterval(timer);};bySys=false;
var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
scrolltop==0 ? backtop.style.display = 'none' : backtop.style.display = 'block';
}
backtop.onclick = function()
{
timer = setInterval(function(){
var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
var speed=(Math.floor(-scrolltop/8));
bySys=true;document.documentElement.scrollTop=document.body.scrollTop=scrolltop+speed;
if(scrolltop==0){clearInterval(timer);}
},30)
}
}
function MoveTOTOPLeft(backTopId)
{
var backtop = document.getElementById(backTopId);
var oClose = getById('to-close');
var timer=null;
var bySys=false;
window.onscroll = function()
{
var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
startmove(backtop,{top:(document.documentElement.scrollTop||document.body.scrollTop)+300},300);
}
oClose.onclick = function()
{
css(backtop,'display','none') ;

}
}
function ajax(url,fnSuccess,fnFaild) //ajax 的应用
{
//1.创建ajax对象
var oAjax=null;
if(window.XMLHttpRequest)
{
oAjax = new XMLHttpRequest();
}
else
{
oAjax = new ActiveXObject('Microsoft XMLHTTP');

}
//2.打开服务器
//open(方法, url, 是否异步)
oAjax.open('GET',url,true)
oAjax.send();
oAjax.onreadystatechange = function()
{
if(oAjax.readyState==4&&oAjax.status==200)
{
fnSuccess(oAjax.responseText)
}
else
{
if(fnFaild)
{
fnFaild();
}
}
}

}
function randomSort(a,b) //随机排序法
{
return Math.random()>.5?-1:1;
}
function quicksort(arr) //快速排序由小到大
{
if(arr.length<=1){return arr;}
var arrMiddle = Math.floor(arr.length/2);
var arrMiddleValue = arr.splice(arrMiddle,1);
var aLeft = [];
var aRight = [];
for(var i=0;i<arr.length;i++)
{
if(arr[i]<arrMiddleValue)
{
aLeft.push(arr[i])
}else
{
aRight.push(arr[i])
}
}
return quicksort(aLeft).concat([arrMiddleValue],quicksort(aRight))
}
function evFocus(obj,str)
{
if(obj.value == str)
{
obj.value = '';
}
}
function evBlur(obj,str)
{
if(obj.value == '')
{
obj.value = str;
}
}
function testCheckBox(obj)
{
//id 必须是form的--不然获取不到name
var oDoc1 = document.getElementById(obj);
var aRangBox = oDoc1.aa.length;
var count = 0;
for(var i=0;i<aRangBox;i++)
{
if(oDoc1.aa[i].checked)
{
count++;
}else
{

}
}
if(!count)
{
alert('没选')
}
}
function getRndAndFillZero()
{
var str=Math.ceil(Math.random()*16777215).toString(16);
while(str.length<6)

{
str='0'+str;
}

return str;
}
```

