const { Card } = require("react-bootstrap")

const CustomCard = ({headerText, title, ...props}) => {
    return (
        <Card style={{height: '90vh'}}>
            <Card.Header>{headerText}</Card.Header>
            <Card.Body className="overflow-auto">
                <Card.Title>{title}</Card.Title>
                {props.children}
            </Card.Body>
        </Card>
    )
}

export default CustomCard