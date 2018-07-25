import Actions from './const'
import ApiServices from '../util/ApiServices'
import {showLoading, hideLoading} from './loader'

/**
 * @class APP
 * @descrption 描述：通过用户ID获取用户信息
 **/

export const doGetZoneList = (options) => {
    return dispatch => {
        dispatch(showLoading())
        ApiServices.get('/zoneList', {
            data: options.payload,
            success: function (data) {
                dispatch(hideLoading())
                dispatch(GetZoneList(data))
                options.success && options.success(data)
            },
            error: function (data) {
                options.error && options.error(data)
                dispatch(hideLoading())
            }
        })
    }
}


/**
 * @class APP
 * @descrption 描述：添加弹弹号
 *
 *  userId               (必填):   int       (用户ID)
 zoneName             (必填):   string    (空间名称)
 zoneQQ               (必填):   string    (空间QQ)
 zoneType             (必填):   string    (空间类型)
 dailyView            (必填):   int       (说说浏览量)
 operationTime        (必填):   int       (运营时间)
 orderCount           (必填):   int       (订单次数)
 callback             (选填):   string    (jsonp 回调方法)

 **/

export const doPostZone = (options) => {
    return dispatch => {
        dispatch(showLoading())

        if (options.payload && options.payload.zoneId) {
            ApiServices.put('/zone', {
                data: options.payload,
                success: function (data) {
                    dispatch(hideLoading())
                    options.success && options.success(data)
                },
                error: function (data) {
                    console.error(options)
                    options.error && options.error(data)
                    dispatch(hideLoading())
                }
            })
        } else {
            ApiServices.post('/zone', {
                data: options.payload,
                success: function (data) {
                    dispatch(hideLoading())
                    options.success && options.success(data)
                },
                error: function (data) {
                    console.error(options)
                    options.error && options.error(data)
                    dispatch(hideLoading())
                }
            })
        }


    }
}

/**
 * @class APP
 * @descrption **删除空间
 userId               (必填):   int       (用户ID)
 zoneId               (必填):   int       (空间ID)
 callback             (选填):   string    (jsonp 回调方法)
 **/

export const doDeleteZone = (options) => {
    return dispatch => {
        dispatch(showLoading())
        ApiServices.delete('/zone', {
            data: options.payload,
            success: function (data) {
                dispatch(hideLoading())
                options.success && options.success(data)
            },
            error: function (data) {
                console.error(options)
                options.error && options.error(data)
                dispatch(hideLoading())
            }
        })
    }
}


export const GetZoneList = (payload) => {
    return {
        type: Actions.ZONE_LIST,
        payload
    }
}
