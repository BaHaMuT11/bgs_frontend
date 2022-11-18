import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../../context/UserProvider.jsx"
import {ProductContext} from "../../context/ProductProvider.jsx"
import axios from "axios"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import GameCard from "../GameCard/GameCard.jsx"
import Pagination from "../../util/Pagination/Pagination.jsx";

const Catalog = () => {

    const {ntk, autenticado} = useContext(UserContext)
    const {setPublicaciones, publicaciones} = useContext(ProductContext)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const indexOfLastItem= currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const publicacionesActuales = publicaciones.slice(indexOfFirstItem, indexOfLastItem);

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

                const asignarPublicaciones = () => {
                    let publis = []

                    for (let publicacion of items) {

                        if (publicacion.estado != "DESACTIVADO" && publicacion.estado != "VENDIDO") {
                            publis = [...publis, publicacion]
                        }
                    }
                    publis.sort((a, b) => (b.id - a.id))
                    setPublicaciones(publis)
                }
                asignarPublicaciones()

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

    const handlePaginate = pageNumber => setCurrentPage(pageNumber);

    useEffect( () => {
        asignarPublicaciones()
    }, [])

    return (
        <>
            {
                publicacionesActuales.map(publicacion => (
                    <GameCard estadoAutenticacion={autenticado}
                              juego={publicacion.juego}
                              plataforma={publicacion.plataforma}
                              formato={publicacion.formato}
                              rating={publicacion.rating}
                              precio={publicacion.precio}
                              imagen={publicacion.imagen}
                              idPublicacion={publicacion.id}
                              actualizar={asignarPublicaciones}
                              key={publicacion.id}
                    />
                ))
            }
            <div className="d-flex justify-content-center">
                <Pagination itemsPerPage={itemsPerPage} totalItems={publicaciones.length} paginate={handlePaginate} actual={currentPage} />
            </div>
        </>
    )
}

export default Catalog