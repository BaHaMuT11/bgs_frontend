import React from "react"
import {Col, Row} from "react-bootstrap";
import ItemAccordion from "../../components/ItemAccordion/ItemAccordion.jsx";

const ProductDetail = () => {
    return (
        <Row className="py-3">
            <Col>
                <ItemAccordion />
            </Col>
        </Row>
    )
}

export default ProductDetail