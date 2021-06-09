
import request from "api/request"
import { GetCurrentUser } from "helpers/common"

const { Row, Col, Button } = require("react-bootstrap")

const ConnectionCard = ({user: {name}}) => {
    const currentUser = GetCurrentUser()
    
    const connectClickHandler = () => {
        request()
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

export default ConnectionCard