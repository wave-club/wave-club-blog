import Actions from './const'

export const showLoading = () => {
    return {
        type: Actions.SHOWLOADING,
        isLoading: true
    }
}

export const hideLoading = () => {
    return {
        type: Actions.HIDELOADING,
        isLoading: false
    }
}
