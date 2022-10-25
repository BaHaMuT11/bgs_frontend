import React from 'react'
import "./navbar.scss"
import BahaLogo from "../../assets/img/baha_logo.png"
import {Button, Form} from "react-bootstrap";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper px-3">
                <div className="logo">
                    <img src={BahaLogo} alt="Imagen logo" height="50px" width="90px"/> &nbsp;
                    <span className="logo-text">BaHaGames</span>
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
                    <span>Baha</span> &nbsp;
                    <i className="fa-solid fa-2x fa-user"></i>
                </div>
            </div>
        </nav>
    )
}

export default Navbar