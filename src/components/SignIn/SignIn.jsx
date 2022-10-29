import React from 'react'
import {Button, Col, FloatingLabel, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/profile/info")
    }

    return (
        <Col className="my-3">
            <h2 className="text-white  text-center">INGRESO</h2>
            <Form className="text-white">
                <Form.Group className="mb-3" controlId="ingLogin">
                    <Form.Label>Login:</Form.Label>
                    <FloatingLabel label="Login" controlId="floatingIngLogin" className="text-dark mb-3">
                        <Form.Control type="text" placeholder="Login" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ingPassword">
                    <Form.Label>Contraseña:</Form.Label>
                    <FloatingLabel label="Contraseña" controlId="floatingIngPassword" className="text-dark mb-3">
                        <Form.Control type="password" placeholder="Login" />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100" onClick={ ()=>handleClick()}>Ingresar</Button>
            </Form>
        </Col>

    )
}

export default SignIn