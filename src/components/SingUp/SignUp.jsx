import React from "react"
import "./sign_up.scss"
import {Button, Col, FloatingLabel, Form} from "react-bootstrap";

const SignUp = () => {
    return (
        <Col className="my-3">
            <h2 className="text-white text-center">REGISTRO</h2>
            <Form className="text-white">
                <Form.Group className="mb-3" controlId="regNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <FloatingLabel label="Nombre completo" controlId="floatingRegNombre" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Nombre completo" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regLogin">
                    <Form.Label>Login:</Form.Label>
                    <FloatingLabel label="Login" controlId="floatingRegLogin" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Login" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regNacimiento">
                    <Form.Label>Fecha de nacimiento:</Form.Label>
                    <FloatingLabel controlId="floatingRegNacimiento" label="Fecha de nacimiento" className="text-dark">
                        <Form.Control type="date" placeholder="7880. 15-A"/>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="regRUT">
                    <Form.Label>RUT:</Form.Label>
                    <FloatingLabel label="Ej.: 16587231-K" controlId="floatingRegRUT" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="16587231-K" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-5" controlId="regFono">
                    <Form.Label>Fono:</Form.Label>
                    <FloatingLabel label="Ej.: +56 9 4178 8523" controlId="floatingRegFono" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="+56 9 4178 8523" />
                    </FloatingLabel>
                </Form.Group>
                <div className="calle-completa pt-5">
                    <Form.Group className="mb-3" controlId="regCalle">
                        <Form.Label>Calle:</Form.Label>
                        <FloatingLabel label="Calle" controlId="floatingRegCalle" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="Calle" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regNumero">
                        <Form.Label>Número:</Form.Label>
                        <FloatingLabel label="Número" controlId="floatingRegNumero" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="7880. 15-A"/>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regCasa">
                        <Form.Label>Casa/Block/Depto:</Form.Label>
                        <FloatingLabel label="Ej.: 404, Block B" controlId="floatingRegCasa" className="text-dark mb-3">
                            <Form.Control type="text" placeholder="7880. 15-A"/>
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" controlId="regRegion">
                    <Form.Label>Región:</Form.Label>
                    <FloatingLabel controlId="floatingRegRegion" label="Región" className="text-dark">
                        <Form.Select aria-label="Regiones de Chile">
                            <option value="RM">Metropolitana</option>
                            <option value="V">V Región de Valparaíso</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="pb-5" controlId="regComuna">
                    <Form.Label>Comuna:</Form.Label>
                    <FloatingLabel controlId="floatingRegComuna" label="Comuna" className="text-dark">
                        <Form.Select aria-label="Comunas por región">
                            <option value="SB">San Bernardo</option>
                            <option value="VM">Viña del Mar</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>
                <div className="my-5">
                    <Form.Group className="mb-3" controlId="regPsw">
                        <Form.Label>Contraseña:</Form.Label>
                        <FloatingLabel label="Contraseña" controlId="floatingRegPsw" className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Contraseña" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regPswRepeat">
                        <Form.Label>Repita la contraseña:</Form.Label>
                        <FloatingLabel label="Repita la contraseña" controlId="floatingRegPswRepeat"
                                       className="text-dark mb-3">
                            <Form.Control type="password" placeholder="Repita la contraseña" />
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <div className="pb-3">
                    <Form.Group className="mb-3" controlId="regEmail">
                        <Form.Label>Correo:</Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmail" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Email" />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="regEmailRepeat">
                        <Form.Label>Repita el correo:</Form.Label>
                        <FloatingLabel label="Ej.: nombre@dominio.cl" controlId="floatingRegEmailRepeat" className="text-dark mb-3">
                            <Form.Control type="email" placeholder="Repita el email" />
                        </FloatingLabel>
                    </Form.Group>
                </div>
                <Button variant="warning" type="submit" className="w-100">Registrarse</Button>
            </Form>
        </Col>
    )
}

export default SignUp