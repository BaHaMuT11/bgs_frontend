import React, {createContext, useState} from "react"

export const UserContext = createContext()

const UserProvider = (props) => {

    //Autenticación
    const [ntk, setNtk] = useState("")
    const [loginText, setLoginText] = useState("Login")

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
    const [formError, setFormError] = useState("")
    return (
        <UserContext.Provider value={{
            ntk, setNtk,
            loginText, setLoginText,
            regForm, setRegForm,
            regiones, setRegiones,
            comunas, setComunas,
            geoToogler, setGeoToogler,
            formError, setFormError
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider