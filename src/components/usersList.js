import { ListGroup } from "react-bootstrap"
import UserCard from "./userCard"


const UsersList = ({allUsers}) => {
    return (
        <ListGroup>  
            { allUsers.map((user, index) => <ListGroup.Item key={index}> <UserCard user={user} /> </ListGroup.Item> )}
        </ListGroup>
    )
}


export default UsersList