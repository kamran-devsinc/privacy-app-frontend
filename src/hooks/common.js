import request from "api/request"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { setCurrentUser } from "redux/actions/auth"
import { fetchAllUsers } from "redux/actions/users"

export const useRefreshUsersAndConnection = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    return () => request('users/me', {
        method: 'GET',
    }).then(({ data }) => {
        request('users', {
            method: 'GET'
        }).then(({ data }) => {
            dispatch(fetchAllUsers(data.users))
        }).catch((error) => {console.log(error)})
        dispatch(setCurrentUser(data.user))
    }).catch(() => {
        localStorage.removeItem('AUTH_TOKEN')
        history.push('/sign-in')
    })
}