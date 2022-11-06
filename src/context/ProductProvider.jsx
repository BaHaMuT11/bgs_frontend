import React, {createContext, useState} from 'react'

export const ProductContext = createContext()

const ProductProvider = (props) => {

    //AddForm
    const [addDescripcion, setAddDescripcion] = useState()

    return (
        <ProductContext.Provider value={{addDescripcion, setAddDescripcion}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductProvider