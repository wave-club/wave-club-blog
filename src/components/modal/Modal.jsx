/**
 * @description 对话框、遮罩层
 **/

import './Modal.scss'

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Modal extends Component {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        title: PropTypes.string,
        className: PropTypes.string
    }

    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props
        const className = props.className

        return (
            <div className={"modal " + className} title={props.title}>
                <div className="modal-body" style={{width: props.width + 'px'}}>
                    <div className="modal-content-container" style={{height: props.height + 'px'}}>
                        {React.Children.map(props.children, ele => {
                            return React.cloneElement(ele)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}