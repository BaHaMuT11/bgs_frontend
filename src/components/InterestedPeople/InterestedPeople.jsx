import React, {useContext} from "react"
import "./interested_people.scss"
import {Card, Modal} from "react-bootstrap";
import {ProductContext} from "../../context/ProductProvider.jsx";

const InterestedPeople = () => {

    const {mostrarInteresados, setMostrarInteresados, interesados} = useContext(ProductContext)

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
                            key={"cuss"}
                            text={"white"}
                            className="mb-2"
                        >
                            <Card.Header>{interesado.interesado}</Card.Header>
                            <Card.Body>
                                <Card.Title> Datos de contacto </Card.Title>
                                <Card.Text>
                                    <p> <b>Región: </b>{interesado.regionInteresado}</p>
                                    <p> <b>Comuna: </b>{interesado.comunaInteresado}</p>
                                    <p> <b>Correo: </b>{interesado.correoInteresado}</p>
                                    <p> <b>Fono: </b>{interesado.fonoInteresado}</p>
                                    <div className="text-center">
                                        <button className="btn btn-warning">Vendido</button>
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