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
                    <Button className='side-bar-btn' type="primary" onClick={this.toggleCollapsed}
                            style={{marginBottom: 16}}>
                        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </Button>
                </div>
                <Menu
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    className="side-bar-body"
                    inlineIndent={24}
                >
                    <SubMenu key="kol-manage1" className={'ant-menu-submenu-active'}
                             title={<span>
                                 <i className="anticon">
                                <img src={require('../../fetopic-assets/images/people.png')} alt=""/>
                            </i>
                                 <span>WEB 前端</span>
                             </span>}>
                        <Menu.Item key="kol-manage-user1" className={'ant-menu-submenu-active'}>
                            <Link className={'kol-ctr'} to={'/html'}>Html5</Link>
                        </Menu.Item>
                        <Menu.Item key="kol-manage-content1" className={'ant-menu-submenu-active'}>
                            <Link className={'kol-ctr'} to={'/css'}>CSS</Link>
                        </Menu.Item>
                        <Menu.Item key="kol-manage-content1" className={'ant-menu-submenu-active'}>
                            <Link className={'kol-ctr'} to={'/js'}>Javascript</Link>
                        </Menu.Item>
                    </SubMenu>


                    <Menu.Item key="/subtitler" className={'ant-menu-submenu-active'}>
                        <Link to={'/subtitler'}>
                            <i className="anticon">
                                <img src={require('../../fetopic-assets/images/subtitler.png')} alt=""/>
                            </i>
                            <span>iOS</span>
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
