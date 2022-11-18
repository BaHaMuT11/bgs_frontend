import React, {useContext, useState} from "react"
import {Button, Col, FloatingLabel, Form} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_AUTHENTICATE, URL_BUSCAR_USUARIO_LOGIN} from "../../services/auth.js"
import Swal from "sweetalert2"

const SignIn = () => {

    const navigate = useNavigate()

    const [ingLogin, setIngLogin] = useState("")
    const [ingPassword, setIngPassword] = useState("")

    const {setNtk, setUsuarioActivo, setAutenticado} = useContext(UserContext)

    const handleLoginSubmit = (e) => {

        e.preventDefault()

        const autenticar = async() => {
            const loginReq = {
                username: ingLogin,
                password: ingPassword
            }

            try {
                const {data} = await axios.post(URL_AUTHENTICATE, loginReq)

                Swal.fire(
                    'Excelente',
                    "Ingreso correcto ",
                    'success'
                )

                const token = data.token
                setNtk(token)

                const asignarUsuarioActivo = async() => {
                    try {
                        const configuracionUA = {
                            headers: {
                                "Content-Type": "Application/JSON",
                                "Authorization": "Bearer " + token
                            }
                        }
                        const {data} = await axios.get(URL_BUSCAR_USUARIO_LOGIN + ingLogin, configuracionUA)

                        setUsuarioActivo(data.usuario)
                        setAutenticado(true)
                        navigate("/profile/info")
                    }
                    catch(error){
                        Swal.fire(
                            'Buaaa x.x',
                            "No pudimos encontrar tu usuario. Contactar con un administrador",
                            'error'
                        )
                    }
                }
                asignarUsuarioActivo()


            }
            catch(error) {
                if (error.response) {
                    Swal.fire(
                        'Alto ahí',
                        "Credenciales no válidas",
                        'error'
                    )
                } else {
                    Swal.fire(
                        'Whoops',
                        "Ocurrió un error inesperado",
                        'error'
                    )
                }
            }
        }
        autenticar()
    }

    return (
        <Col className="my-3">
            <h2 className="text-white  text-center">INGRESO</h2>
            <Form className="text-white" onSubmit={ e => handleLoginSubmit(e)} >
                <Form.Group className="mb-3" controlId="ingLogin">
                    <Form.Label>Login:</Form.Label>
                    <FloatingLabel label="Login" controlId="floatingIngLogin" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Login"
                                      value={ingLogin}
                                      onChange={ e => setIngLogin(e.target.value)} required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ingPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <FloatingLabel label="Contraseña" controlId="floatingIngPassword" className="text-dark mb-3">
                        <Form.Control type="password" placeholder="Login"
                                      value={ingPassword}
                                      onChange={ e => setIngPassword(e.target.value)} required
                        />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100">Ingresar</Button>
            </Form>
        </Col>

    )
}

export default SignIn