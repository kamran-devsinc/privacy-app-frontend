import { Row, Col, InputGroup, FormControl} from "react-bootstrap"


const PermissionCard = ({label, hidden}) => {
    const handleCheckboxClick = () => {
    
    }
    
    return (
        <Row>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text>{label}</InputGroup.Text>
                </InputGroup>
            </Col>
            <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox   onChange={handleCheckboxClick} aria-label={`Hide ${label}`} checked={hidden} />
                </InputGroup>
            </Col>
        </Row>
    )
}

export default PermissionCard