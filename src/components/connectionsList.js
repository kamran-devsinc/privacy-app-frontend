import { ListGroup } from "react-bootstrap"
import ConnectionCard from "./connectionCard"

const ConnectionsList = ({connections}) => {
    if(connections.length < 1) {
        return <div> No Connections Yet </div>
    }
    return (
        <ListGroup>  
            { connections.map((user, index) => <ListGroup.Item key={index}> <ConnectionCard connection={user} /> </ListGroup.Item> )}
        </ListGroup>
    )
}


export default ConnectionsList