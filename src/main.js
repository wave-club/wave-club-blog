// 先引进 CSS 再引 JS 模块
import "babel-polyfill"
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'


import App from './App'

const renderRoot = Component =>
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )

renderRoot(App)
if (module.hot) module.hot.accept('./App', () => renderRoot(App))


