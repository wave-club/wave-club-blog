import Actions from './const'

export const sideBar = (payload) => {
    return {
        type: Actions.SIDE_BAR,
        payload
    }
}

export const doChangeSideBar = (options) => {
    return dispatch => {
        dispatch(sideBar(options))
    }
}

