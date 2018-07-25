import { createBrowserHistory } from "history"

/**
 * @class 配置路由service
 **/
const history = createBrowserHistory({
    forceRefresh: false,
    basename: ''
})
export default history
