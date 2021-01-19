export const authReducer = (state=[], action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return [...state, action.payload]
        case 'LOGIN':
            return state.filter(v => v.name !== action.payload.name)
        case 'LOGOUT':
            return state.filter(v => v.name !== action.payload.name)
        default:
            return state
    }
}