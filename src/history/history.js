import {createHashHistory} from "history"

/**
 * @class 配置路由service
 **/
const history = createHashHistory({
    forceRefresh: false,
    basename: '/'
})
export default history