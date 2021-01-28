const initialState = {
    currentUser: null,
    isLoading: true,
    isLoggedIn: false,
    watchList: [],
    watchedList: [],
    favorites: []
}

export const authReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SIGNUP':
            console.log("this is in my action",action.payload)
            return true
        case 'LOGIN':
            let favorites = action.payload.user.user_shows.filter((show) => show.favorite == true)
            let watch = action.payload.user.user_shows.filter((show) => show.currently_watching == true)
            // console.log("favs",favorites)
            // console.log("watch", watch)
            return {
                ...state,
                currentUser: action.payload.user,
                isLoggedIn: true,
                watchedList: action.payload.user.user_shows,
                favorites: favorites,
                watchList: watch

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
        case 'ADDTOWATCHLIST':
            // console.log("in reducer", action.payload.user_shows)
            return {
                ...state,
                watchedList: action.payload.user_shows
            }
        default:
            return state
    }
}