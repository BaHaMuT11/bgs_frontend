import React, {useContext} from "react"
import "./profile_info.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Button, Image} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx";

const ProfileInfo = () => {

    const {usuarioActivo} = useContext(UserContext)

    return (
        <div>
            <NavProfile />
            <div className="profile">
                <Image src={usuarioActivo.imagen} roundedCircle={true} />
                <h2 className="display-5 text-white">{usuarioActivo.nombre}</h2>
            </div>
            <div className="profile-info text-white pb-3">
                <p>
                    <span className="descriptor">Dirección:</span>
                    <span className="info">{`${usuarioActivo.calle} 
                                            #${usuarioActivo.numero},
                                            ${usuarioActivo.comuna}`}</span>
                </p>
                <p>
                    <span className="descriptor">Login:</span>
                    <span className="info">{usuarioActivo.usuario}</span>
                </p>
                <p>
                    <span className="descriptor">Fono:</span>
                    <span className="info">{usuarioActivo.fono}</span>
                </p>
                <p>
                    <span className="descriptor">Edad:</span>
                    <span className="info">{usuarioActivo.edad}</span>
                </p>
                <div className="text-center">
                    <Button variant="warning">Editar info</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo