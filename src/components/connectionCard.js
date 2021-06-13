import request from "api/request"
import { useRefreshUsersAndConnection } from "hooks/common"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Link } from 'react-router-dom'
import { setCurrentUser } from "redux/actions/auth"
import { fetchAllUsers } from "redux/actions/users"
import { ACTIONS } from 'constants.js'

const { Row, Col, Button } = require("react-bootstrap")

const ConnectionCard = ({connection: {name, userId, status}}) => {
    const dispatch = useDispatch()
    const refresh = useRefreshUsersAndConnection()
    const history = useHistory()

    const handlers = {
        accept: () => {
            request(`users/accept-connection-request/${userId}`,  {
                method: 'PUT'
            })
            .then(res => {
                refresh()
            })
            .catch(error => console.log("errro", error))
        },
        decline: () => {
            request(`users/decline-connection-request/${userId}`, {
                method: 'PUT'
            })
            .then(res => {
                request('users/me', {
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
            })
            .catch(error => console.log("errro", error))
        }
    }
    const connectClickHandler = (handler) => {
        handlers[handler]();
    }

    return (
        <Row>
            <Col>
                <Link to={`/users/${userId}`}>{name}</Link>
            </Col>
            <Col>
                {ACTIONS[status].map((action, index) =>  <Button key={index} onClick={() => connectClickHandler(action.handler)}> {action.buttonText} </Button> )}
            </Col>
        </Row>
    )
}

export default ConnectionCard
