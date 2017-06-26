import api from '../api'

export const REQUEST_USER = 'REQUEST_USER'
export function requestUser(loginParams) {
   return { type: REQUEST_USER, loginParams }
}

export const RECEIVE_USER = 'RECEIVE_USER'
export function receiveUser(res) {
  return { type: RECEIVE_USER, ...res.data }
}

export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR'
export function receiveUserError(err) {
  console.error(err)
  return { type: RECEIVE_USER_ERROR }
}

export function getSession() {
  return function (dispatch) {
    dispatch(requestUser())

    return api.get('/auth-api/session')
    .then(res  => dispatch(receiveUser(res)))
    .catch(err => dispatch(receiveUserError(err)))

  }
}

export function createSession(loginParams) {
  return function (dispatch) {
    dispatch(requestUser(loginParams))

    return api.post('/auth-api/session', {
      email    : loginParams.email,
      password : loginParams.password,
      userType : loginParams.userType
    })
    .then(res  => dispatch(receiveUser(res)))
    .catch(err => dispatch(receiveUserError(err)))

  }
}

export function destroySession() {
  return function (dispatch) {
    dispatch(requestUser())

    return api.delete('/auth-api/session')
    .then(res  => dispatch(receiveUser(res)))
    .catch(err => dispatch(receiveUserError(err)))
  }
}
