
import request from "api/request"

const { Row, Col, Button } = require("react-bootstrap")

const ConnectionCard = ({connection: {name, _id}, handler, buttonText}) => {
    const handlers = {
        accept: () => {
            request(`users/decline-connection-request/${_id}`,  {
                method: 'PUT'
            })
            .then(res => console.log("---hello", res))
            .catch(error => console.log("errro", error))
        },
        decline: () => {
            request(`users/decline-connection-request/${_id}`, {
                method: 'PUT'
            })
            .then(res => console.log("---hello", res))
            .catch(error => console.log("errro", error))
        }
    }
    const connectClickHandler = () => {
        handlers[handler]();
    }

    return (
        <Row>
            <Col>
                {name}
            </Col>
            <Col>
                <Button onClick={connectClickHandler}> {buttonText} </Button>                
            </Col>
        </Row>
    )
}

export default ConnectionCard