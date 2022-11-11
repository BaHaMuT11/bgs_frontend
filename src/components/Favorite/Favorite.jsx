import React, {useContext} from "react"
import "./favorite.scss"
import {Button, Card, Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios";
import {URL_ELIMINAR_FAVORITO, URL_OBTENER_FAVORITOS_USUARIO} from "../../services/favoritos.js";
import Swal from "sweetalert2";


const Favorite = (props) => {

    const navigate = useNavigate()
    const {ntk} = useContext(UserContext)

    const usuario = props.idUsuario
    const publicacion = props.idPublicacion

    const handleDislike = () => {
        const desvincularFavorito = async () => {
            let configDislike = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            try {
                const {data} =  await axios.delete(URL_ELIMINAR_FAVORITO + `${usuario}/${publicacion}`, configDislike)

                if (data.estado.codigo == "200") {
                    Swal.fire(
                        'Jugador !',
                        "Eliminamos la publicación que ya no te gusta ;)",
                        'success'
                    )
                    props.actualizarFavoritos()
                } else {
                    Swal.fire(
                        'Whooooops',
                        "No se pudo eliminar el favorito",
                        'error'
                    )
                }
            }
            catch (error) {
                Swal.fire(
                    'Whooooops',
                    "Error al eliminar el favorito, problemas con el servidor",
                    'error'
                )
            }
        }

        Swal.fire({
            title: 'Vas a eliminarme?',
            text: "No te preopcupes, si me eliminas y te arrepientes siempre puedes agregarme de nuevo acá",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Proceder',
            cancelButtonText: "Noooo, te sigo queriendo acá"
        }).then((result) => {
            if (result.isConfirmed) {
                desvincularFavorito()
            }
        })
    }

    const handleInspect = () => {
        navigate(`/detail/${publicacion}`)
    }

    return (
        <Col className="col-12 col-md-6 col-lg-4 col-xl-3 py-2 game-card">
            <Card bg={"dark"} text={"light"} className="game-box">
                <Card.Img variant="top" src={props.url} onClick={() => handleInspect()} className="img-pointer" />
                <Card.Body>
                    <div className="text-center">
                        <Card.Title>{props.nombre}</Card.Title>
                    </div>
                    <Button className="w-100" variant="danger" onClick={()=>handleDislike()}>
                        <i className="fa-solid fa-thumbs-down"></i> Ya no me gusta
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Favorite