import './SideBar.scss'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Icon, Button, Switch} from 'antd'
import {doChangeSideBar} from '../../actions/common'
import {Link, withRouter} from 'react-router-dom'
/*
 import history from '../../history/history'
 */

const SubMenu = Menu.SubMenu

class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapsed: this.props.sideType || false,
        }
    }


    toggleCollapsed = () => {
        const {doChangeSideBar} = this.props
        this.setState({
            collapsed: !this.state.collapsed,
        }, () => {
            doChangeSideBar({
                sideType: this.state.collapsed
            })
        })
    }

    componentDidMount() {

    }


    render() {
        const {collapsed} = this.state
        /*

         console.log(this.props)
         const pathName = history.location.pathname
         */

        return (
            <div className={"side-bar " + (this.props.location.pathname === '/login' ? 'hide' : '')}
                 style={{width: !collapsed ? 220 : 80}}>

                <div className={`side-bar-header ${collapsed ? 'min' : ''}`}>
                    {!collapsed && <h3 key={'home'}>FE 分享你的世界</h3>}

                </div>
                <Menu
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    className="side-bar-body"
                    inlineIndent={24}
                >
                    <Menu.Item key="/audio" className={'ant-menu-submenu-active ant-menu-item-selected'}>
                        <Link to={'/audio'}>
                            <i className="anticon">
                                <img src='https://raw.githubusercontent.com/976500133/FETopic/master/src/fetopic-assets/images/subtitler.png' alt=""/>
                            </i>
                            <span>我的录音</span>
                        </Link>
                    </Menu.Item>


                </Menu>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return state.common ? {
        sideType: state.common.sideType
    } : {}
}


const mapDispatchToProps = (dispatch) => {
    return {
        doChangeSideBar: (payload) => dispatch(doChangeSideBar(payload))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))
