import React, {useContext} from "react"
import "./navbar.scss"
import BahaLogo from "../../assets/img/baha_logo.png"
import {Button, Form} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx";


const Navbar = () => {

    const {loginText, usuarioActivo, autenticado} = useContext(UserContext)

    return (
        <nav>
            <div className="nav-wrapper-desktop px-3">
                <div className="logo">
                    <NavLink to="/">
                        <img src={BahaLogo} alt="Imagen logo" height="50px" width="90px"/> &nbsp;
                        <span className="logo-text">BaHaGames</span>
                    </NavLink>
                </div>
                <div className="search-bar">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Juego, plataforma, PEGI"
                            className="me-1"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning">Buscar</Button>
                    </Form>
                </div>
                <div className="profile">
                    <NavLink to={autenticado?"/profile/info":"/authenticate"}>
                        {
                            autenticado ?
                                <span>{usuarioActivo.usuario}</span>
                                :
                                <span>Login</span>
                        } &nbsp;
                        <i className="fa-solid fa-2x fa-user"></i>
                    </NavLink>
                </div>
            </div>
            <div className="nav-wrapper-mobile px-3">
                <div className="main-bar">
                    <div className="logo">
                        <NavLink to="/">
                            <img src={BahaLogo} alt="Imagen logo" height="50px" width="90px"/> &nbsp;
                            <span className="logo-text">BaHaGames</span>
                        </NavLink>
                    </div>
                    <div className="profile">
                        <NavLink to={autenticado?"/profile/info":"/authenticate"}>
                            {
                                autenticado ?
                                    <span>{usuarioActivo.usuario}</span>
                                    :
                                    <span>Login</span>
                            } &nbsp;
                            <i className="fa-solid fa-2x fa-user"></i>
                        </NavLink>
                    </div>
                </div>
                <div className="search-bar">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Juego, plataforma, PEGI"
                            className="me-1"
                            aria-label="Search"
                        />
                        <Button variant="outline-warning">Buscar</Button>
                    </Form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar