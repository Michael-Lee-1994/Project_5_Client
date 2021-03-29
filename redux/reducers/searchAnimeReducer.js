const initialState = {
    arrayResultsAnime: [],
    currentPageAnime: 0,
    currentSearchLink: "",
    nextSearchLink: "",
    lastSearchLink: "",
    searchCap: null,
    pageCapAnime: null,
    singleSearchIdAnime: null,
    singleResultsAnime: [],
}

export const searchAnimeReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SEARCHRESULTSANIME':
            if(state.currentPageAnime > 1) {
                // action.payload["Search"].shift()
                // console.log("meta", action.payload["meta"].count)
                return {
                    ...state,
                    currentSearchLink: action.payload["links"].first,
                    arrayResultsAnime: action.payload["data"],
                    pageCapAnime: action.payload["meta"].count,
                    searchCap: parseInt(action.payload["meta"].count/10) + 1,
                    nextSearchLink: action.payload["links"].next,
                    lastSearchLink: action.payload["links"].last
                }
            } else {
                return {
                    ...state,
                    arrayResultsAnime: [...state.arrayResultsAnime, ...action.payload["data"]],
                    nextSearchLink: action.payload["links"].next
                }
            }
        case 'CLEARSEARCHANIME':
            return initialState
        case 'SINGLESEARCHRESULTSANIME':
            return {
                ...state,
                singleResultsAnime: action.payload
            }
        case 'UPDATEPAGEANIME':
            if (state.lastSearchLink !== state.currentSearchLink) {
                // console.log( state.currentPageAnime)
                return {
                    ...state,
                    currentPageAnime: state.currentPageAnime + 10

                }
            }
            return state
        case 'ERROR':
            console.log("hi",action.payload)
            return {
                ...state,
                appError: action.payload
            }
        default:
            return state
    }
}