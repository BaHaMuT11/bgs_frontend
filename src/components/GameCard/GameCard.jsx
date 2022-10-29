import React from "react"
import {Badge, Button, Card, Col} from "react-bootstrap"
import "./game_card.scss"
import EldenRing from "../../assets/img/elden_ring.png"
import GodOfWar from "../../assets/img/gordo_ragnarok.png"
import {useNavigate} from "react-router-dom"

const GameCard = (props) => {

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/detail/${id}`)
    }


    return (
        <>
            {
                props.rating === "high" ?
                    <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
                        <Card bg={"dark"} text={"light"} className="game-box">
                            <Card.Img variant="top" src={EldenRing} />
                            <Card.Body>
                                <Card.Title>Elden Ring</Card.Title>
                                <Badge bg="secondary">PC</Badge>{' '}
                                <Badge bg="danger">Físico</Badge>{' '}
                                <div className="py-3 text-center">
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                </div>
                                <Button className="w-100" variant="warning" onClick={
                                    ()=>{handleClick(1)}
                                    }>$25.872 CLP</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    :
                    <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
                        <Card bg={"dark"} text={"light"} className="game-box">
                            <Card.Img variant="top" src={GodOfWar} />
                            <Card.Body>
                                <Card.Title>God of War: Ragnarok</Card.Title>
                                <Badge bg="secondary">PS5</Badge>{' '}
                                <Badge bg="danger">Digital</Badge>{' '}
                                <div className="py-3 text-center">
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                                    <i className="fa-solid fa-2x fa-star"></i>
                                    <i className="fa-solid fa-2x fa-star"></i>
                                    <i className="fa-solid fa-2x fa-star"></i>
                                </div>
                                <Button className="w-100" variant="warning" onClick={
                                    ()=>{handleClick(2)}
                                }>$80.000 CLP</Button>
                            </Card.Body>
                        </Card>
                    </Col>
            }
        </>
    )
}

export default GameCard