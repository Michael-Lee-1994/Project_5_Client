import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { searchReducer } from './searchReducer'
import { searchAnimeReducer } from './searchAnimeReducer'

const rootReducer =  combineReducers({
   authReducer,
   searchReducer,
   searchAnimeReducer
})

export default rootReducer