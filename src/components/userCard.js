import request from "api/request"
import { GetCurrentUser } from "helpers/common"

const { Row, Col, Button } = require("react-bootstrap")

const UserCard = ({user: {name, _id}}) => {
    const currentUser = GetCurrentUser()
    
    const connectClickHandler = () => {
        request(`users/send-connection-request/${_id}`, {
            method: 'PUT'
        }).then((resp) => {
            console.log("----reszp", resp)
        }).catch(err => console.log(err))
    }

    return (
        <Row>
            <Col>
                {name}
            </Col>
            <Col>
                <Button onClick={connectClickHandler}> Connect </Button>                
            </Col>
        </Row>
    )
}

export default UserCard