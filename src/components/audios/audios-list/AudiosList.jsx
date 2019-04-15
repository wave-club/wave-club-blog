import './AudiosList.scss'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class AudiosList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="audios-list">
                audios-list
            </div>
        )
    }

}

const mapDispatchToProps = () => {
    return {}
}

export default connect(null, mapDispatchToProps)(AudiosList)
