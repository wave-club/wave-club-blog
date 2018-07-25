/**
 * @class Date 时间格式转换
 * @descrption
 * **使用方式 new Date().format('yyyy-MM-dd  HH:mm:ss w')
 * **返回值 "2018-01-06  13:51:36 星期六"
 **/

Date.prototype.format = function (format) {
    let weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds(),
        "w+": this.getDay()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in date) {
        if (date.hasOwnProperty(k)) {
            if (k === "w+") {
                format = format.replace("w", weekdays[date[k]])
            } else if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
            }
        }
    }
    return format
}

/**
 * @class Number 时间戳格式转换
 * @descrption  依赖于 Date.prototype.format
 * **使用方式 Number(1514764800).toDateFormat('yyyy-MM-dd HH:mm:ss w')
 * **返回值 "2018-01-01 08:00:00 星期一"
 **/

Number.prototype.toDateFormat = function (format) {
    if (isNaN(this)) throw SyntaxError("时间戳错误")
    let date = new Date(this * 1000)
    return date.format(format)
}
