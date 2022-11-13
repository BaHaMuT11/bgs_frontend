import React, {createContext, useState} from "react"

export const ProductContext = createContext()

const ProductProvider = (props) => {

    //AddForm
    const [addDescripcion, setAddDescripcion] = useState("")
    const [addJuego, setAddJuego] = useState("")
    const [addImagen, setAddImagen] = useState("")
    const [addPrecio, setAddPrecio] = useState(2000)
    const [addPlataforma, setAddPlataforma] = useState("")
    const [addFormato, setAddFormato] = useState("")

    //GetPublicaciones
    const [publicaciones, setPublicaciones] = useState([])
    const [publicacionesUsuario, setPublicacionesUsuario] = useState([])
    const [publicacionActiva, setPublicacionActiva] = useState({})

    //Favoritos
    const [favoritos, setFavoritos] = useState([])

    //Interesados
    const [mostrarInteresados, setMostrarInteresados] = useState(false)
    const [interesados, setInteresados] = useState([])

    return (
        <ProductContext.Provider value={{ addDescripcion, setAddDescripcion,
                                          addJuego, setAddJuego,
                                          addImagen, setAddImagen,
                                          addPrecio, setAddPrecio,
                                          addPlataforma, setAddPlataforma,
                                          addFormato, setAddFormato,
                                          publicaciones, setPublicaciones,
                                          publicacionesUsuario, setPublicacionesUsuario,
                                          publicacionActiva, setPublicacionActiva,
                                          favoritos, setFavoritos,
                                          mostrarInteresados, setMostrarInteresados,
                                          interesados, setInteresados
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider