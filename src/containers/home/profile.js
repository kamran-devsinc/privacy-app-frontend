import { useEffect } from 'react'
import PermissionCard from "components/permissionCard"
import { Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import request from 'api/request'
import { fetchAllUsers } from 'redux/actions/users'

const Profile = () => {
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <>

            <Row>
                <Col> Attribute </Col>
                <Col> Public? </Col>
            </Row>
            {
                Object.keys(user).map( (attributeName, index) => user[attributeName].hasOwnProperty('hidden') && <PermissionCard  key={index} label={attributeName} hidden={user[attributeName].hidden} /> )
            }
        </>
    )
     
}

export default Profile