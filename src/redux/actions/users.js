import * as actionTypes from './actionTypes'

export const fetchAllUsers = (payload) => ({
  type: actionTypes.FETCH_ALL_USERS,
  payload,
})
