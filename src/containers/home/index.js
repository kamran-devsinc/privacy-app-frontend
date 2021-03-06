
import request from 'api/request';
import UsersList from 'components/usersList';
import ConnectionsList from 'components/connectionsList';
import { useEffect } from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from 'redux/actions/users';
import Profile from './profile';
import CustomCard from 'components/customCard';
import { useHistory } from 'react-router';

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allUsers = useSelector( (state) => state.user.all)
    const currentUser = useSelector( (state) => state.auth)
    const connectedConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'CONNECTED') : []
    const requestSentConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'REQUEST_SENT') : []
    const requestReceivedConnections = currentUser?.connections.value.length ? currentUser.connections.value.filter(connection => connection.status === 'REQUEST_RECEIVED') : []

    useEffect(() => {
        request('users', {
            method: 'GET'
        }).then(({ data }) => {
            dispatch(fetchAllUsers(data.users))
        }).catch((error) => {console.log(error)})
    }, [])


    return (
        <>
            <Row style={{height: '70vh'}} >
                    <Col>
                        <CustomCard headerText='Visibility' title='Set/Unset Visibility'>
                            <Profile />
                        </CustomCard>
                    </Col>
                    <Col>
                        <CustomCard headerText='Connections' title='Connected to'>
                            <ConnectionsList connections={connectedConnections} buttonText='Decline' handler='decline' />
                        </CustomCard>
                    </Col>
                    <Col>
                        <CustomCard headerText='Connecting' title='Request sent to'>
                            <ConnectionsList connections={requestSentConnections}/>
                        </CustomCard>
                    </Col>
                    <Col>
                        <CustomCard headerText='Connecting' title='Request Sent by'>
                            <ConnectionsList connections={requestReceivedConnections}/>
                        </CustomCard>
                    </Col>
                    <Col>
                        <CustomCard headerText='User' title='You may want to connect'>
                            <UsersList allUsers={allUsers}/>
                        </CustomCard>
                    </Col>

            </Row>
        </>
    )
}


export default Home
