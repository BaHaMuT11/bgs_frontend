import React, {useContext} from "react"
import "./edit_item.scss"
import {Button, Card, FloatingLabel, Form, Modal} from "react-bootstrap"
import {ProductContext} from "../../context/ProductProvider.jsx"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_MODIFICAR_PUBLICACION} from "../../services/publicaciones.js"
import Swal from "sweetalert2"

const EditItem = (props) => {
    const { mostrarEditItem, setMostrarEditItem, modPlataforma, setModPlataforma,
            modFormato, setModFormato, modPublicacionActiva, setModPublicacionActiva } = useContext(ProductContext)
    const {ntk} = useContext(UserContext)

    const handleModSubmit = (e) => {

        e.preventDefault()

        const modificarPublicacion = async () => {
            const configModItem = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }
            const reqModItem = {
                publicacion: modPublicacionActiva.id,
                plataforma: modPlataforma,
                formato: modFormato
            }

            try {
                const {data} = await axios.put(URL_MODIFICAR_PUBLICACION, reqModItem, configModItem)

                if (data.estado.codigo == "200") {
                    setMostrarEditItem(false)
                    setModPublicacionActiva({})
                    setModPlataforma("")
                    setModFormato("")
                    props.actualizarPublicaciones()
                    Swal.fire(
                        'Qué genial, cierto?',
                        "Modificaste tu publicación",
                        'success'
                    )
                } else {
                    props.actualizarPublicaciones()
                    Swal.fire(
                        'Whooooops',
                        "No se pudo modificar, problemas de conexión, intente nuevamente",
                        'error'
                    )
                }
            }
            catch(error) {
                props.actualizarPublicaciones()
                console.log(error)
                Swal.fire(
                    'Whooooops',
                    "No se pudo modificar, problemas de conexión, intente nuevamente",
                    'error'
                )

            }
        }
        modificarPublicacion()
    }

    return (
        <Modal
            show={mostrarEditItem}
            onHide={() => setMostrarEditItem(false)}
            aria-labelledby="ei-modal-sizes-title"
            className="ei-style"
        >
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title id="ei-modal-sizes-title">
                    Editar publicación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <Form className="text-white" onSubmit={e => handleModSubmit(e)}>
                    <Form.Group className="mb-3" controlId="plataforma">
                        <Form.Label>Plataforma:</Form.Label>
                        <FloatingLabel controlId="floatingPlataforma" label="PC, Playstation, etc" className="text-dark">
                            <Form.Select aria-label="Seleccione una plataforma como PC o Playstation"
                                         value = {modPlataforma}  onChange={e => setModPlataforma(e.target.value)} >
                                <option value="PC">PC</option>
                                <option value="PlayStation">PlayStation</option>
                                <option value="XBOX">XBOX</option>
                                <option value="Nintendo">Nintendo</option>
                                <option value="Otro">Otro</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formato">
                        <Form.Label>Formato:</Form.Label>
                        <FloatingLabel controlId="floatingFormato" label="Formato de entrega" className="text-dark">
                            <Form.Select aria-label="Seleccione formato de entrega, físico o digital"
                                         value = {modFormato}  onChange={e => setModFormato(e.target.value)} >
                                <option value="Digital">Digital</option>
                                <option value="Físico">Físico</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Button variant="warning" type="submit" className="w-100">Modificar Ítem</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditItem