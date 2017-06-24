import api from '../api'

export const REQUEST_USER = 'REQUEST_USER'
export function requestUser(loginParams) {
   return { type: REQUEST_USER, loginParams }
}

export const RECEIVE_USER = 'RECEIVE_USER'
export function receiveUser(res) {
  return { type: RECEIVE_USER, user: res.data.user }
}

export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR'
export function receiveUserError() {
  return { type: RECEIVE_USER_ERROR }
}

export function getSession(loginParams) {
  return function (dispatch) {
    dispatch(requestUser(loginParams))

    return api.get('/api/session')
    .then(res  => dispatch(receiveUser(res)))
    .catch(err => dispatch(receiveUserError()))

  }
}

export function createSession(loginParams) {
  return function (dispatch) {
    dispatch(requestUser(loginParams))

    return api.post('/api/session', {
      email    : loginParams.email,
      password : loginParams.password,
      userType : loginParams.userType
    })
    .then(res  => dispatch(receiveUser(res)))
    .catch(err => dispatch(receiveUserError()))

  }
}
