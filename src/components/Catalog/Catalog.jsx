import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../context/UserProvider.jsx"
import {ProductContext} from "../../context/ProductProvider.jsx"
import axios from "axios"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import GameCard from "../GameCard/GameCard.jsx"
import Pagination from "../../util/Pagination/Pagination.jsx"
import {Form} from "react-bootstrap"

const Catalog = () => {

    const {ntk, autenticado} = useContext(UserContext)
    const {setPublicaciones, publicaciones, estadoFiltro, seleccionOrden, setSeleccionOrden} = useContext(ProductContext)

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(4)

    const indexOfLastItem= currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const publicacionesActuales = publicaciones.slice(indexOfFirstItem, indexOfLastItem)

    const asignarPublicaciones = async () => {
        const configsItemList = {
            headers: {
                "Content-Type": "Application/JSON",
                "Authorization": "Bearer " + ntk
            }
        }

        try {
            const {data} = await axios.get(URL_OBTENER_PUBLICACIONES, configsItemList)

            if (data.estado.codigo == "200") {

                const items = data.publicaciones

                const procesarPublicaciones = () => {
                    let publis = []

                    for (let publicacion of items) {

                        if (publicacion.estado != "DESACTIVADO" && publicacion.estado != "VENDIDO") {
                            publis = [...publis, publicacion]
                        }
                    }
                    publis.sort((a, b) => (b.id - a.id))
                    setPublicaciones(publis)
                }
                procesarPublicaciones()

            } else {
                Swal.fire(
                    'Whooooops',
                    "No se pueden obtener las publicaciones",
                    'error'
                )
            }
        }
        catch (error) {
            Swal.fire(
                'Whooooops',
                "Hubo un error de conexión con el servidor",
                'error'
            )
        }
    }

    const handlePaginate = pageNumber => setCurrentPage(pageNumber)

    useEffect( () => {

        if (seleccionOrden === "nuevas") {

            let genDesc = [...publicaciones]
            genDesc.sort((a, b) => (b.id - a.id))
            setPublicaciones(genDesc)
        }

        if (seleccionOrden === "antiguas") {

            let genAsc = [...publicaciones]
            genAsc.sort((a, b) => (a.id - b.id))
            setPublicaciones(genAsc)
        }

    }, [seleccionOrden])


    const renderizarPublicaciones= () => {
        if ( publicaciones.length === 0 && !estadoFiltro ) {
            return (
                <div className="text-center text-warning mt-2">
                    <p>No hay publicaciones en nuestros registros</p>
                </div>
            )
        }
        else if ( publicaciones.length === 0 && estadoFiltro ) {
            return (
                <div className="text-center text-warning mt-2">
                    <p>No se encontraron coincidencias</p>
                </div>
            )
        }
        else {
            return (
                <>
                    <div className="text-white py-2">
                        <span>Ordenar:</span>
                        <Form.Select aria-label="Seleccione ordenamiento de productos"
                        value={seleccionOrden}
                        onChange={ e => setSeleccionOrden(e.target.value)}>
                            <option value="nuevas">Publicaciones más nuevas</option>
                            <option value="antiguas">Publicaciones más antiguas</option>
                        </Form.Select>
                    </div>
                    {
                        publicacionesActuales.map(publicacion => (
                            <React.Fragment key={publicacion.id}>
                                <GameCard estadoAutenticacion={autenticado}
                                          juego={publicacion.juego}
                                          plataforma={publicacion.plataforma}
                                          formato={publicacion.formato}
                                          rating={publicacion.rating}
                                          precio={publicacion.precio}
                                          imagen={publicacion.imagen}
                                          idPublicacion={publicacion.id}
                                          actualizar={asignarPublicaciones}
                                />
                            </React.Fragment>
                        ))
                    }
                    <div className="d-flex justify-content-center">
                        <Pagination itemsPerPage={itemsPerPage} totalItems={publicaciones.length} paginate={handlePaginate} actual={currentPage} />
                    </div>
                </>
            )
        }
    }


    useEffect( () => {
        asignarPublicaciones()
    }, [])

    return (
        renderizarPublicaciones()
    )
}

export default Catalog