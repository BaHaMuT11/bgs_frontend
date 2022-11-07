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

    return (
        <ProductContext.Provider value={{ addDescripcion, setAddDescripcion,
                                          addJuego, setAddJuego,
                                          addImagen, setAddImagen,
                                          addPrecio, setAddPrecio,
                                          addPlataforma, setAddPlataforma,
                                          addFormato, setAddFormato}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider