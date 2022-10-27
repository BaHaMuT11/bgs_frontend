import React from 'react'
import "./favorite.scss"
import {Button, Card, Col} from "react-bootstrap"


const Favorite = (props) => {
    return (
        <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
            <Card bg={"dark"} text={"light"} className="game-box">
                <Card.Img variant="top" src={props.url} />
                <Card.Body>
                    <div className="text-center">
                        <Card.Title>{props.nombre}</Card.Title>
                    </div>
                    <Button className="w-100" variant="danger">Ya no me gusta</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Favorite