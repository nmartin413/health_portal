import api from '../api'

export const REQUEST_PATIENT_LIST = 'REQUEST_PATIENT_LIST'
export function requestPatientList(searchParams) {
   return { type: REQUEST_PATIENT_LIST, params }
}

export const RECEIVE_PATIENT_LIST = 'RECEIVE_PATIENT_LIST'
export function receivePatientList(res) {
  return { type: RECEIVE_PATIENT_LIST, user: res.data.user }
}

export const RECEIVE_PATIENT_LIST_ERROR = 'RECEIVE_USER_ERROR'
export function receivePatientError() {
  return { type: RECEIVE_USER_ERROR }
}

export function getPatientList(searchParams) {
  return function (dispatch) {
    dispatch(requestPatientList(searchParams))

    return api.get('/api/patients', searchParams)
    .then(res  => dispatch(receivePatientList(res)))
    .catch(err => dispatch(receivePatientError()))
  }
}
