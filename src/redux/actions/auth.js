import * as actionTypes from './actionTypes'

export const setCurrentUser = (payload) => ({
  type: actionTypes.SET_CURRENT_USER,
  payload,
})

export const getUserConnections = (payload) => ({
  type: actionTypes.GET_USER_CONNECTIONS,
  payload
})
