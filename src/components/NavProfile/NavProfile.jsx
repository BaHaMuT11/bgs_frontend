import React from 'react'
import "./nav_profile.scss"
import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const NavProfile = () => {
    return (
        <Row className="text-center">
            <Col className="col-xl-3 my-2">
                <NavLink className="display-6" to="/profile/mygames">Mis juegos</NavLink>
            </Col>
            <Col className="col-xl-3 my-2">
                <NavLink className="display-6"  to="/profile/wishlist">Favoritos</NavLink>
            </Col>
            <Col className="col-xl-3 my-2">
                <NavLink className="display-6" to="/profile/items">Publicaciones</NavLink>
            </Col>
            <Col className="col-xl-3 my-2">
                <NavLink className="display-6" to="/profile/info">Perfil</NavLink>
            </Col>
        </Row>
    )
}

export default NavProfile