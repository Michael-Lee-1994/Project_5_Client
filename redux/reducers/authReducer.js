const initialState = {
    currentUser: null,
    isLoading: true,
    isLoggedIn: false
}

export const authReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SIGNUP':
            console.log("this is in my action",action.payload)
            return true
        case 'LOGIN':
            return {
                ...state,
                currentUser: action.payload.user,
                isLoggedIn: true
            }
        case 'LOGOUT':
            console.log("in action")
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null
            }
        case 'UPDATE':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'ERROR':
            console.log(action.payload)
            return {
                ...state,
                appError: action.payload
            }
        case 'DELETE':   
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null
            }
        case 'LOADING':
            return {
                ...state, 
                isLoading: action.payload
            }
        default:
            return state
    }
}