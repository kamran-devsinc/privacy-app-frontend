
import request from 'api/request';
import UsersList from 'components/usersList';
import ConnectionsList from 'components/connectionsList';
import { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from 'redux/actions/users';
import Profile from './profile';

const Home = () => {
    const dispatch = useDispatch()
    
    const allUsers = useSelector( (state) => state.user.all)
    const currentUser = useSelector( (state) => state.auth)
    const connectedConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'CONNECTED') : []
    const requestSentConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'REQUEST_SENT') : []
    const requestReceivedConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'REQUEST_RECEIVED') : []

    debugger
    useEffect(() => {
        request('users', {
            method: 'GET'
        }).then(({ data }) => {
            dispatch(fetchAllUsers(data.users))
        }).catch((error) => {console.log(error)})
    }, [])

    return (
        <>
                <Row>
                    <Col>
                        <Profile />
                    </Col>
                    <Col> 
                        <ConnectionsList connections={connectedConnections} />
                    </Col>
                    <Col> 
                        <ConnectionsList connections={requestSentConnections} />
                    </Col>
                    <Col> 
                        <ConnectionsList connections={requestReceivedConnections} />
                    </Col>
                    <Col>
                        <UsersList allUsers={allUsers}/>
                    </Col>
                
                </Row>
        </>
    )
}


export default Home
