import React, {useContext} from "react"
import {useQuill} from "react-quilljs"
import 'quill/dist/quill.snow.css'
import {ProductContext} from "../../context/ProductProvider.jsx"
import "./item_txa.scss"

const ItemTxa = () => {

    const { quill, quillRef } = useQuill();
    const { setAddDescripcion } = useContext(ProductContext)

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setAddDescripcion(quillRef.current.firstChild.innerHTML)
            });
        }
    }, [quill]);

    return (
        <div className="txa-height mb-5">
            <div ref={quillRef} />
        </div>
    );
}

export default ItemTxa