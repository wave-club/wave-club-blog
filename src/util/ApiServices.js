import {url, mock, basePatch} from '../config'
import {doPostLogin} from '../actions/login'
import {message} from 'antd'

//使用方式

class ApiServices {
    static headers() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }

    static get(route, params) {
        return this.fetchFunc(route, params, 'GET')
    }

    static post(route, params) {
        return this.fetchFunc(route, params, 'POST')
    }

    static patch(route, params) {
        return this.fetchFunc(route, params, 'PATCH')
    }

    static delete(route, params) {
        return this.fetchFunc(route, params, 'DELETE')
    }

    static put(route, parms) {
        return this.fetchFunc(route, parms, 'PUT')
    }

    static fetchFunc(route, params, method) {
        const JSONString = params.JSONString || false
        const type = method || params.method || 'GET'
        const data = params.data || {}
        const success = params.success
        const error = (data, status, request) => {
            message.error(data.message)
            params.error(data, status, request)
        }
        const timeout = params.timeout || 20000
        const headers = _.extend(ApiServices.headers(), params.headers)
        let mockSwitch = mock && params.mock
        const completeUrl = mockSwitch ? `${params.basePath || basePatch}${route}` : (params.completeUrl || `${url}${route}`)
        
        $.ajax({
            url: completeUrl,
            type: type,
            timeout: timeout,
            headers: headers,
            xhrFields: {
                withCredentials: true
            },
            data: data,
            success: function (data, status, request) {
                //测试环境下自动登录
                // (data.code === 102018) ? (doPostLogin({
                //     payload: {
                //         account: 'diyidan_test',
                //         password: '123456'
                //         // account: '3590183@qq.com',
                //         // password: 'huadu002'
                //     },
                //     success: () => {
                //         location.reload()
                //     }
                // })) : (!data.code ? success(data, status, request) : error(data, status, request))


                // 线上环境
                // !(data.code) ? success(data, status, request) : error(data, status, request)


                (data.code === 102018 || data.code === 102008) ? (location.href = '/#/login') : (!data.code ? success(data, status, request) : error(data, status, request))

            },
            error: (data, status, request) => {

                if (data.status === 403) {
                    location.href = '/#/login'
                }
                error(data, status, request)
            }
        })

    }
}

export default ApiServices
