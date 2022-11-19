import React, {useContext, useEffect, useState} from "react"
import GameCard from "../GameCard/GameCard.jsx"
import {UserContext} from "../../context/UserProvider.jsx"
import axios from "axios"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import {ProductContext} from "../../context/ProductProvider.jsx";

const MostVoted = () => {

    const {ntk, autenticado} = useContext(UserContext)
    const {populares, setPopulares} = useContext(ProductContext)

    const asignarPublicaciones= async () => {
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

                const procesarPopulares = () => {

                    let orderedItems = [...items]
                    orderedItems.sort((a, b) => (b.rating - a.rating))

                    let popus = []

                    let i = 0

                    for (let publicacion of orderedItems) {
                        if (i < 4 && (publicacion.estado != "DESACTIVADO" && publicacion.estado != "VENDIDO") ) {
                            popus = [...popus, publicacion]
                            i++
                        }
                    }
                    setPopulares(popus)
                }
                procesarPopulares()

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

    useEffect( () => {
        asignarPublicaciones()
    }, [])

    return (
        <>
            {
                populares.map(publicacion => (
                    <React.Fragment key={publicacion.id}>
                        <GameCard estadoAutenticacion={autenticado}
                                  juego={publicacion.juego}
                                  plataforma={publicacion.plataforma}
                                  formato={publicacion.formato}
                                  rating={publicacion.rating}
                                  precio={publicacion.precio}
                                  imagen={publicacion.imagen}
                                  idPublicacion={publicacion.id}
                        />
                    </React.Fragment>
                ))
            }
        </>
    )
}

export default MostVoted