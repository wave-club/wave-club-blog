/**
 * @class APP
 * @descrption ** JavaScript 异常的防范与监控
 * @property props.user &&
     props.user.posts &&
     props.user.posts[0] &&
     props.user.posts[0].comments &&
     props.user.posts[0].comments[0]
    解决上述多层次判断的问题
     Qulity.flat(['user', 'posts', 0, 'comments'], props)
 **/
class Qulity {

    // 主动防御
    static flat = (p, o) => {
        return p.reduce(function (xs, x) {
            return (xs && xs[x]) ? xs[x] : null
        }, o)
    }


}

