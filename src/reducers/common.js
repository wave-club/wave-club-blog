import Actions from '../actions/const'

const initialState = {
    isLoading: false
}

export default function common(state = initialState, action) {

    switch (action.type) {
        case Actions.SHOWLOADING:
            return Object.assign({}, state, {isLoading: true})
        case Actions.HIDELOADING:
            return Object.assign({}, state, {isLoading: false})
        case Actions.SIDE_BAR:
            console.warn(action)
            return Object.assign({}, state, {...action.payload})
        default:
            return state
    }
}
