import * as actionTypes from './actionTypes'

export const fetchAllUsers = (payload) => ({
  type: actionTypes.FETCH_ALL_USERS,
  payload,
})

export const setUserProfile = (payload) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload,
})

export const setMessages = (payload) => ({
  type: actionTypes.SET_MESSAGES,
  payload,
})
