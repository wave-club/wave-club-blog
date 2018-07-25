/**
 * 顶层布局，处理顶部导航，尾部等
 */
import './Layout.scss'

import React from 'react'
import {
    Route,
    Switch,
    Router,
    Redirect
} from 'react-router-dom'
import history from '../history/history.js'
/**
 * @class APP 增加redux
 * injectTapEventPlugin 适配手机平板
 **/
import {
    Provider
} from 'react-redux'
import finalCreateStore from '../store/configureStore' //引入store配置
import reducer from '../reducers' // 引入reducers集合

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()


import 'antd/dist/antd.css'
import '../util/AnimateCss'
import '../util/Date'

// 给增强后的store传入reducer
export const store = finalCreateStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

import Loading from '../components/loading/Loading'
import Dashboard from '../containers/Dashboard'

import SideBar from '../components/side-bar/SideBar'



class Layout extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Provider store={store}>
                <div className="app-layout">
                    <Router history={history}>
                        <div>
                            {/*<SideBar/>*/}
                            <Switch>
                                <Route exact={true} path="/FETopic" render={() => <Dashboard />}/>
                                <Redirect from='/*' to='/FETopic'/>
                            </Switch>
                        </div>
                    </Router>
                    <Loading/>
                </div>
            </Provider>
        )
    }
}

export default Layout
