import React, {useContext} from "react"
import "./profile_info.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Button, Image, Modal} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import EditUser from "../../components/EditUser/EditUser.jsx"
import EditPersonalInfo from "../../components/EditPersonalInfo/EditPersonalInfo.jsx"

const ProfileInfo = () => {

    const { usuarioActivo, setMostrarEditUser, setRegForm,
            setModCredenciales, setMostrarEditInfoUser} = useContext(UserContext)

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
                    <Button variant="warning" onClick={ () => {
                        setMostrarEditUser(true)
                        setRegForm({
                            usuario: usuarioActivo.usuario,
                            pass: "",
                            nombre: usuarioActivo.nombre,
                            fechaNacimiento: usuarioActivo.fechaNacimiento,
                            edad: usuarioActivo.edad,
                            rut: usuarioActivo.rut,
                            fono: usuarioActivo.fono,
                            calle: usuarioActivo.calle,
                            numero: usuarioActivo.numero,
                            casa: usuarioActivo.casa,
                            region: usuarioActivo.region,
                            comuna: usuarioActivo.comuna,
                            correo: "",
                            estado: "ACTIVO",
                            imagen: usuarioActivo.imagen
                        })
                    }}>Editar info</Button> &nbsp;
                    <Button variant="danger"  onClick={ () => {
                        setMostrarEditInfoUser(true)
                        setModCredenciales({
                            correo: usuarioActivo.correo,
                            pass: ""
                        })
                    }}>Modificar credenciales</Button>
                </div>
                <EditUser />
                <EditPersonalInfo />
            </div>
        </div>
    )
}

export default ProfileInfo