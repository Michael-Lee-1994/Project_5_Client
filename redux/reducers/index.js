import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { searchReducer } from './searchReducer'

const rootReducer =  combineReducers({
   authReducer,
   searchReducer
})

export default rootReducer