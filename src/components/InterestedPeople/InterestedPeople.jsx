import React, {useContext} from "react"
import "./interested_people.scss"
import {Card, Modal} from "react-bootstrap"
import {ProductContext} from "../../context/ProductProvider.jsx"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_CERRAR_VENTA} from "../../services/interesados.js"
import Swal from "sweetalert2"

const InterestedPeople = (props) => {

    const {mostrarInteresados, setMostrarInteresados, interesados} = useContext(ProductContext)
    const {ntk} = useContext(UserContext)

    const cerrarVenta = async (interesado, publicacion) => {

        let configSaleEnd = {
            headers: {
                "Content-Type": "Application/JSON",
                "Authorization": "Bearer " + ntk
            }
        }

        let requestSaleEnd = {
            publicacion: publicacion,
            usuario: interesado
        }

        try {
            const {data} = await axios.put(URL_CERRAR_VENTA, requestSaleEnd, configSaleEnd)

            if (data.estado.codigo == "200") {
                Swal.fire(
                    'Pero qué bien !',
                    "Felicidades por su venta",
                    'success'
                )
                props.actualizarPublicaciones()
                setMostrarInteresados(false)
            } else {
                Swal.fire(
                    'Whooooops',
                    "No se pudo cerrar venta, problemas de conexión",
                    'error'
                )
            }
        }
        catch(error){
            console.log(error)
            Swal.fire(
                'Whooooops',
                "No se pudo cerrar venta, problemas de conexión",
                'error'
            )
        }


    }

    const handleSale = (interesado, publicacion, nombre) => {
        Swal.fire({
            title: 'Vendiste este juego?',
            text: "Esta acción es irreversible y cerrerá su venta. Confirmas que vendiste este juego a "+ nombre ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, se lo vendí',
            cancelButtonText: 'No...'
        }).then((result) => {
            if (result.isConfirmed) {
                cerrarVenta(interesado, publicacion)
            }
        })
    }

    return (
        <Modal
            show={mostrarInteresados}
            onHide={() => setMostrarInteresados(false)}
            aria-labelledby="si-modal-sizes-title"
            className="si-style"
        >
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title id="si-modal-sizes-title">
                    Interesados en comprar: {interesados[0]?.publicacion}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                {
                    interesados.map( interesado  => (
                        <Card
                            bg={"success"}
                            key={`${interesado.idInteresado} ${interesado.idPublicacion}`}
                            text={"white"}
                            className="mb-2"
                        >
                            <Card.Header>{interesado.interesado}</Card.Header>
                            <Card.Body>
                                <Card.Title> Datos de contacto </Card.Title>
                                <Card.Text>
                                    <p> <span className="term">Región: </span>{interesado.regionInteresado}</p>
                                    <p> <span className="term">Comuna: </span>{interesado.comunaInteresado}</p>
                                    <p> <span className="term">Correo: </span>{interesado.correoInteresado}</p>
                                    <p> <span className="term">Fono: </span>{interesado.fonoInteresado}</p>
                                    <div className="text-center">
                                        <button className="btn btn-warning"
                                                onClick={ () => handleSale(interesado.idInteresado,
                                                                           interesado.idPublicacion,
                                                                           interesado.interesado) }>Vendido !
                                        </button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </Modal.Body>
        </Modal>
    )
}

export default InterestedPeople