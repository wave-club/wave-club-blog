import './Audios.scss'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AudiosList from './audios-list/AudiosList'

class Audios extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="audios">
                <AudiosList/>
            </div>
        )
    }

}

const mapDispatchToProps = () => {
    return {}
}

export default connect(null, mapDispatchToProps)(Audios)
