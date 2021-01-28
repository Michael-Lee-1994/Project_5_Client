const initialState = {
    arrayResults: [],
    currentPage: 1,
    pageCap: null,
    singleSearchId: null,
    singleResults: [],
}

export const searchReducer = (state=initialState, action) => {
    
    switch (action.type) {
        case 'SEARCHRESULTS':
            if(state.currentPage > 1) {
                action.payload["Search"].shift()
                return {
                    ...state,
                    arrayResults: [...state.arrayResults, ...action.payload["Search"]],
                    pageCap: parseInt(action.payload["totalResults"]/10) + 1
                }
            } else {
                return {
                    ...state,
                    arrayResults: [...state.arrayResults, ...action.payload["Search"]],
                    pageCap: parseInt(action.payload["totalResults"]/10) + 1
                }
            }
        case 'CLEARSEARCH':
            return initialState
        case 'SINGLESEARCHRESULTS':
            return {
                ...state,
                singleResults: action.payload
            }
        case 'UPDATEPAGE':
            if (state.currentPage < state.pageCap) {
                return {
                    ...state,
                    currentPage: ++state.currentPage
                }
            }
            return state
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