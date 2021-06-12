import { useEffect } from 'react'
import { Row, Col, Button } from "react-bootstrap"
import request from "api/request"

const ProfileConnectionCard = ({ _id, name }) => {
  // useEffect(() => {
  //   request(`/users/${_id}/connection-status`).then(() => {

  //   })
  // })

  const connectClickHandler = () => {

  }

  return (
    <Row>
      <Col>
        {name}
      </Col>
      <Col>
        <Button onClick={connectClickHandler}>Connect</Button>
      </Col>
    </Row>
  )
}

export default ProfileConnectionCard
