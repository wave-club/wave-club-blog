/**
 * object-fit 不支持IE
 * 初始值	fill 可以继承
 * @class imgClip 图片不规则显示下，缩放的截取中间一块区域，
 * @descrption *image 图片元素 React 注意KEY 导致获取宽高的问题
 * css 可以设置 opacity 为0
 *
 **/

const imgClip = (image, boxWidth = 164, boxHeight = 164) => {
    let realWidth = image.width
    let realHeight = image.height
    image.style.position = 'relative'
    //让img的宽高相当于图片实际宽高的等比缩放，然后再偏移
    if (realWidth > realHeight) {
        image.width = (boxHeight / realHeight) * realWidth//等比缩放宽度
        image.height = boxHeight//跟p高度一致
        image.style.left = '-' + ((boxHeight / realHeight) * realWidth - boxWidth) / 2 + 'px'//设置图片相对自己位置偏移为img标签的宽度-高度的一半
    } else if (realWidth < realHeight) {
        image.width = boxWidth//跟p高度一致
        image.height = (boxWidth / realWidth) * realHeight//等比缩放高度
        image.style.top = '-' + ((boxWidth / realWidth) * realHeight - boxHeight) / 2 + 'px'//设置图片相对自己位置偏移为img标签的高度-宽度的一半
    } else {
        image.width = boxWidth
        image.height = boxHeight
    }
    //看css的设置可以去掉
    image.style.opacity = 1
    image.style.filter = 'alpha(opacity=100)'
}


// RemoveBadPathImages.js
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelectorAll('img').forEach(function(img){
        img.onerror = function(){this.style.display='none';};
    })
});