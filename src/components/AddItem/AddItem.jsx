import React, {useContext, useRef} from "react"
import "./add_item.scss"
import {Button, FloatingLabel, Form} from "react-bootstrap"
import {ProductContext} from "../../context/ProductProvider.jsx"
import {UserContext} from "../../context/UserProvider.jsx"
import Swal from "sweetalert2"
import axios from "axios"
import {URL_AGREGAR_PUBLICACION} from "../../services/publicaciones.js"
import {useNavigate} from "react-router-dom"
import JoditEditor from "jodit-react"

const AddItem = () => {

    const editor = useRef(null)

    const { addDescripcion,setAddDescripcion, addJuego, setAddJuego,
            addImagen, setAddImagen, addPrecio, setAddPrecio,
            addPlataforma, setAddPlataforma, addFormato, setAddFormato
    } = useContext(ProductContext)

    const {usuarioActivo, ntk} = useContext(UserContext)

    const navigate = useNavigate()

    const handleAddProduct = e => {
        e.preventDefault()

        if (!addJuego.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (addJuego.length > 30) {
            Swal.fire(
                'Whooooops',
                "El juego no puede superar los 30 caracteres",
                'error'
            )
            return
        }

        if (!addImagen.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (addImagen.length < 5) {
            Swal.fire(
                'Whooooops',
                "La URL de la imagen debe tener 5 caracteres o más",
                'error'
            )
            return
        }

        if (!addDescripcion.trim()) {
            Swal.fire(
                'Whooooops',
                "Debe ingresar todos los campos",
                'error'
            )
            return
        }

        if (addPrecio < 2000) {
            Swal.fire(
                'Whooooops',
                "El juego debe valer un mínimo de 2000 CLP",
                'error'
            )
            return
        }

        const publicarJuego = async () => {
            const requestAddItem = {
                usuario: usuarioActivo.id,
                juego: addJuego,
                descripcion: addDescripcion,
                precio: addPrecio,
                plataforma: addPlataforma,
                formato: addFormato,
                imagen: addImagen,
                estado: "PUBLICADO"
            }

            let configAddItem = {
                headers: {
                    "Content-Type": "Application/JSON",
                    "Authorization": "Bearer " + ntk
                }
            }

            try {
                const {data} = await axios.post(URL_AGREGAR_PUBLICACION, requestAddItem, configAddItem)

                if (data.estado.codigo == "200") {

                    setAddJuego("")
                    setAddDescripcion("")
                    setAddPrecio(2000)
                    setAddPlataforma("PC")
                    setAddFormato("Digital")
                    setAddImagen("")

                    Swal.fire(
                        'Excelente',
                        "Tu juego ha sido publicado !!",
                        'success'
                    )

                    navigate("/")

                } else {
                    Swal.fire(
                        'Whooooops',
                        "No pudimos publicar tu juego, revisa tus datos nuevamente",
                        'error'
                    )
                }
            }
            catch (error) {
                Swal.fire(
                    'Whooooops',
                    "No pudimos publicar tu item, reintenta más tarde",
                    'error'
                )
            }
        }
        publicarJuego()

    }

    return (
        <>
            <h2 className="text-white">Nueva publicación</h2>
            <Form className="text-white" onSubmit={ e => handleAddProduct(e)}>
                <Form.Group className="mb-3" controlId="juego">
                    <Form.Label>Juego a vender: <span className="text-danger">*</span></Form.Label>
                    <FloatingLabel label="Ej.: Súper Mario World" controlId="floatingJuego" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Súper Mario World"
                        value = {addJuego}
                        onChange = {e => setAddJuego(e.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="url">
                    <Form.Label>URL de imágen: <span className="text-danger">*</span> </Form.Label>
                    <FloatingLabel label="Ej.: http://www.nintendo.cl/mario.jpg" controlId="floatingImagen" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="http://www.nintendo.cl/mario.jpg"
                        value = {addImagen}
                        onChange = {e => setAddImagen(e.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label>Descripción: <span className="text-danger">*</span> </Form.Label>
                    <div className="text-dark">
                        <JoditEditor
                            ref={editor}
                            value={addDescripcion}
                            tabIndex={1}
                            onBlur={newContent => setAddDescripcion(newContent)}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="precio">
                    <Form.Label>Precio: <span className="text-danger">*</span></Form.Label>
                    <FloatingLabel label="Ej.: 35000" controlId="floatingPrecio" className="text-dark mb-3">
                        <Form.Control type="number" placeholder="35000" min="0"
                        value = {addPrecio}
                        onChange = {e => setAddPrecio(e.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="plataforma">
                    <Form.Label>Plataforma: <span className="text-danger">*</span> </Form.Label>
                    <FloatingLabel controlId="floatingPlataforma" label="PC, Playstation, etc" className="text-dark">
                        <Form.Select aria-label="Seleccione una plataforma como PC o Playstation"
                        value = {addPlataforma}  onChange={e => setAddPlataforma(e.target.value)} >
                            <option value="PC">PC</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="XBOX">XBOX</option>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Otro">Otro</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formato">
                    <Form.Label>Formato: <span className="text-danger">*</span></Form.Label>
                    <FloatingLabel controlId="floatingFormato" label="Formato de entrega" className="text-dark">
                        <Form.Select aria-label="Seleccione formato de entrega, físico o digital"
                                     value = {addFormato}  onChange={e => setAddFormato(e.target.value)} >
                            <option value="Digital">Digital</option>
                            <option value="Físico">Físico</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100">Publicar Ítem</Button>
            </Form>
        </>
    )
}

export default AddItem