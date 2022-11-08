import React from "react"
import {Badge, Button, Card, Col} from "react-bootstrap"
import "./game_card.scss"
import {useNavigate} from "react-router-dom"
import {obtenerCLP} from "../../util/clp_parser.js";

const GameCard = (props) => {

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/detail/${id}`)
    }

    const voteOneStar = () => {

    }

    const voteTwoStar = () => {

    }

    const voteThreeStar = () => {

    }

    const voteFourStar = () => {

    }

    const voteFiveStar = () => {

    }

    const renderStars = (estrellas) => {
        if (estrellas == 0 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }
        if (estrellas == 1 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }
        if (estrellas == 2 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }
        if (estrellas == 3 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }
        if (estrellas == 4 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }
        if (estrellas == 5 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFourStar()}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFiveStar()}
                    ></i>
                </>
            )
        }

        if (estrellas == 0 && !props.estadoAutenticacion) {
            return (
                <p className="text-info">Sin valoraciones aun</p>
            )
        }
        if (estrellas == 1 && !props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i>
                </>
            )
        }
        if (estrellas == 2 && !props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i>
                </>
            )
        }
        if (estrellas == 3 && !props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i>
                </>
            )
        }
        if (estrellas == 4 && !props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star"></i>
                </>
            )
        }
        if (estrellas == 5 && !props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i> &nbsp;
                    <i className="fa-solid fa-2x fa-star star-filled"></i>
                </>
            )
        }
    }

    return (
        <>
            {
                props.estadoAutenticacion ?
                    <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
                        <Card bg={"dark"} text={"light"} className="game-box">
                            <Card.Img variant="top" src={props.imagen} />
                            <Card.Body>
                                <Card.Title>{props.juego}</Card.Title>
                                <Badge bg="secondary">{props.plataforma}</Badge>{' '}
                                <Badge bg="danger">{props.formato}</Badge>{' '}
                                <div className="py-3 text-center">
                                    {
                                        renderStars(props.rating)
                                    }
                                </div>
                                <Button className="w-100" variant="warning" onClick={
                                    ()=>{handleClick(1)}
                                }>{`${obtenerCLP(props.precio)} CLP`}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    :
                    <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
                        <Card bg={"dark"} text={"light"} className="game-box">
                            <Card.Img variant="top" src={props.imagen} />
                            <Card.Body>
                                <Card.Title>{props.juego}</Card.Title>
                                <Badge bg="secondary">{props.plataforma}</Badge>{' '}
                                <Badge bg="danger">{props.formato}</Badge>{' '}
                                <div className="py-3 text-center">
                                    {
                                        renderStars(props.rating)
                                    }
                                </div>
                                <div className="text-center text-white">
                                    {`${obtenerCLP(props.precio)} CLP`}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
            }
        </>
    )
}

export default GameCard