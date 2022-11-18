import React, {useContext, useEffect, useState} from "react"
import "./navbar.scss"
import BahaLogo from "../../assets/img/baha_logo.png"
import {Button, Form} from "react-bootstrap"
import {NavLink, useLocation} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx"


const Navbar = () => {

    const {usuarioActivo, autenticado} = useContext(UserContext)
    const [pathName, setPathname] = useState("")
    let location = useLocation()

    useEffect( () => {
        setPathname(location.pathname)
    })

    return (
        <nav>
            {
                pathName == "/" ?
                    <>
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
                                        placeholder="Busca tu juego"
                                        className="me-1"
                                        aria-label="Search"
                                    />
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
                                        placeholder="Busca tu juego"
                                        className="me-1"
                                        aria-label="Search"
                                    />
                                </Form>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="nav-wrapper-desktop px-3">
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
                        <div className="nav-wrapper-middle px-3">
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
                    </>
            }
        </nav>
    )
}

export default Navbar