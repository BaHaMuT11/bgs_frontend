import React, {useContext, useEffect} from "react"
import "./navbar.scss"
import BahaLogo from "../../assets/img/baha_logo.png"
import {NavLink, useLocation} from "react-router-dom"
import {UserContext} from "../../context/UserProvider.jsx"
import BusquedaPrincipal from "../BusquedaPrincipal/BusquedaPrincipal.jsx"


const Navbar = () => {

    const {usuarioActivo, autenticado,pathName, setPathname} = useContext(UserContext)
    let location = useLocation()

    useEffect( () => {
        setPathname(location.pathname)
    })

    return (
        <nav>
            {
                pathName === "/" ?
                    <>
                        <div className="nav-wrapper-desktop px-3">
                            <div className="logo">
                                <NavLink to="/">
                                    <img src={BahaLogo} alt="Imagen logo" height="50px" width="90px"/> &nbsp;
                                    <span className="logo-text">BaHaGames</span>
                                </NavLink>
                            </div>
                            <div className="search-bar">
                                <BusquedaPrincipal />
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
                                <BusquedaPrincipal />
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