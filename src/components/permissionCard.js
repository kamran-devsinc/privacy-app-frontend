import request from "api/request"
import { Row, Col, InputGroup, FormControl} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setCurrentUser, updateCurrentUser } from "redux/actions/auth"



const PermissionCard = ({label, hidden}) => {
    const dispatch = useDispatch()
    const handleCheckboxClick = () => {
        request('users', {
            method: 'put',
            data: {
                [label]: {
                    hidden: !hidden
                }
            }
        }).then(({data: {user}}) => {
            dispatch(setCurrentUser(user))
        }).catch((error) => console.log('-error', error))
    }

    return (
        <Row className="justify-content-between pl-2 pr-2 text-capitalize">
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>{label}</InputGroup.Text>
                </InputGroup>
            </div>
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox onChange={handleCheckboxClick} aria-label={`Hide ${label}`} checked={!hidden} />
                </InputGroup>
            </div>
        </Row>
    )
}

export default PermissionCard
