import {
  REQUEST_PATIENT_LIST,
  RECEIVE_PATIENT_LIST,
  RECEIVE_PATIENT_LIST_ERROR
} from '../actions/user'

const initialState = {
   id       : null,
   error    : false,
   email    : null,
   pending  : true,
   userType : null,
}

const user = (state = initialState, action) => {
  console.log({ action })

  switch (action.type) {
    case REQUEST_USER:
      return Object.assign({}, state, { pending: true })

    case RECEIVE_USER:
      return Object.assign({}, state, action.user, { pending: false, error: false })

    case RECEIVE_USER_ERROR:
      return Object.assign({}, state, { pending: true, error: true })

    default:
      return state
  }
}

export default user
