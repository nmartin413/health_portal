import get from 'lodash/get'

import {
  REQUEST_USER,
  RECEIVE_USER,
  RECEIVE_USER_ERROR
} from '../actions/session'

const initialState = {
   error   : false,
   user    : {},
   pending : true,
   doctors : null,
}

const DOCTOR_USER_GROUP  = 'doctor-user'
const PATIENT_USER_GROUP = 'patient-user'

const session = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return applyComputed(Object.assign({}, state, { pending: true }))

    case RECEIVE_USER:
      return applyComputed(Object.assign({}, state, {
        user    : action.user,
        doctors : action.doctors
      }, { pending: false, error: false }))

    case RECEIVE_USER_ERROR:
      return applyComputed(Object.assign({}, state, { pending: false, error: true }))

    default:
      return applyComputed(state)
  }
}

function applyComputed(state) {
  const userType = get(state, 'user.type')
  return Object.assign({}, state, {
    isDoctor  : (userType === DOCTOR_USER_GROUP),
    isPatient : (userType === PATIENT_USER_GROUP)
  })
}

export default session
