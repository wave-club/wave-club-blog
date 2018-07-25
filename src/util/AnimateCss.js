import '../fetopic-assets/css/animate.css'

$.fn.extend({
    animateCss: function (animationName, cb) {
        let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName)
            cb && cb()
        })
    }
})

