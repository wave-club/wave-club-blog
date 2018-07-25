import './Btns.scss'
import React from 'react'
import BasicComponent from '../basic-component/BasicComponent'
import PropTypes from 'prop-types'

export class BtnsXXL extends BasicComponent {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        labelTxt: PropTypes.string.isRequired
    }

    render() {
        const { labelTxt, onClick, className, disabled } = this.props
        return (
            <input type="button" disabled={disabled} value={labelTxt} className={`btn-shadow btns-xxl ${className}`} onClick={onClick} />
        )
    }

}


export class BtnsXL extends BasicComponent {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        labelTxt: PropTypes.string.isRequired
    }

    render() {
        const { labelTxt, onClick, className, disabled } = this.props
        return (
            <div className={`btn-shadow btns-xl ${className}`} disabled={disabled} onClick={onClick}>
                {labelTxt}
            </div>
        )
    }

}



export class BtnsL extends BasicComponent {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        labelTxt: PropTypes.string.isRequired
    }


    render() {
        const { labelTxt, onClick, className, disabled } = this.props
        return (
            <div className={`btn-shadow btns-l ${className}`} disabled={disabled} onClick={onClick}>
                {labelTxt}
            </div>
        )
    }

}




