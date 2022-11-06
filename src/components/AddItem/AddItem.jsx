import React from "react"
import "./add_item.scss"
import {Button, FloatingLabel, Form} from "react-bootstrap"
import ItemTxa from "../ItemTxa/ItemTxa.jsx";

const AddItem = () => {
    return (
        <>
            <h2 className="text-white">Nueva publicación</h2>
            <Form className="text-white">
                <Form.Group className="mb-3" controlId="juego">
                    <Form.Label>Juego a vender:</Form.Label>
                    <FloatingLabel label="Ej.: Súper Mario World" controlId="floatingJuego" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Súper Mario World" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>URL de imágen:</Form.Label>
                    <FloatingLabel label="Ej.: http://www.nintendo.cl/mario.jpg" controlId="floatingImagen" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="http://www.nintendo.cl/mario.jpg" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label>Descripción:</Form.Label>
                    <ItemTxa />
                </Form.Group>
                <Form.Group className="mb-3" controlId="precio">
                    <Form.Label>Precio:</Form.Label>
                    <FloatingLabel label="Ej.: 35000" controlId="floatingPrecio" className="text-dark mb-3">
                        <Form.Control type="number" placeholder="35000" min="0" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="plataforma">
                    <Form.Label>Plataforma:</Form.Label>
                    <FloatingLabel controlId="floatingPlataforma" label="PC, Playstation, etc" className="text-dark">
                        <Form.Select aria-label="Seleccione una plataforma como PC o Playstation">
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
                        <Form.Select aria-label="Seleccione formato de entrega, físico o digital">
                            <option value="Digital">Digital</option>
                            <option value="Fisico">Físico</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100">Publicar Ítem</Button>
            </Form>
        </>
    )
}

export default AddItem