import React from "react"
import "./login.scss"
import {Col, Row} from "react-bootstrap"
import SignUp from "../../components/SingUp/SignUp.jsx";
import SignIn from "../../components/SignIn/SignIn.jsx";

const Login = () => {
    return (
        <Row>
            <SignUp />
            <div className="vr my-3" />
            <SignIn />
        </Row>
    )
}

export default Login