const RegExps = {
    phone: {
        test: "^1[0-9]{10}$",
        error: "请输入正确的手机号码"
    },
    password: {
        test: "^.{6,20}$",
        error: "请输入6-20位密码"
    },
    idCode: {
        test: "^\\d{6}$",
        error: "请输入6位数的验证码"
    },
    username: {
        test: "[\\u4e00-\\u9fa5]{1,20}|[a-zA-Z\.\\s]{1,20}",
        error: "请输入正确的昵称"
    },
    shenfenzheng: {
        test: "^\\d{15}|\\d{17}[0-9Xx]$",
        error: "请输入正确的身份证号码"
    },
    qq: {
        test: "^[1-9]*[1-9][0-9]*$",
        error: "QQ号码格式不正确"
    },
    letter: {
        test: "^.+$",
        error: "请输入正确的格式"
    }
}


export default RegExps