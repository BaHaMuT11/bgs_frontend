import React, {useContext, useEffect} from "react"
import "./profile_info.scss"
import NavProfile from "../../components/NavProfile/NavProfile.jsx"
import {Button, Image, Modal} from "react-bootstrap"
import {UserContext} from "../../context/UserProvider.jsx"
import EditUser from "../../components/EditUser/EditUser.jsx"
import EditPersonalInfo from "../../components/EditPersonalInfo/EditPersonalInfo.jsx"
import axios from "axios";
import {URL_OBTENER_INFO_GEOGRAFICA} from "../../services/auth.js"
import {useNavigate} from "react-router-dom";

const ProfileInfo = () => {

    const { usuarioActivo, setMostrarEditUser, setRegForm,
            setModCredenciales, setMostrarEditInfoUser, setComunas, setRegiones, regForm, setAutenticado} = useContext(UserContext)

    const navigate = useNavigate()

    const asignarInfoGeografica = async () => {
        const {data} = await axios.get(URL_OBTENER_INFO_GEOGRAFICA)
        const regiones = data.regiones

        setRegiones(regiones)

        for (const region of regiones) {
            if (region.region === regForm.region) {
                setComunas(region.comunas)
                break
            }
        }
    }

    const handleKillSession = () => {
        setAutenticado(false)
        setRegForm({usuario: "",
            pass: "",
            nombre: "",
            fechaNacimiento: "",
            edad: "0",
            rut: "",
            fono: "",
            calle: "",
            numero: "",
            casa: "",
            region: "Región Metropolitana de Santiago",
            comuna: "Santiago",
            correo: "",
            estado: "ACTIVO",
            imagen: ""
        })
        navigate("/authenticate")
    }

    useEffect( () => {
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
    }, [])

    return (
        <div className="profile-wrapper">
            <NavProfile />
            <div className="profile">
                <Image src={usuarioActivo.imagen} roundedCircle={true} />
                <h2 className="display-5 text-white">{usuarioActivo.nombre}</h2>
                <i className="fa-solid fa-2x fa-right-from-bracket text-danger kira"
                   title="Cierra tu sesión"
                   onClick={ () => handleKillSession()}
                ></i>
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
                <p>
                    <span className="descriptor">Correo:</span>
                    <span className="info">{usuarioActivo.correo}</span>
                </p>
                <p>
                    <span className="descriptor">Rut:</span>
                    <span className="info">{usuarioActivo.rut}</span>
                </p>
                <div className="text-center">
                    <Button variant="warning" onClick={ () => {
                        asignarInfoGeografica()
                        setMostrarEditUser(true)
                    }}>Editar info</Button> &nbsp;
                    <Button variant="danger"  onClick={ () => {
                        setMostrarEditInfoUser(true)
                        setModCredenciales({
                            login: usuarioActivo.usuario,
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