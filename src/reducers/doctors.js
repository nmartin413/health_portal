
import {
  RECEIVE_USER
} from '../actions/session'

const initialState = {
   all: null,
}

const doctors = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { all: action.doctors })
    default:
      return state
  }
}

export default doctors
