import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { searchReducer } from './searchReducer'
// import { addShowReducer } from './addShowReducer'

const rootReducer =  combineReducers({
   authReducer,
   searchReducer,
   // addShowReducer
})

export default rootReducer