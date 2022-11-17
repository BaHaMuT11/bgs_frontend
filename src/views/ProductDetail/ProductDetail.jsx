import React from "react"
import {Col, Row} from "react-bootstrap";
import ItemAccordion from "../../components/ItemAccordion/ItemAccordion.jsx"
import "./product_detail.scss"

const ProductDetail = () => {
    return (
        <Row className="detail-wrapper py-3">
            <Col>
                <ItemAccordion />
            </Col>
        </Row>
    )
}

export default ProductDetail