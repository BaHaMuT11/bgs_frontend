import React, {createContext, useState} from "react"

export const UserContext = createContext()

const UserProvider = (props) => {

    //Autenticación
    const [ntk, setNtk] = useState("")
    const [usuarioActivo, setUsuarioActivo] = useState({})
    const [autenticado, setAutenticado] = useState(false)

    //Registro
    const [regForm, setRegForm] = useState(
        {usuario: "",
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
                      estado: "ACTIVO"
                      }
    )
    const [regiones, setRegiones] = useState([])
    const [comunas, setComunas] = useState([])
    const [geoToogler, setGeoToogler] = useState(false)



    return (
        <UserContext.Provider value={{
            ntk, setNtk,
            loginText, setLoginText,
            regForm, setRegForm,
            regiones, setRegiones,
            comunas, setComunas,
            geoToogler, setGeoToogler,
            usuarioActivo, setUsuarioActivo,
            autenticado, setAutenticado
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider