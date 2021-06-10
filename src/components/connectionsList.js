import { ListGroup } from "react-bootstrap"
import ConnectionCard from "./connectionCard"

const ConnectionsList = ({connections, ...props}) => {
    if(connections.length < 1) {
        return <div> No Connections Yet </div>
    }
    return (
        <div>
            <ListGroup>  
                { connections.map((user, index) => <ListGroup.Item key={index}> <ConnectionCard connection={user} {...props}/> </ListGroup.Item> )}
            </ListGroup>
        </div>
    )
}


export default ConnectionsList