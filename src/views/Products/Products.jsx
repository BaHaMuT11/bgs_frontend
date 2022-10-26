import React from 'react'
import "./products.scss"
import {Row, Col} from "react-bootstrap";
import Hero from "../../components/Hero/Hero.jsx";
import GameCard from "../../components/GameCard/GameCard.jsx";

const Products = () => {
    return (
        <>
            <Row className="py-3">
                <Col>
                    <Hero />
                </Col>
            </Row>
            <Row>
                <h2 className="display-6 text-white">Populares</h2>
                <GameCard rating="high"  />
            </Row>
            <Row>
                <h2 className="display-6 text-white">Catálogo</h2>
                <GameCard rating="high" />
                <GameCard rating="low"  />
            </Row>
        </>
    )
}

export default Products