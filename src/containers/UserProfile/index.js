import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import request from 'api/request'
import { setUserProfile, fetchAllUsers } from 'redux/actions/users'
import { setCurrentUser } from 'redux/actions/auth'
import Messages from 'components/Messages'
import CustomCard from 'components/customCard'
import { ACTIONS } from 'constants.js'
import { useRefreshUsersAndConnection } from "hooks/common"
import useDeepCompareEffect from 'use-deep-compare-effect'

const UserProfile = () => {
  const { id } = useParams()
  const history = useHistory()
  const { profile, connections } = useSelector(({ user, auth }) => ({
    profile: user.profile,
    connections: auth.connections,
  }))
  const [connectionStatus, setConnectionStatus] = useState(getConnectionStatus)
  const dispatch = useDispatch()
  const refresh = useRefreshUsersAndConnection()

  useEffect(() => {
    request(`users/${id}`).then(({ data }) => {
      dispatch(setUserProfile(data.user))
    }).catch((err) => {
      toast.error('Failed to fetch user profile')
    })

    setConnectionStatus(getConnectionStatus())

    return () => dispatch(setUserProfile(null))
  }, [id])

  function getConnectionStatus() {
    const userConnection = connections.value.find((conn) => conn.userId === id)

    if (!userConnection) return ACTIONS.CONNECT[0].status

    return userConnection.status
  }

  useDeepCompareEffect(() => {
    setConnectionStatus(getConnectionStatus())
  }, [connections])

  const handlers = {
    connect: () => {
      request(`users/send-connection-request/${id}`, {
        method: 'PUT',
      }).then(() => {
        refresh()
      }).catch(error => console.log("errro", error))
    },
    accept: () => {
        request(`users/accept-connection-request/${id}`,  {
            method: 'PUT'
        })
        .then(res => {
            refresh()
        })
        .catch(error => console.log("errro", error))
    },
    decline: () => {
        request(`users/decline-connection-request/${id}`, {
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
    console.log({ handler })
    handlers[handler]();
  }

  if (!profile) return null

  return (
    <Container>
      <Row>
        <Col>
        <CustomCard headerText='Profile' title={profile.name}>
            {
              ACTIONS[connectionStatus].map((action, index) => (
                <Button key={index} onClick={() => connectClickHandler(action.handler)}> {action.buttonText} </Button>
              ))}
            {
              profile.email
                ? <p>
                    <span className='font-weight-bold'>Email: </span>
                    {profile.email.value}
                  </p>
                : null
            }
            {
              profile.workExperience
                ? <p>
                    <span className='font-weight-bold'>Work Experience: </span>
                    {profile.workExperience.value}
                  </p>
                : null
            }
            {
              profile.connections
                ? <>
                  <h5>Connections</h5>
                  <div className='connections-list'>
                    <ListGroup>
                      {
                        profile.connections.value.map((user) => (
                          <ListGroup.Item key={user._id}>
                            <Link to={`/users/${user.userId}`}>{user.name}</Link>
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  </div>
                </>
                : null
            }
        </CustomCard>
        </Col>
        <Col>
          <CustomCard headerText='Messages'>
            <Messages />
          </CustomCard>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile
