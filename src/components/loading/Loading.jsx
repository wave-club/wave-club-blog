import './loading.scss'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Loading extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    static propTypes = {
        isLoading: PropTypes.bool
    }

    render() {
        const { isLoading } = this.props
        return (
            <div className="loader" style={{display: isLoading ? 'block' : 'none' }}>
                <div className="loader-inner ball-beat">
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return state.common ? {
        isLoading: state.common.isLoading
    } : {}
}

export default connect(mapStateToProps, null)(Loading)

