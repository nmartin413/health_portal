import session           from './session'
import doctors           from './doctors'
import patients          from './patients'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({ session, patients, doctors })

export default rootReducer
