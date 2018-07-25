import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Route
} from 'react-router-dom'


class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {



    }


    render() {
        return (
            <div className="dashboard">
                dashboard
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
