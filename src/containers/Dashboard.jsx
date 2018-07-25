import './Dashboard.scss'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Route
} from 'react-router-dom'

import Audios from '../components/audios/Audios'

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {



    }


    render() {
        return (
            <div className="dashboard">
                <Audios/>
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
