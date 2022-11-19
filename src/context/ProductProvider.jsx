import React, {createContext, useState} from "react"

export const ProductContext = createContext()

const ProductProvider = (props) => {

    //AddForm
    const [addDescripcion, setAddDescripcion] = useState("")
    const [addJuego, setAddJuego] = useState("")
    const [addImagen, setAddImagen] = useState("")
    const [addPrecio, setAddPrecio] = useState(2000)
    const [addPlataforma, setAddPlataforma] = useState("PC")
    const [addFormato, setAddFormato] = useState("Digital")

    //GetPublicaciones
    const [publicaciones, setPublicaciones] = useState([])
    const [populares, setPopulares] = useState([])
    const [publicacionesUsuario, setPublicacionesUsuario] = useState([])
    const [publicacionActiva, setPublicacionActiva] = useState({})

    //Favoritos
    const [favoritos, setFavoritos] = useState([])

    //Interesados
    const [mostrarInteresados, setMostrarInteresados] = useState(false)
    const [interesados, setInteresados] = useState([])

    //ModForm
    const [mostrarEditItem, setMostrarEditItem] = useState(false)
    const [modPlataforma, setModPlataforma] = useState("PC")
    const [modFormato, setModFormato] = useState("Digital")
    const [modPublicacionActiva, setModPublicacionActiva] = useState({})

    //GetAdquisiciones
    const [adquisiciones, setAdquisiciones] = useState([])

    //Filtro
    const [inputFiltro, setInputFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState(false)

    //Ordenamiento principal
    const [seleccionOrden, setSeleccionOrden] = useState("nuevas")

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
                                          interesados, setInteresados,
                                          mostrarEditItem, setMostrarEditItem,
                                          modPlataforma, setModPlataforma,
                                          modFormato, setModFormato,
                                          modPublicacionActiva, setModPublicacionActiva,
                                          adquisiciones, setAdquisiciones,
                                          inputFiltro, setInputFiltro,
                                          estadoFiltro, setEstadoFiltro,
                                          seleccionOrden, setSeleccionOrden,
                                          populares, setPopulares
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider