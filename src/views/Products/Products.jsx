import React, {useContext, useEffect, useState} from "react"
import "./products.scss"
import {Row, Col} from "react-bootstrap"
import Hero from "../../components/Hero/Hero.jsx"
import GameCard from "../../components/GameCard/GameCard.jsx"
import axios from "axios"
import {URL_OBTENER_PUBLICACIONES} from "../../services/publicaciones.js"
import Swal from "sweetalert2"
import {ProductContext} from "../../context/ProductProvider.jsx"
import {UserContext} from "../../context/UserProvider.jsx"

const Products = () => {

    const {ntk, autenticado} = useContext(UserContext)
    const {setPublicaciones, publicaciones} = useContext(ProductContext)

    const [populares, setPopulares] = useState([])

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
                    setPublicaciones(publis)
                }
                asignarPublicaciones()

                const asignarPopulares = () => {
                    let popus = []

                    items.forEach( (publicacion, index) => {
                        if (index < 3 && (publicacion.estado != "DESACTIVADO" && publicacion.estado != "VENDIDO") ) {
                            popus = [...popus, publicacion]
                        }
                    })
                    popus.sort((a, b) => (b.rating - a.rating))
                    setPopulares(popus)
                }
                asignarPopulares()

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
            <Row className="py-3">
                <Col>
                    <Hero />
                </Col>
            </Row>
            <Row>
                <h2 className="display-6 text-white">Populares</h2>
                {
                    populares.map(publicacion => (
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
            </Row>
            <Row>
                <h2 className="display-6 text-white">Catálogo</h2>
                {
                    publicaciones.map(publicacion => (
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
            </Row>
        </>
    )
}

export default Products