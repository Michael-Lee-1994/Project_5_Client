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
        case 'UPDATEFAVORITE':
            let something = state.watchedList.map((show) => show.id !== action.payload.id ? show : action.payload)
            let newFav = something.filter((show) => show.favorite === true)
            console.log("fav", newFav)

            return {
                ...state,
                watchedList: something,
                favorites: newFav,
                isLoggedIn: true,
            }
        case 'UPDATEWATCH':
            let newsomething = state.watchedList.map((show) => show.id !== action.payload.id ? show : action.payload)
            let newWatch = newsomething.filter((show) => show.currently_watching === true)
            console.log("fav", newWatch)

            return {
                ...state,
                watchedList: newsomething,
                watchList: newWatch,
                isLoggedIn: true,
            }
        default:
            return state
    }
}