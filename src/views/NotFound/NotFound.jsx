import React from "react"
import {Col, Row} from "react-bootstrap"
import "./not_found.scss"

const NotFound = () => {
    return (
        <Row className="py-3 notfound-wrapper">
            <Col>
                <div className="text-danger text-center">
                  <h2 className="display-4"> No se encontró recurso :( </h2>
                </div>
            </Col>
        </Row>
    )
}

export default NotFound