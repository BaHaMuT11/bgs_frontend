import React, {createContext, useState} from 'react'

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

    return (
        <ProductContext.Provider value={{ addDescripcion, setAddDescripcion,
                                          addJuego, setAddJuego,
                                          addImagen, setAddImagen,
                                          addPrecio, setAddPrecio,
                                          addPlataforma, setAddPlataforma,
                                          addFormato, setAddFormato,
                                          publicaciones, setPublicaciones,
                                          publicacionesUsuario, setPublicacionesUsuario
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider