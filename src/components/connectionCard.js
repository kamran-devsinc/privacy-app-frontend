
import request from "api/request"

const { Row, Col, Button } = require("react-bootstrap")

const ConnectionCard = ({connection: {name, userId, status}}) => {

    const ACTIONS = {
        REQUEST_SENT: [
            {
                buttonText: 'Decline',
                handler: 'decline'
            }
        ],
        REQUEST_RECEIVED: [
            {
                buttonText: 'Accept',
                handler: 'accept'
            },
            {
                buttonText: 'Decline',
                handler: 'decline'
            }
        ],
        CONNECTED: [
            {
                buttonText: 'Disconnect',
                handler: 'decline'
            }
        ]
    }

    const handlers = {
        accept: () => {
            request(`users/accept-connection-request/${userId}`,  {
                method: 'PUT'
            })
            .then(res => console.log("---hello", res))
            .catch(error => console.log("errro", error))
        },
        decline: () => {
            request(`users/decline-connection-request/${userId}`, {
                method: 'PUT'
            })
            .then(res => console.log("---hello", res))
            .catch(error => console.log("errro", error))
        }
    }
    const connectClickHandler = (handler) => {
        handlers[handler]();
    }

    return (
        <Row>
            <Col>
                {name}
            </Col>
            <Col>
                {ACTIONS[status].map( action =>  <Button onClick={() => connectClickHandler(action.handler)}> {action.buttonText} </Button> )}
            </Col>
        </Row>
    )
}

export default ConnectionCard