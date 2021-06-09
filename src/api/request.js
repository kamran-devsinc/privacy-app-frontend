import axios from 'axios'

export default function request(endpoint, options) {
  let authToken = localStorage.getItem('privacyAppToken') || null

  authToken = authToken ? `Bearer ${authToken}` : null

  return axios(`${process.env.REACT_APP_BASE_API_URL}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: authToken,
    }
  })
}
