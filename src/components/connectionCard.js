
import request from "api/request"

const { Row, Col, Button } = require("react-bootstrap")

const ConnectionCard = ({connection: {name}}) => {    
    const connectClickHandler = () => {
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