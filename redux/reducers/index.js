import { combineReducers } from 'redux'
import { authReducer } from './authentication'

const rootReducer = combineReducers({
    authentication: authReducer
})

export default rootReducer