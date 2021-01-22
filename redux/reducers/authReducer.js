const initialState = {
    currentUser: null,
    isLoading: true,
}

export const authReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SIGNUP':
            console.log("this is in my action",action.payload)
            return true
        case 'LOGIN':
            return state.filter(v => v.name !== action.payload.name)
        case 'LOGOUT':
            return state.filter(v => v.name !== action.payload.name)
        case 'ERROR':
            console.log(action.payload)
            return {
                ...state,
                appError: action.payload
            }
        default:
            return state
    }
}