import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import request from 'api/request'
import { setUserProfile } from 'redux/actions/users'
import Messages from 'components/Messages'
import CustomCard from 'components/customCard'

const UserProfile = () => {
  const { id } = useParams()
  const profile = useSelector(({ user }) => user.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    request(`users/${id}`).then(({ data }) => {
      dispatch(setUserProfile(data.user))
    }).catch((err) => {
      toast.error('Failed to fetch user profile')
    })
  }, [])

  if (!profile) return null

  return (
    <Container>
      <Row>
        <Col>
        <CustomCard headerText='Profile' title={profile.name}>
            {
              !profile.email.hidden
                ? <p>
                    <span className='font-weight-bold'>Email: </span>
                    {profile.email.value}
                  </p>
                : null
            }
            {
              !profile.workExperience.hidden
                ? <p>
                    <span className='font-weight-bold'>Work Experience: </span>
                    {profile.workExperience.value}
                  </p>
                : null
            }
            {/* <h5>Connections</h5> */}
            <div className='connections-list'>
              <ListGroup>
                {
                  // profile.connections.value.map((user, index) => (
                  //   <ListGroup.Item key={user._id}>
                  //     <ProfileConnectionCard _id={user._id} name={user.name} />
                  //   </ListGroup.Item>
                  // ))
                }
              </ListGroup>
            </div>
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
