import request from "api/request"
import { useRefreshUsersAndConnection } from "hooks/common"
import { Link } from 'react-router-dom'

const { Row, Col, Button } = require("react-bootstrap")

const UserCard = ({user: {name, _id}}) => {
    const x = useRefreshUsersAndConnection()
    const connectClickHandler = () => {
        request(`users/send-connection-request/${_id}`, {
            method: 'PUT',
        }).then((resp) => {
            x()
        }).catch(err => console.log(err))
    }

    return (
        <Row>
            <Col>
                <Link to={`/users/${_id}`}>
                    {name}
                </Link>
            </Col>
            <Col>
                <Button onClick={connectClickHandler}> Connect </Button>
            </Col>
        </Row>
    )
}

export default UserCard
