// const initialState = {
//     watchList: [],
//     watchedList: [],
//     favorites: []
// }

// export const addShowReducer = (state=initialState, action) => {
    
//     switch (action.type) {
//         case 'ADDTOWATCHLIST':
//             console.log("in reducer", action.payload.user_shows)
//             return {
//                 ...state,
//                 watchedList: action.payload.user_shows
//             }
//         case 'ADDTOWATCHEDLIST':
//             return initialState
//         case 'ADDTOFAVORITES':
//             return {
//                 ...state,
//                 singleResults: action.payload
//             }
//         case 'UPDATEPAGE':
//             if (state.currentPage < state.pageCap) {
//                 return {
//                     ...state,
//                     currentPage: ++state.currentPage
//                 }
//             }
//             return state
//         case 'ERROR':
//             console.log(action.payload)
//             return {
//                 ...state,
//                 appError: action.payload
//             }
//         default:
//             return state
//     }
// }