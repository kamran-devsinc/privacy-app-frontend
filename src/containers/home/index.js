
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
    useEffect(() => {
        request('users', {
            method: 'GET'
        }).then(({ data }) => {
            dispatch(fetchAllUsers(data.users))
        }).catch((error) => {console.log(error)})
    }, [])
    console.log("-----", allUsers)

    return (
        <>
            <Container>
                <Row>
                    <Col> <Profile /> </Col>
                    <Col> <ConnectionsList allUsers={allUsers} /> </Col>
                    <Col><UsersList allUsers={allUsers}/></Col>
                
                </Row>
            </Container>
        </>
    )
}


export default Home
