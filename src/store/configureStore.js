import thunk from 'redux-thunk' // redux-thunk 支持 dispatch function，并且可以异步调用它
// import createLogger from 'redux-logger' // 利用redux-logger打印日志
import {createStore, applyMiddleware, compose} from 'redux' // 引入redux createStore、中间件及compose
import app from '../reducers/index.js'

import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

// 创建一个中间件集合
const middleware = [thunk, routerMiddleware(createHistory())]

// 利用compose增强store
const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)

finalCreateStore(app)

export default finalCreateStore
