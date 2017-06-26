import {
  REQUEST_PATIENT_LIST,
  RECEIVE_PATIENT_LIST,
  RECEIVE_PATIENT_LIST_ERROR,
  REQUEST_PATIENT_DETAIL,
  RECEIVE_PATIENT_DETAIL,
  REQUEST_PATIENT_DETAIL_CREATE_APPOINTMENT,
  RECEIVE_PATIENT_DETAIL_APPOINTMENTS,
  RECEIVE_PATIENT_DETAIL_ERROR,
  RECEIVE_PATIENT_DETAIL_APPOINTMENT_ERROR
} from '../actions/patients'

const initialState = {
  searchResult              : null,
  searchLoading             : false,
  searchError               : false,
  detailResult              : null,
  detailLoading             : false,
  detailError               : false,
  detailAppointments        : null,
  detailAppointmentError    : false,
  detailAppointmentCreating : false,
}

const patients = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PATIENT_LIST:
      return Object.assign({}, state, { searchLoading: true })

    case RECEIVE_PATIENT_LIST:
      return Object.assign({}, state, { searchResult: action.patients, searchLoading: false, searchError: false })

    case RECEIVE_PATIENT_LIST_ERROR:
      return Object.assign({}, state, { searchLoading: false, searchError: true })

    case REQUEST_PATIENT_DETAIL:
      return Object.assign({}, state, { detailLoading: true, detailResult: null, detailAppointments: null })

    case RECEIVE_PATIENT_DETAIL:
      return Object.assign({}, state, {
        detailAppointments : action.appointments,
        detailLoading      : false,
        detailResult       : action.patient,
        detailError        : false
      })

    case REQUEST_PATIENT_DETAIL_CREATE_APPOINTMENT:
      return Object.assign({}, state, { detailAppointmentCreating : true, detailAppointmentCreateError: false })

    case RECEIVE_PATIENT_DETAIL_APPOINTMENTS:
      return Object.assign({}, state, {
        detailAppointments           : action.appointments,
        detailAppointmentCreateError : false
      })

    case RECEIVE_PATIENT_DETAIL_APPOINTMENT_ERROR:
      return Object.assign({}, state, { detailAppointmentError: true })

    case RECEIVE_PATIENT_DETAIL_ERROR:
      return Object.assign({}, state, { detailLoading: false, detailError: true })

    default:
      return state
  }
}

export default patients
