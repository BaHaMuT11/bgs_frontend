import React, {useContext} from "react"
import {Badge, Button, Card, Col} from "react-bootstrap"
import "./game_card.scss"
import {useNavigate} from "react-router-dom"
import {obtenerCLP} from "../../util/clp_parser.js";
import {UserContext} from "../../context/UserProvider.jsx";
import axios from "axios";
import {URL_CALIFICAR_PUBLICACION} from "../../services/publicaciones.js";
import Swal from "sweetalert2";

const GameCard = (props) => {

    const navigate = useNavigate()
    const {ntk, usuarioActivo} = useContext(UserContext)

    const handleClick = (id) => {
        navigate(`/detail/${id}`)
    }


    const calificarJuego = async (req) => {
        const configVotingHeaders = {
            headers: {
                "Content-Type": "Application/JSON",
                "Authorization": "Bearer " + ntk
            }
        }
        try {
            const {data} = await axios.post(URL_CALIFICAR_PUBLICACION, req, configVotingHeaders)

            if (data.estado.codigo == "200") {

                Swal.fire(
                    'Súper !',
                    "Valoraste este juego correctamente",
                    'success'
                )
                props.actualizar()
            } else {
                Swal.fire(
                    'Whooooops',
                    "Problemas de conexión, intente más adelante",
                    'error'
                )
            }
        }
        catch(error){
            Swal.fire(
                'Whooooops',
                "No puedes valorar este juego nuevamente",
                'error'
            )
        }
    }

    const voteOneStar = (id) => {
        let request = {
            usuario: usuarioActivo.id,
            publicacion: id,
            estrellas: 1
        }

        Swal.fire({
            title: `Deseas calificar esta publicación con un ${request.estrellas}?`,
            text: "No podrás valorala nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adelante capitán !',
            cancelButtonText: 'Mejor me lo pienso ;)'
        }).then((result) => {
            if (result.isConfirmed) {
                calificarJuego(request)
            }
        })
    }

    const voteTwoStar = (id) => {
        let request = {
            usuario: usuarioActivo.id,
            publicacion: id,
            estrellas: 2
        }

        Swal.fire({
            title: `Deseas calificar esta publicación con un ${request.estrellas}?`,
            text: "No podrás valorala nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adelante capitán !',
            cancelButtonText: 'Mejor me lo pienso ;)'
        }).then((result) => {
            if (result.isConfirmed) {
                calificarJuego(request)
            }
        })
    }

    const voteThreeStar = (id) => {
        let request = {
            usuario: usuarioActivo.id,
            publicacion: id,
            estrellas: 3
        }

        Swal.fire({
            title: `Deseas calificar esta publicación con un ${request.estrellas}?`,
            text: "No podrás valorala nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adelante capitán !',
            cancelButtonText: 'Mejor me lo pienso ;)'
        }).then((result) => {
            if (result.isConfirmed) {
                calificarJuego(request)
            }
        })
    }

    const voteFourStar = (id) => {
        let request = {
            usuario: usuarioActivo.id,
            publicacion: id,
            estrellas: 4
        }

        Swal.fire({
            title: `Deseas calificar esta publicación con un ${request.estrellas}?`,
            text: "No podrás valorala nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adelante capitán !',
            cancelButtonText: 'Mejor me lo pienso ;)'
        }).then((result) => {
            if (result.isConfirmed) {
                calificarJuego(request)
            }
        })
    }

    const voteFiveStar = (id) => {
        let request = {
            usuario: usuarioActivo.id,
            publicacion: id,
            estrellas: 5
        }

        Swal.fire({
            title: `Deseas calificar esta publicación con un ${request.estrellas}?`,
            text: "No podrás valorala nuevamente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adelante capitán !',
            cancelButtonText: 'Mejor me lo pienso ;)'
        }).then((result) => {
            if (result.isConfirmed) {
                calificarJuego(request)
            }
        })
    }

    const renderStars = (estrellas) => {
        if (estrellas == 0 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
                    ></i>
                </>
            )
        }
        if (estrellas == 1 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
                    ></i>
                </>
            )
        }
        if (estrellas == 2 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
                    ></i>
                </>
            )
        }
        if (estrellas == 3 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
                    ></i>
                </>
            )
        }
        if (estrellas == 4 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
                    ></i>
                </>
            )
        }
        if (estrellas == 5 && props.estadoAutenticacion) {
            return (
                <>
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteOneStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteTwoStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteThreeStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFourStar(props.idPublicacion)}
                    ></i> &nbsp;
                    <i className="fa-solid fa-2x star-authenticated fa-star star-filled"
                       onClick={ () => voteFiveStar(props.idPublicacion)}
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
                            <Card.Img variant="top" src={props.imagen} alt={props.juego} />
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
                                    ()=>{handleClick(props.idPublicacion)}
                                }>{`${obtenerCLP(props.precio)} CLP`}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    :
                    <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
                        <Card bg={"dark"} text={"light"} className="game-box">
                            <Card.Img variant="top" src={props.imagen} alt={props.juego} />
                            <Card.Body>
                                <Card.Title>{props.juego}</Card.Title>
                                <Badge bg="secondary">{props.plataforma}</Badge>{' '}
                                <Badge bg="danger">{props.formato}</Badge>{' '}
                                <div className="py-3 text-center">
                                    {
                                        renderStars(props.rating)
                                    }
                                </div>
                                <Button className="w-100" variant="info" onClick={
                                    ()=>{handleClick(props.idPublicacion)}
                                }>{`${obtenerCLP(props.precio)} CLP`}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
            }
        </>
    )
}

export default GameCard