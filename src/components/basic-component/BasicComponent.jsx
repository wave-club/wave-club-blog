import React, {Component} from 'react'
import RegExps from '../../util/RegExps'

class BasicComponent extends Component {

    constructor(props) {
        super(props)
        this.defineState = this.defineState.bind(this)
        this.getTxtIsError = this.getTxtIsError.bind(this)
    }

    defineState(key, value, cb) {
        this.setState({
            [key]: value
        }, () => {
            cb && cb()
        })
    }

    getTxtIsError(regTag, txt) {
        // console.error(txt)
        if (!txt) return true
        return !(new RegExp(RegExps[regTag].test).test(txt))
    }


}


export default BasicComponent
