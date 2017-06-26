import api             from '../api'
import URLSearchParams from 'url-search-params'

export const REQUEST_PATIENT_LIST = 'REQUEST_PATIENT_LIST'
export function requestPatientList(params) {
  return { type: REQUEST_PATIENT_LIST, params }
}

export const RECEIVE_PATIENT_LIST = 'RECEIVE_PATIENT_LIST'
export function receivePatientList(res) {
  return { type: RECEIVE_PATIENT_LIST, ...res.data }
}

export const RECEIVE_PATIENT_LIST_ERROR = 'RECEIVE_USER_ERROR'
export function receivePatientListError() {
  return { type: RECEIVE_PATIENT_LIST_ERROR }
}

export function getPatientList(params) {
  const defaultedParams = Object.assign({ page: 0, limit: 10, search: '' }, params)

  return function (dispatch) {
    dispatch(requestPatientList(defaultedParams))

    const urlParams = new URLSearchParams()
    urlParams.append('search', defaultedParams.search)
    urlParams.append('limit',  defaultedParams.limit)
    urlParams.append('page',   defaultedParams.page)

    return api.get('/doctor-api/patients?' + urlParams)
    .then(res  => dispatch(receivePatientList(res)))
    .catch(err => dispatch(receivePatientListError()))
  }
}

export const REQUEST_PATIENT_DETAIL = 'REQUEST_PATIENT_DETAIL'
export function requestPatientDetail(params) {
  return { type: REQUEST_PATIENT_DETAIL, params }
}

export const RECEIVE_PATIENT_DETAIL = 'RECEIVE_PATIENT_DETAIL'
export function receivePatientDetail(res) {
  return { type: RECEIVE_PATIENT_DETAIL, ...res.data }
}

export const REQUEST_PATIENT_DETAIL_CREATE_APPOINTMENT = 'REQUEST_PATIENT_DETAIL_CREATE_APPOINTMENT'
export function requestPatientDetailCreateAppointment(params) {
  return { type: REQUEST_PATIENT_DETAIL_CREATE_APPOINTMENT, params }
}

export const RECEIVE_PATIENT_DETAIL_APPOINTMENTS = 'RECEIVE_PATIENT_DETAIL_APPOINTMENTS'
export function receivePatientDetailAppointments(res) {
  return { type: RECEIVE_PATIENT_DETAIL_APPOINTMENTS, ...res.data }
}

export const RECEIVE_PATIENT_DETAIL_ERROR = 'RECEIVE_USER_ERROR'
export function receivePatientDetailError() {
  return { type: RECEIVE_PATIENT_DETAIL_ERROR }
}

export const RECEIVE_PATIENT_DETAIL_APPOINTMENT_ERROR = 'RECEIVE_PATIENT_DETAIL_APPOINTMENT_ERROR'
export function receivePatientDetailAppointmentError(res) {
  return { type: RECEIVE_PATIENT_DETAIL_APPOINTMENT_ERROR, ...res.data }
}

export function getSessionPatientDetail(id) {
  return function (dispatch) {
    dispatch(requestPatientDetail(id))

    return api.get(`/patient-api/patients/me`)
    .then(res  => dispatch(receivePatientDetail(res)))
    .catch(err => dispatch(receivePatientDetailError(err)))
  }
}

export function getPatientDetail(id) {
  return function (dispatch) {
    dispatch(requestPatientDetail(id))

    return api.get(`/doctor-api/patients/${id}`)
    .then(res  => dispatch(receivePatientDetail(res)))
    .catch(err => dispatch(receivePatientDetailError(err)))
  }
}

export function createPatientAppointment({ patientId, doctorId, purpose, appointmentDate }) {
  return function (dispatch) {
    return api.post(`/shared-api/patients/${patientId}/appointment`, { patientId, doctorId, purpose, appointmentDate })
    .then(res => dispatch(receivePatientDetailAppointments(res)))
    .catch(err => dispatch(receivePatientDetailAppointmentError(err)))
  }
}

export function approveAppointment({ patientId, appointmentId }) {
  return function (dispatch) {
    return api.post(`/shared-api/patients/${patientId}/appointment/${appointmentId}/approve`)
    .then(res => dispatch(receivePatientDetailAppointments(res)))
    .catch(err => dispatch(receivePatientDetailAppointmentError(err)))
  }
}

export function cancelAppointment({ patientId, appointmentId, cancelReason }) {
  return function (dispatch) {
    return api.post(`/shared-api/patients/${patientId}/appointment/${appointmentId}/cancel`, { cancelReason })
    .then(res => dispatch(receivePatientDetailAppointments(res)))
    .catch(err => dispatch(receivePatientDetailAppointmentError(err)))
  }
}
